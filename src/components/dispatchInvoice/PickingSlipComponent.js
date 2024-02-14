import React, {useState, useEffect, useRef} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {getPickinglistStartAction, getPicklistStartAction, getPicklistStatusStartAction, getPicklistVirtualStartAction} from '../../redux/actions/dispatchInvoice/picklistAction'
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Space, Table} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectDispatchTypeComponent from "../widgets/SelectDispatchTypeComponent";
import {selectPicklistData, selectLoadingData, selectPickinglistData, selectPickLoadingData, selectPicklistVirtualData, selectPickStatusLoadingData, selectPickVirtualLoadingData, selectPicklistStatusData} from "../../redux/selectors/picklistSelector"
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {SheetComponent} from "@antv/s2-react";
import {setLang} from "@antv/s2";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


const PickingSlipComponent = ({authInfo,pickinglist,loading,handleLoadList,profileInfo,picklist,picklistloading,handlePickList,picklistVirtual,picklistVirtualloading,handlePickListVirtual,picklistStatus,picklistStatusloading,handlePickListStatus}) => {
    setLang('en_US')
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [pivotTableData, setPivotTableData] = useState([])
    const [pivoTable, setPivoTable] = useState(false)
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [dispatchType, setDispatchType] = useState()
    const [columns, setColumns] = useState([])
    const [modalColumns, setModalColumns] = useState([])
    const [flag, setFlag] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [statusBox, setStatusBox] = useState(false)
    const [statusData, setStatusData] = useState(false)
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
                    color: filtered ?   '#ff4d4f' :'#1677ff',
                    fontSize: '15px',
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

    const statusByBrandManager = (row) => {
        setStatusBox(true)
        handlePickListStatus({
            year:year,
            month:month,
            teamId: row.teamID,
            certificate: authInfo.token
        })
        modalData()
    }

    useEffect(() => {
        console.log(`This is ${picklistStatus}`)
        setStatusData(picklistStatus)
    },[picklistStatus])

    const modalData = () => {
        setModalColumns([
            {
                title: 'Brand Manager',
                key: 'managerName',
                dataIndex: 'managerName',
                width: '600px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '200px'
            },
        ])
    }

    const searchData = () => {
        console.log(year)
        console.log(month)
        console.log(dispatchType)
        setFlag(true)
        if(dispatchType === "0"){
            setColumns([
                {
                    title: 'Teams',
                    key: 'teams',
                    dataIndex: 'team',
                    width: '100px',
                    ...getColumnSearchProps('team'),
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'status',
                    width: '100px',

                    render: (_,row) => {
                        return <Button type="link" onClick={() => statusByBrandManager(row)}>Status By Brand Manager</Button>
                    }
                },
                // {
                //     title: 'Common',
                //     key: '',
                //     dataIndex: '',
                //     width: '100px',
                //     render: () => {
                //         return <DownloadOutlined/>
                //     }
                // },
                {
                    title: 'Differential',
                    key: '',
                    dataIndex: '',
                    width: '100px',
                    render: (_,row) => {
                        return <DownloadOutlined onClick={() => handleDifferntial(row)}/>
                    }
                }
            ]);
            setDataSource([
                {
                    key:'',
                    teams: '',
                    status: ''
                }
            ])
        }else{
            setColumns([
                {
                    title: 'Brand Manager',
                    key: 'brandManager',
                    dataIndex: 'ownerName',
                    width: '100px',
                    ...getColumnSearchProps('ownerName'),
                },
                {
                    title: 'Title',
                    key:'title',
                    dataIndex: 'planName',
                    width:'200px',
                    ...getColumnSearchProps('planName'),
                },
                {
                    title: 'Invoice Status',
                    key: 'invoiceStatus',
                    dataIndex: 'planInvoiceStatus',
                    width:'100px',
                    ...getColumnSearchProps('planInvoiceStatus'),
                },
                {
                    title: 'Approval Date',
                    key: 'approvalDate',
                    dataIndex: 'approvalDate',
                    width:'100px',
                    ...getColumnSearchProps('approvalDate'),
                },
                {
                    title: 'Differential',
                    key: '',
                    dataIndex: '',
                    width: '100px',
                    render: (_,row) => {
                        return <DownloadOutlined onClick={() => handleDifferntial(row)}/>
                    }
                }
            ]);
            setDataSource([
                {
                    key:'',
                    brandManager: '',
                    title: '',
                    invoiceStatus: '',
                    approvalDate: ''
                }
            ])
        }
    }

    let pivotData = {
        "describe": "description",
        "fields": {
            "rows": [
                "teamName",
                "planMonth",
                "recipientName",
                "recipientCode",
                "designationName",
                "recipientState",
            ],
            "columns": [
                "itemName",
            ],
            "values": [
                "dispatchedQty"
            ],
            "valueInCols": true
        },
        "meta": [
        ],
        "data": pivotTableData
    }

    useEffect(() => {
        if (picklist?.length !== 0){
            console.log(picklist)
            setPivotTableData(picklist)
            console.log("data has been changed")
            console.log(typeof picklist)
            setPivoTable(true)
        }
    },[picklist])

    useEffect(() => {
        if (picklistVirtual?.length !== 0){
            console.log(picklistVirtual)
            setPivotTableData(picklistVirtual)
            console.log("data has been changed")
            console.log(typeof picklist)
            setPivoTable(true)
        }
    },[picklistVirtual])

    useEffect(() => {
        console.log(pivotData)
    },[pivotData])

    useEffect(() => {
        console.log(pivotTableData)
    },[pivotTableData])


    const getPickingList = () => {
        /*console.log(year);
        console.log(month);
        console.log(dispatchType);
        console.log(pickinglist);*/
        handleLoadList ({
            year:year,
            month:month,
            dispatchType:dispatchType,
            certificate: authInfo.token
        });
        setPivoTable(false)
        setPivotTableData(undefined)
        searchData()
    }

    const handleDifferntial = (row) => {
        console.log(row.teamID)
        if (dispatchType === "0") {
            handlePickList({
                year:year,
                month:month,
                teamId: row.teamID,
                isSpecial: dispatchType,
                certificate: authInfo.token
            })
        }
        if (dispatchType === "1") {
            handlePickList({
                year:year,
                month:month,
                teamId: row.planID,
                isSpecial: dispatchType,
                certificate: authInfo.token
            })
        }
        if (dispatchType === "Virtual") {
            handlePickListVirtual({
                year:year,
                month:month,
                teamId: row.planID,
                isSpecial: 1,
                certificate: authInfo.token
            })
        }
        setPivoTable(true)
    }

    const s2Options = {
        width: 1700,
        height: 700,
        interaction: {
            enableCopy: true,
        },
    };

    useEffect(() => {
        console.log(`This is ${picklistVirtual}`)
        console.log(picklistVirtual)
    },[picklistVirtual])


    return(
        <div>
            <TitleWidget title={'Picking Slip'} />
            <Row gutter={[16,16]}>
                <Col span={2}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)} />
                </Col>
                <Col span={2}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    <SelectDispatchTypeComponent desgId={profileInfo.userDesignation.id}  value={dispatchType} onChange={(e) => setDispatchType(e)}/>
                </Col>
                <Col span={1.5}>
                    <Button type={'primary'}
                        style={{width: "100%"}}
                        onClick = {() => getPickingList()} >Submit</Button>
                </Col>

                {/*{if (dispatchType === "0") {*/}
                {/*    */}
                {/*}}*/}

                <Col span={1.5}>
                    <Button type={'primary'} onClick = {() => setPivoTable(false)} style={{width: "100%"}}>Back</Button>
                </Col>
            </Row>
            <br/><br/><br/>

            {
                pivoTable ?
                    <SheetComponent dataCfg={pivotData} options={s2Options} header={{
                        exportCfg: {
                            open: true,
                        },
                    }}
                    /> : <Table dataSource={pickinglist} columns={columns}></Table>
            }

            <Modal title={'Status By Brand Manager'} isOpen={statusBox} onOk={() => {
                setStatusBox(false); setStatusData(undefined);
            }} onCancel={() => {
                setStatusBox(false); setStatusData(undefined);
            }} visible={statusBox} width={900}>
                <Table columns={modalColumns} dataSource={statusData}/>
            </Modal>
        </div>
    )
}


PickingSlipComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    pickinglist:PropTypes.array,
    picklist:PropTypes.array,
    picklistVirtual:PropTypes.array,
    picklistStatus:PropTypes.array,
    loading:PropTypes.any,
    picklistloading:PropTypes.any,
    picklistVirtualloading:PropTypes.any,
    picklistStatusloading:PropTypes.any,
    handleLoadList:PropTypes.func,
    handlePickList:PropTypes.func,
    handlePickListVirtual:PropTypes.func,
    handlePickListStatus:PropTypes.func,
}


const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const pickinglist = selectPickinglistData(state)
    const loading = selectLoadingData(state)
    const picklist = selectPicklistData(state)
    const picklistloading = selectPickLoadingData(state)
    const picklistVirtual = selectPicklistVirtualData(state)
    const picklistVirtualloading = selectPickVirtualLoadingData(state)
    const picklistStatus = selectPicklistStatusData(state)
    const picklistStatusloading = selectPickStatusLoadingData(state)

    return {authInfo,pickinglist,loading,profileInfo,picklist,picklistloading,picklistVirtual,picklistVirtualloading,picklistStatus,picklistStatusloading}
}


const actions = {
    handleLoadList : getPickinglistStartAction,
    handlePickList : getPicklistStartAction,
    handlePickListVirtual : getPicklistVirtualStartAction,
    handlePickListStatus : getPicklistStatusStartAction,
}


export default connect(mapState, actions)(PickingSlipComponent)
