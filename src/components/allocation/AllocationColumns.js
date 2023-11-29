import React, {useRef, useState} from 'react'
import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
};
const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
};
const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
            style={{
                padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{
                    marginBottom: 8,
                    display: 'block',
                }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        close();
                    }}
                >
                    close
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered) => (
        <SearchOutlined
            style={{
                color: filtered ? '#1677ff' : '#1677ff',
            }}
        />
    ),
    onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
    },
    render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{
                    backgroundColor: '#ffc069',
                    padding: 0,
                }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
});




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
        {
            title: 'Balance',
            dataIndex: 'stock',
            key: 'stock',
           // align: 'right',
           // ...getColumnSearchProps('stock'),

        },





    ]

    return columns
}

export {MonthlyAllocationInventoryColumns}
