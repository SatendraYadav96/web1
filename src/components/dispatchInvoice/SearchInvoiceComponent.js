import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import { FileOutlined} from "@ant-design/icons";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {selectInvoiceListData} from "../../redux/selectors/monthlyDispatchSelector";
import {selectLoadingSearchInvoiceData, selectSearchListData} from "../../redux/selectors/searchInvoiceSelector";
import {getEmployeeInvoiceDetailStartAction} from "../../redux/actions/dispatchInvoice/monthlyDispatchAction";
import {searchInvoiceStartAction} from "../../redux/actions/dispatchInvoice/searchInvoiceAction";
import SelectRecipientComponent from "../widgets/SelectRecipientCodeComponent";
import SelectRecipientCodeComponent from "../widgets/SelectRecipientCodeComponent";
import SelectInvoiceComponent from "../widgets/SelectInvoiceComponent";

const SearchInvoiceComponent = ({authInfo,profileInfo,searchInvoiceList,searchInvoiceLoading,handleInvoiceList}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [recipientCode, setRecipientCode] = useState("")
    const [invoiceNo, setInvoiceNo] = useState("")

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Invoice Number',
                key: 'searchNumber',
                dataIndex: 'invoiceNo',
                width:'100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width:'200px',
                render:()=>{
                    return <Button icon={<FileOutlined/>}></Button>
                }
            }
        ]);
        setDataSource([
            {
                key:'',
                searchNumber:''
            }
        ])
    }

        const searchInv = () => {
            console.log(searchInvoiceList);
            const data = {
                monthIndex: month,
                yearIndex: year,
                recipientId: recipientCode,
                invoiceNo: invoiceNo,
            }



            handleInvoiceList({
                searchInvoice: data,
                certificate: authInfo.token
            });
            searchData()
        }


    return(
        <>
            <TitleWidget title={'Search Invoice'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    <SelectRecipientCodeComponent value={recipientCode} onChange={(e) => setRecipientCode(e)}/>
                </Col>
                <Col span={3}>
                    <Input placeholder={"Recipient Name"} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <SelectInvoiceComponent value={invoiceNo} onChange={(e) => setInvoiceNo(e)}/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={() => searchInv()}>Submit</Button>
                </Col>
            </Row>
            {flag &&
                <Table columns={column} dataSource={searchInvoiceList}/>
            }
        </>
    )
}

SearchInvoiceComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    searchInvoiceList:PropTypes.array,
    searchInvoiceLoading:PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const searchInvoiceList = selectSearchListData(state)
    const searchInvoiceLoading = selectLoadingSearchInvoiceData(state)
    return {authInfo,profileInfo,searchInvoiceList,searchInvoiceLoading}
}

const actions = {
    handleInvoiceList: searchInvoiceStartAction,
}

export default connect(mapState, actions)(SearchInvoiceComponent)
