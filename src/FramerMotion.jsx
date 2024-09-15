import { useState, useEffect } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import classNames from "classnames";

const FramerMotion = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="flex flex-col h-screen items-center p-4 bg-indigo-100">
        <button
          className="border p-1 px-3 rounded-lg absolute z-50 mx-auto bg-blue-500 text-white"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? "on" : "off"}
        </button>
        <AnimatePresence>
          {visible && (
            <motion.div
              className={classNames(
                "absolute mt-10 w-full bg-white border-zinc-300 border shadow-md rounded-md flex justify-center items-center text-4xl text-black font-bold"
              )}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              dragConstraints={{ top: 0, bottom: 100 }}
              drag="y"
              dragSnapToOrigin={true}
              dragElastic={{ top: 0, bottom: 0 }}
              // dragTransition={{ duration:1000 }}

              transition={{ ease: cubicBezier(0.4, 0, 0.2, 1), duration: 0.2 }}
            >
              ljandsjlfnklan
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FramerMotion;
