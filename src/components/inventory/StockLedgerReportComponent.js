import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import moment from "moment/moment";
import {selectStockLedgerListData, selectLoadingStockLedgerReportData} from "../../redux/selectors/stockLedgerReportSelector";
import {getStockLedgerReportStartAction} from "../../redux/actions/reports/stockLedgerReportActions";
import SelectItemCodeStatusComponent from "../widgets/SelectItemCodeStatusComponent";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const StockLedgerReportComponent = ({authInfo,profileInfo,stockLedgerList,stockLedgerReportLoading,handleStockLedgerReportList}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [fromDate, setFromDate] = useState()
    const [data, setData] = useState()
    const [itemId, setItemId] = useState()
    const [toDate, setToDate] = useState()

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"DispatchesReport.XLSX")
    }

    useEffect(() => {
        setData(stockLedgerList?.map(item => {
            return {
                'Transaction Date': item.transactionDate,
                'Particulars': item.particulars,
                'Receipt': item.receipt,
                'Issue': item.balance,
                'Batch No': item.batchNo,
            }
        }))
        console.log(stockLedgerList)
    },[stockLedgerList])


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Transaction Date',
                key:'transactionDate',
                dataIndex:'transactionDate',
                width:'100px'
            },
            {
                title:'Particulars',
                key:'particulars',
                dataIndex:'particulars',
                width:'100px'
            },
            {
                title:'Receipt',
                key:'receipt',
                dataIndex:'receipt',
                width:'100px'
            },
            {
                title:'Issue',
                key:'issue',
                dataIndex:'issue',
                width:'100px'
            },
            {
                title:'Balance',
                key:'balance',
                dataIndex:'balance',
                width:'100px'
            },
            {
                title:'Batch No',
                key:'batchNo',
                dataIndex:'batchNo',
                width:'100px'
            }
        ])
        setDataSource([])
    }

    const formatedToDateString = moment(toDate).format('yyyy-MM-DD').toString();
    const formatedFromDateString = moment(fromDate).format('yyyy-MM-DD').toString();

    const getStockLedgerReport = () => {
        console.log(fromDate);
        console.log(toDate);

        handleStockLedgerReportList ({
            toDate: formatedToDateString,
            fromDate: formatedFromDateString,
            itemId: itemId,
            certificate: authInfo.token
        });
        searchData()
    }

    const childToParent =(childData) => {
        setItemId(childData)
    }

    useEffect(() => {
        console.log(`The Item Id is ${itemId}`)
    }, [itemId])

    return(
        <>
            <TitleWidget title="Stock Ledger Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Date From: <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>
                </Col>
                <Col span={3}>
                    Date To:<br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')}/>
                </Col>
                <Col span={8}>
                    Item Code <br/>
                    <SelectItemCodeStatusComponent childToParent={childToParent}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getStockLedgerReport()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"stockLedgerreport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{stockLedgerList?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={stockLedgerList}/>
            }
        </>
    )

}

StockLedgerReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    stockLedgerList:PropTypes.array,
    stockLedgerReportLoading:PropTypes.any,
    handleStockLedgerReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const stockLedgerList = selectStockLedgerListData(state)
    const stockLedgerReportLoading = selectLoadingStockLedgerReportData(state)
    return {authInfo,profileInfo,stockLedgerList,stockLedgerReportLoading}
}

const actions = {
    handleStockLedgerReportList : getStockLedgerReportStartAction
}

export default connect(mapState, actions)(StockLedgerReportComponent)
