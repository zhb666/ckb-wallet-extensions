import React, { useEffect, useState } from "react";
import { Button, Input, notification } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import { getPrivateKeyAgs } from '~wallet/hd';
import "./import.scss"
import type { NotificationType, ScriptList, WalletListObject } from '~type';
import { getScripts, getTipHeader, setScripts } from '~rpc';

const { TextArea } = Input;

export const Import = () => {
    const userStoreHox = userStore();
    const navigation: NavigateFunction = useNavigate()

    const [mnemonic, setMnemonic] = useState('');

    // click create
    const handleOk = async () => {
        if (!mnemonic) {
            notification["error"]({
                message: 'error',
                description:
                    "mnemonic error",
            });
            return
        }
        // 1 create 2 importMnemonic 3 importPrivatekey
        const res: WalletListObject = await getPrivateKeyAgs(mnemonic, 2);
        // set add Wallet
        userStoreHox.addWalletList(res)
        // Set up your first account
        // if (walletList && walletList.length == 0) {
        userStoreHox.userScript(res)

        const getScript = await getScripts();
        setScriptFun(getScript, res)

        // tips
        openNotificationWithIcon("success")
        setMnemonic("")
        navigation("/")
    };

    const openNotificationWithIcon = (type: NotificationType) => {
        notification[type]({
            message: 'success'
        });
    };

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

    const onMnemonicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMnemonic(e.target.value)
    };

    return (
        <div className='Import'>
            <div className='goBack'>
                <Button onClick={() => {
                    navigation("/")
                }}>返回</Button>
            </div>

            <h3>导入助记词</h3>

            <div className='mnemonic'>
                <TextArea onChange={onMnemonicChange} value={mnemonic} rows={8} />
            </div>

            <Button className='button' onClick={() => {
                handleOk()
            }} type="primary" block>确认</Button>
        </div>
    )
}
