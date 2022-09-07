import React, { useEffect, useState } from "react";
import { Button } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import { getPeers } from "../../rpc"
import "./inedx.scss"

export const Home = () => {
  const userStoreHox = userStore();
  const navigation: NavigateFunction = useNavigate()

  const [id, setId] = useState(0)

  const onNextPage = (): void => {
    navigation("/about")
  }

  const get_peers = async () => {

    chrome.notifications.create(null, {
      type: "basic",
      iconUrl: "icon16.bee5274e.png",
      title: "喝水小助手",
      message: "看到此消息的人可以和我一起来喝一杯水"
    })

    return

    const res = await getPeers();

    console.log(res);
    setId(res[0].node_id)
  }

  return (
    <div className='Home'>
      <span>create </span>
      <input type="text" />
      <Button type="primary" onClick={userStoreHox.setMyBalanceFun}>add</Button>
      <p>userStoreHox:{userStoreHox.myBalance}</p>
      <button onClick={onNextPage}>About</button>
      <button onClick={get_peers}>getRpc </button>
      <p>{id}</p>
    </div>
  )
}
