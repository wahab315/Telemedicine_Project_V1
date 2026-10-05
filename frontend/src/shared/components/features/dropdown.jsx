"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Dropdown = ({
  options,
  value,
  label,
  labelAs = "p",
  labelClassName,
  labelClassStyle = "tertiary--bold",
  labelHtmlFor,
  onValueChange,
  placeholder = "Select…",
  disabled = false,
  className,

  id: idProp,
  "aria-label": ariaLabel
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected = options.find(o => o.value === value);
  const displayLabel = selected?.label ?? placeholder;
  const normalizedDisplayLabel = displayLabel.toLowerCase();
  const isDefaultDisplayLabel =
    normalizedDisplayLabel.includes("all") ||
    normalizedDisplayLabel.includes("latest");
  const triggerClassStyle =
    open || !isDefaultDisplayLabel ? "trigger--active" : "trigger";

  useEffect(() => {
    const onDocClick = e => {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  const toggle = () => {
    if (!disabled) {
      setOpen(o => !o);
    }
  };

  const onKeyDown = e => {
    if (disabled) {
      return;
    }

    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(o => !o);
    }
  };

  const selectOption = next => {
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <Box as='div' className={["dropdown", className].filter(Boolean).join(" ")}>
      {label ? (
        labelAs === "label" ? (
          <Typography
            as='label'
            classStyle={labelClassStyle}
            className={[/* "color__white--light", */ labelClassName]
              .filter(Boolean)
              .join(" ")}
            htmlFor={labelHtmlFor}
          >
            {label}
          </Typography>
        ) : (
          <Typography
            as={labelAs}
            classStyle={labelClassStyle}
            className={[/* "color__white--light", */ labelClassName]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </Typography>
        )
      ) : null}
      <Box ref={rootRef} className='dropdown__container'>
        <Button
          id={id}
          type='button'
          classStyle={triggerClassStyle}
          aria-haspopup='listbox'
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={onKeyDown}
        >
          <Typography as='p' classStyle='tertiary--bold'>
            {displayLabel}
          </Typography>
          <MotionTypography
            as='span'
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden
          >
            <IoIosArrowDown />
          </MotionTypography>
        </Button>

        <AnimatePresence>
          {open ? (
            <MotionBox
              id={`${id}-listbox`}
              role='listbox'
              aria-labelledby={id}
              className='dropdown__container--menu bg__main--light'
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            >
              <Box as='ul' className='dropdown__container--list'>
                {options.map(opt => (
                  <Box
                    as='li'
                    key={opt.value}
                    role='presentation'
                    onClick={() => {
                      selectOption(opt.value);
                    }}
                    className={
                      opt.value === value
                        ? "dropdown__container--listitem--active"
                        : "dropdown__container--listitem"
                    }
                  >
                    {opt.label}
                  </Box>
                ))}
              </Box>
            </MotionBox>
          ) : null}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Dropdown;
