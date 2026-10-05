"use client";

import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

export function RouteErrorFallback({ reset }) {
  return (
    <Box as='main' className='not-found-page'>
      <Box as='section' className='not-found-page__content'>
        <Typography
          as='h1'
          className='font__georgia--regular'
          classStyle='medium'
        >
          Something went wrong
        </Typography>

        <Typography
          as='p'
          classStyle='secondry'
          className={/* "color__white--light" */ undefined}
        >
          An unexpected error occurred. Our team has been notified. Please try
          again.
        </Typography>

        <Box as='div'>
          <Button type='button' classStyle='primary' onClick={reset}>
            Try again
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
