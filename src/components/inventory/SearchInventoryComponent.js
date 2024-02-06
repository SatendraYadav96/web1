import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, InputNumber, Modal, Row, Select, Space, Table} from "antd";
import {
    selectLoadingInventoryReportData,
    selectInventoryReversalHistoryListData,
    selectLoadingReversalHistoryData,
    selectInventoryReportListData,
    selectEditUnitAllocationData,
    selectLoadingEditUnitAllocationData,
    selectEditBlockItemData,
    selectLoadingEditBlockItemData, selectLoadingReverseInventoryData, selectReverseInventoryData, selectSwitchInventoryData, selectLoadingSwitchInventoryData
} from "../../redux/selectors/inventoryReportSelector";
import {editBlockItemStartAction, editUnitAllocationStartAction, getInventoryReportStartAction, getInventoryReversalHistoryStartAction, reverseInventoryStartAction, switchInventoryStartAction} from "../../redux/actions/inventory/inventoryReportActions";
import {CheckOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const SearchInventoryComponent = ({authInfo,inventoryList,handleInventoryReportList,inventoryReversalHistoryList,handleInventoryReversalHistoryList,editUnitAllocation,handleEditUnitAllocation,editBlockItem,handleEditBlockItem,reverseInventory, reverseInventoryLoading,handleReverseInventory,switchInventory,switchInventoryLoading,handleSwitchInventory}) => {

    const [columns, setColumns] = useState([])
    const [modalColumns, setModalColumns] = useState([])
    const [active, setActive] = useState(0)
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState()
    const [balance, setBalance] = useState()
    const [revId, setRevId] = useState()
    const [reverseQty, setReverseQty] = useState()
    const [remark, setRemark] = useState()
    const [switchQty, setSwitchQty] = useState()
    const [switchRemark, setSwitchRemark] = useState()
    const [switchFromId, setSwitchFromId] = useState()
    const [switchToId, setSwitchToId] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [checkedUA, setCheckedUA] = useState()
    const [checkedBI, setCheckedBI] = useState()
    const [reversal, setReversal] = useState()
    const [multipleReversal, setMultipleReversal] = useState()
    const [reversalModal, setReversalModal] = useState(false)
    const [checkedArr, setCheckedArr] = useState([])
    const [revQty, setRevQty] = useState([])
    const [currentUAId, setCurrentUAId] = useState()
    const [currentBIId, setCurrentBIId] = useState()
    const [popUp, setPopUp] = useState(0)
    const [reverse, setReverse] = useState(false)
    const [reversalHistory, setReversalHistory] = useState(false)
    const [switchForm, setSwitchForm] = useState(false)
    const [switchColumns, setSwitchColumns] = useState([])
    const [reversalHistoryColumns, setReversalHistoryColumns] = useState([])
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
                    color: filtered ? '#1677ff' : undefined,
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

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        console.log(inventoryReversalHistoryList)
    },[inventoryReversalHistoryList])

    const handleReverseInventoryClick = (row) => {
        setReverse(true)
        setName(row.itemName)
        setBalance(row.qtyBalanced)
        setRevId(row.invId)
    }

    const onChange = (value) => {
        setReverseQty (value)
    };

    // const matchData = (invoiceList,checkedArr) => invoiceList.filter(data => checkedArr.includes(data.invId)).map(data => data);

    const onChangeMultipleQty = (value,row) => {
        console.log(value)
        setRevQty(revQty.map(obj => {
            // if id equals to the changes row's id, update qty property
            if (obj.invId === row.invId) {
                console.log(obj)
                obj.quantity = value;
            }
            return obj;
        }))
    };

    const onChangeMultipleRemark = (value,row) => {
        console.log(value)
        // console.log(revQty)
        setRevQty(revQty.map(obj => {
            // if id equals to the changes row's id, update qty property
            if (obj.invId === row.invId) {
                obj.remarks = value;
            }
            return obj;
        }))
    };


    const handleRow = () => {
        console.log(multipleReversal)
    }

    const handleRemark = (value) => {
        setRevQty(revQty.map(obj => {
            // if id equals to the changes row's id, update qty property
            if (obj.invId === row.invId) {
                return {...obj, remarks: value};
            }
            return obj;
        }))
        setRemark (value)
    };

    const handleCancel = () => {
        setReverse(false)
        setName(undefined)
        setBalance(undefined)
        setRemark(undefined)
        setReverseQty(0)
    }

    const reversalHistoryInventory = () => {
        setReversalHistory(true)
    }

    const clickSwitchInventory = (row) => {
        setSwitchForm(true)
        setSwitchFromId(row.invId)
        searchSwitchData()
    }

    const handleBlockItemChange = (event,row) => {
        console.log('checked = ', event.target.checked);
        setCheckedBI(event.target.checked ? 1 : 0);
        console.log(row.invId)
        setCurrentBIId(row.invId)
    }

    const handleReversal = (event,row) => {
        console.log('checked = ', event.target.checked);
        if (event.target.checked) {
            setReversal(row.invId)
            setCheckedArr(current => [...current, row.invId]);
        }
        else if (event.target.checked === false) {
            setCheckedArr((current) => current.filter(checked => checked !== row.invId))
            console.log("removed")
        }
        console.log(row.invId)
    }

    const matchData = (invoiceList,checkedArr) => invoiceList.filter(data => checkedArr.includes(data.invId)).map(data => data);

    const handleMultipleReversal = () => {
        // setPrintAction(true)
        console.log(matchData(inventoryList, checkedArr))
        setMultipleReversal(matchData(inventoryList, checkedArr))
        setReversalModal(true)
        // handleGenerateInvoice({
        //     genInv: {
        //         invoiceHeaderID: printInvoice.invoiceHeaderID,
        //         invoiceNumber: printInvoice.invoiceNumber,
        //     },
        // })
    }

    useEffect(() => {
        console.log(multipleReversal)
        let q = multipleReversal?.map(item => ({
            invId: item.invId,
            quantity: 0,
            remarks: '',
        }))
        setRevQty(q)
    },[multipleReversal])

    useEffect(() => {
        console.log(checkedArr)
    },[checkedArr])

    useEffect(() => {
        console.log(checkedBI)
        if (checkedBI !== undefined) {
            console.log(checkedBI)
            const dataBI = {
                invId: currentBIId,
                isBlockItem: checkedBI,
            }
            handleEditBlockItem({

                inv: dataBI,
                certificate: authInfo.token,
            })
        }
    },[checkedBI])

    const handleUnitAllocationChange = (event,row) => {
        console.log('checked = ', event.target.checked);
        if (event.target.checked) {
            setCheckedUA(1);
        } else {
            setCheckedUA(0);
        }
        console.log(row.invId)
        setCurrentUAId(row.invId)
    }

    useEffect (() => {
        console.log(checkedUA)
        if (checkedUA !== undefined) {
            console.log(checkedUA)
            console.log(currentUAId)
            const dataUA = {

                invId :currentUAId,

                isUnitAllocation: checkedUA,
            }
            console.log(dataUA)
            handleEditUnitAllocation({
                    certificate: authInfo.token,
                inv: dataUA,
                invId: currentUAId,

                // isUnitAllocation: checkedUA,

            })
        }
    },[checkedUA])

    const searchData = () =>{
        setFlag(true)
        setColumns([
            {
                title: 'Category',
                key: 'categoryName',
                dataIndex: 'categoryName',
                width: '100px',
                ...getColumnSearchProps('categoryName'),
            },
            {
                title: 'Received Date',
                key: 'postingDate',
                dataIndex: 'postingDate',
                width:'100px',
                ...getColumnSearchProps('postingDate'),
            },
            {
                title: 'Medical Code',
                key: 'medicalCode',
                dataIndex: 'medicalCode',
                width: '100px',
                ...getColumnSearchProps('medicalCode'),
            },
            {
                title: 'Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '100px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title: 'Item Code',
                key:'itemCode',
                dataIndex: 'itemCode',
                width: '100px',
                ...getColumnSearchProps('itemCode'),
            },
            {
                title: 'Rate',
                key:'ratePerUnit',
                dataIndex: 'ratePerUnit',
                width: '100px',
                ...getColumnSearchProps('ratePerUnit'),
            },
            {
                title: 'PO No.',
                key:'poNo',
                dataIndex: 'poNo',
                width: '100px',
                ...getColumnSearchProps('poNo'),
            },
            {
                title: 'Base Pack',
                key:'packSize',
                dataIndex: 'packSize',
                width: '100px',
                ...getColumnSearchProps('packSize'),
            },
            {
                title: 'Unit',
                key:'unit',
                dataIndex: 'unit',
                width: '100px',
                ...getColumnSearchProps('unit'),
            },
            {
                title: 'Batch No',
                key:'batchNo',
                dataIndex: 'batchNo',
                width: '100px',
                ...getColumnSearchProps('batchNo'),
            },
            {
                title: 'Expiry Date',
                key:'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px',
                ...getColumnSearchProps('expiryDate'),
            },
            {
                title: 'Qty Received',
                key:'qtyReceived',
                dataIndex: 'qtyReceived',
                width: '100px',
                ...getColumnSearchProps('qtyReceived'),
            },
            {
                title: 'Qty Balance',
                key:'qtyBalanced',
                dataIndex: 'qtyBalanced',
                width: '100px',
                ...getColumnSearchProps('qtyBalanced'),
            },
            {
                title: 'Unit Allocation',
                key:'unitAllocation',
                dataIndex: 'unitAllocation',
                width: '100px',
                render: (_,row) => {
                    return <Checkbox value={checkedUA} onChange={(event) => handleUnitAllocationChange(event,row)}/>
                }
            },
            {
                title: 'Block Item',
                key:'blockItem',
                dataIndex: 'blockItem',
                width: '100px',
                render: (_,row) => {
                    return <Checkbox value={checkedBI} onChange={(event) => handleBlockItemChange(event,row)}/>
                }
            },
            {
                title: 'Comments',
                key:'comments',
                dataIndex: 'comments',
                width: '100px',
                ...getColumnSearchProps('comments'),
            },
            {
                title: 'Reversal',
                key:'',
                dataIndex: 'invId',
                width: '100px',
                render: (_,row) => {
                    return <Checkbox value={reversal} onChange={(event) => handleReversal(event,row)} disabled={(row.qtyBalanced === "0")? true : false }/>
                }
            },
            {
                title: '',
                key:'',
                dataIndex: '',
                render:(_,row) =>{
                    return(
                        <>
                            <Row gutter={[16,16]} style={{marginBottom: '5px'}}>
                                <Col span={14}>
                                    <Button onClick={() => handleReverseInventoryClick(row)} disabled={(row.qtyBalanced === "0")? true : false }>
                                        Reverse
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button onClick={() => getInventoryReversalHistoryList(row)}>
                                        Reversal History
                                    </Button>
                                </Col>
                            </Row>
                            <Row gutter={[16,16]}>
                                <Col span={1}>
                                    <Button onClick={() => clickSwitchInventory(row)}>
                                        Switch From
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )
                }
            }
        ]);
        setModalColumns([
            {
                title: 'Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '100px'
            },
            {
                title: 'Qty Balance',
                key:'qtyBalanced',
                dataIndex: 'qtyBalanced',
                width: '100px',
            },
            {
                title: 'Qty',
                key:'',
                dataIndex: 'invId',
                render: (_,row) => {
                    return (
                        <>
                            <InputNumber min={0} defaultValue={0} onChange={(e) => onChangeMultiple(e,row)} /> &nbsp;
                            <Button type={"primary"} icon={<CheckOutlined />} onClick={() => handleRow(row)}/>
                        </>
                    )
                }
            },
        ])
        setDataSource([
            {
                key: '1',
                name: '',
                itemCode: '',
                rate: '',
                poNo: '',
                basePack: '',
                unit: '',
                batchNo: '',
                expiryDate: '',
                qtyReceived: '',
                qtyBalance: '',
                comment: ''
            }
        ])
    }

    const handleSwitchCheck = (event,row) => {
        console.log("checked",event.target.checked)
        if (event.target.checked) {
            setSwitchToId(row.invId)
        } else {
            setSwitchToId("")
        }
    }

    const searchSwitchData = () => {
        setSwitchColumns([
            {
                title:'',
                key:'',
                dataIndex: '',
                width: '50px',
                render:(_,row) => {
                    return <Checkbox onChange={(event) => handleSwitchCheck(event,row)}/>
                }
            },
            {
                title:'Category',
                key:'categoryName',
                dataIndex: 'categoryName',
                width: '100px'
            },
            {
                title:'Medical Code',
                key:'medicalCode',
                dataIndex: 'medicalCode',
                width: '100px'
            },
            {
                title:'Name',
                key:'itemName',
                dataIndex: 'itemName',
                width: '150px'
            },
            {
                title:'Item Code',
                key:'itemCode',
                dataIndex: 'itemCode',
                width: '100px'
            },
            {
                title:'Expiry Date',
                key:'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title:'Qty Received',
                key:'qtyReceived',
                dataIndex: 'qtyReceived',
                width: '100px'
            },
            {
                title:'Qty Balance',
                key:'qtyBalanced',
                dataIndex: 'qtyBalanced',
                width: '100px'
            }
        ])

    }

    const searchReversalHistoryData = () => {
        setReversalHistoryColumns([
            // {
            //     title:'Inventory Id',
            //     key:'invId',
            //     dataIndex: 'invId',
            //     width: '100px',
            // },
            {
                title:'Reversal Date',
                key:'reversalDate',
                dataIndex: 'reversalDate',
                width: '100px'
            },
            {
                title:'Remarks',
                key:'remarks',
                dataIndex: 'remarks',
                width: '100px'
            },
            {
                title:'Quantity',
                key:'quantity',
                dataIndex: 'quantity',
                width: '100px'
            },
        ])
    }

    const emptyReversalHistoryData = {
        invId: '',
        reversalDate: '',
        remarks: '',
        quantity: '',
    }

    const getInventoryReversalHistoryList = (row) => {
        reversalHistoryInventory()
        handleInventoryReversalHistoryList ({
        invId: row.invId,
        certificate: authInfo.token,
        });
        console.log(row.invId)
        console.log(inventoryReversalHistoryList)
        searchReversalHistoryData()
    }

    const handleReverseClick = () => {
        const data = {
            invId: revId,
            remarks: remark,
            quantity: reverseQty,
        }
        handleReverseInventory({
            inv: [data],
            certificate: authInfo.token,
        })
    }

    const handleSwitch = () => {
        const data = {
            fromInvId: switchFromId,
            toInvId: switchToId,
            remarks: switchRemark,
            quantity: switchQty,
        }
        handleSwitchInventory({
            certificate: authInfo.token,
            inv: data,
        })
    }

    const refresh = () => {
        console.log(inventoryReversalHistoryList)
    }

    const getInventoryReportList = () => {
        console.log(inventoryList)
        handleInventoryReportList ({
            isExhausted: active,
            certificate: authInfo.token
        });
        searchData()
    }

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setActive(e.target.checked ? 1 : 0)
    }

    const reverseInventoryFunc = () => {
        console.log(revQty)
        handleReverseInventory({
            certificate: authInfo.token,
            inv: revQty
        })
    }

    return(
        <div>
            <TitleWidget title={"Search Inventory"}/>
            <Row gutter={[16, 16]}>
                {/*<Col span={3}>*/}
                {/*    Item Name <br/><Input style={{width:"100%"}}/>*/}
                {/*</Col>*/}
                <Col span={3}>
                    Exhuasting Quantity <Checkbox checked={checked} onChange={handleChange}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={() => getInventoryReportList()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={() => handleMultipleReversal()} style={{width: "100%"}}>Mutiple Reverse</Button>
                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{inventoryList?.length}</b></span>
            {flag &&
                <Table dataSource={inventoryList} columns={columns}/>
            }

            {/*MODAL*/}
            {/*<Modal visible={blockItemVisible} title="Inventory Block Item Reason"  footer={null}>*/}
            {/*    <Row>*/}
            {/*        <Col><Input placeholder={"Comments"}/></Col>*/}
            {/*        <Col><Button>Save</Button></Col>*/}
            {/*    </Row>*/}
            {/*</Modal>*/}

            <Modal visible={reverse} title="Reverse Inventory" footer={null} onCancel={handleCancel}>
                <p>{`Reverse Inventory of ${name}`}</p>
                <p>{`Balance quantity is ${balance}`}</p>
                <br/>
                <p>Inventory has not been yet reversed</p>
                <br/>
                <Row>
                    <Col>Qty <InputNumber min={0} defaultValue={0} onChange={onChange} /></Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        Remarks <br/>
                        <Select
                            style={{
                                width: 120,
                            }}
                            options={[
                                {
                                    value: 'EXPIRED',
                                    label: 'EXPIRED',
                                },
                                {
                                    value: 'PRUNED',
                                    label: 'PRUNED',
                                },
                                {
                                    value: 'SHORT RECEIPT',
                                    label: 'SHORT RECEIPT',
                                },
                                {
                                    value: 'DAMAGED',
                                    label: 'DAMAGED',
                                },
                            ]}
                            onChange={(value) => handleRemark(value)}
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col><Button type={"primary"} onClick={handleReverseClick}>Reverse</Button></Col>
                </Row>
            </Modal>
            <Modal
                open={reversalHistory}
                title="Reversal History"
                footer={null}
                onCancel={() => {
                setReversalHistory(false)
            }}>
                <p>Reversal History</p>
                <br/>
                <Table
                    columns={reversalHistoryColumns}
                    dataSource={inventoryReversalHistoryList}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>

            </Modal>
            <Modal
                open={switchForm}
                width={900}
                title="Switch Inventory from"
                footer={null}
                onCancel={() => setSwitchForm(false)}>
                <Row gutter={[8,8]}>
                    <Col span={8}><Input /></Col>
                    <Col span={8}><Button onClick={() => searchSwitchData()}>Search</Button></Col>
                    <Col span={8}></Col>
                </Row>
                <br/>
                <Row>
                    <Col span={20}></Col>
                    <Col span={4}>
                        <Input.Search />
                    </Col>
                </Row>
                <br/>
                <Table
                    columns={switchColumns}
                    dataSource={inventoryList}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>
                <br/>
                <Row gutter={[8,8]}>
                    <Col span={6}>Qty To Switch<br/><InputNumber min={0} defaultValue={0} onChange={(value) => setSwitchQty(value)} /></Col>
                    <Col span={6}>Remarks<Input onChange={(e) => setSwitchRemark(e.target.value)}/></Col>
                    <Col span={6}><br/><Button onClick={handleSwitch}>Switch</Button></Col>
                </Row>
            </Modal>
            <Modal open={reversalModal} title="Multiple Reversal" footer={[
                <Button type={"primary"} onClick={() => reverseInventoryFunc()} >Reverse</Button>
            ]} width={"70vw"} onCancel={() => {
                setReversalModal(false)
            }}>
                {/*<p style={{fontSize: "1.2rem", fontWeight: "bold"}}>Print</p>*/}
                {/*<Button type={"primary"} style={{marginRight: "20px"}} onClick={() => handleInvoicePrint()}>Print Invoice</Button>*/}
                {/*<Button type={"primary"} onClick={() => handleLabelPrint()}>Print Label</Button>*/}
                {/*<br/>*/}
                {/*<Table*/}
                {/*    columns={modalColumns}*/}
                {/*    dataSource={multipleReversal}*/}
                {/*    scroll={{*/}
                {/*        x: 100,*/}
                {/*    }}*/}
                {/*>*/}
                {/*</Table>*/}
                <Row gutter={16}>
                    <Col span={4} style={{fontWeight: 'bold', fontSize: 17}}>Name</Col>
                    <Col span={3} style={{fontWeight: 'bold', fontSize: 17}}>Qty Balance</Col>
                    <Col span={3} style={{fontWeight: 'bold', fontSize: 17}}>Qty</Col>
                    <Col span={3} style={{fontWeight: 'bold', fontSize: 17}}>Remark</Col>
                </Row>
                <hr/>
                {multipleReversal?.map(item => {
                    return(
                        <>
                            <Row gutter={16}>
                                <Col span={4} style={{fontSize: 14}}>{item.itemName}</Col>
                                <Col span={3} style={{fontSize: 14}}>{item.qtyBalanced}</Col>
                                <Col span={3} style={{fontSize: 14}}>
                                    <InputNumber min={0} defaultValue={0} onChange={(e) => onChangeMultipleQty(e,item)} />
                                </Col>
                                <Col span={3} style={{fontSize: 14}}>
                                    <Select
                                        style={{
                                            width: 120,
                                        }}
                                        options={[
                                            {
                                                value: 'EXPIRED',
                                                label: 'EXPIRED',
                                            },
                                            {
                                                value: 'PRUNED',
                                                label: 'PRUNED',
                                            },
                                            {
                                                value: 'SHORT RECEIPT',
                                                label: 'SHORT RECEIPT',
                                            },
                                            {
                                                value: 'DAMAGED',
                                                label: 'DAMAGED',
                                            },
                                        ]}
                                        onChange={(value) => onChangeMultipleRemark(value,item)}
                                    />
                                </Col>
                            </Row>
                            <hr/>
                        </>
                    )
                })}
            </Modal>
        </div>
    )
}

SearchInventoryComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    inventoryList:PropTypes.array,
    inventoryReportLoading:PropTypes.any,
    handleInventoryReportList:PropTypes.func,
    inventoryReversalHistoryList:PropTypes.array,
    inventoryReversalHistoryLoading:PropTypes.any,
    handleInventoryReversalHistoryList:PropTypes.func,
    editUnitAllocation:PropTypes.array,
    editUnitAllocationLoading:PropTypes.any,
    handleEditUnitAllocation:PropTypes.func,
    editBlockItem:PropTypes.array,
    editBlockItemLoading:PropTypes.any,
    handleEditBlockItem:PropTypes.func,
    reverseInventory:PropTypes.array,
    reverseInventoryLoading:PropTypes.any,
    handleReverseInventory:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const inventoryList = selectInventoryReportListData(state)
    const inventoryReportLoading = selectLoadingInventoryReportData(state)
    const inventoryReversalHistoryList = selectInventoryReversalHistoryListData(state)
    const inventoryReversalHistoryLoading = selectLoadingReversalHistoryData(state)
    const editUnitAllocation = selectEditUnitAllocationData(state)
    const editUnitAllocationLoading = selectLoadingEditUnitAllocationData(state)
    const editBlockItem = selectEditBlockItemData(state)
    const editBlockItemLoading = selectLoadingEditBlockItemData(state)
    const reverseInventory = selectReverseInventoryData(state)
    const reverseInventoryLoading = selectLoadingReverseInventoryData(state)
    const switchInventory = selectSwitchInventoryData(state)
    const switchInventoryLoading = selectLoadingSwitchInventoryData(state)
    return {authInfo,profileInfo,inventoryList,inventoryReportLoading,inventoryReversalHistoryList,inventoryReversalHistoryLoading,editUnitAllocation,editUnitAllocationLoading,editBlockItem,editBlockItemLoading,reverseInventory,reverseInventoryLoading,switchInventory,switchInventoryLoading}
}

const actions = {
    handleInventoryReportList : getInventoryReportStartAction,
    handleInventoryReversalHistoryList : getInventoryReversalHistoryStartAction,
    handleEditUnitAllocation : editUnitAllocationStartAction,
    handleEditBlockItem : editBlockItemStartAction,
    handleReverseInventory : reverseInventoryStartAction,
    handleSwitchInventory : switchInventoryStartAction,
}

export default connect(mapState, actions)(SearchInventoryComponent)
