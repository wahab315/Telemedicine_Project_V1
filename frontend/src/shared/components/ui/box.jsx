import { createElement, forwardRef } from "react";

export const Box = forwardRef(function Box(
  { as, className, children, ...rest },
  ref
) {
  const Tag = as ?? "div";
  return createElement(Tag, { ref, className, ...rest }, children);
});

export default Box;
