"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoChevronBackOutline, IoCloseOutline } from "react-icons/io5";

import { usePortalRoutePaths } from "@/layouts/portal/context/use-portal-route-paths";
import { usePortalSidebar } from "@/layouts/portal/context/use-portal-sidebar";
import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

const SIDEBAR_EXPANDED_PX = 277;
const SIDEBAR_COLLAPSED_PX = 72;

function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function isLinkActive(pathname, href, portalRoot) {
  if (!href || href === "#") {
    return false;
  }
  const path = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === portalRoot) {
    return path === portalRoot;
  }
  return path === target || path.startsWith(`${target}/`);
}

/**
 * @param {Object} props
 * @param {import("@/layouts/portal/types/sidebar-nav").SidebarNavSection[]} props.navSections
 */
export default function Sidebar({ navSections = [] }) {
  const { portalRoot } = usePortalRoutePaths();
  const pathname = usePathname();
  const {
    isMobile,
    sidebarCollapsed,
    toggleSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen
  } = usePortalSidebar();

  const visibleSections = navSections.filter(
    section => section.items.length > 0
  );

  const hideLabels = !isMobile && sidebarCollapsed;
  const mobileDrawerOpen = isMobile && mobileNavOpen;

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  useEffect(() => {
    if (!mobileDrawerOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileDrawerOpen]);

  useEffect(() => {
    if (!mobileDrawerOpen) {
      return;
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileDrawerOpen, setMobileNavOpen]);

  const sidebarNav = (
    <Box
      aria-label='Portal navigation'
      as='aside'
      className='sidebar__nav'
      id='dashboard-sidebar-nav'
    >
      {visibleSections.map(section => (
        <Box className='sidebar__section' key={section.sectionTitle}>
          <Box
            aria-level={2}
            as='div'
            className={
              hideLabels
                ? "sidebar__section-title sidebar__section-title--hidden"
                : "sidebar__section-title"
            }
            role='heading'
          >
            {section.sectionTitle}
          </Box>
          <Box as='ul' className='sidebar__list'>
            {section.items.map(item => {
              const Icon = item.icon;
              const active = isLinkActive(pathname, item.href, portalRoot);
              return (
                <Box as='li' className='sidebar__item' key={item.href}>
                  <Link
                    aria-label={hideLabels ? item.label : undefined}
                    className={
                      active
                        ? "sidebar__link sidebar__link--active"
                        : "sidebar__link"
                    }
                    href={item.href}
                    title={hideLabels ? item.label : undefined}
                    onClick={() => {
                      if (isMobile) {
                        setMobileNavOpen(false);
                      }
                    }}
                  >
                    <Icon aria-hidden className='sidebar__link-icon' />
                    <Typography
                      as='span'
                      aria-hidden={hideLabels}
                      className={
                        hideLabels
                          ? "sidebar__link-label sidebar__link-label--hidden"
                          : "sidebar__link-label"
                      }
                    >
                      {item.label}
                    </Typography>
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );

  if (isMobile) {
    return (
      <Box className='sidebar__mobile-mount'>
        {mobileDrawerOpen ? (
          <div
            aria-hidden
            className="sidebar__backdrop"
            role="presentation"
            onClick={() => {
              setMobileNavOpen(false);
            }}
          />
        ) : null}

        <aside
          aria-label="Portal sidebar"
          className={
            mobileDrawerOpen
              ? "sidebar sidebar--drawer sidebar--drawer-open bg__secondry"
              : "sidebar sidebar--drawer bg__secondry"
          }
          id="dashboard-sidebar"
          style={{ pointerEvents: mobileDrawerOpen ? "auto" : "none" }}
        >
          <Box className='sidebar__brand sidebar__brand--mobile'>
            <Link
              className='sidebar__brand-link'
              href={portalRoot}
              onClick={() => {
                setMobileNavOpen(false);
              }}
            >
              <Image
                alt='NexaCore'
                className='sidebar__brand-logo'
                height={54}
                priority
                src='/common/nav_logo.svg'
                width={204}
              />
            </Link>
            <Button
              aria-label='Close navigation menu'
              className='sidebar__close-btn'
              type='button'
              onClick={() => {
                setMobileNavOpen(false);
              }}
            >
              <IoCloseOutline aria-hidden className='sidebar__close-icon' />
            </Button>
          </Box>
          {sidebarNav}
        </aside>
      </Box>
    );
  }

  return (
    <aside
      aria-label="Portal sidebar"
      className={
        sidebarCollapsed
          ? "sidebar sidebar--collapsed bg__secondry"
          : "sidebar bg__secondry"
      }
      id="dashboard-sidebar"
      style={{
        width: sidebarCollapsed ? SIDEBAR_COLLAPSED_PX : SIDEBAR_EXPANDED_PX
      }}
    >
      <Box className='sidebar__brand'>
        <Link
          className={
            sidebarCollapsed
              ? "sidebar__brand-link sidebar__brand-link--collapsed"
              : "sidebar__brand-link"
          }
          href={portalRoot}
        >
          {sidebarCollapsed ? (
            <Image
              alt='NexaCore'
              className='sidebar__brand-favicon'
              height={32}
              src='/common/favicon.svg'
              width={32}
            />
          ) : (
            <Image
              alt='NexaCore'
              className='sidebar__brand-logo'
              height={54}
              priority
              src='/common/nav_logo.svg'
              width={204}
            />
          )}
        </Link>
        <Button
          aria-expanded={!sidebarCollapsed}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className='sidebar__collapse-btn'
          type='button'
          onClick={toggleSidebarCollapsed}
        >
          <IoChevronBackOutline
            aria-hidden
            className={
              sidebarCollapsed
                ? "sidebar__collapse-icon sidebar__collapse-icon--collapsed"
                : "sidebar__collapse-icon"
            }
          />
        </Button>
      </Box>
      {sidebarNav}
    </aside>
  );
}
