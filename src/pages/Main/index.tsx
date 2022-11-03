import React, { useEffect, useState } from "react";
import { Button, notification, Select } from "antd"
import {
  CopyFilled
} from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import type { ScriptList, WalletListObject } from '~type';
import { cutValue, formatDate } from '~utils';
import { getCells, getScripts, getTipHeader, getTransaction, setScripts } from '~rpc';
import { capacityOf, generateAccountFromPrivateKey } from '~wallet';
import type { Script } from '@ckb-lumos/lumos';
import { getUnlockableAmountsFromCells } from '~wallet';

import "./index.scss"
import Progress from '~pages/components/Progress';

const { Option } = Select;


export const Main = () => {
  const userStoreHox = userStore();
  const { walletList, daoData } = userStoreHox
  const navigation: NavigateFunction = useNavigate()

  const [script, setScript] = useState<WalletListObject>();
  const [wallet, setWallet] = useState<any>();
  const [fromAddr, setFromAddr] = useState("");
  const [fromLock, setFromLock] = useState<Script>();
  const [balance, setBalance] = useState("0");


  const handleChange = (value: string) => {
    setWallet(value)
  };

  const changeWallet = async () => {
    if (!walletList) return
    // Determine the currently selected wallet
    console.log(wallet, "wallet");

    let res: WalletListObject[] = walletList.filter(item =>
      item.privateKeyAgs.address == wallet
    )
    userStoreHox.userScript(res[0])
    setScript(res[0])
    // First get the previous synchronization height, if it does not start from zero, take it out and pass the value
    const getScript = await getScripts();
    const getScriptRes = getScript.filter((item: { script: { args: any; }; }) =>
      item.script.args == wallet
    )

    // call setScript
    if (getScriptRes.length !== 0) {
      // No need to set height
      // await setScripts(res[0].privateKeyAgs.lockScript, getScriptRes[0].block_number || 0)
    }
    else {
      setScriptFun(getScript, res[0])
    }
  }

  const setScriptFun = async (scriptList: ScriptList[], res: WalletListObject) => {

    if (res.type === "create") {
      // create
      const tipHeaderRes = await getTipHeader()
      await setScripts([...scriptList, { script: res.privateKeyAgs.lockScript, block_number: tipHeaderRes.number }])
    } else {
      // import
      await setScripts([...scriptList, { script: res.privateKeyAgs.lockScript, block_number: "0x0" }])
    }
  }

  const updateFromInfo = async () => {
    const { lockScript, address } = generateAccountFromPrivateKey(script.privateKey);
    const capacity = await capacityOf(lockScript);

    setFromAddr(address);
    setFromLock(lockScript);
    setBalance(capacity.toString());

  };


  // get Dao
  const getDaoData = async () => {

    const cells = await getCells(userStoreHox.script.privateKeyAgs.lockScript)
    const res = await getUnlockableAmountsFromCells(cells.objects)
    let DaoBalance = 0
    let Income = 0

    for (let i = 0; i < res.length; i++) {
      const transaction = await getTransaction(res[i].txHash);
      res[i].state = "success"
      res[i].timestamp = formatDate(parseInt(transaction.header.timestamp))
      DaoBalance += Number(res[i].amount)
      Income += Number(res[i].compensation)
    }
    userStoreHox.setDaoDataFun({
      luck: DaoBalance,
      Income
    })

    // setTableData(res.reverse());
  };

  const copyFun = () => {
    copy(fromAddr);
    notification["success"]({
      message: 'Copy success',
    });
  }


  useEffect(() => {
    if (script && script.privateKeyAgs) {
      getDaoData()
    }
  }, [balance])


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
    changeWallet();
  }, [wallet])


  useEffect(() => {

    if (script && script.privateKey) {
      updateFromInfo();
      getDaoData();
    }
  }, [script]);


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
        <CopyFilled className='copy' onClick={() => copyFun()} />
      </div>
      <div className='main_box'>
        <div className='main_info'>
          <h5>余额</h5>
          <p>可用 : {Number(balance) / 100000000 - daoData.luck / 100000000 < 0 ? 0 : Number(balance) / 100000000 - daoData.luck / 100000000} CKB</p>
          <p>质押 : {daoData.luck / 100000000} CKB</p>
          <p>总额 : {Number(balance) / 100000000} CKB</p>
        </div>

      </div>
      <div className='buttons'>
        <Button className='send' type="primary" onClick={() => {
          navigation("/send")
        }}>发送</Button>
        <Button className='dao' onClick={() => {
          navigation("/dao")
        }}>质押</Button>
      </div>
      <div className="footer">
        <p onClick={() => {
          navigation("/create")
        }}>新建钱包</p>
        <p className='pr' onClick={() => {
          navigation("/import")
        }}>导入钱包</p>
      </div>
      <div className='progress'>
        <Progress />
      </div>
    </div>
  )
}
