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
      <h3>Main页面</h3>

    </div>
  )
}
