import { MemoryRouter } from "react-router-dom"
import { Routing } from "../pages"

import 'antd/dist/antd.css';
import "./index.scss"

function IndexPopup() {
  return (
    <div className="App">
      <MemoryRouter>
        <Routing />
      </MemoryRouter>
    </div>
  )
}

export default IndexPopup
