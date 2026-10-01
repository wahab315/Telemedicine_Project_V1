import Box from "@/ui/box";
import Container from "@/ui/container";

import FooterBrand from "./footer-brand";
import FooterCopyright from "./footer-copyright";
import FooterNavColumn from "./footer-nav-column";

export default function Footer({ footerNavSections }) {
  return (
    <Box as='footer' className='footer bg__secondry'>
      <Container>
        <Box as='section' className='footer__top'>
          <FooterBrand />
          <Box className='footer__columns'>
            {footerNavSections.map(section => (
              <FooterNavColumn key={section.title} section={section} />
            ))}
          </Box>
        </Box>
        <Box aria-hidden='true' className='footer__rule' />
        <FooterCopyright />
      </Container>
    </Box>
  );
}
