import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import {selectCostCenterListData, selectLoadingCostCenterData} from "../../../redux/selectors/masterSelector";
import {getCostCenterStartAction, getVendorStartAction} from "../../../redux/actions/master/masterActions";
import {CSVLink} from "react-csv";
import XLSX from "xlsx"

const CostCenterComponent = ({authInfo, profileInfo,costCenterList, costCenterLoading, handleCostCenterList}) => {
    const [status, setStatus] = useState(1)
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        console.log(costCenterList)
    },[costCenterList])

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Name',
                key: 'Name',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Code',
                key: 'Code',
                dataIndex: 'code',
                width: '100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editCostCenter(row)} ></Button>
                }
            }
        ]);
        setDataSource([
            {
                key: '',
                name: '',
                code: ''
            }
        ]);
    }

    const createCostCenter = () => {
        return navigate("/home/masters/costCenter/create")
    }

    const editCostCenter = (row) => {
        return navigate(`/home/masters/costCenter/edit/${row.id}`)
    }

    const getCostCenterList = () => {
        console.log(status);
        console.log(costCenterList);

        handleCostCenterList ({
            certificate: authInfo.token,
            status:status,
            costCenter: costCenterList,
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"CostCenterList.xlsx")
    }

    useEffect(() => {
        setData(costCenterList.map(item => {
            return {
                costCenterName: item.name,
                costCenterCode: item.code,
                brand: item.brand,
            }
        }))
    },[costCenterList])

    return(
        <>
            <TitleWidget title={"Master - Cost Center"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectStatusComponent value={status} onChange={(e) => setStatus(e)} />
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getCostCenterList()}>Search</Button>
                </Col>
                <Col span={1}>
                    <Button icon={<PlusOutlined />} onClick={()=> createCostCenter()}></Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    <CSVLink
                        data={data}
                        filename={"costcenter.csv"}
                        onClick={() => {
                            console.log("clicked")
                        }}
                    >
                        <Button>CSV</Button>
                    </CSVLink>
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{ width: 300}} />
                    </div>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={costCenterList} />
            }
        </>
    )
}

CostCenterComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    costCenterList: PropTypes.array,
    costCenterLoading: PropTypes.any,
    handleCostCenterList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const costCenterList = selectCostCenterListData(state)
    const costCenterLoading = selectLoadingCostCenterData(state)

    return {authInfo,profileInfo,costCenterList,costCenterLoading}

}

const actions = {
    handleCostCenterList: getCostCenterStartAction,
}

export default connect(mapState, actions) (CostCenterComponent)
