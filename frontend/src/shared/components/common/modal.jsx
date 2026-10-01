"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

import Box from "@/ui/box";

const CLOSE_ANIMATION_DURATION = 0.3;
const MotionBox = motion.create(Box);

export default function Modal({
  open,
  children,
  onClose,
  width = "52rem",
  classStyle
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence mode='wait'>
      {open ? (
        <MotionBox
          as='div'
          animate={{ opacity: 1 }}
          aria-hidden={false}
          className='modal-overlay'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role='presentation'
          transition={{ duration: CLOSE_ANIMATION_DURATION, ease: "easeInOut" }}
          onClick={event => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <MotionBox
            as='div'
            animate={{ opacity: 1, scale: 1 }}
            aria-labelledby={titleId}
            aria-modal='true'
            className={[
              "modal bg__main--light",
              classStyle ? `modal__${classStyle}` : ""
            ]
              .filter(Boolean)
              .join(" ")
              .trim()}
            exit={{ opacity: 0, scale: 1 }}
            initial={{ opacity: 0, scale: 0.6 }}
            role='dialog'
            style={{
              "--modal-width":
                typeof width === "number" ? `${String(width)}px` : width
            }}
            transition={{
              duration: CLOSE_ANIMATION_DURATION,
              ease: [0.22, 1, 0.36, 1]
            }}
            onClick={event => {
              event.stopPropagation();
            }}
          >
            <IoMdClose className='modal__close' onClick={onClose} />

            <Box as='div' className='modal__body'>
              <Box as='div' className='modal__body--content'>
                {children}
              </Box>
            </Box>
          </MotionBox>
        </MotionBox>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
