import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Input, Modal, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectInvoiceTypeComponent from "../widgets/SelectInvoiceTypeComponent";
import { getSpecialEmployeeInvoiceDetailStartAction } from '../../redux/actions/dispatchInvoice/specialDispatchAction'
import {selectSpecialInvoiceListData,selectSpecialLoadingInvoiceDetailsData} from "../../redux/selectors/specialDispatchSelector"

const SpecialDispatchDetailComponent = ({authInfo,specialInvoiceDetails,specialInvoiceDetailsLoading,handleSpecialInvoiceDetailsList,profileInfo}) => {

    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [status, setStatus] = useState([])
    const [planId, setPlanId] = useState()

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



    const getSpecialEmployeeInvoiceDetailsList = () => {

           console.log(specialInvoiceDetails);
           console.log(planId);
           console.log(status);


           handleSpecialInvoiceDetailsList ({

             planId:planId,
             status:status,
             certificate: authInfo.token
                });

                 searchData()

            }




    return(
        <div>
            <TitleWidget title={'Special Dispatch'} />
            <div className="grid">
               <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <SelectInvoiceTypeComponent value={status} onChange={(e) => setStatus(e)}/>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type={'primary'} onClick={() => getSpecialEmployeeInvoiceDetailsList()}>Submit</Button>

              {status === "00000000-0000-0000-0000-000000000026" &&
                <>

                <Button type={'primary'} style={{marginLeft: '600px'}}>Generate Invoices</Button>

                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <Button type={'primary'}>Export</Button>
                </>
              }


              {status === "00000000-0000-0000-0000-000000000027" &&
                <>

                <Button type={'primary'} style={{marginLeft: '600px'}}>Batch Invoice</Button>

                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                 <Button type={'primary'}>Group Invoice</Button>
                </>
              }


            </div>
            <br/><br/>
            <div align="right">
                <Input.Search style={{ width: 304 }} />
            </div>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={specialInvoiceDetails}/>
            }

        </div>
    )
}

SpecialDispatchDetailComponent.propTypes = {
     authInfo: PropTypes.any,
     profileInfo: PropTypes.any,
     specialInvoiceDetails:PropTypes.array,
     specialInvoiceDetailsLoading:PropTypes.any,
     handleSpecialInvoiceDetailsList:PropTypes.func
}

const mapState = (state) => {
     const authInfo = selectAuthInfo(state)
     const profileInfo = selectProfileInfo(state)
     const specialInvoiceDetails = selectSpecialInvoiceListData(state)
         //console.log(invoiceList)

     const specialInvoiceDetailsLoading = selectSpecialLoadingInvoiceDetailsData(state)

     return {authInfo,specialInvoiceDetails, specialInvoiceDetailsLoading,profileInfo}
}

const actions = {
handleSpecialInvoiceDetailsList: getSpecialEmployeeInvoiceDetailStartAction

}

export default connect(mapState, actions)(SpecialDispatchDetailComponent)
