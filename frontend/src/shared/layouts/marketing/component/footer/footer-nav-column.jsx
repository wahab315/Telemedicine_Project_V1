import Box from "@/ui/box";
import Button from "@/ui/button";
import Typography from "@/ui/typography";

export default function FooterNavColumn({ section }) {
  return (
    <Box as='nav' aria-label={section.title} className='footer__column'>
      <p
        className={
          "footer__column--heading text__case--uppercase" /* color__white */
        }
      >
        <Typography as='span' classStyle='main--bold'>
          {section.title}
        </Typography>
      </p>
      <Box as='div' role='list' className='footer__column--links'>
        {section.links.map(link => (
          <Box
            as='div'
            role='listitem'
            key={link.href}
            className='footer__column--item'
          >
            <Button href={link.href} classStyle='simple--footer-link'>
              {link.label}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
