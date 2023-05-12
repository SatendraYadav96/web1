import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import {selectAgeingListData, selectLoadingAgeingReportData} from "../../redux/selectors/ageingReportSelector";
import {getAgeingReportStartAction} from "../../redux/actions/reports/ageingReportActions";
import {CSVLink} from "react-csv";
import XLSX from "xlsx"

const AgeingReportComponent = ({authInfo,profileInfo,ageingList,ageingReportLoading,handleAgeingReportList}) => {

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
                title:'(0-30) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(31-60) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(61-90) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(91-120) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(>120) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },

            {
                title:'Total Quantity',
                key:'totalQuantity',
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
        XLSX.writeFile(wb,"AgeingReport.xlsx")
    }

    useEffect(() => {
        setData(ageingList.map(item => {
            return {
                team: item.businessUnit,
                subTeam: item.division,
                costCenterName: item.costCenterName,
                productCode: item.productCode,
                productName: item.productName,
                category: item.category,
                totalQuantity: item.totalQuantity,
                totalValue: item.totalValue,
            }
        }))
        console.log(ageingList)
    },[ageingList])

    const getAgeingReportList = () => {
        handleAgeingReportList ({
            businessUnit:businessUnit,
            userId: profileInfo.id,
            userDesgId: profileInfo.userDesignation.id,
            divison: division,
            certificate: authInfo.token
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title="Ageing Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} />
                </Col>
                <Col span={3}>
                    SubTeam <br/>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getAgeingReportList()}>Search</Button>
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
                <Table columns={column} dataSource={ageingList}/>
            }
        </>
    )

}

AgeingReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    ageingList:PropTypes.array,
    ageingReportLoading:PropTypes.any,
    handleAgeingReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const ageingList = selectAgeingListData(state)
    const ageingReportLoading = selectLoadingAgeingReportData(state)
    return {authInfo,ageingList,ageingReportLoading,profileInfo}
}

const actions = {
    handleAgeingReportList : getAgeingReportStartAction
}

export default connect(mapState, actions)(AgeingReportComponent)
