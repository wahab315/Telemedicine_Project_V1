import Link from "next/link";

function isLinkButton(props) {
  return typeof props.href === "string" && props.href.length > 0;
}

export default function Button(props) {
  if (isLinkButton(props)) {
    const {
      href,
      classStyle,
      className,
      children,
      prefetch,
      replace,
      scroll,
      onClick,
      role
    } = props;
    const resolvedClassName = [
      className,
      classStyle ? `btn__${classStyle}` : ""
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      <Link
        href={href}
        className={resolvedClassName.length > 0 ? resolvedClassName : undefined}
        prefetch={prefetch}
        replace={replace}
        role={role}
        scroll={scroll}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  const { classStyle, className, children, type = "button", ...rest } = props;
  const resolvedClassName = [className, classStyle ? `btn__${classStyle}` : ""]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <button
      type={type}
      className={resolvedClassName.length > 0 ? resolvedClassName : undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
