import React from 'react'

const MonthlyAllocationInventoryColumns = () => {
    const columns = [
        {
            title: 'Cost Center Name',
            dataIndex: 'costCenterName',
            key: 'itemName',
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Pack Size',
            dataIndex: 'packSize',
            key: 'packSize',
            align: 'right'
        },
        {
            title: 'Allocated',
            dataIndex: 'quantityAllocated',
            key: 'quantityAllocated',
            align: 'right'
        },
        {
            title: 'Balance',
            dataIndex: 'stock',
            key: 'stock',
            align: 'right',

        },

    ]

    return columns
}

export {MonthlyAllocationInventoryColumns}
