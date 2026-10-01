"use client";

import { getApiBaseUrl } from "@core/config/env";
import Image from "next/image";
import { useState } from "react";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

function isAllowedNextImageSrc(src) {
  const trimmed = src.trim();
  if (!trimmed) {
    return false;
  }

  if (trimmed.startsWith("/")) {
    return true;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    const hosts = new Set();
    const apiBase = getApiBaseUrl();
    if (apiBase) {
      try {
        hosts.add(new URL(apiBase).hostname);
      } catch {
        // Ignore invalid API base URL.
      }
    }

    return hosts.has(url.hostname);
  } catch {
    return false;
  }
}

function initialsFromName(name) {
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase();
}

function variantFromName(name) {
  let n = 0;
  for (let i = 0; i < name.length; i += 1) {
    n += name.charCodeAt(i);
  }
  return n % 6;
}

const Avatar = ({
  avatarUrl,
  name,
  height,
  width,
  type,
  avatarVariant,
  avatarInitials
}) => {
  const [failedUrl, setFailedUrl] = useState(null);
  const variant =
    avatarVariant !== undefined
      ? Math.abs(Math.trunc(avatarVariant)) % 6
      : variantFromName(name);
  const initials = avatarInitials ?? initialsFromName(name);
  const resolvedUrl = avatarUrl?.trim();
  const showImage =
    Boolean(resolvedUrl) &&
    failedUrl !== resolvedUrl &&
    resolvedUrl !== undefined &&
    isAllowedNextImageSrc(resolvedUrl);

  return (
    <Box as='div' className={`avatar__${type}`}>
      {showImage && resolvedUrl ? (
        <Image
          width={width}
          height={height}
          src={resolvedUrl}
          alt={name}
          onError={() => {
            if (resolvedUrl) {
              setFailedUrl(resolvedUrl);
            }
          }}
        />
      ) : (
        <Box as='div' data-variant={variant}>
          <Typography as='p' aria-hidden>
            {initials}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Avatar;
