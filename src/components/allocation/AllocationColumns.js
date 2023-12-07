import React, {useRef, useState} from 'react'
import { Input } from 'antd';

import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const MonthlyAllocationInventoryColumns = () => {
    const columns = [
        {
            title: 'Cost Center Name',
            dataIndex: 'costCenterName',

            key: 'itemName',
            //...getColumnSearchProps('costCenterName'),
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            key: 'itemName',
           //...getColumnSearchProps('itemName'),
        },
        {
            title: 'Available Stock',
            dataIndex: 'stock',
            key: 'itemName',
            //...getColumnSearchProps('stock'),
        },
        {
            title: 'PO NO',
            dataIndex: 'poNo',
            key: 'itemName',
            //...getColumnSearchProps('poNo'),
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
            key: 'itemName',
           //...getColumnSearchProps('expiryDate'),
        },

        {
            title: 'Pack Size',
            dataIndex: 'packSize',
            key: 'packSize',
            // align: 'right',
            //...getColumnSearchProps('packSize'),
        },
        {
            title: 'Allocated',
            dataIndex: 'quantityAllocated',
            key: 'quantityAllocated',
            //align: 'right',
           //...getColumnSearchProps('quantityAllocated'),
        },
        // {
        //     title: 'Balance',
        //     dataIndex: 'stock',
        //     key: 'stock',
        //    // align: 'right',
        //    // ...getColumnSearchProps('stock'),
        //
        // },





    ]

    return columns
}

export {MonthlyAllocationInventoryColumns}
