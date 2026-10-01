import { createElement, forwardRef } from "react";

function isHeadingTag(tag) {
  return (
    tag === "h1" ||
    tag === "h2" ||
    tag === "h3" ||
    tag === "h4" ||
    tag === "h5" ||
    tag === "h6"
  );
}

const Typography = forwardRef(function Typography(
  { as, className, classStyle, children, ...rest },
  ref
) {
  const effectiveAs = as ?? "p";
  const prefix = isHeadingTag(effectiveAs) ? "heading" : "text";
  const styleClass = classStyle ? `${prefix}__${classStyle}` : undefined;
  const resolvedClassName = [className, styleClass].filter(Boolean).join(" ");
  return createElement(
    effectiveAs,
    {
      ref,
      className: resolvedClassName.length > 0 ? resolvedClassName : undefined,
      ...rest
    },
    children
  );
});

export default Typography;
