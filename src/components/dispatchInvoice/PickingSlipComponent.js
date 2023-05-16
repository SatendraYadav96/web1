import React, {useState,useEffect} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {getPickinglistStartAction, getPicklistStartAction, getPicklistVirtualStartAction} from '../../redux/actions/dispatchInvoice/picklistAction'
import {connect} from "react-redux";
import {Button, Col, Modal, Row, Table} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectDispatchTypeComponent from "../widgets/SelectDispatchTypeComponent";
import {selectPicklistData, selectLoadingData, selectPickinglistData, selectPickLoadingData, selectPicklistVirtualData} from "../../redux/selectors/picklistSelector"
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {SheetComponent} from "@antv/s2-react";
import {setLang} from "@antv/s2";



const PickingSlipComponent = ({authInfo,pickinglist,loading,handleLoadList,profileInfo,picklist,picklistloading,handlePickList,picklistVirtual,picklistVirtualloading,handlePickListVirtual}) => {
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
    const [flag, setFlag] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [statusBox, setStatusBox] = useState(false)

    const statusByBrandManager = () =>{
        setStatusBox(true)
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
                    width: '200px'
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'status',
                    width: '500px',
                    render: (_, {status}) => {
                        return <Button type="link" onClick={() => statusByBrandManager()}>{status}</Button>
                    }
                },
                {
                    title: 'Common',
                    key: '',
                    dataIndex: '',
                    width: '100px',
                    render: () => {
                        return <DownloadOutlined/>
                    }
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
                    width: '100px'
                },
                {
                    title: 'Title',
                    key:'title',
                    dataIndex: 'planName',
                    width:'200px'
                },
                {
                    title: 'Invoice Status',
                    key: 'invoiceStatus',
                    dataIndex: 'planInvoiceStatus',
                    width:'100px'
                },
                {
                    title: 'Approval Date',
                    key: 'approvalDate',
                    dataIndex: 'approvalDate',
                    width:'100px'
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
        if (picklist.length !== 0){
            console.log(picklist)
            setPivotTableData(picklist)
            console.log("data has been changed")
            console.log(typeof picklist)
            setPivoTable(true)
        }
    },[picklist])

    useEffect(() => {
        console.log(pivotData)
    },[pivotData])

    useEffect(() => {
        console.log(pivotTableData)
    },[pivotTableData])

    const statusColumn = [
        {
            title: 'Brand',
            key:'brand',
            dataIndex: 'brand',
            width: '50px;'
        },
        {
            title: 'Status',
            key:'status',
            dataIndex: 'status',
            width: '50px;'
        }

    ]

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
        searchData()
    }

    const handleDifferntial = (row) => {
        if (dispatchType !== "Virtual") {
            handlePickList({
                year:year,
                month:month,
                teamId: row.planID,
                isSpecial: dispatchType,
                certificate: authInfo.token
            })
        } if (dispatchType === "Virtual") {
            handlePickListVirtual({
                year:year,
                month:month,
                teamId: row.planID,
                isSpecial: dispatchType,
                certificate: authInfo.token
            })
        }
    }

    const s2Options = {
        width: 2000,
        height: 480,
        interaction: {
            enableCopy: true,
        },
    };


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

            <Modal title={'Status By Brand Manager'} onOk={() => setStatusBox(false)} onCancel={() => setStatusBox(false)} visible={statusBox}>
                <Table columns={statusColumn}/>
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
    loading:PropTypes.any,
    picklistloading:PropTypes.any,
    picklistVirtualloading:PropTypes.any,
    handleLoadList:PropTypes.func,
    handlePickList:PropTypes.func,
    handlePickListVirtual:PropTypes.func,
}


const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const pickinglist = selectPickinglistData(state)
    const loading = selectLoadingData(state)
    const picklist = selectPicklistData(state)
    const picklistloading = selectPickLoadingData(state)
    const picklistVirtual = selectPicklistVirtualData(state)
    const picklistVirtualloading = selectPickLoadingData(state)

    return {authInfo,pickinglist,loading,profileInfo,picklist,picklistloading,picklistVirtual,picklistVirtualloading}
}


const actions = {
    handleLoadList : getPickinglistStartAction,
    handlePickList : getPicklistStartAction,
    handlePickListVirtual : getPicklistVirtualStartAction,
}


export default connect(mapState, actions)(PickingSlipComponent)
