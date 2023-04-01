import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import { getVendorStartAction , getVendorByIdStartAction } from '../../../redux/actions/master/masterActions';
import {selectVendorListData,selectLoadingVendorData,selectVendorByIdListData,selectLoadingVendorByIdData} from "../../../redux/selectors/masterSelector";

const VendorComponent = ({authInfo,profileInfo,vendorList,vendorLoading,handleVendorList,vendorById,vendorByIdLoading,handleVendorByIdList}) => {

    const navigate = useNavigate()
    const [status, setStatus] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [id, setId] = useState()

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
                render: () => {
                    return <Button icon={<EditOutlined />}    onClick={() => getVendorByIdList()}  ></Button>
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

    const editVendor = () => {
        return navigate("/home/masters/vendor/edit")
    }








    const getVendorList = () => {
                     console.log(status);
                     console.log(vendorList);

                    handleVendorList ({
                    status:status,
                    certificate: authInfo.token
                    });
                    searchData()

                }


    const getVendorByIdList = (event) => {
    console.log(event.target.id);
    console.log(vendorById)

    handleVendorByIdList ({
    id:id,
    certificate: authInfo.token
    });
    }




    return(
        <>
          <TitleWidget title={"Master - Vendors"}/>
            <Row gutter={[8,8]}>
                <Col span={4}>
                     <SelectStatusComponent style={{width:'150px'}} value={status} onChange={(e) => setStatus(e)} />
                </Col>
                <Col span={4}>
                    <Button type={"primary"} onClick={() => getVendorList()}>Search</Button>
                </Col>
                <Col span={14}></Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createVendor()}></Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
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
                vendorList:PropTypes.array,
                vendorLoading:PropTypes.any,
                handleVendorList:PropTypes.func,
                vendorById:PropTypes.array,
                vendorByIdLoading:PropTypes.any,
                handleVendorByIdList:PropTypes.func
}

const mapState = (state) => {
            const authInfo = selectAuthInfo(state)
            const profileInfo = selectProfileInfo(state)
            const vendorList = selectVendorListData(state)
            const vendorLoading = selectLoadingVendorData(state)
            const vendorById = selectVendorByIdListData(state)
            const vendorByIdLoading = selectLoadingVendorByIdData(state)
            return {authInfo,vendorList,vendorLoading,profileInfo,vendorById,vendorByIdLoading}

}

const actions = {

handleVendorList: getVendorStartAction,
handleVendorByIdList: getVendorByIdStartAction

}

export default connect(mapState, actions) (VendorComponent)
