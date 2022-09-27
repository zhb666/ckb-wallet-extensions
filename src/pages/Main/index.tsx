import React, { useEffect, useState } from "react";
import { Button } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import "./inedx.scss"

import logo from "data-base64:~assets/img/logo.png"

export const Main = () => {
  const userStoreHox = userStore();
  const navigation: NavigateFunction = useNavigate()


  // isLogin
  useEffect(() => {

  }, [])

  return (
    <div className='Main'>
      <div className="header">地址</div>
      <div className='main_box'>余额</div>
      <div className='buttons'>
        <Button>发送</Button>
        <Button>Dao</Button>
      </div>
      <div className='transaction'>交易记录</div>
    </div>
  )
}
