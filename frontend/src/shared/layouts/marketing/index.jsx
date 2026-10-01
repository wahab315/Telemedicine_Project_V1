import GotoTopButton from "@/common/go-to-top-button";
import Box from "@/ui/box";

import Footer from "./component/footer/footer";
import Navbar from "./component/navbar/navbar";

const MarketingLayout = ({
  brandHref,
  children,
  footerNavSections = [],
  loginHref,
  navbarData = []
}) => {
  return (
    <Box as='main' className='business-layout'>
      <Navbar
        brandHref={brandHref}
        loginHref={loginHref}
        navbarData={navbarData}
      />
      {children}
      <Footer footerNavSections={footerNavSections} />
      <GotoTopButton />
    </Box>
  );
};

export default MarketingLayout;
