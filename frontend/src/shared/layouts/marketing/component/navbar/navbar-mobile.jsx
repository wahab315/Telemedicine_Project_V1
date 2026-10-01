"use client";

import Box from "@/ui/box";
import Button from "@/ui/button";

import NavbarDropdown from "./navbar-dropdown";

export default function NavbarMobile({
  brandHref,
  menuId,
  navbarData,
  onLinkClick
}) {
  return (
    <div id={menuId} className="navbar__menu--mobile">
      <Box className="navbar__menu--list">
        {navbarData.map(entry =>
          "data" in entry && entry.data ? (
            <NavbarDropdown
              title={entry.title}
              data={entry.data}
              key={`marketing-navbar-dropdown--mobile--${entry.title}`}
              onLinkClick={onLinkClick}
              className="navbar__links--dropdown navbar__links--dropdown-mobile"
            />
          ) : (
            <Button
              href={entry.link}
              key={`marketing-navbar-link--mobile--${entry.link}`}
              onClick={onLinkClick}
              classStyle="navlink--navbar"
            >
              {entry.title}
            </Button>
          )
        )}

        <Box className="navbar__menu--cta">
          <Button href={brandHref} onClick={onLinkClick} classStyle="primary">
            Get Early Access
          </Button>
        </Box>
      </Box>
    </div>
  );
}
