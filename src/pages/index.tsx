import { Route, Routes } from "react-router-dom"

import { About } from "./About"
import { Home } from "./Home"

export const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
)
