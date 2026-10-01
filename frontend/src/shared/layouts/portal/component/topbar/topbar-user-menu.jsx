"use client";

import { clearClientAuthQueries } from "@core/domains/auth";
import { SessionContext } from "@core/providers/session-context";
import { clearAuthSession } from "@core/session/session-storage";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import { IoChevronDownOutline } from "react-icons/io5";

import { usePortalRoutePaths } from "@/layouts/portal/context/use-portal-route-paths";
import Avatar from "@/ui/avatar";
import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

function formatUserLabel(user) {
  return user.displayName ?? user.name ?? user.email;
}

function userInitials(user) {
  const label = user.displayName ?? user.name;
  if (label?.trim()) {
    const parts = label.trim().split(/\s+/);
    if (parts.length >= 2) {
      const a = parts[0]?.[0] ?? "";
      const b = parts[1]?.[0] ?? "";
      return `${a}${b}`.toUpperCase();
    }
    return (parts[0]?.slice(0, 2) ?? "??").toUpperCase();
  }
  const local = user.email.split("@")[0] ?? "?";
  return local.slice(0, 2).toUpperCase();
}

export default function TopbarUserMenu() {
  const session = useContext(SessionContext);
  const user = session?.user ?? null;
  const hydrated = session?.hydrated ?? true;
  const { login, settings } = usePortalRoutePaths();
  const queryClient = useQueryClient();
  const router = useRouter();
  const menuId = useId();
  const triggerId = `${menuId}-trigger`;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);

  const label = useMemo(() => {
    return user === null ? "" : formatUserLabel(user);
  }, [user]);
  const initials = useMemo(() => {
    return user === null ? "…" : userInitials(user);
  }, [user]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const closeAndFocusTrigger = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    function handlePointerDown(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndFocusTrigger();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeAndFocusTrigger]);

  function handleLogout() {
    close();
    clearClientAuthQueries(queryClient);
    clearAuthSession();
    router.push(login);
  }

  if (!hydrated) {
    return (
      <Box aria-hidden className='topbar__user topbar__user--skeleton'>
        <span className='topbar__user-label topbar__user-label--skeleton' />
        <span className='topbar__avatar topbar__avatar--skeleton' />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box className='topbar__user' ref={wrapperRef}>
      <Button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup='menu'
        aria-label='Open user menu'
        className='topbar__user-trigger bg__main--light color__white'
        id={triggerId}
        ref={triggerRef}
        type='button'
        onClick={() => {
          setOpen(value => !value);
        }}
      >
        <Typography as='span' className='topbar__user-label'>
          {label}
        </Typography>
        <Box as='div' aria-hidden className='topbar__avatar'>
          <Avatar
            avatarInitials={initials}
            avatarUrl={user.image?.trim() || undefined}
            height={32}
            name={label}
            type='profile'
            width={32}
          />
        </Box>
        <IoChevronDownOutline
          aria-hidden
          className={
            open
              ? "topbar__user-chevron topbar__user-chevron--open"
              : "topbar__user-chevron"
          }
        />
      </Button>

      {open ? (
        <Box
          aria-labelledby={triggerId}
          className="topbar__user-dropdown"
          id={menuId}
          role="menu"
        >
          <Link
            className="topbar__user-menu-item"
            href={settings}
            role="menuitem"
            onClick={close}
          >
            Settings
          </Link>
          <Button
            className="topbar__user-menu-item"
            classStyle="simple"
            type="button"
            role="menuitem"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
