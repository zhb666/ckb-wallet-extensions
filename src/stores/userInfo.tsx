/*
 * @Author: zouxionglin
 * @Description: stores
 */
import { useEffect, useState } from "react";
import { createModel } from "hox";
import type { WalletListObject } from "../type"

interface DaoData {
    luck: number,
    Income: number
}

function useCounter() {

    const [walletList, setWalletList] = useState<WalletListObject[]>([]);
    const [script, setScript] = useState<WalletListObject>();
    const [myBalance, setMyBalance] = useState<string>('');
    const [daoData, setDaoData] = useState<DaoData>({
        luck: 0,
        Income: 0
    });

    const userScript = (script: WalletListObject) => {
        console.log(script);

        setScript(script);
        chrome.storage.sync.set(
            {
                myScript: script
            },
            function () {
                console.log("set myScript storage ");
            }
        );
    }
    const addWalletList = (walletList: WalletListObject) => {
        console.log(walletList);

        chrome.storage.sync.get("walletList", function (data) {
            const storageWalletList = data.walletList || [];
            storageWalletList.push(walletList)
            setWalletList(storageWalletList);
            chrome.storage.sync.set(
                {
                    walletList: storageWalletList
                },
                function () {
                    console.log("set walletList storage");
                }
            );
        })

    }
    const DeleteWallet = (walletList: WalletListObject[]) => {
        setWalletList(walletList);
        chrome.storage.sync.set(
            {
                walletList
            },
            function () {
                console.log("set walletList storage");
            }
        );
    }
    const setMyBalanceFun = (balance: string) => {
        setMyBalance(balance);
    }

    const setDaoDataFun = (obj: DaoData) => {
        setDaoData(obj);
    }

    useEffect(() => {
        chrome.storage.sync.get("walletList", function (data) {
            console.log(data.walletList);

            const storageWalletList = data.walletList || []
            setWalletList(storageWalletList)

            chrome.storage.sync.get("myScript", function (data) {

                console.log(data.myScript);


                // myWallet
                let myScript = data.myScript || {}

                if (storageWalletList.length === 0) {
                    myScript = {}
                } else {
                    if (!myScript) {
                        myScript = storageWalletList[0]

                    }
                }
                setScript(myScript)
            })
        })

    }, [])

    return {
        walletList,
        script,
        userScript,
        addWalletList,
        myBalance,
        DeleteWallet,
        setMyBalanceFun,
        daoData,
        setDaoDataFun
    };
}

export default createModel(useCounter);
