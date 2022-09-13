/*
 * @Author: zouxionglin
 * @Description: stores
 */
import { useState, useEffect } from "react";
import { createModel } from "hox";



function useCounter() {
    const [myBalance, setMyBalance] = useState<number>(0);

    const setMyBalanceFun = () => {
        let num = myBalance + 1
        setMyBalance(num);
        chrome.storage.sync.set({ a: num }, function () {
            console.log("storage init number")
        })
    }

    useEffect(() => {
        chrome.storage.sync.get("a", function (data) {
            setMyBalance(data.a || 0);
        })
    }, [])

    return {
        myBalance,
        setMyBalanceFun
    };
}

export default createModel(useCounter);
