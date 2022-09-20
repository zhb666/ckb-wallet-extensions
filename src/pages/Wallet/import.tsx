import React, { useEffect, useState } from "react";
import { Button, Input } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import "./import.scss"

const { TextArea } = Input;

export const Import = () => {
    const userStoreHox = userStore();
    const navigation: NavigateFunction = useNavigate()

    return (
        <div className='Import'>
            <div className='goBack'>
                <Button onClick={() => {
                    navigation("/")
                }}>返回</Button>
            </div>

            <h3>导入助记词</h3>

            <div className='mnemonic'>
                <TextArea rows={8} />
            </div>

            <Button className='button' type="primary" block>确认</Button>
        </div>
    )
}
