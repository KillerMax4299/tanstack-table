import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { routes } from "./routes";
const Home = () => {
  const [dark, setDark] = useState(true);

  function changeTheme() {
    setDark(!dark);
  }
  useEffect(() => {
    dark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [dark]);

  // ri:moon-fill
  return (
    <div className="p-4 md:p-36 py-8 md:py-12 dark:bg-zinc-900 h-screen transition-colors">
      <div className="flex justify-between">
        <h1 className="capitalize font-black text-3xl xl:text-6xl mb-6 dark:text-white transition-colors">
          My testing ground
        </h1>
        <button className="text-2xl" onClick={changeTheme}>
          <>
            {dark ? (
              <motion.div
                key={"moon"}
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.15,
                  ease: cubicBezier(0.4, 0, 0.2, 1),
                }}
                exit={{ rotate: -90, scale: 0 }}
                className="absolute min-[600px]:right-12 right-6 md:right-32 flex items-center justify-center"
                // className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              >
                <Icon icon={"ph:moon-light"} className="text-zinc-200" />
              </motion.div>
            ) : (
              <motion.div
                key={"sun"}
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.15,
                  ease: cubicBezier(0.4, 0, 0.2, 1),
                }}
                exit={{ rotate: -90, scale: 0 }}
                className="absolute min-[600px]:right-12 right-6 md:right-32 flex items-center justify-center"
              >
                <Icon icon={"radix-icons:sun"} className="text-zinc-700" />
              </motion.div>
            )}
          {/* {dark ? (
            <Icon icon={"ph:moon-light"} className="text-zinc-200" />
          ) : (
            <Icon icon={"radix-icons:sun"} className="text-zinc-700" />
          )} */}
          </>
        </button>
      </div>
      <ul className="list-disc list-inside">
        {routes.map((e) => (
          <li className="flex space-x-2 items-center">
            <div
              className={classNames(
                "size-2 mx-1 rounded-full",
                dark ? "bg-white" : "bg-black"
              )}
            />
            <Link
              className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600 transition-all"
              to={e.path}
            >
              {e.name}
            </Link>

            <Icon
              icon={"tabler:link"}
              className="text-zinc-400 dark:text-zinc-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
