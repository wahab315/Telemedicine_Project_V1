"use client";

import { IoMenuOutline } from "react-icons/io5";

import { usePortalSidebar } from "@/layouts/portal/context/use-portal-sidebar";
import Box from "@/ui/box";
import Button from "@/ui/button";

import TopbarUserMenu from "./topbar-user-menu";

export default function Topbar() {
  const { isMobile, mobileNavOpen, toggleMobileNav } = usePortalSidebar();

  return (
    <Box as='header' className='topbar bg__secondry'>
      <Box className='topbar__main'>
        <Button
          aria-controls='dashboard-sidebar'
          aria-expanded={isMobile && mobileNavOpen}
          aria-haspopup='true'
          aria-label='Open navigation menu'
          className='topbar__menu-toggle'
          type='button'
          onClick={toggleMobileNav}
        >
          <IoMenuOutline aria-hidden className='topbar__menu-toggle-icon' />
        </Button>
      </Box>
      <Box className='topbar__actions'>
        <TopbarUserMenu />
      </Box>
    </Box>
  );
}
