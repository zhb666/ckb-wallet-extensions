import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, MenuProps, Space, Select } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import "./inedx.scss"
import type { ScriptList, WalletListObject } from '~type';
import { cutValue } from '~utils';
import { getScripts, getTipHeader, setScripts } from '~rpc';

const { Option } = Select;


export const Main = () => {
  const userStoreHox = userStore();
  const { walletList } = userStoreHox
  const navigation: NavigateFunction = useNavigate()

  const [script, setScript] = useState<WalletListObject>();
  const [wallet, setWallet] = useState<any>();


  const handleChange = (value: string) => {
    setWallet(value)
  };

  const changeWallet = async () => {
    if (!walletList) return
    // Determine the currently selected wallet
    let res: WalletListObject[] = walletList.filter(item =>
      item.privateKeyAgs.address == wallet
    )
    userStoreHox.userScript(res[0])
    setScript(res[0])
    // First get the previous synchronization height, if it does not start from zero, take it out and pass the value
    // const getScript = await getScripts();
    // const getScriptRes = getScript.filter((item: { script: { args: any; }; }) =>
    //   item.script.args == wallet
    // )

    // call setScript
    // if (getScriptRes.length !== 0) {
    // No need to set height
    // await setScripts(res[0].privateKeyAgs.lockScript, getScriptRes[0].block_number || 0)
    // }
    // else {
    // setScriptFun(getScript, res[0])
    // }
  }

  // const setScriptFun = async (scriptList: ScriptList[], res: WalletListObject) => {
  //   if (res.type === "create") {
  //     // create
  //     const tipHeaderRes = await getTipHeader()
  //     await setScripts([...scriptList, { script: res.privateKeyAgs.lockScript, block_number: tipHeaderRes.number }])
  //   } else {
  //     // import
  //     await setScripts([...scriptList, { script: res.privateKeyAgs.lockScript, block_number: "0x0" }])
  //   }
  // }


  // isLogin
  useEffect(() => {
    chrome.storage.sync.get("myScript", function (data) {
      // myWallet
      let myScript = data.myScript || {}
      if (walletList.length === 0) {
        myScript = {}
      } else {
        if (!myScript) {
          myScript = walletList[0]
        }
      }
      setScript(myScript)
    })

  }, [walletList])

  // Public method of wallet change
  useEffect(() => {
    if (!wallet) return
    changeWallet()
  }, [wallet])

  return (
    <div className='Main'>
      {/* <div className='goBack'>
        <Button onClick={() => {
          navigation("/")
        }}>返回</Button>
      </div> */}
      <div className="header">
        <Select className='addressDropdown' value={script && cutValue(script.privateKeyAgs.address, 8, 8)} key={script && script.privateKeyAgs.address} onChange={handleChange}>
          {
            walletList.length !== 0 ? walletList.map((item, index) => {
              return (
                <Option key={index} value={item.privateKeyAgs.address}>{cutValue(item.privateKeyAgs.address, 8, 8)}</Option>
              )
            }) : null
          }
        </Select>
      </div>
      <div className='main_box'>
        <div className='main_info'>
          <h5>余额</h5>
          <p>可用 : 1000000 CKB</p>
          <p>质押 : 88800 CKB</p>
          <p>总额 : 10000000 CKB</p>
        </div>

      </div>
      <div className='buttons'>
        <Button className='send' type="primary">发送</Button>
        <Button className='dao'>质押</Button>
      </div>
      <div className='transaction'>
        <h5>交易记录</h5>
      </div>
    </div>
  )
}
