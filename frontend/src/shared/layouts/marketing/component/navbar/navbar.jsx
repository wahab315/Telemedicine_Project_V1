"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoClose, IoMenuOutline } from "react-icons/io5";

import Box from "@/ui/box";
import Button from "@/ui/button";
import Container from "@/ui/container";

import NavbarDropdown from "./navbar-dropdown";
import MobileNav from "./navbar-mobile";

const MOBILE_MENU_ID = "marketing-navbar-mobile-menu";

export default function Navbar({ brandHref, loginHref, navbarData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <Container>
        <Box as='nav' aria-label='Primary' className='navbar'>
          <Button href={brandHref} classStyle='navbar--brand'>
            <Image
              alt='NexaCore'
              src='/common/nav_logo.svg'
              height={54}
              width={204}
              className='navbar__brand--logo'
              priority
            />
          </Button>

          <Box className='navbar__links'>
            {navbarData.map(entry =>
              "data" in entry && entry.data ? (
                <NavbarDropdown
                  title={entry.title}
                  data={entry.data}
                  key={`marketing-navbar-dropdown--${entry.title}`}
                  className='navbar__links--dropdown'
                />
              ) : (
                <Button
                  href={entry.link}
                  key={entry.link}
                  classStyle='navlink--navbar'
                >
                  {entry.title}
                </Button>
              )
            )}
          </Box>

          <Button href={loginHref} classStyle='primary'>
            Get Early Access
          </Button>

          <Button
            type='button'
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            classStyle='navbar-menu--toggle'
          >
            {isMenuOpen ? (
              <IoClose aria-hidden />
            ) : (
              <IoMenuOutline aria-hidden />
            )}
          </Button>
        </Box>
      </Container>

      {isMenuOpen ? (
        <MobileNav
          brandHref={brandHref}
          menuId={MOBILE_MENU_ID}
          navbarData={navbarData}
          onLinkClick={toggleMenu}
        />
      ) : null}
    </>
  );
}
