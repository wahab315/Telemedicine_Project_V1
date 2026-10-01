import { createElement, forwardRef } from "react";

export const DescriptionList = forwardRef(function DescriptionList(
  { as, className, children, ...rest },
  ref
) {
  const tag = as ?? "dl";
  return createElement(tag, { ref, className, ...rest }, children);
});

export default DescriptionList;
