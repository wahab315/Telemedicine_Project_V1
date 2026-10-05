import Box from "@/ui/box";
import Typography from "@/ui/typography";

export default function FooterCopyright() {
  return (
    <Box className='footer__bottom'>
      <p
        className={
          "footer__bottom--copyright text__align--center" /* color__gray */
        }
      >
        <Typography as='span' classStyle='main'>
          © 2026 NexaCore. All rights reserved.
        </Typography>
      </p>
    </Box>
  );
}
