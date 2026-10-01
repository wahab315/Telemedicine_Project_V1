import { BsDatabaseFillX } from "react-icons/bs";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

export default function NoDataFound() {
  return (
    <Box as='div' className='no-match-found text__align--center'>
      <BsDatabaseFillX className='no-match-found__icon color__white--light' />
      <Typography as='h2' classStyle='tertiary' className='color__white--light'>
        No data found
      </Typography>
      <Typography as='p' classStyle='tertiary' className='color__white--light'>
        There is no data available for this page.
      </Typography>
    </Box>
  );
}
