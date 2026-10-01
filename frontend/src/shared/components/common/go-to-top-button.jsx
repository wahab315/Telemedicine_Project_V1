"use client";

import { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";

import Button from "@/ui/button";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const GotoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type='button'
      classStyle='goto-top'
      onClick={scrollToTop}
      aria-label='Scroll to top'
    >
      <GoArrowUp />
    </Button>
  );
};

export default GotoTopButton;
