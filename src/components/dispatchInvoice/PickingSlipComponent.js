import React, {useState,useEffect} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import { getPicklistStartAction } from '../../redux/actions/dispatchInvoice/picklistAction'
import {connect} from "react-redux";
import {Button, Col, Modal, Row, Table} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectDispatchTypeComponent from "../widgets/SelectDispatchTypeComponent";
import {selectPicklistData,selectLoadingData} from "../../redux/selectors/picklistSelector"
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";



const PickingSlipComponent = ({authInfo,picklist,loading,handleLoadList,profileInfo}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;

    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [dispatchType, setDispatchType] = useState()
    const [columns, setColumns] = useState([])
    const [flag, setFlag] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [statusBox, setStatusBox] = useState(false)

    const statusByBrandManager = () =>{
        setStatusBox(true)
    }

    const searchData = () => {
        console.log(year)
        console.log(month)
        console.log(dispatchType)
        setFlag(true)
        if(dispatchType === "0"){
            setColumns([
                {
                    title: 'Teams',
                    key: 'teams',
                    dataIndex: 'team',
                    width: '200px'
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'status',
                    width: '500px',
                    render: (_, {status}) => {
                        return <Button type="link" onClick={() => statusByBrandManager()}>{status}</Button>
                    }
                },
                {
                    title: 'Common',
                    key: '',
                    dataIndex: '',
                    width: '100px',
                    render: () => {
                        return <DownloadOutlined/>
                    }
                },
                {
                    title: 'Differential',
                    key: '',
                    dataIndex: '',
                    width: '100px',
                    render: () => {
                        return <DownloadOutlined/>
                    }
                }
            ]);
            setDataSource([
                {
                    key:'',
                    teams: '',
                    status: ''
                }
            ])
        }else{
            setColumns([
                {
                    title: 'Brand Manager',
                    key: 'brandManager',
                    dataIndex: 'ownerName',
                    width: '100px'
                },
                {
                    title: 'Title',
                    key:'title',
                    dataIndex: 'planName',
                    width:'200px'
                },
                {
                    title: 'Invoice Status',
                    key: 'invoiceStatus',
                    dataIndex: 'planInvoiceStatus',
                    width:'100px'
                },
                {
                    title: 'Approval Date',
                    key: 'approvalDate',
                    dataIndex: 'approvalDate',
                    width:'100px'
                },
                {
                    title: 'Differential',
                    key: '',
                    dataIndex: '',
                    width: '100px',
                    render: () => {
                        return <DownloadOutlined/>
                    }
                }
            ]);
            setDataSource([
                {
                    key:'',
                    brandManager: '',
                    title: '',
                    invoiceStatus: '',
                    approvalDate: ''
                }
            ])
        }
    }


    const statusColumn = [
        {
            title: 'Brand',
            key:'brand',
            dataIndex: 'brand',
            width: '50px;'
        },
        {
            title: 'Status',
            key:'status',
            dataIndex: 'status',
            width: '50px;'
        }

    ]

const getPickingList = () => {
    /*console.log(year);
    console.log(month);
    console.log(dispatchType);
    console.log(picklist);*/
    handleLoadList ({
    year:year,
    month:month,
    dispatchType:dispatchType,
    certificate: authInfo.token
    });
    searchData()

}





    return(
        <div>
            <TitleWidget title={'Picking Slip'} />
            <Row gutter={[16,16]}>
                <Col span={3}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)} />
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={4}>
                    <SelectDispatchTypeComponent desgId={profileInfo.userDesignation.id} style={{width: "100%"}} value={dispatchType} onChange={(e) => setDispatchType(e)}/>
                </Col>
                <Col span={4}>
                    <Button type={'primary'}

                     onClick = {() => getPickingList()} >Submit</Button>
                </Col>
            </Row>
            <br/><br/><br/>


             <Table dataSource={picklist} columns={columns}></Table>


            <Modal title={'Status By Brand Manager'} onOk={() => setStatusBox(false)} onCancel={() => setStatusBox(false)} visible={statusBox}>
                <Table columns={statusColumn}/>
            </Modal>
        </div>
    )
}


PickingSlipComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    picklist:PropTypes.array,
    loading:PropTypes.any,
    handleLoadList:PropTypes.func


}


const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const picklist = selectPicklistData(state)
    console.log(picklist)
    const loading = selectLoadingData(state)

    return {authInfo,picklist, loading,profileInfo}
}


const actions = {
handleLoadList : getPicklistStartAction

}


export default connect(mapState, actions)(PickingSlipComponent)
