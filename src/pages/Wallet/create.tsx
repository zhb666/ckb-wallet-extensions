import React, { useEffect, useState } from "react";
import { Button, Input, notification } from "antd"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { userStore } from "../../stores";
import { getPrivateKeyAgs, Mnemonic } from '~wallet/hd';
import "./create.scss"
import type { NotificationType, ScriptList, WalletListObject } from '~type';
import { getScripts, getTipHeader, setScripts } from '~rpc';

const { TextArea } = Input;

export const Create = () => {
    const userStoreHox = userStore();
    const navigation: NavigateFunction = useNavigate()

    const [mnemonic, setMnemonic] = useState('');
    // Current wallet
    const [wallet, setWallet] = useState<any>();

    /**
     * @description: 
     * @param {*}
     * @return {hd}
     */
    async function getHD() {
        const hd = await Mnemonic()
        setMnemonic(hd.m)
    }

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
        const res: WalletListObject = await getPrivateKeyAgs(mnemonic, 1);
        // set add Wallet
        userStoreHox.addWalletList(res)
        // Set up your first account
        // if (walletList && walletList.length == 0) {
        userStoreHox.userScript(res)
        setWallet(res.privateKeyAgs.lockScript.args)

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

    useEffect(() => {
        getHD()
    }, [])

    return (
        <div className='Create'>
            <div className='goBack'>
                <Button onClick={() => {
                    navigation("/")
                }}>??????</Button>
            </div>

            <h3>????????????</h3>

            <div className='mnemonic'>
                <TextArea value={mnemonic} rows={8} />
            </div>

            <Button className='button' onClick={() => {
                handleOk()
            }} type="primary" block>??????</Button>
        </div>
    )
}
