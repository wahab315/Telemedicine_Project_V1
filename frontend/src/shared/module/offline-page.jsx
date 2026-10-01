"use client";

import {
  recheckOnlineStatus,
  useOnlineStatus
} from "@core/hooks/use-online-status";

import OfflineIcon from "@/assets/shared/offline-icon";
import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

export default function OfflineScreen() {
  const { isOnline } = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <Box as='main' aria-live='polite' className='offline-screen' role='alert'>
      <Box as='div'>
        <OfflineIcon className='offline-screen__icon offline-icon' />
        <Box as='section' className='offline-screen__content'>
          <Typography
            as='h2'
            classStyle='tertiary--bold'
            className='color__primary'
          >
            You&apos;re offline
          </Typography>

          <Typography
            as='p'
            classStyle='secondary--bold'
            className='color__white--light'
          >
            Check your internet connection. We&apos;ll reconnect automatically
            when you&apos;re back online.
          </Typography>

          <Button
            type='button'
            classStyle='primary'
            onClick={recheckOnlineStatus}
          >
            Try again
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
