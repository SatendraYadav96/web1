import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import {selectNearToExpiryInputListData, selectLoadingNearToExpiryInputReportData} from "../../redux/selectors/nearToExpiryInputSelector";
import {getNearToExpiryInputReportStartAction} from "../../redux/actions/reports/nearToExpiryInputReportActions";
import {CSVLink} from "react-csv";
import XLSX from "xlsx"

const NearToExpiryReportComponent = ({authInfo,profileInfo,nearToExpiryInputList,nearToExpiryInputReportLoading,handleNearToExpiryInputReportList}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState()
    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Business Unit',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px'
            },
            {
                title:'Division',
                key:'division',
                dataIndex:'division',
                width:'100px'
            },{
                title:'Cost Center',
                key:'costCenter',
                dataIndex:'costCenterName',
                width:'100px'
            },
            {
                title:'Item Code',
                key:'itemCode',
                dataIndex:'productCode',
                width:'100px'
            },
            {
                title:'Item Name',
                key:'itemName',
                dataIndex:'productName',
                width:'100px'
            },
            {
                title:'Item Category',
                key:'itemCategory',
                dataIndex:'category',
                width:'100px'
            },
            {
                title:'(180-270) days',
                key:'',
                dataIndex:'aboveHundredEighty',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'aboveHundredEightyValue',
                width:'100px'
            },
            {
                title:'(271-365) days',
                key:'',
                dataIndex:'aboveTwoHundredSeventy',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'aboveTwoHundredSeventyValue',
                width:'100px'
            },
            {
                title:'(>365) days',
                key:'',
                dataIndex:'aboveOneYear',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'aboveOneYearValue',
                width:'100px'
            },
            {
                title:'Total Stock',
                key:'totalStock',
                dataIndex:'totalQuantity',
                width:'100px'
            },
            {
                title:'Total Value',
                key:'totalValue',
                dataIndex:'totalValue',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"NearToExpiryInputReport.xlsx")
    }

    useEffect(() => {
        setData(nearToExpiryInputList.map(item => {
            return {
                businessUnit: item.businessUnit,
                division: item.division,
                costCenterName: item.costCenterName,
                productCode: item.productCode,
                productName: item.productName,
                category: item.category,
                "(180-270) days": item.aboveHundredEightyValue,
                '(271-365) days': item.aboveTwoHundredSeventyValue,
                '(>365) days': item.aboveOneYearValue,
                totalQuantity: item.totalQuantity,
                totalValue: item.totalValue,
            }
        }))
        console.log(nearToExpiryInputList)
    },[nearToExpiryInputList])

    const getNearToExpiryInputReportList = () => {
        handleNearToExpiryInputReportList ({
            businessUnit:businessUnit,
            userId: profileInfo.id,
            userDesgId: profileInfo.userDesignation.id,
            divison: division,
            type: "Input",
            certificate: authInfo.token
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title="Near To Expiry Report Input" />
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
                    <Button type={"primary"} onClick={()=>getNearToExpiryInputReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"AgeingReport.csv"}
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
                <Table columns={column} dataSource={nearToExpiryInputList}/>
            }
        </>
    )

}

NearToExpiryReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    nearToExpiryInputList:PropTypes.array,
    nearToExpiryInputReportLoading:PropTypes.any,
    handleNearToExpiryInputReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const nearToExpiryInputList = selectNearToExpiryInputListData(state)
    const nearToExpiryInputReportLoading = selectLoadingNearToExpiryInputReportData(state)
    return {authInfo,nearToExpiryInputList,nearToExpiryInputReportLoading,profileInfo}
}

const actions = {
    handleNearToExpiryInputReportList : getNearToExpiryInputReportStartAction
}

export default connect(mapState, actions)(NearToExpiryReportComponent)
