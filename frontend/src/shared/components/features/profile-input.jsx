"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

const ALLOWED_EXTENSIONS = /\.(png|jpe?g)$/i;
const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg"]);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const resolveFileValidationError = file => {
  const hasValidType = ALLOWED_MIME_TYPES.has(file.type);
  const hasValidExtension = ALLOWED_EXTENSIONS.test(file.name);
  if (!hasValidType || !hasValidExtension) {
    return "Only PNG, JPG, or JPEG files are allowed.";
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return "Image must be 5 MB or less.";
  }
  return null;
};

export default function ProfileInput({
  value,
  error,
  disabled,
  onChange,
  onValidationError
}) {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [uploadName, setUploadName] = useState("");

  const previewError = uploadError ?? error;
  const hasProfile = Boolean(profilePreview);
  const displayedUploadName = value?.name ?? uploadName;

  const resetInputValue = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const applyFile = file => {
    const validationError = resolveFileValidationError(file);
    if (validationError) {
      setUploadError(validationError);
      setIsDropActive(false);
      onValidationError(validationError);
      return;
    }

    setUploadError(null);
    onValidationError(undefined);
    onChange(file);
    setUploading(true);
    setUploadName(file.name);
    setTimeout(() => {
      if (profilePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }
      setProfilePreview(URL.createObjectURL(file));
      setUploading(false);
      setIsDropActive(false);
    }, 3000);
  };

  const handleInputChange = event => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    applyFile(file);
  };

  const handleDrop = event => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    const file = event.dataTransfer.files[0];
    if (!file) {
      return;
    }
    applyFile(file);
  };

  const handleDeleteProfile = () => {
    if (profilePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(profilePreview);
    }
    setProfilePreview(null);
    setUploadError(null);
    setIsDropActive(false);
    setIsMenuOpen(false);
    setUploadName("");
    resetInputValue();
    onValidationError(undefined);
    onChange(undefined);
  };

  const uploadingDots = useMemo(() => [0, 1, 2], []);

  useEffect(
    () => () => {
      if (profilePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }
    },
    [profilePreview]
  );

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const handleOutsideClick = event => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <Box as='section' className='profile-input'>
      {!hasProfile ? (
        <Box as='div' className='profile-input__dropzone'>
          <Box
            as='div'
            className={`profile-input__dropzone--area${
              previewError ? " profile-input__dropzone--area-error" : ""
            }${isDropActive ? " profile-input__dropzone--area-active" : ""}`}
            onClick={() => {
              if (!disabled) {
                fileInputRef.current?.click();
              }
            }}
            onDragOver={event => {
              event.preventDefault();
              if (!disabled) {
                setIsDropActive(true);
              }
            }}
            onDragLeave={() => {
              setIsDropActive(false);
            }}
            onDrop={handleDrop}
          >
            {uploading ? (
              <Box as='div'>
                <Typography
                  as='p'
                  classStyle='tertiary'
                  className='color__primary'
                >
                  Uploading
                </Typography>
                {uploadingDots.map(index => (
                  <Typography as='span' key={index}>
                    .
                  </Typography>
                ))}
              </Box>
            ) : (
              <>
                <Typography
                  as='p'
                  classStyle='tertiary'
                  className='text__align--center color__white--light'
                >
                  Drag and Drop or <br />
                  <Typography
                    as='span'
                    classStyle='tertiary'
                    className='color__primary'
                  >
                    Click to Upload
                  </Typography>
                </Typography>
              </>
            )}
          </Box>
          {previewError ? (
            <Typography as='p' classStyle='tertiary' className='color__red'>
              {previewError}
            </Typography>
          ) : (
            <Typography
              as='p'
              classStyle='tertiary'
              className='color__white--light'
            >
              PNG, JPG, or JPEG (max. 5MB)
            </Typography>
          )}{" "}
        </Box>
      ) : (
        <Box as='div' className='profile-input__preview'>
          <Box as='div'>
            <Image
              alt='Profile preview'
              height={180}
              src={profilePreview ?? ""}
              unoptimized
              width={180}
            />
            <Box as='section' ref={dropdownRef}>
              <Button
                type='button'
                onClick={() => {
                  setIsMenuOpen(prev => !prev);
                }}
                className='bg__red'
              >
                <MdEdit />
              </Button>
              {isMenuOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className='bg__secondry'
                >
                  <Button
                    classStyle='simple'
                    type='button'
                    className='color__black bg__amber'
                    onClick={() => {
                      setIsMenuOpen(false);
                      fileInputRef.current?.click();
                    }}
                  >
                    Update profile
                  </Button>
                  <Button
                    classStyle='simple'
                    className='color__white bg__red'
                    type='button'
                    onClick={handleDeleteProfile}
                  >
                    Delete profile
                  </Button>
                </motion.div>
              ) : null}
            </Box>
          </Box>
          <Box as='section'>
            <Typography as='p' classStyle='secondry'>
              Profile image uploaded
            </Typography>
            {displayedUploadName && (
              <Typography
                as='span'
                classStyle='tertiary'
                className='color__white--light'
              >
                {displayedUploadName}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      <input
        ref={fileInputRef}
        className='hidden'
        accept='image/png,image/jpeg'
        disabled={disabled}
        type='file'
        onChange={handleInputChange}
      />
    </Box>
  );
}
