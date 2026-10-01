import { forwardRef } from "react";

const Checkbox = forwardRef(function Checkbox(props, ref) {
  return <input ref={ref} type='checkbox' {...props} className='checkbox' />;
});

export default Checkbox;
