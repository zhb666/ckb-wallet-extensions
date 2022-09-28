import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, MenuProps, Space } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import "./inedx.scss"


export const Main = () => {
  const userStoreHox = userStore();
  const navigation: NavigateFunction = useNavigate()

  const onChangeAddress: MenuProps['onClick'] = ({ key }) => {
    console.log(key);
  };

  const addressList = (
    <Menu
      onClick={onChangeAddress}
      items={[
        {
          key: '1',
          label: (
            <div >
              1st menu item
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div >
              2nd menu item
            </div>
          ),
        },
        {
          key: '3',
          label: (
            <div >
              3rd menu item
            </div>
          ),
        },
      ]}
    />
  );



  // isLogin
  useEffect(() => {

  }, [])

  return (
    <div className='Main'>
      {/* <div className='goBack'>
        <Button onClick={() => {
          navigation("/")
        }}>返回</Button>
      </div> */}
      <div className="header">
        <Dropdown className='addressDropdown' overlay={addressList} placement="bottom">
          <Button>abc...aaa</Button>
        </Dropdown>
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
