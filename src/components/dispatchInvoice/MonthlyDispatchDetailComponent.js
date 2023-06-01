import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Select, Table} from "antd";
import {InfoOutlined, SaveOutlined, ZoomInOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectTeamComponent from "../widgets/SelectTeamComponent";
import SelectInvoiceTypeComponent from "../widgets/SelectInvoiceTypeComponent";
import {getEmployeeInvoiceDetailStartAction, getGenerateInvoiceStartAction, getGenerateLabelStartAction, getPrintInvoiceStartAction} from '../../redux/actions/dispatchInvoice/monthlyDispatchAction'
import {selectGenerateInvoiceListData, selectGenerateLabelListData, selectInvoiceListData, selectLoadingGenerateInvoiceData, selectLoadingGenerateLabelData, selectLoadingInvoiceDetailsData, selectLoadingPrintInvoiceData, selectPrintListData} from "../../redux/selectors/monthlyDispatchSelector"
import {selectEmployeePopupData, selectEmployeePopupLoadingData} from "../../redux/selectors/picklistSelector";
import {employeePopupStartAction} from "../../redux/actions/dispatchInvoice/picklistAction";
import SelectTransportComponent from "../widgets/SelectTransportComponent";

const MonthlyDispatchDetailComponent = ({authInfo,invoiceList,handleInvoiceDetailsList,printList,handlePrintInvoice,profileInfo,employeePopup,handleEmployeePopup,generateInvoiceList,handleGenerateInvoice,generateLabelList,handleGenerateLabel}) => {

    const navigate = useNavigate()
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [team, setTeam] = useState()
    const [dispatchType, setDispatchType] = useState('0')
    const [printAction, setPrintAction] = useState(false)
    const [printAllAction, setPrintAllAction] = useState(false)
    const [recipientInvoice, setRecipientInvoice] = useState(false)
    const [column, setColumn] = useState([])
    const [printColumn, setPrintColumn] = useState([])
    const [recipientInvoiceColumn, setRecipientInvoiceColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [status, setStatus] = useState()
    const [allCheck, setAllCheck] = useState(false)
    const [checked, setChecked] = useState(false)
    const [checkedArr, setCheckedArr] = useState([])
    const [print, setPrint] = useState()
    const [printInvoice, setPrintInvoice] = useState()
    const [printAllInvoice, setPrintAllInvoice] = useState([])
    const [count, setCount] = useState(0)
    const [countLabel, setCountLabel] = useState(0)
    const location = useLocation()

    const handleAllPrint = (event) => {
        setAllCheck(event.target.checked)
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

    useEffect(() => {
        console.log(checkedArr)
    }, [checkedArr])

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

    const searchData = () => {
        setFlag(true)
        if(status === "00000000-0000-0000-0000-000000000026"){
            setColumn([
                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                },
                {
                    title: 'Employee',
                    key: 'employee',
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
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
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
                    width: '150px',
                    render:() =>{
                        return <Input/>
                    }
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    dataIndex: 'weight',
                    width: '150px',
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
                        return <SelectTransportComponent/>
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render: (_,row) => {
                        return <Input defaulValue={row.lrNumber}/>
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
                    width:'300px',
                 },

                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                },
                {
                    title: 'Employee',
                    key: 'employee',
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
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
                    width: '150px',
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
                    width: '150px'
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
                    width: '150px',
                    render:(_,row) =>{
                        return <Input defaultValue={row.weight} disabled/>
                    }
                },
                {
                    title: 'Transporter',
                    key: 'transporter',
                    dataIndex: 'transporter',
                    width: '170px'  ,
                    render: (_,row) =>{
                        return <SelectTransportComponent value={row.transporterID} disabled={true} />
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render: (_,row) => {
                        return <Input value={row.lrNumber} style={{width: "100px"}} disabled/>
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
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:() => {
                        return <Button icon={<SaveOutlined />}></Button>
                    }
                },
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
                    // title: `Print`,
                    title: <Checkbox onChange={(event) => handleAllPrint(event)} >Print</Checkbox>,
                    key: '',
                    dataIndex: '',
                    width: '30px',
                    render:(_,row) => {
                        return <Checkbox onChange={(event) => handleChecked(event,row)}></Checkbox>
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
                },
                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                },
                {
                    title: 'Employee',
                    key: 'employee',
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
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
                    width: '150px',
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'invoiceStatus',
                    width: '200px'
                },
                {
                    title: 'Boxes',
                    key: 'boxes',
                    dataIndex: 'boxes',
                    width: '150px',
                    render:(_,row) =>{
                        return <Input defaultValue={row.boxes} style={{width: "150px"}}/>
                    }
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    dataIndex: 'weight',
                    width: '100px',
                    render: (_,row) =>{
                        return <Input defaultValue={row.weight}/>
                    }
                },
                {
                    title: 'Transporter',
                    key: 'transporter',
                    dataIndex: 'transporter',
                    width: '170px'  ,
                    render: () =>{
                        return <SelectTransportComponent/>
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render: (_,row) => {
                        return <Input defaulValue={row.lrNo} style={{width: "100px"}}/>
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
                key: 'quatity',
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
            month: month,
            year: year,
            isSpecial: 0,
            employeeId: row.employeeID,
            invoiceHeaderId: row.invoiceHeaderID,
        })
    }

    const getEmployeeInvoiceDetailsList = () => {
        console.log(location.state.year);
        console.log(location.state.month);
        console.log(dispatchType);
        console.log(team);
        console.log(status);

        handleInvoiceDetailsList ({
            year:location.state.year,
            month:location.state.month,
            isSpecialDisp:dispatchType,
            teamId:team,
            status:status,
            certificate: authInfo.token
        });
        searchData()
    }

    const handlePrint = () => {
        setPrintAction(true)
        setPrintInvoice(matchInvoice(invoiceList, checkedArr))
        console.log(invoiceList)
        // handleGenerateInvoice({
        //     genInv: {
        //         invoiceHeaderID: printInvoice.invoiceHeaderID,
        //         invoiceNumber: printInvoice.invoiceNumber,
        //     },
        // })
        printData()
    }

    const handleAllPrintInvoice = () => {
        setPrintAllAction(true)
        setPrintAllInvoice(invoiceList)
        printData()
    }

    useEffect(() => {
        console.log(printInvoice)
        console.log(matchInvoice(checkedArr, invoiceList))
    },[printInvoice])

    const handleBack = () => {
        return navigate("/home/dispatchInvoicing/monthlyDispatch")
    }

    const generateInvoice= () =>{
        return navigate('/home/pickingSlip/monthlyDispatch/details/invoiceUpload')
    }

    const matchInvoice = (invoiceList,checkedArr) => invoiceList.filter(data => checkedArr.includes(data.invoiceNumber)).map(data => data);
    // const matchInvoice = (checkedArr, invoiceList) => checkedArr.filter(data => invoiceList.map(list => list.includes(data.invoiceNumber))).map(myData => myData);

    // const handleInvoicePrint = () => {
    //     handlePrintInvoice({
    //         inhId: printInvoice.map(item => item.invoiceHeaderID),
    //         inh: {
    //             inhId: printInvoice.map(item => item.invoiceHeaderID),
    //             invoiceNo: printInvoice.map(item => item.invoiceNumber),
    //         },
    //         certificate: authInfo.token
    //     })
    // }

    const downloadPDF = (pdf, filename) => {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = `${filename}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        console.log("printed")
    }

    const handleInvoicePrint = () => {
        handleGenerateInvoice({
            inh: printInvoice.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
        console.log(printInvoice)
    }

    const handleLabelPrint = () => {
        console.log(printInvoice.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})))
        handleGenerateLabel({
            inh: printInvoice.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
    }

    const handleAllInvoicePrint = () => {
        // console.log(printAllInvoice.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})))
        handleGenerateInvoice({
            inh: printAllInvoice.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
    }

    const handleAllLabelPrint = () => {
        // console.log(printAllInvoice.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})))
        handleGenerateLabel({
            inh: printAllInvoice.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
    }

    useEffect(() => {
        if(generateInvoiceList.length !== 0) {
            setCount(count => count + 1)
        }
    },[generateInvoiceList])

    useEffect(() => {
        if(generateLabelList.length !== 0) {
            setCountLabel(countLabel => countLabel + 1)
        }
    },[generateLabelList])

    useEffect(() => {
        console.log(generateInvoiceList)
        if(generateInvoiceList.length !== 0) {
            generateInvoiceList.map((invoice) => downloadPDF(invoice.content, invoice.fileName))
            // downloadPDF(generateInvoiceList.content, generateInvoiceList.fileName)
            console.log(generateInvoiceList)
        } else {
            console.log("no download")
        }
    },[count])

    useEffect(() => {
        console.log(generateLabelList)
        if(generateLabelList.length !== 0) {
            // downloadPDF(generateLabelList.content, generateLabelList.fileName)
            console.log(generateLabelList)
            generateLabelList.map((label) => downloadPDF(label.content, label.fileName))
        } else {
            console.log("no download")
        }
    },[countLabel])

    return(
        <div>
            <TitleWidget title={'Monthly Dispatch'} />
            <Row gutter={[16,16]}>
                <Col span={3}>
                    <Input value={location.state.year}/>
                </Col>
                <Col span={3}>
                    <Input value={location.state.month}/>
                </Col>
                <Col span={3}>
                    <SelectTeamComponent  onChange={(e) => setTeam(e)}/>
                </Col>
                <Col span={3}>
                   <SelectInvoiceTypeComponent onChange={(e) => setStatus(e)}/>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={() => getEmployeeInvoiceDetailsList()} style={{width: "100%"}}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
            </Row>
            <br/>
            {status === "00000000-0000-0000-0000-000000000026" &&
                <Row gutter={[8,8]}>
                    <Col span={3}>
                        <Button type={'primary'}  onClick={() => generateInvoice()}>Generate Invoices</Button>
                    </Col>
                    <Col span={2}>
                        <Button type={'primary'}>Exports</Button>
                    </Col>
                    <Col span={16}></Col>
                </Row>
            }
            {status === "00000000-0000-0000-0000-000000000027" &&
                <Row gutter={[16,16]}>
                    <Col span={3}>
                        <Button type={'primary'}  onClick={() => generateInvoice()} style={{width: '100%'}}>Group Invoice</Button>
                    </Col>
                    <Col span={2}>
                        <Button type={'primary'} onClick={handlePrint} style={{width: '100%'}}>Print</Button>
                    </Col>
                    <Col span={2}>
                        <Button type={'primary'} onClick={handleAllPrintInvoice} style={{width: '100%'}}>Print All</Button>
                    </Col>
                    <Col span={14}></Col>
                </Row>
            }
            <br/>
            {flag &&
                <>
                    <div align="right">
                        <Input.Search style={{ width: 304 }} />
                    </div>
                    <br/><br/>
                    <Table columns={column} dataSource={invoiceList}/>
                </>
            }
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
            <Modal open={printAllAction} title="Print All" footer={null} width={"70vw"} onCancel={() => {
                setPrintAllAction(false)
            }}>
                <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>Print All</p>
                <Button type={"primary"} style={{marginRight: "20px"}} onClick={() => handleAllInvoicePrint()}>Print Invoice</Button>
                <Button type={"primary"} onClick={() => handleAllLabelPrint()}>Print Label</Button>
                <br/>
                <Table
                    columns={printColumn}
                    dataSource={printAllInvoice}
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
        </div>
    )
}

MonthlyDispatchDetailComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    invoiceList:PropTypes.array,
    invoiceDetailsLoading:PropTypes.any,
    printList:PropTypes.array,
    printInvoiceLoading:PropTypes.any,
    generateInvoiceList:PropTypes.array,
    generateInvoiceLoading:PropTypes.any,
    handleInvoiceDetailsList:PropTypes.func,
    employeePopup:PropTypes.array,
    employeePopupLoading:PropTypes.any,
    handleEmployeePopup:PropTypes.func,
    generateLabelList:PropTypes.array,
    generateLabelLoading:PropTypes.any,
    handleGenerateLabel:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const invoiceList = selectInvoiceListData(state)
    const invoiceDetailsLoading = selectLoadingInvoiceDetailsData(state)
    const printList = selectPrintListData(state)
    const printInvoiceLoading = selectLoadingPrintInvoiceData(state)
    const generateInvoiceList = selectGenerateInvoiceListData(state)
    const generateInvoiceLoading = selectLoadingGenerateInvoiceData(state)
    const generateLabelList = selectGenerateLabelListData(state)
    const generateLabelLoading = selectLoadingGenerateLabelData(state)
    const employeePopup = selectEmployeePopupData(state)
    const employeePopupLoading = selectEmployeePopupLoadingData(state)
    return {authInfo,invoiceList,invoiceDetailsLoading,printList,printInvoiceLoading,profileInfo,employeePopup,employeePopupLoading,generateInvoiceList,generateInvoiceLoading,generateLabelList,generateLabelLoading}
}

const actions = {
    handleInvoiceDetailsList: getEmployeeInvoiceDetailStartAction,
    handlePrintInvoice: getPrintInvoiceStartAction,
    handleGenerateInvoice: getGenerateInvoiceStartAction,
    handleGenerateLabel: getGenerateLabelStartAction,
    handleEmployeePopup: employeePopupStartAction,
}

export default connect(mapState, actions)(MonthlyDispatchDetailComponent)
