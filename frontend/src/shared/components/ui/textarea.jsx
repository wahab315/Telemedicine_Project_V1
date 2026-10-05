"use client";

import { forwardRef } from "react";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

const Textarea = forwardRef(function Textarea(
  { label, name, placeholder, error, rows = 5, id: idProp, ...textareaProps },
  ref
) {
  const id = idProp ?? name;

  return (
    <Box as='div' className='form__textarea'>
      <Typography as='label' htmlFor={id}>
        {label}
      </Typography>
      <textarea
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete='off'
        {...textareaProps}
      />
      {error ? (
        <Typography
          as='p'
          classStyle='tertiary'
          id={`${id}-error`}
          className={/* "color__red" */ undefined}
          role='alert'
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  );
});

export default Textarea;
