"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import Box from "@/ui/box";
import Typography from "@/ui/typography";

const SearchBar = ({
  value,
  label,
  labelClassName,
  placeholder,
  ...inputProps
}) => {
  return (
    <Box as='div' className='search-bar'>
      {label ? (
        <Typography
          as='p'
          classStyle='tertiary--bold'
          className={`color__white--light ${labelClassName ?? ""}`.trim()}
        >
          {label}
        </Typography>
      ) : null}
      <Box className='search-bar__input bg__main--light'>
        <Typography as='span' aria-hidden className='color__white--light'>
          <HiOutlineMagnifyingGlass />
        </Typography>
        <input
          type='text'
          value={value}
          placeholder={placeholder}
          className='color__white'
          {...inputProps}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
