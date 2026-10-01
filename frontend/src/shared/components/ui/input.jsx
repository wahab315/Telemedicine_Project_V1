"use client";

import { forwardRef } from "react";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

const Input = forwardRef(function Input(
  {
    label,
    name,
    placeholder,
    error,
    invalid = false,
    id: idProp,
    ...inputProps
  },
  ref
) {
  const id = idProp ?? name;
  const showInvalid = Boolean(error) || invalid;

  return (
    <Box as='div' className='input'>
      <Typography as='label' htmlFor={id}>
        {label}
      </Typography>
      <input
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        className={showInvalid ? "input__invalid" : ""}
        aria-invalid={showInvalid ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error ? (
        <Typography
          as='p'
          classStyle='tertiary'
          id={`${id}-error`}
          className='color__red'
          role='alert'
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  );
});

export default Input;
