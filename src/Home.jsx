import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { routes } from "./routes";
const Home = () => {
  

  return (
    <div className="p-36 py-12">
      <h1 className="capitalize font-black text-6xl mb-6">
        My testing ground 
      </h1>
      <ul className="list-disc list-inside">
        {routes.map((e) => (
          <li className="flex space-x-2 items-center">
            <Icon icon={"icon-park:dot"} className="text-zinc-400" />
            <Link
              className="text-zinc-500 hover:text-blue-600 transition-all"
              to={e.path}
            >
              {e.name}
            </Link>
            <Icon icon={"tabler:link"} className="text-zinc-400" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
