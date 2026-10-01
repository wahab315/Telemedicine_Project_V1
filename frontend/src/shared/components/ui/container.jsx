import Box from "@/ui/box";

const container = ({ children }) => {
  return (
    <Box as='div' className='container'>
      {children}
    </Box>
  );
};

export default container;
