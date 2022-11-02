import { MemoryRouter } from "react-router-dom"
import { Routing } from "../pages"
// import Progress from '~pages/components/Progress';

import 'antd/dist/antd.css';
import "./index.scss"

function IndexPopup() {
  return (
    <div className="App">
      <MemoryRouter>
        <Routing />
      </MemoryRouter>
      {/* <div className='progress'>
        <Progress />
      </div> */}
    </div>
  )
}

export default IndexPopup
