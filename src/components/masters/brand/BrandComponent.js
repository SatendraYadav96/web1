import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectUserStatusComponent from "../../widgets/SelectUserStatusComponent";
import {selectBrandListData, selectUserListData} from "../../../redux/selectors/masterSelector";
import {getBrandStartAction, getUserStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const BrandComponent = ({authInfo,brandList,handleBrandList}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [status, setStatus] = useState(1)
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState()


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Code',
                key: 'code',
                dataIndex: 'code',
                width: '100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editBrand(row)}></Button>
                }
            }
        ]);

        setDataSource([
            {
                key: '1',
                name: 'ABC',
                code: ''
            }
        ])
    }

    const createBrand = () => {
        return navigate("/home/masters/brand/create")
    }

    const editBrand = (row) => {
        return navigate(`/home/masters/brand/edit/${row.id}`)
    }

    const getBrandList = () => {
        console.log(status);
        console.log(brandList);

        handleBrandList ({
            certificate: authInfo.token,
            status: status,
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"Brand.xlsx")
    }

    useEffect(() => {
        setData(brandList.map(item => {
            return {
                name: item.name,
                code: item.code,
            }
        }))
        console.log(brandList)
    },[brandList])

    return(
        <>
            <TitleWidget title={"Master - Brand"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getBrandList()} style={{width: '100%'}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createBrand()}></Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"brand.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={brandList} />
            }
        </>
    )
}

BrandComponent.propTypes = {
    authInfo: PropTypes.any,
    brandList: PropTypes.array,
    handleBrandList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const brandList = selectBrandListData(state)
    return {authInfo,brandList}
}

const actions = {
    handleBrandList: getBrandStartAction,
}

export default connect(mapState, actions) (BrandComponent)
