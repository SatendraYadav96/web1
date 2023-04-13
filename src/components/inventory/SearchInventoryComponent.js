import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Select, Table} from "antd";
import {selectLoadingInventoryReportData, selectInventoryReversalHistoryListData, selectLoadingReversalHistoryData, selectInventoryReportListData} from "../../redux/selectors/inventoryReportSelector";
import {getInventoryReportStartAction, getInventoryReversalHistoryStartAction} from "../../redux/actions/inventory/inventoryReportActions";

const SearchInventoryComponent = ({authInfo, profileInfo,inventoryList,inventoryReportLoading,handleInventoryReportList,inventoryReversalHistoryList,inventoryReversalHistoryLoading,handleInventoryReversalHistoryList}) => {

    const [columns, setColumns] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [blockItemVisible, setBlockItemVisible] = useState(false)
    const [unitAllocation, setUnitAllocation] = useState(false)
    const [exhausted, setExhausted] = useState(false)
    const [popUp, setPopUp] = useState(0)
    const [reverse, setReverse] = useState(false)
    const [reversalHistory, setReversalHistory] = useState(false)
    const [switchForm, setSwitchForm] = useState(false)
    const [switchColumns, setSwitchColumns] = useState([])
    const [reversalHistoryColumns, setReversalHistoryColumns] = useState([])

    // useEffect(() => {
    //     if(inventoryList !== undefined)
    //         console.log(inventoryList)
    // },[inventoryList])

    useEffect(() => {
        console.log(inventoryReversalHistoryList)
    },[inventoryReversalHistoryList])

    const reverseInventory = () => {
        setReverse(true)
    }

    const reversalHistoryInventory = () => {
        setReversalHistory(true)
    }

    const switchInventory = () => {
        setSwitchForm(true)
    }

    const handleActiveChange = (e) => {
        setBlockItemVisible(e.target.checked);
    };

    // useEffect(() => {
    //     console.log(blockItemVisible)
    // },[blockItemVisible])
    //
    const handleUnitChange = (e) => {
        setUnitAllocation(e.target.checked);
    };
    //
    // useEffect(() => {
    //     console.log(unitAllocation)
    // },[unitAllocation])

    const searchData = () =>{
        setFlag(true)
        setColumns([
            {
                title: 'Category',
                key: 'categoryName',
                dataIndex: 'categoryName',
                width: '100px'
            },
            {
                title: 'Received Date',
                key: 'postingDate',
                dataIndex: 'postingDate',
                width:'100px'
            },
            {
                title: 'Medical Code',
                key: 'medicalCode',
                dataIndex: 'medicalCode',
                width: '100px'
            },
            {
                title: 'Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '100px'
            },
            {
                title: 'Item Code',
                key:'itemCode',
                dataIndex: 'itemCode',
                width: '100px'
            },
            {
                title: 'Rate',
                key:'ratePerUnit',
                dataIndex: 'ratePerUnit',
                width: '100px'
            },
            {
                title: 'PO No.',
                key:'poNo',
                dataIndex: 'poNo',
                width: '100px'
            },
            {
                title: 'Base Pack',
                key:'basePack',
                dataIndex: 'basePack',
                width: '100px'
            },
            {
                title: 'Unit',
                key:'unit',
                dataIndex: 'unit',
                width: '100px'
            },
            {
                title: 'Batch No',
                key:'batchNo',
                dataIndex: 'batchNo',
                width: '100px'
            },
            {
                title: 'Expiry Date',
                key:'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px',
            },
            {
                title: 'Qty Received',
                key:'qtyReceived',
                dataIndex: 'qtyReceived',
                width: '100px',
            },
            {
                title: 'Qty Balance',
                key:'qtyBalance',
                dataIndex: 'qtyBalance',
                width: '100px',
            },
            {
                title: 'Unit Allocation',
                key:'unitAllocation',
                dataIndex: 'unitAllocation',
                width: '100px',
                render: () => {
                    return <Checkbox value={unitAllocation} onChange={handleUnitChange}/>
                }
            },
            {
                title: 'Block Item',
                key:'blockItem',
                dataIndex: 'blockItem',
                width: '100px',
                render: () => {
                    return <Checkbox value={blockItemVisible} onChange={handleActiveChange}/>
                }
            },
            {
                title: 'Comments',
                key:'comments',
                dataIndex: 'comments',
                width: '100px'
            },
            {
                title: '',
                key:'',
                dataIndex: '',
                render:(_,row) =>{
                    return(
                        <>
                            <Row gutter={[16,16]}>
                                <Col span={14}>
                                    <Button onClick={() => reverseInventory()}>
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
                                    <Button onClick={() => switchInventory()}>
                                        Switch From
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )
                }
            }
        ]);
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

    const searchSwitchData = () => {
        setSwitchColumns([
            {
                title:'',
                key:'',
                dataIndex: '',
                width: '50px',
                render:() => {
                    return <Checkbox />
                }
            },
            {
                title:'Category',
                key:'category',
                dataIndex: 'category',
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
                key:'name',
                dataIndex: 'name',
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
                key:'qtyBalance',
                dataIndex: 'qtyBalance',
                width: '100px'
            }
        ])

    }

    const searchReversalHistoryData = () => {
        setReversalHistoryColumns([
            {
                title:'Inventory Id',
                key:'invId',
                dataIndex: 'invId',
                width: '100px',
            },
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

    const getInventoryReportList = () => {
        console.log(inventoryList)
        handleInventoryReportList ({
            isExhausted: exhausted,
            isPopup: popUp,
            certificate: authInfo.token
        });
        searchData()

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

    const refresh = () => {
        console.log(inventoryReversalHistoryList)
    }

    return(
        <div>
            <TitleWidget title={"Search Inventory"}/>
            <Row gutter={[16, 16]}>
                <Col span={3}>
                    Item Name <br/><Input style={{width:"100%"}}/>
                </Col>
                <Col span={3}>
                    Exhuasting Quantity <Checkbox />
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={() => getInventoryReportList()}>Search</Button>
                </Col>
            </Row>
            {/*<div>*/}
            {/*    Item Name <Input style={{width:"200px"}}/>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    Exhuasting Quantity <Checkbox />*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <Button type={"primary"} onClick={() => searchData()}>Search</Button>*/}
            {/*</div>*/}
            <br/>
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

            <Modal visible={reverse} title="Reverse Inventory" footer={null} onCancel={() => setReverse(false)}>
                <p>Reverse Inventory of Acrylic lady tablet(Multivite Women)</p>
                <p>Balance quantity is 300</p>
                <br/>
                <p>Inventory has not been yet reversed</p>
                <br/>
                <Row>
                    <Col>Qty <Input /></Col>
                </Row>
                <br/>
                <Row>
                    <Col>Remarks <br/><Select style={{width:'100px'}}></Select></Col>
                </Row>
                <br/>
                <Row>
                    <Col><Button type={"primary"}>Reverse</Button></Col>
                </Row>
            </Modal>
            <Modal visible={reversalHistory} title="Reversal History" footer={null} onCancel={() => {
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
            <Modal visible={switchForm} width={700} title="Switch Inventory from" footer={null} onCancel={() => setSwitchForm(false)}>
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
                    <Col span={6}>Qty To Switch<Input/></Col>
                    <Col span={6}>Remarks<Input/></Col>
                    <Col span={6}><Button>Switch</Button></Col>
                </Row>
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
    handleInventoryReversalHistoryList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const inventoryList = selectInventoryReportListData(state)
    const inventoryReportLoading = selectLoadingInventoryReportData(state)
    const inventoryReversalHistoryList = selectInventoryReversalHistoryListData(state)
    const inventoryReversalHistoryLoading = selectLoadingReversalHistoryData(state)
    return {authInfo,profileInfo,inventoryList,inventoryReportLoading,inventoryReversalHistoryList,inventoryReversalHistoryLoading}
}

const actions = {
    handleInventoryReportList : getInventoryReportStartAction,
    handleInventoryReversalHistoryList : getInventoryReversalHistoryStartAction
}

export default connect(mapState, actions)(SearchInventoryComponent)
