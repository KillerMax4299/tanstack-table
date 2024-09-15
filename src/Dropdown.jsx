import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import classNames from "classnames";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";

export const Dropdown = ({ placeholder, children, onChange, value }) => {
  const dropdownHeight = children.length * 32 + 10;

  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const { height } = useViewportSize();
  const [innerValue, setInnerValue] = useState();

  function onClick() {
    setOpen(!open);
  }

  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (buttonRect.bottom + dropdownHeight > viewportHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [height, open]);

  return (
    <div className="py-4">
      <span className="text-white"></span>
      <div className="dark:text-white relative">
        <button
          value={innerValue}
          ref={buttonRef}
          role="select"
          onClick={onClick}
          className="flex items-center w-48 justify-between border dark:font-light border-zinc-300 shadow-sm dark:border-zinc-700 px-3 py-2 text-sm rounded-md"
        >
          <span>{placeholder}</span>
          <Icon
            icon={"radix-icons:caret-sort"}
            className="text-zinc-700 dark:text-zinc-500"
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: dropdownPosition === "bottom" ? -10 : 10,
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: cubicBezier(0.4, 0, 0.2, 1), duration: 0.2 }}
              className={classNames(
                "absolute z-[70] select-none left-0",
                dropdownPosition === "bottom"
                  ? "top-full pt-1"
                  : "bottom-full pb-1"
              )}
              ref={dropdownRef}
            >
              <motion.div
                initial={{
                  height: dropdownHeight * 0.75,
                }}
                animate={{ height: dropdownHeight }}
                exit={{ height: dropdownHeight }}
                transition={{
                  ease: cubicBezier(0.4, 0, 0.2, 1),
                  duration: 0.1,
                }}
                className="dark:font-light text-sm border border-zinc-300 min-w-48 dark:border-zinc-700 p-1 rounded-md shadow bg-white dark:bg-zinc-900"
              >
                <ol>{children}</ol>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {open && (
        <div
          onClick={onClick}
          className="w-screen h-screen absolute top-0 left-0 z-20"
        />
      )}
    </div>
  );
};


export function SelectItem({ value, children }) {
  return (
    <>
      <li
        value={value}
        className="text-sm pl-4 py-[6px] hover:bg-zinc-400/10 hover:dark:bg-zinc-400/10 rounded-md"
        >
        {children}
      </li>
    </>
  );
}
function useViewportSize() {
  // Define the state to hold the window size
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handler to update the size state when the window is resized
  const handleResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return size;
}
