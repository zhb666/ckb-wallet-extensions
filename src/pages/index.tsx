import { Route, Routes } from "react-router-dom"

import { About } from "./About"
import { Home } from "./Home"
import { Import } from "./Wallet/import"
import { Create } from "./Wallet/create"
import { Main } from "./Main"
import { Dao } from "./Dao"
import { Send } from "./Send"

export const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create" element={<Create />} />
    <Route path="/import" element={<Import />} />
    <Route path="/about" element={<About />} />
    <Route path="/main" element={<Main />} />
    <Route path="/send" element={<Send />} />
    <Route path="/dao" element={<Dao />} />
  </Routes>
)
