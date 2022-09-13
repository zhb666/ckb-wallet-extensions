import React, { useEffect, useState } from "react";
import { Button } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import { getPeers } from "../../rpc"
import "./inedx.scss"

import logo from "data-base64:~assets/img/logo.png"

export const Home = () => {
  const userStoreHox = userStore();
  const navigation: NavigateFunction = useNavigate()

  const [id, setId] = useState(0)

  const onNextPage = (): void => {
    navigation("/about")
  }

  return (
    <div className='Home'>
      <h3>欢迎来到ckb钱包</h3>
      <img src={logo} alt="" />
      <div className="createCkb">
        <div className='create'>
          创建钱包
        </div>
        <div className='import'>
          导入私钥或助记词
        </div>
      </div>
      <div>
        © Nervos
      </div>
    </div>
  )
}
