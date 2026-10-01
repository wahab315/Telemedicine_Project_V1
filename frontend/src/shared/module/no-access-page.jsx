import { MdLockOutline } from "react-icons/md";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

export default function NoAccess({
  title = "Access denied",
  description = "You do not have permission to view this page. If you think this is a mistake, contact your administrator."
}) {
  return (
    <Box
      as='div'
      aria-live='polite'
      className='no-access text__align--center'
      role='alert'
    >
      <MdLockOutline
        aria-hidden
        className='no-access__icon color__white--light'
      />
      <Typography
        as='h2'
        classStyle='tertiary--bold'
        className='color__primary'
      >
        {title}
      </Typography>
      <Typography as='p' classStyle='tertiary' className='color__white--light'>
        {description}
      </Typography>
    </Box>
  );
}
