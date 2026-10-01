import Link from "next/link";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {readonly import("@core/router/define-route").BreadcrumbItem[]} props.breadcrumbs
 */
export default function PortalPageHeader({ title, breadcrumbs }) {
  return (
    <Box as='header' className='dashboard-page-header'>
      <Typography as='h1' classStyle='tertiary--bold'>
        {title}
      </Typography>
      <Box aria-label='Breadcrumb' as='div'>
        <Box as='ol'>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Box as='li' key={`${crumb.label}-${String(index)}`}>
                {crumb.href !== undefined && !isLast ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <Typography
                    aria-current={isLast ? "page" : undefined}
                    as='span'
                  >
                    {crumb.label}
                  </Typography>
                )}
                {!isLast ? (
                  <Typography aria-hidden as='span'>
                    /
                  </Typography>
                ) : null}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
