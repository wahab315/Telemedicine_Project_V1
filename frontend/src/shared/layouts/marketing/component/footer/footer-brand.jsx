import Image from "next/image";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

export default function FooterBrand() {
  return (
    <Box className='footer__brand'>
      <Box className='footer__brand--logo-wrap'>
        <Image
          alt='NexaCore'
          src='/common/nav_logo.svg'
          height={80}
          width={302}
          className='footer__brand--logo'
        />
      </Box>
      <p className={"footer__brand--tagline" /* color__white--light */}>
        <Typography as='span' classStyle='primary'>
          Enterprise GPU infrastructure for organisations that demand dedicated
          capacity, predictable pricing, and reliable support.
        </Typography>
      </p>
    </Box>
  );
}
