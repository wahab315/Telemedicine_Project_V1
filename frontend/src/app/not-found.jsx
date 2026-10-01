import Image from "next/image";
import Link from "next/link";

import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist."
};

export default function NotFound() {
  return (
    <Box as="main" className="not-found-page">
      <Box as="section" className="not-found-page__content">
        <Link href="/">
          <Image
            src="/common/nexa_core_logo_main.svg"
            alt="Telemedicine logo"
            width={80}
            height={80}
            priority
          />
        </Link>

        <Typography
          as="h1"
          className="font__georgia--regular"
          classStyle="medium"
        >
          Oops !
        </Typography>

        <Typography
          as="h2"
          className="text__case--uppercase"
          classStyle="small"
        >
          404 - Page Not Found
        </Typography>

        <Typography
          as="p"
          classStyle="secondry"
          className="color__white--light"
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>

        <Box as="div">
          <Button href="/" classStyle="primary">
            Go to Homepage
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
