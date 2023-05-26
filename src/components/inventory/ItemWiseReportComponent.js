import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";
import moment from "moment";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import {selectItemWiseListData, selectLoadingItemWiseReportData} from "../../redux/selectors/itemWiseReportSelector";
import {getItemWiseReportStartAction} from "../../redux/actions/reports/itemWiseReportActions";
import {CSVLink} from "react-csv"
import XLSX from "xlsx"

const ItemWiseReportComponent = ({authInfo,profileInfo,itemWiseList,itemWiseReportLoading,handleItemWiseReportList}) => {

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState()

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Team',
                key:'businessUnit',
                dataIndex:'busineesUnit',
                width:'100px'
            },
            {
                title:'Sub Team',
                key:'division',
                dataIndex:'division',
                width:'100px'
            },
            {
                title:'Item Name',
                key:'itemName',
                dataIndex:'itemName',
                width:'100px'
            },
            {
                title:'Category',
                key:'category',
                dataIndex:'category',
                width:'100px'
            },
            {
                title:'Item Code',
                key:'itemCode',
                dataIndex:'itemCode',
                width:'100px'
            },
            {
                title:'Opening Quantity',
                key:'openingQuantity',
                dataIndex:'openingQuantity',
                width:'100px'
            },
            {
                title:'Received Quantity',
                key:'receivedQuantity',
                dataIndex:'receivedQuantity',
                width:'100px'
            },
            {
                title:'Dispatched Quantity',
                key:'dispatchedQuantity',
                dataIndex:'dispatchedQuantity',
                width:'100px'
            },
            {
                title:'Closing Quantity',
                key:'closingQuantity',
                dataIndex:'closingQuantity',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    const formatedToDateString = moment(toDate).format('yyyy-MM-DD').toString();
    const formatedFromDateString = moment(fromDate).format('yyyy-MM-DD').toString();

    const getItemWiseReport = () => {
        console.log(fromDate);
        console.log(toDate);
        console.log(businessUnit);
        console.log(division);

        handleItemWiseReportList ({
            fromDate: formatedToDateString,
            toDate: formatedFromDateString,
            divison: division,
            businessUnit:businessUnit,
            certificate: authInfo.token
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"ItemWiseReport.xlsx")
    }

    useEffect(() => {
        setData(itemWiseList.map(item => {
            return {
                businessUnit: item.busineesUnit,
                division: item.division,
                itemName: item.itemName,
                category: item.category,
                itemCode: item.itemCode,
                openingQuantity: item.openingQuantity,
                receivedQuantity: item.receivedQuantity,
                dispatchedQuantity: item.dispatchedQuantity,
                closingQuantity: item.closingQuantity,
            }
        }))
        console.log(itemWiseList)
    },[itemWiseList])

    useEffect(() => {
        console.log(itemWiseList)
    },[itemWiseList])

    useEffect(() => {
        console.log(toDate)
    },[toDate])

    const handleToDate = (date,dateString) => {
        setToDate(dateString)
        console.log(dateString)
    }

    const handleFromDate = (date,dateString) => {
        setFromDate(dateString)
        console.log(dateString)
    }

    return(
        <>
            <TitleWidget title="Item Wise Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)}  />
                </Col>
                <Col span={3}>
                    SubTeam <br/>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />
                </Col>

                <Col span={3}>
                    Date From: <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    Date To: <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getItemWiseReport()}>Search</Button>
                </Col>

            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"ItemWiseReport.csv"}
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
                {/*<Col span={6}><Input.Search/></Col>*/}
            </Row>
            <br/>
            {flag &&
                <Table columns={column} dataSource={itemWiseList}/>
            }
        </>
    )

}

ItemWiseReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    itemWiseList:PropTypes.array,
    itemWiseReportLoading:PropTypes.any,
    handleItemWiseReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const itemWiseList = selectItemWiseListData(state)
    const itemWiseReportLoading = selectLoadingItemWiseReportData(state)
    return {authInfo,profileInfo,itemWiseList,itemWiseReportLoading}
}

const actions = {
    handleItemWiseReportList : getItemWiseReportStartAction
}

export default connect(mapState, actions)(ItemWiseReportComponent)
