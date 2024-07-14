import { useState, useMemo, useEffect, useRef } from "react";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./Home";
import { routes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          routes.map((route) => (
            <Route path={route.path} element={<route.Component/>} />
          ))
        }
        
        
      </Routes>
    </>
  );
}

export default App;
