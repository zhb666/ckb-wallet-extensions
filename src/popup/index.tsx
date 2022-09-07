import { MemoryRouter } from "react-router-dom"
import { Routing } from "../pages"

import 'antd/dist/antd.css';
import "./inedx.scss"

function IndexPopup() {
  return (
    <div className="App">
      app
      <MemoryRouter>
        <Routing />
      </MemoryRouter>
    </div>
  )
}

export default IndexPopup
