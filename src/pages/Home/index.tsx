import React, { useEffect, useState } from "react";
import { Button } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import { getPeers } from "../../rpc"
import "./index.scss"

import logo from "data-base64:~assets/img/logo.png"

export const Home = () => {
  const userStoreHox = userStore();
  const navigation: NavigateFunction = useNavigate()

  const [isLogin, setIsLogin] = useState(false)


  // isLogin
  useEffect(() => {
    chrome.storage.sync.get("walletList", function (data) {
      const storageWalletList = data.walletList || [];
      if (storageWalletList.length) {
        setIsLogin(true)
        navigation("/main")
      } else {
        setIsLogin(false)
      }
    })
  }, [])


  return (
    <div className='Home'>
      <h3>欢迎来到ckb钱包</h3>
      <img src={logo} alt="" />
      <div className="createCkb">
        <div className='create' onClick={() => {
          navigation("/create")
        }}>
          新建钱包
        </div>
        <div className='home_import' onClick={() => {
          navigation("/import")
        }}>
          导入助记词
        </div>
      </div>
      <div>
        © Nervos
      </div>
    </div>
  )
}
