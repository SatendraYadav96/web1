import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import { getVendorStartAction  } from '../../../redux/actions/master/masterActions';
import {selectVendorListData,selectLoadingVendorData} from "../../../redux/selectors/masterSelector";
import { CSVLink } from "react-csv";
import XLSX from "xlsx"

const VendorComponent = ({authInfo,profileInfo,vendorList,vendorLoading,handleVendorList}) => {

    const navigate = useNavigate()
    const [status, setStatus] = useState(1)
    const [column, setColumn] = useState([])
    const [data, setData] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [exportData, setExportData] = useState([])
    const [flag, setFlag] = useState(false)


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Vendor Name',
                key: 'vendorName',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Vendor Code',
                key: 'vendorCode',
                dataIndex: 'code',
                width: '100px'
            },
            {
                title: 'Address 1',
                key: 'address1',
                dataIndex: 'addressLine1',
                width: '100px'
            },
            {
                title: 'Address 2',
                key: 'address2',
                dataIndex: 'addressLine2',
                width: '100px'
            },
            {
                title: 'City',
                key: 'city',
                dataIndex: 'city',
                width: '100px'
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width: '100px'
            },
            {
                title: 'Zip',
                key: 'zip',
                dataIndex: 'zip',
                width: '100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />}    onClick={ () => editVendor(row)}  ></Button>
                }
            }
        ]);
        setDataSource([
            {
                key: '',
                vendorName: '',
                vendorCode: '',
                address1:'',
                address2:'',
                city: '',
                state: '',
                zip: ''
            }
        ])
    }
    const createVendor = () => {
        return navigate("/home/masters/vendor/create")
    }
    const editVendor = (row) => {
        console.log(row);
        return navigate(`/home/masters/vendor/edit/${row.id}`)
    }

    const getVendorList = () => {
        console.log(status);
        console.log(vendorList);

        handleVendorList ({
        status:status,
        vendor:vendorList,
        certificate: authInfo.token
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"VendorList.xlsx")
    }

    useEffect(() => {
        setData(vendorList.map(item => {
            return {
                vendorName: item.name,
                vendorCode: item.code,
                address1: item.addressLine1,
                address2: item.addressLine2,
                city: item.city,
                state: item.state,
                zip: item.zip
            }
        }))
    },[vendorList])

    useEffect(() => {
        console.log(data)
    },[data])


    return(
        <>
          <TitleWidget title={"Vendor"}/>
            <Row gutter={[16,16]}>
                <Col span={3}>
                     <SelectStatusComponent style={{width:'180px'}} value={status} onChange={(e) => setStatus(e)} />
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={getVendorList}>Search</Button>
                </Col>
                <Col span={1}>
                    <Button icon={<PlusOutlined />} onClick={()=> createVendor()}></Button>
                </Col>
                {/*<Col span={18}>*/}
                {/*    <div align="right">*/}
                {/*        <Input.Search style={{ width: 300}} />*/}
                {/*    </div>*/}
                {/*</Col>*/}
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    <CSVLink
                        data={data}
                        filename={"vendor.csv"}
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
                {/*<Col span={12}></Col>*/}
                {/*<Col span={6}><Input.Search/></Col>*/}
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={vendorList} />
            }
        </>
    )
}

VendorComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    vendorList: PropTypes.array,
    vendorLoading: PropTypes.any,
    handleVendorList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const vendorList = selectVendorListData(state)
    const vendorLoading = selectLoadingVendorData(state)

    return {authInfo,vendorList,vendorLoading,profileInfo}

}

const actions = {

handleVendorList: getVendorStartAction,


}

export default connect(mapState, actions) (VendorComponent)
