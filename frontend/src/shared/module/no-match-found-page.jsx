import { MdFilterAltOff } from "react-icons/md";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

export default function NoMatchFound() {
  return (
    <Box as='div' className='no-match-found text__align--center'>
      <MdFilterAltOff
        className={"no-match-found__icon" /* color__white--light */}
      />
      <Typography
        as='h2'
        classStyle='tertiary'
        className={/* "color__white--light" */ undefined}
      >
        No match found
      </Typography>
      <Typography
        as='p'
        classStyle='tertiary'
        className={/* "color__white--light" */ undefined}
      >
        No result found. Please try again with different keywords.
      </Typography>
    </Box>
  );
}
