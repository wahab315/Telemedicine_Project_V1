"use client";

import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

export default function NavbarDropdown({
  title,
  data,
  onLinkClick,
  className
}) {
  const [active, setActive] = useState(false);

  return (
    <Box
      className={className}
      onClick={() => {
        setActive(prev => !prev);
      }}
    >
      <Box as="section" className="navbar-dropdown__trigger">
        <span
          className={"navbar-dropdown__trigger--title" /* color__white */}
        >
          <Typography as="span" classStyle="primary">
            {title}
          </Typography>
        </span>
        <div
          className={
            active
              ? "navbar-dropdown__trigger--icon navbar-dropdown__trigger--icon-open"
              : "navbar-dropdown__trigger--icon"
          }
        >
          <IoIosArrowDown aria-hidden />
        </div>
      </Box>
      {active ? (
        <div className="navbar-dropdown__panel bg__main--light">
          {data.map(item => (
            <Link
              key={item.link}
              href={item.link}
              className="navbar-dropdown__panel--link"
              onClick={() => {
                setActive(false);
                onLinkClick?.();
              }}
            >
              <Box className="navbar-dropdown__panel--content">
                <h6
                  className={
                    "navbar-dropdown__panel--heading" /* color__white */
                  }
                >
                  <Typography as="span" classStyle="primary">
                    {item.title}
                  </Typography>
                </h6>
                {"gpsValues" in item && item.gpsValues ? (
                  <p
                    className={
                      "navbar-dropdown__panel--meta" /* color__white--light */
                    }
                  >
                    <Typography as="span" classStyle="tertiary">
                      {item.gpsValues}
                    </Typography>
                  </p>
                ) : null}
                {"price" in item && item.price ? (
                  <p
                    className={
                      "navbar-dropdown__panel--meta" /* color__white--light */
                    }
                  >
                    <Typography as="span" classStyle="tertiary">
                      {item.price}
                    </Typography>
                  </p>
                ) : null}
              </Box>
            </Link>
          ))}
        </div>
      ) : null}
    </Box>
  );
}
