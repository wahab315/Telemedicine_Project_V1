import { createElement, forwardRef } from "react";

export const Table = forwardRef(function Table(
  { as, className, children, ...rest },
  ref
) {
  const tag = as ?? "table";
  return createElement(tag, { ref, className, ...rest }, children);
});

export default Table;
