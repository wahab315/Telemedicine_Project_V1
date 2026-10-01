"use client";

import { forwardRef, useId } from "react";

import Box from "@/ui/box";
import Checkbox from "@/ui/checkbox";
import Typography from "@/ui/typography";

const Switch = forwardRef(function Switch(
  { id: idProp, onChange, onCheckedChange, ...rest },
  ref
) {
  const uid = useId();
  const id = idProp ?? `switch${uid.replace(/:/g, "")}`;

  return (
    <Box as='label' className='switch' htmlFor={id}>
      <Checkbox
        ref={ref}
        id={id}
        {...rest}
        onChange={e => {
          onChange?.(e);
          onCheckedChange?.(e.currentTarget.checked);
        }}
      />
      <Typography as='span' className='slider round' />
    </Box>
  );
});

export default Switch;
