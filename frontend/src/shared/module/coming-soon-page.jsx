import Image from "next/image";

import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

export default function ComingSoonPage({ title = "Coming Soon" }) {
  return (
    <Box as='main'>
      <Box>
        <Button href='/'>
          <Image
            src='/common/nexa_core_logo_main.svg'
            alt='Telemedicine logo'
            width={80}
            height={80}
            priority
          />
        </Button>

        <Typography as='h2'>{title}</Typography>

        <Typography as='p'>
          We&apos;re currently working on creating something fantastic.
        </Typography>

        <Button href='/'>Go to Homepage</Button>
      </Box>
    </Box>
  );
}
