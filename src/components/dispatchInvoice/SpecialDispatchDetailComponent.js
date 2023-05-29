import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Select, Table} from "antd";
import SelectInvoiceTypeComponent from "../widgets/SelectInvoiceTypeComponent";
import { getSpecialEmployeeInvoiceDetailStartAction } from '../../redux/actions/dispatchInvoice/specialDispatchAction'
import {selectSpecialInvoiceListData,selectSpecialLoadingInvoiceDetailsData} from "../../redux/selectors/specialDispatchSelector"
import {useLocation, useNavigate} from "react-router-dom";
import {InfoOutlined, SaveOutlined, ZoomInOutlined} from "@ant-design/icons";
import {employeePopupStartAction} from "../../redux/actions/dispatchInvoice/picklistAction";
import {selectEmployeePopupData, selectEmployeePopupLoadingData} from "../../redux/selectors/picklistSelector";
import SelectTransportComponent from "../widgets/SelectTransportComponent";
import {selectGenerateInvoiceListData, selectGenerateLabelListData, selectLoadingGenerateInvoiceData, selectLoadingGenerateLabelData} from "../../redux/selectors/monthlyDispatchSelector";
import {getGenerateInvoiceStartAction, getGenerateLabelStartAction} from "../../redux/actions/dispatchInvoice/monthlyDispatchAction";

const SpecialDispatchDetailComponent = ({authInfo,specialInvoiceDetails,specialInvoiceDetailsLoading,handleSpecialInvoiceDetailsList,profileInfo,employeePopup,employeePopupLoading,handleEmployeePopup,generateInvoiceList,handleGenerateInvoice,generateLabelList,handleGenerateLabel}) => {

    const navigate = useNavigate()

    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [recipientInvoiceColumn, setRecipientInvoiceColumn] = useState([])
    const [status, setStatus] = useState([])
    const [recipientInvoice, setRecipientInvoice] = useState(false)
    const [planId, setPlanId] = useState()
    const [transport, setTransport] = useState()
    const [printColumn, setPrintColumn] = useState([])
    const [printInvoice, setPrintInvoice] = useState()
    const [checkedArr, setCheckedArr] = useState([])
    const [printAction, setPrintAction] = useState(false)
    const [count, setCount] = useState(0)
    const [countLabel, setCountLabel] = useState(0)



    const location = useLocation()

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
                    width: '150px',
                    render:(_,row) =>{
                        return <Input defaultValue={row.boxes} style={{width: "150px"}} disabled/>
                    }
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    dataIndex: 'weight',
                    width: '100px',
                    render: (_,row) =>{
                        return <Input defaultValue={row.weight} disabled/>
                    }
                },
                {
                    title: 'Transporter',
                    key: 'transporter',
                    dataIndex: 'transporter',
                    width: '170px'  ,
                    render: () =>{
                        return <SelectTransportComponent onChange={(e) => setTransport(e)} disabled={true}/>
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render: (_,row) => {
                        return <Input defaulValue={row.lrNumber} style={{width: "100px"}} disabled/>
                    }
                },
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:(_,row) => {
                        return <Button icon={<ZoomInOutlined />} onClick={() => handleRecipientInvoice(row)}></Button>
                    }
                },
                // {
                //     title: '',
                //     key: '',
                //     dataIndex: '',
                //     width: '30px',
                //     render:() => {
                //         return <Button icon={<CloseCircleOutlined />} ></Button>
                //     }
                // },
                // {
                //     title: '',
                //     key: '',
                //     dataIndex: '',
                //     width: '30px',
                //     render:() => {
                //         return <Button icon={<ArrowRightOutlined />}></Button>
                //     }
                // },
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
                    render:(_,row) => {
                        return <Checkbox onChange={(event) => handleChecked(event,row)}/>
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

    const printData = () => {
        setFlag(true)
        setPrintColumn([
            {
                title:'Employee Name',
                key: 'employeeName',
                dataIndex: 'employeeName',
                width:'150px',
            },
            {
                title: 'Code',
                key: 'code',
                dataIndex: 'code',
                width:'150px',
            },
            {
                title:'Invoice No',
                key: 'invoiceNo',
                dataIndex: 'invoiceNumber',
                width: '150px',
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'invoiceStatus',
                width: '150px'
            },
            {
                title: 'Boxes',
                key: 'boxes',
                dataIndex: 'boxes',
                width: '50px',
            },
            {
                title: 'Weight',
                key: 'weight',
                dataIndex: 'weight',
                width: '50px',
            },
            {
                title: 'Transporter',
                key: 'transporterDetails',
                dataIndex: 'transporterDetails',
                width: '170px',
            },
            {
                title: 'LR No.',
                key: 'lrNo',
                dataIndex: 'lrNumber',
                width: '170px',
            },
        ])
    }

    const getSpecialEmployeeInvoiceDetailsList = () => {
        console.log(specialInvoiceDetails);
        console.log(planId);
        console.log(status);

        handleSpecialInvoiceDetailsList ({
            planId:location.state.planId,
            status:status,
            certificate: authInfo.token
        });
        searchData()
    }

    const handleChecked = (event,row) => {
        let invoice = row.invoiceNumber
        // event.target.checked ? setCheckedArr(current => [...current, row.invoiceNumber]) : checkedArr.filter(checked => checked.includes(row.invoiceNumber))
        if (event.target.checked) {
            setCheckedArr(current => [...current, row.invoiceNumber]);
        }
        else if (event.target.checked === false) {
            setCheckedArr((current) => current.filter(checked => checked !== row.invoiceNumber))
            console.log("removed")
        }
    }

    const matchInvoice = (invoiceList,checkedArr) => invoiceList.filter(data => checkedArr.includes(data.invoiceNumber)).map(data => data);

    const handlePrint = () => {
        setPrintAction(true)
        setPrintInvoice(matchInvoice(specialInvoiceDetails, checkedArr))
        console.log(specialInvoiceDetails)
        // handleGenerateInvoice({
        //     genInv: {
        //         invoiceHeaderID: printInvoice.invoiceHeaderID,
        //         invoiceNumber: printInvoice.invoiceNumber,
        //     },
        // })
        printData()
    }

    const handleBack = () => {
        return navigate("/home/dispatchInvoicing/specialDispatch")
    }

    const handleRecipientInvoice = (row) => {
        setRecipientInvoice(true)
        setRecipientInvoiceColumn([
            {
                title:'Item',
                key: 'itemName',
                dataIndex: 'itemName',
                width:'300px',
            },
            {
                title: 'Item Code',
                key: 'itemCode',
                dataIndex: 'itemCode',
                width:'25px',
            },
            {
                title: 'Quantity',
                key: 'quantity',
                dataIndex: 'quantity',
                width:'25px',
            },
            {
                title: 'Rate',
                key: 'rate',
                dataIndex: 'rate',
                width:'25px',
            },
            {
                title:'Total',
                key: 'total',
                dataIndex: 'total',
                width: '25px',
            },
        ])
        handleEmployeePopup({
            certificate: authInfo.token,
            month: location.state.month,
            year: location.state.year,
            isSpecial: 1,
            employeeId: row.employeeId,
            invoiceHeaderId: row.invoiceHeaderID,
        })
    }

    useEffect(() => {
        console.log(employeePopup)
    },[employeePopup])

    const handleInvoicePrint = () => {
        handleGenerateInvoice({
            inh: {
                inh: "A451F0B2-3A80-4929-9D31-003ABE763870",
                invoiceNo: "106674",
                // inh: printInvoice.map((item) => item.invoiceHeaderID),
                // invoiceNo: printInvoice.map((item) => item.invoiceNumber),
            },
            certificate: authInfo.token
        })
        console.log(printInvoice)
    }

    const downloadPDF = (pdf, filename) => {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = `${filename}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        console.log("printed")
    }

    useEffect(() => {
        if(generateInvoiceList.length !== 0) {
            setCount(count => count + 1)
        }
    },[generateInvoiceList])

    useEffect(() => {
        console.log(generateInvoiceList)
        if(generateInvoiceList.length !== 0) {
            downloadPDF(generateInvoiceList.content, generateInvoiceList.fileName)
        } else {
            console.log("no download")
        }
    },[count])

    useEffect(() => {
        if(generateLabelList.length !== 0) {
            setCountLabel(countLabel => countLabel + 1)
        }
    },[generateLabelList])

    useEffect(() => {
        console.log(generateLabelList)
        if(generateLabelList.length !== 0) {
            downloadPDF(generateLabelList.content, generateLabelList.fileName)
        } else {
            console.log("no download")
        }
    },[countLabel])

    const handleLabelPrint = () => {
        handleGenerateLabel({
            inh: {
                inh: "A451F0B2-3A80-4929-9D31-003ABE763870",
                invoiceNo: "106674",
                // inh: printInvoice.map((item) => item.invoiceHeaderID),
                // invoiceNo: printInvoice.map((item) => item.invoiceNumber),
            },
            certificate: authInfo.token
        })
    }


    return(
        <>
            <Row gutter={[16,16]}>
                <Col span={2}>
                    <Input value={location.state.year}/>
                </Col>
                <Col span={2}>
                    <Input value={location.state.month}/>
                </Col>
                <Col span={3}>
                    <SelectInvoiceTypeComponent value={status} onChange={(e) => setStatus(e)}/>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={() => {getSpecialEmployeeInvoiceDetailsList()}} style={{width: "100%"}}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
            </Row>
            <br/>
                {status === "00000000-0000-0000-0000-000000000026" &&
                    <>

                        <Button type={'primary'} style={{marginLeft: '10px'}}>Generate Invoices</Button>

                        &nbsp;

                        <Button type={'primary'}>Export</Button>
                    </>
                }
                {status === "00000000-0000-0000-0000-000000000027" &&
                    <>
                        {/*<Col span={8}>*/}
                        {/*    <Button type={'primary'} style={{marginLeft: '10px'}}>Batch Invoice</Button>*/}

                        {/*    &nbsp;*/}

                        {/*    <Button type={'primary'}>Group Invoice</Button>*/}
                        {/*</Col>*/}
                        <Row gutter={[16,16]}>
                            <Col span={3}>
                                <Button type={'primary'} style={{width: '100%'}}>Group Invoice</Button>
                            </Col>
                            <Col span={3}>
                                <Button type={'primary'} style={{width: '100%'}} >Batch Invoice</Button>
                            </Col>
                            <Col span={3}>
                                <Button type={'primary'} style={{width: '100%'}} onClick={handlePrint}>Print</Button>
                            </Col>
                            <Col span={3}>
                                <Button type={'primary'} style={{width: '100%'}} >Print All</Button>
                            </Col>
                        </Row>
                    </>
                }
                <br/>
            <Row>
                <Col span={24}>
                    <div align="right">
                        <Input.Search style={{ width: 304 }} />
                    </div>
                </Col>
            </Row>
            <br/><br/>
            <Table columns={column} dataSource={specialInvoiceDetails}/>
            <Modal open={printAction} title="Print" footer={null} width={"70vw"} onCancel={() => {
                setPrintAction(false)
            }}>
                <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>Print</p>
                <Button type={"primary"} style={{marginRight: "20px"}} onClick={() => handleInvoicePrint()}>Print Invoice</Button>
                <Button type={"primary"} onClick={() => handleLabelPrint()}>Print Label</Button>
                <br/>
                <Table
                    columns={printColumn}
                    dataSource={printInvoice}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>
            </Modal>
            <Modal open={recipientInvoice} title="Recipient Invoices" footer={null} width={"60vw"} onCancel={() => {
                setRecipientInvoice(false)
            }}>
                <Table
                    columns={recipientInvoiceColumn}
                    dataSource={employeePopup}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>
            </Modal>
        </>
        // <Row gutter={[8,8]}>
        //     <Col span={24}>
        //         <div align="right">
        //             <Input.Search style={{ width: 304 }} />
        //         </div>
        //     </Col>
        // </Row>
        )}


SpecialDispatchDetailComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    specialInvoiceDetails:PropTypes.array,
    specialInvoiceDetailsLoading:PropTypes.any,
    handleSpecialInvoiceDetailsList:PropTypes.func,
    employeePopup:PropTypes.array,
    employeePopupLoading:PropTypes.any,
    handleEmployeePopup:PropTypes.func,
    generateLabelList:PropTypes.array,
    generateLabelLoading:PropTypes.any,
    handleGenerateLabel:PropTypes.func,
    generateInvoiceList:PropTypes.array,
    generateInvoiceLoading:PropTypes.any,
    handleInvoiceDetailsList:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const specialInvoiceDetails = selectSpecialInvoiceListData(state)
    const specialInvoiceDetailsLoading = selectSpecialLoadingInvoiceDetailsData(state)
    const employeePopup = selectEmployeePopupData(state)
    const employeePopupLoading = selectEmployeePopupLoadingData(state)
    const generateInvoiceList = selectGenerateInvoiceListData(state)
    const generateInvoiceLoading = selectLoadingGenerateInvoiceData(state)
    const generateLabelList = selectGenerateLabelListData(state)
    const generateLabelLoading = selectLoadingGenerateLabelData(state)
    return {authInfo,specialInvoiceDetails, specialInvoiceDetailsLoading,profileInfo,employeePopup,employeePopupLoading,generateInvoiceList,generateInvoiceLoading,generateLabelList,generateLabelLoading}
}

const actions = {
    handleSpecialInvoiceDetailsList: getSpecialEmployeeInvoiceDetailStartAction,
    handleGenerateInvoice: getGenerateInvoiceStartAction,
    handleGenerateLabel: getGenerateLabelStartAction,
    handleEmployeePopup: employeePopupStartAction,
}

export default connect(mapState, actions)(SpecialDispatchDetailComponent)
