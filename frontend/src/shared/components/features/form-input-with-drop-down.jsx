"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FormInputWithDropDown = ({
  label,
  placeholder,
  data,
  name,
  error,
  value,
  defaultValue,
  onChange,
  onValueChange,
  duration,
  className = "",
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? ""
  );
  const [showDropDown, setShowDropDown] = useState(false);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const listboxId = useId();
  const inputValue = value ?? uncontrolledValue;

  const handleOptionKeyDown = (e, item) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleItemClick(item);
    }
  };

  const handleInputChange = e => {
    const currentValue = e.target.value;
    if (value === undefined) {
      setUncontrolledValue(currentValue);
    }

    setShowDropDown(true);
    onChange?.(currentValue);
    onValueChange?.(currentValue);
  };

  const handleArrowClick = e => {
    e.stopPropagation();
    setShowDropDown(prev => !prev);
  };

  const handleItemClick = item => {
    if (value === undefined) {
      setUncontrolledValue(item);
    }

    setShowDropDown(false);
    onChange?.(item);
    onValueChange?.(item);
  };

  const handleClickOutside = e => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div
      ref={containerRef}
      className={
        error
          ? "form__dropdown--wrapper-invalid"
          : "form__dropdown--wrapper-valid"
      }
    >
      <section className='form__dropdown--section'>
        <label
          htmlFor={name}
          className={
            inputValue !== ""
              ? "form__dropdown--label-active"
              : "form__dropdown--label-default"
          }
        >
          {label}
        </label>

        <div className='form__dropdown--control'>
          <input
            id={name}
            name={name}
            placeholder={placeholder}
            type='text'
            role='combobox'
            aria-expanded={showDropDown}
            aria-controls={listboxId}
            aria-autocomplete='list'
            className={`form__dropdown--input ${className} ${
              error
                ? "form__dropdown--input-invalid"
                : "form__dropdown--input-valid"
            }`}
            {...props}
            autoComplete='off'
            onChange={handleInputChange}
            value={inputValue}
          />
          <motion.div
            animate={showDropDown ? { rotate: -180 } : { rotate: 0 }}
            onClick={handleArrowClick}
            className='form__dropdown--toggle'
          >
            <IoIosArrowDown />
          </motion.div>
        </div>

        {error ? <p className='form__dropdown--error'>{error}</p> : null}
      </section>

      {showDropDown && (
        <motion.div
          initial={{ y: "-6rem", opacity: 1 }}
          animate={{ y: "0rem", opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={
            duration ? { duration: Number(duration) / 1000 } : undefined
          }
          ref={dropdownRef}
          className='form__dropdown--menu'
        >
          {filteredData.length > 0 ? (
            <ul id={listboxId} role='listbox'>
              {filteredData.map(item => (
                <li
                  key={item}
                  role='option'
                  tabIndex={0}
                  aria-selected={inputValue === item}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  onKeyDown={e => {
                    handleOptionKeyDown(e, item);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <center>
              <span className='form__dropdown--empty'>No match found</span>
            </center>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FormInputWithDropDown;
