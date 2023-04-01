import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import {CloseCircleOutlined, InfoOutlined, SaveOutlined, ZoomInOutlined,ArrowRightOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectTeamComponent from "../widgets/SelectTeamComponent";
import SelectDispatchTypeComponent from "../widgets/SelectDispatchTypeComponent";
import SelectInvoiceTypeComponent from "../widgets/SelectInvoiceTypeComponent";
import { getEmployeeInvoiceDetailStartAction } from '../../redux/actions/dispatchInvoice/monthlyDispatchAction'
import {selectInvoiceListData,selectLoadingInvoiceDetailsData} from "../../redux/selectors/monthlyDispatchSelector"


const MonthlyDispatchDetailComponent = ({authInfo,invoiceList,invoiceDetailsLoading,handleInvoiceDetailsList,profileInfo}) => {

    const navigate = useNavigate()

    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [team, setTeam] = useState()
    const [dispatchType, setDispatchType] = useState('0')

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [status, setStatus] = useState()

    const searchData = () => {
        setFlag(true)
        if(status === "00000000-0000-0000-0000-000000000026"){
            setColumn([



                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                    fixed:'left'
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title: 'Employee',
                    key: 'employee',
                    dataIndex: 'employeeName',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title: 'Code',
                    key: 'code',
                    dataIndex: 'code',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title:'Invoice No',
                    key: 'invoiceNo',
                    dataIndex: 'invoiceNumber',
                    width: '150px',
                    fixed: 'left'
                },
                {
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
                    width: '150px',
                    fixed: 'left'
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'invoiceStatus',
                    width: '50px'
                },
                {
                    title: 'Boxes',
                    key: 'boxes',
                    dataIndex: 'boxes',
                    width: '50px',
                    render:() =>{
                        return <Input/>
                    }
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    dataIndex: 'weight',
                    width: '50px',
                    render: () =>{
                        return <Input/>
                    }
                },
                {
                    title: 'Transporter',
                    key: 'transporter',
                    dataIndex: 'transporter',
                    width: '170px'  ,
                    render: () =>{
                        return <Select placeholder="Select Transporter"></Select>
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render: () => {
                        return <Input/>
                    }
                },
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Button icon={<SaveOutlined />} ></Button>
                    }
                },
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Button icon={<InfoOutlined />} ></Button>
                    }
                }
            ]);
        }
        else if( status === "00000000-0000-0000-0000-000000000027"){
            setColumn([
                 {
                    title:'Team',
                    key: 'team',
                    dataIndex: 'teamName',
                    width:'150px',
                    fixed:'left'
                 },

                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                    fixed:'left'
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title: 'Employee',
                    key: 'employee',
                    dataIndex: 'employeeName',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title: 'Code',
                    key: 'code',
                    dataIndex: 'code',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title:'Invoice No',
                    key: 'invoiceNo',
                    dataIndex: 'invoiceNumber',
                    width: '150px',
                    fixed: 'left'
                },
                {
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
                    width: '150px',
                    fixed: 'left'
                },
                {
                    title: 'Redirected From',
                    key:'redirectedFrom',
                    dataIndex: 'redirectedFrom',
                    width:'150px'
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'invoiceStatus',
                    width: '50px'
                },
                {
                    title: 'Boxes',
                    key: 'boxes',
                    dataIndex: 'boxes',
                    width: '50px',
                    render:() =>{
                        return <Input/>
                    }
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    dataIndex: 'weight',
                    width: '50px',
                    render: () =>{
                        return <Input/>
                    }
                },
                {
                    title: 'Transporter',
                    key: 'transporter',
                    dataIndex: 'transporter',
                    width: '170px'  ,
                    render: () =>{
                        return <Select placeholder="Select Transporter"></Select>
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render: () => {
                        return <Input/>
                    }
                },
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Button icon={<ZoomInOutlined />} ></Button>
                    }
                },
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Button icon={<CloseCircleOutlined />} ></Button>
                    }
                },
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Button icon={<ArrowRightOutlined />}></Button>
                    }
                },
                {
                    title: 'Group' ,
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Checkbox/>
                    }
                },
                {
                    title: 'Print',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Checkbox/>
                    }
                }
            ]);
        }
        else{
            setColumn([

                {
                    title:'Team',
                    key: 'team',
                    dataIndex: 'teamName',
                    width:'150px',
                    fixed:'left'
                },
                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                    fixed:'left'
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title: 'Employee',
                    key: 'employee',
                    dataIndex: 'employeeName',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title: 'Code',
                    key: 'code',
                    dataIndex: 'code',
                    width:'150px',
                    fixed: 'left'
                },
                {
                    title:'Invoice No',
                    key: 'invoiceNo',
                    dataIndex: 'invoiceNumber',
                    width: '150px',
                    fixed: 'left'
                },
                {
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
                    width: '150px',
                    fixed: 'left'
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'invoiceStatus',
                    width: '50px'
                },
                {
                    title: 'Boxes',
                    key: 'boxes',
                    dataIndex: 'boxes',
                    width: '50px',
                    render:() =>{
                        return <Input/>
                    }
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    dataIndex: 'weight',
                    width: '50px',
                    render: () =>{
                        return <Input/>
                    }
                },
                {
                    title: 'Transporter',
                    key: 'transporter',
                    dataIndex: 'transporter',
                    width: '170px'  ,
                    render: () =>{
                        return <Select placeholder="Select Transporter"></Select>
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render: () => {
                        return <Input/>
                    }
                }
            ]);
        }

        setDataSource([
            {
                key:'',
                City: '',
                state: '',
                employee:'',
                code: '',
                invoiceNo:'',
                groupNo:'',
                status:'',
                boxes: '',
                weight: '',
            }
        ])
    }



      const getEmployeeInvoiceDetailsList = () => {
            console.log(year);
            console.log(month);
            //console.log(invoiceList);
            console.log(dispatchType);
            console.log(team);
            console.log(status);



            handleInvoiceDetailsList ({
            year:year,
            month:month,
            isSpecialDisp:dispatchType,
            teamId:team,
            status:status,
            certificate: authInfo.token
            });




            searchData()

        }





    const generateInvoice= () =>{
        return navigate('/home/pickingSlip/monthlyDispatch/details/invoiceUpload')
    }

    return(
        <div>
            <TitleWidget title={'Monthly Dispatch'} />
            <Row gutter={[16,16]}>
                <Col span={4}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={4}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={4}>

                    <SelectTeamComponent value={team} onChange={(e) => setTeam(e)}/>
                </Col>
                <Col span={4}>
                   <SelectInvoiceTypeComponent value={status} onChange={(e) => setStatus(e)}/>
                </Col>
                <Col span={4}>
                    <Button type={'primary'} onClick={() => getEmployeeInvoiceDetailsList()}>Submit</Button>
                </Col>
            </Row>
            <br/><br/>
            {
             status === "00000000-0000-0000-0000-000000000026" &&
            <Row gutter={[8,8]}>
                <Col span={4}>
                    <Button type={'primary'}  onClick={() => generateInvoice()}>Generate Invoices</Button>
                </Col>
                <Col span={4}>
                    <Button type={'primary'}>Export</Button>
                </Col>
                <Col span={16}></Col>
            </Row>
            }

             {
                 status === "00000000-0000-0000-0000-000000000027" &&
                        <Row gutter={[8,8]}>
                            <Col span={4}>
                                <Button type={'primary'}  onClick={() => generateInvoice()}>Group Invoice</Button>
                            </Col>
                            <Col span={4}>
                                <Button type={'primary'}>Print</Button>
                            </Col>
                            <Col span={16}></Col>
                        </Row>
                        }

            <br/><br/>
            {flag &&
                <>
                    <div align="right">
                        <Input.Search style={{ width: 304 }} />
                    </div>
                    <br/><br/>
                    <Table columns={column} dataSource={invoiceList}/>
                </>

            }

        </div>
    )
}

MonthlyDispatchDetailComponent.propTypes = {
        authInfo: PropTypes.any,
        profileInfo: PropTypes.any,
        invoiceList:PropTypes.array,
        invoiceDetailsLoading:PropTypes.any,
        handleInvoiceDetailsList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
     const profileInfo = selectProfileInfo(state)
     const invoiceList = selectInvoiceListData(state)
     //console.log(invoiceList)

     const invoiceDetailsLoading = selectLoadingInvoiceDetailsData(state)

         return {authInfo,invoiceList, invoiceDetailsLoading,profileInfo}
}

const actions = {
handleInvoiceDetailsList : getEmployeeInvoiceDetailStartAction
}




export default connect(mapState, actions)(MonthlyDispatchDetailComponent)
