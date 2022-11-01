import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { Space, Table, Button, notification, Spin } from 'antd';
import { userStore } from "../../../stores";
import {
	getTransaction,
	getCells
} from "../../../rpc";
import './index.scss';
import type { DaoDataObject } from '~type';
import { cutValue, formatDate } from '~utils';
import { browserUrl } from '~config';
import { getUnlockableAmountsFromCells, withdrawOrUnlock } from '~wallet';

declare const window: {
	localStorage: {
		getItem: Function;
		setItem: Function;
	};
	open: Function
};

interface Props {
	item: DaoDataObject;
	off: boolean
}

let timer: any = null

const TransactionsTable: React.FC<Props> = ({
	item,
	off
}) => {
	const UserStoreHox = userStore();
	const { privateKey, privateKeyAgs } = UserStoreHox.script
	const [tableData, setTableData] = useState<DaoDataObject[]>([])
	const [loading, setLoading] = useState(false);
	const [txHash, setTxHash] = useState<string>("");//pending = false  success = true

	const columns: ColumnsType<DaoDataObject> = [
		// {
		// 	title: 'Date',
		// 	dataIndex: 'timestamp',
		// 	key: 'timestamp',
		// },
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			render: (_, record) => (
				<Space size="middle">
					{Number(record.amount) / 100000000}
				</Space>
			),
		},
		// {
		// 	title: 'Income',
		// 	dataIndex: 'compensation',
		// 	key: 'compensation',
		// 	render: (_, record) => (
		// 		<Space size="middle">
		// 			{Number(record.compensation) < 99.9 ? 0 : Number(record.compensation) / 100000000}
		// 		</Space>
		// 	),
		// },
		{
			title: 'View',
			key: 'tx_index',
			render: (_, record) => (
				<Space size="middle" onClick={() => {
					getHash(record.txHash)
				}}>
					<a>{cutValue(record.txHash, 5, 5)}</a>
				</Space>
			),
		},
		// {
		// 	title: 'Type',
		// 	dataIndex: 'type',
		// 	key: 'type',
		// },
		// {
		// 	title: 'State',
		// 	dataIndex: 'state',
		// 	key: 'state',
		// },
		{
			title: 'Action',
			render: (_, record) => (
				<div>
					{record.type === "deposit" ? <Button className='actionButton' disabled={record.state == "pending"} onClick={() => {
						withdraw(record)
					}}>withdraw</Button> : <Button className='actionButton' onClick={() => {
						withdraw(record)
					}} disabled={!record.unlockable} >unlock</Button>}
				</div>
			),
		},
	];

	// get row open url
	const getHash = async (txHash: string) => {
		window.open(`${browserUrl.test}/transaction/${txHash}`)
	}

	const withdraw = async (daoData: DaoDataObject) => {

		// @ts-ignore
		const hash = await withdrawOrUnlock(daoData, privateKeyAgs.address, privateKey, privateKeyAgs.lockScript);

		if (hash) {
			notification["success"]({
				message: 'success',
				description:
					"success transaction",
			});
		};

		setTxHash(hash)
		setLoading(true)
	}

	// Judge whether the transaction is success
	useEffect(() => {
		if (txHash) {
			timer = setInterval(async () => {
				const txTransaction = await getTransaction(txHash);

				if (txTransaction) {
					clearInterval(timer)
					getTableData();
					setLoading(false)
					setTxHash("")
					console.log("close");
				}
			}, 3000)
		}
		return () => clearInterval(timer)
	}, [txHash])


	// Confirm status
	useEffect(() => {
		if (item.txHash) {
			if (off) {
				// get localStorage
				// let daoData = JSON.parse(window.localStorage.getItem('daoData'))
				// setTableData(daoData);
			} else {
				setTableData([item, ...tableData]);
			}
		}
	}, [item, off])


	// get table data
	const getTableData = async () => {
		const cells = await getCells(UserStoreHox.script.privateKeyAgs.lockScript)
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
		UserStoreHox.setDaoDataFun({
			luck: DaoBalance,
			Income
		})

		// window.localStorage.setItem("daoData", JSON.stringify(res))
		setTableData(res.reverse());
	};


	useEffect(() => {
		if (UserStoreHox.script.privateKeyAgs) {
			getTableData()
		}
	}, [UserStoreHox.myBalance])


	return (
		<div className='transactionsTable'>
			<Spin spinning={loading}>
				<Table rowKey={record => record.txHash}
					// onRow={record => {
					// 	return {
					// 		onClick: event => { getHash(record) },
					// 	};
					// }}
					columns={columns} dataSource={tableData} />
			</Spin>
			{/* <Button onClick={getTableData} className='button' type="primary">next</Button> */}
		</div>
	)
}

export default TransactionsTable;
