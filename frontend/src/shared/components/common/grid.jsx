import Box from "@/ui/box";

const GRID_BLOCK = "grid";

const Grid = ({ version, className, children }) => {
  const modifier = version && `${GRID_BLOCK}__version--${version}`;
  const classNames = [GRID_BLOCK, modifier, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Box as='div' className={classNames}>
      {children}
    </Box>
  );
};

export default Grid;
