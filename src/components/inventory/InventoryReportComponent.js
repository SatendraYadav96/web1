import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import {selectSimpleInventoryListData, selectLoadingSimpleInventoryReportData} from "../../redux/selectors/simpleInventoryReportSelector";
import {getSimpleInventoryReportStartAction} from "../../redux/actions/reports/simpleInventoryReportActions";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const InventoryReportComponent = ({authInfo, profileInfo,simpleInventoryList,simpleInventoryReportLoading,handleSimpleInventoryReportList}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [data, setData] = useState()


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Team',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px'
            },
            {
                title:'SubTeam',
                key:'division',
                dataIndex:'division',
                width:'100px'
            },{
                title:'Cost Center',
                key:'costCenter',
                dataIndex:'costCenter',
                width:'100px'
            },
            {
                title:'Category',
                key:'category',
                dataIndex:'category',
                width:'100px'
            },
            {
                title:'Product Code',
                key:'productCode',
                dataIndex:'productCode',
                width:'100px'
            },
            {
                title:'Product Name',
                key:'inputName',
                dataIndex:'productName',
                width:'100px'
            },

            {
                title:'GRN Date',
                key:'grnData',
                dataIndex:'grnDate',
                width:'100px'
            },
            {
                title:'Medical Code',
                key:'medicalCode',
                dataIndex:'medicalCode',
                width:'100px'
            },
            {
                title:'PO No',
                key:'poNo',
                dataIndex:'poNo',
                width:'100px'
            },
            {
                title:'Batch No',
                key:'batchNo',
                dataIndex:'batchNo',
                width:'100px'
            },
            {
                title:'Expiry date',
                key:'expiryDate',
                dataIndex:'expiryDate',
                width:'100px'
            },
            {
                title:'Base Pack',
                key:'basePack',
                dataIndex:'basePack',
                width:'100px'
            },
            {
                title:'Rate',
                key:'rate',
                dataIndex:'rate',
                width:'100px'
            },
            {
                title:'Received Quantity',
                key:'receivedQuantity',
                dataIndex:'receivedQuantity',
                width:'100px'
            },
            {
                title:'Allocated Quantity',
                key:'allocatedQuantity',
                dataIndex:'allocatedQuantity',
                width:'100px'
            },
            {
                title:'Dispatched Quantity',
                key:'dispatchedQuantity',
                dataIndex:'dispatchedQuantity',
                width:'100px'
            },

            {
                title:'Allocation Balance',
                key:'allocationBalance',
                dataIndex:'allocationBalance',
                width:'100px'
            },
            {
                title:'Physical Balance',
                key:'physicalBalance',
                dataIndex:'physicalBalance',
                width:'100px'
            },
            {
                title:'HSN Code',
                key:'hsnCode',
                dataIndex:'hsnCode',
                width:'100px'
            },
            {
                title:'GST Rate',
                key:'gstRate',
                dataIndex:'gstRate',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"SimpleInventoryReport.xlsx")
    }

    useEffect(() => {
        setData(simpleInventoryList.map(item => {
            return {
                team: item.businessUnit,
                subTeam: item.division,
                costCenterName: item.costCenter,
                category: item.category,
                productCode: item.productCode,
                productName: item.productName,
                grnDate: item.grnDate,
                medicalCode: item.medicalCode,
                poNo: item.poNo,
                batchNo: item.batchNo,
                expiryDate: item.expiryDate,
                basePack: item.basePack,
                rate: item.rate,
                receivedQuantity: item.receivedQuantity,
                allocatedQuantity: item.allocatedQuantity,
                dispatchedQuantity: item.dispatchedQuantity,
                allocationBalance: item.allocationBalance,
                physicalBalance: item.physicalBalance,
                hsnCode: item.hsnCode,
                gstRate: item.gstRate,
            }
        }))
        console.log(simpleInventoryList)
    },[simpleInventoryList])

    const getInventoryReport = () => {
        handleSimpleInventoryReportList({
            businessUnit:businessUnit,
            divison: division,
            userId: profileInfo.id,
            userDesgId: profileInfo.userDesignation.id,
            certificate: authInfo.token
        })
        searchData()
    }

    return(
        <>
            <TitleWidget title="Inventory Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Business Unit <br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} />
                </Col>
                <Col span={3}>
                    Division <br/>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getInventoryReport()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"SimpleInventoryReport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{width: 300}}/>
                    </div>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} dataSource={simpleInventoryList}/>
            }
        </>
    )

}

InventoryReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    simpleInventoryList:PropTypes.array,
    simpleInventoryReportLoading:PropTypes.any,
    handleSimpleInventoryReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const simpleInventoryList = selectSimpleInventoryListData(state)
    const simpleInventoryReportLoading = selectLoadingSimpleInventoryReportData(state)
    return {authInfo,simpleInventoryList,simpleInventoryReportLoading,profileInfo}
}

const actions = {
    handleSimpleInventoryReportList : getSimpleInventoryReportStartAction

}

export default connect(mapState, actions)(InventoryReportComponent)
