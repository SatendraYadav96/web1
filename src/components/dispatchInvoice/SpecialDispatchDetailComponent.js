import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Form, Input, InputNumber, message, Modal, Row, Select, Space, Table, Upload} from "antd";
import SelectInvoiceTypeComponent from "../widgets/SelectInvoiceTypeComponent";
import { getSpecialEmployeeInvoiceDetailStartAction } from '../../redux/actions/dispatchInvoice/specialDispatchAction'
import {selectSpecialInvoiceListData,selectSpecialLoadingInvoiceDetailsData} from "../../redux/selectors/specialDispatchSelector"
import {useLocation, useNavigate} from "react-router-dom";
import {InfoOutlined, SaveOutlined, SearchOutlined, UploadOutlined, ZoomInOutlined} from "@ant-design/icons";
import {employeePopupStartAction} from "../../redux/actions/dispatchInvoice/picklistAction";
import {selectEmployeePopupData, selectEmployeePopupLoadingData} from "../../redux/selectors/picklistSelector";
import SelectTransportComponent from "../widgets/SelectTransportComponent";
import {selectGenerateInvoiceListData, selectGenerateInvoiceSuccess, selectGenerateLabelListData, selectGetInvoiceSuccess, selectLoadingGenerateInvoiceData, selectLoadingGenerateLabelData} from "../../redux/selectors/monthlyDispatchSelector";
import {getGenerateInvoiceStartAction, getGenerateLabelStartAction, getGenInvoiceStartAction} from "../../redux/actions/dispatchInvoice/monthlyDispatchAction";
import Highlighter from "react-highlight-words";
import {exportAllocationStartAction} from "../../redux/actions/inventory/inventoryReportActions";
import {selectExportAllocationData} from "../../redux/selectors/inventoryReportSelector";
import {CSVLink} from "react-csv";
import {grnUploadStartAction, invoiceUploadStartAction} from "../../redux/actions/upload/uploadActions";
import TitleWidget from "../../widgets/TitleWidget";
import {Option} from "antd/es/mentions";

const SpecialDispatchDetailComponent = ({authInfo,specialInvoiceDetails,specialInvoiceDetailsLoading,handleSpecialInvoiceDetailsList,profileInfo,employeePopup,employeePopupLoading,handleEmployeePopup,
                                            generateInvoiceList,handleGenerateInvoice,generateLabelList,handleGenerateLabel,handleExport,exportAllocation,handleGenInvoice,handleInvoiceUpload, getInvoiceSuccess}) => {

    const navigate = useNavigate()

    const [displayMonth, setDisplayMonth] = useState()
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [recipientInvoiceColumn, setRecipientInvoiceColumn] = useState([])
    const [status, setStatus] = useState([])
    const [recipientInvoice, setRecipientInvoice] = useState(false)
    const [planIds, setPlanIds] = useState()
    const [transport, setTransport] = useState()
    const [printColumn, setPrintColumn] = useState([])
    const [genInv, setGenInv] = useState([])
    const [printInvoice, setPrintInvoice] = useState()
    const [lrNo, setLrNo] = useState()
    const [empId, setEmpId] = useState()
    const [planId, setPlanId] = useState()
    const [box, setBox] = useState()
    const [dimension, setDimension] = useState()
    const [weight, setWeight] = useState()
    const [d, setD] = useState({})
    const [checkedArr, setCheckedArr] = useState([])
    const [exp, setExp] = useState([])
    const [count, setCount] = useState(1)
    const [countLabel, setCountLabel] = useState(1)
    const [printAction, setPrintAction] = useState(false)
    const [printAllAction, setPrintAllAction] = useState(false)
    const [draftModal, setDraftModal] = useState(false)
    const [printAllInvoice, setPrintAllInvoice] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [file, setFile] = useState([])
    const location = useLocation()
    useEffect(() => {
        switch (location.state.month){
            case 1:
                setDisplayMonth("January");
                break;
            case 2:
                setDisplayMonth("February");
                break;
            case 3:
                setDisplayMonth("March");
                break;
            case 4:
                setDisplayMonth("April");
                break;
            case 5:
                setDisplayMonth("May");
                break;
            case 6:
                setDisplayMonth("June");
                break;
            case 7:
                setDisplayMonth("July");
                break;
            case 8:
                setDisplayMonth("August");
                break;
            case 9:
                setDisplayMonth("September");
                break;
            case 10:
                setDisplayMonth("October");
                break;
            case 11:
                setDisplayMonth("November");
                break;
            case 12:
                setDisplayMonth("December");
                break;
        }
    },[location])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ?   '#ff4d4f' :'#1677ff',
                    fontSize: '15px',
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    useEffect(() => {
        if(getInvoiceSuccess){
            handleSpecialInvoiceDetailsList ({
                planId:location.state.planId,
                status:status,
                certificate: authInfo.token
            });
            // searchData()
        }
    }, [getInvoiceSuccess])


    const searchData = () => {
        setFlag(true)
        if(status === "00000000-0000-0000-0000-000000000024"){
            setColumn([
                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                    fixed:'left',
                    ...getColumnSearchProps('city'),
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                    fixed: 'left',
                    ...getColumnSearchProps('state'),
                },
                {
                    title: 'Employee',
                    key: 'employee',
                    dataIndex: 'employeeName',
                    width:'150px',
                    fixed: 'left',
                    ...getColumnSearchProps('employeeName'),
                },
                {
                    title: 'Code',
                    key: 'code',
                    dataIndex: 'code',
                    width:'150px',
                    fixed: 'left',
                    ...getColumnSearchProps('code'),
                },
                {
                    title:'Invoice No',
                    key: 'invoiceNo',
                    dataIndex: 'invoiceNumber',
                    width: '150px',
                    fixed: 'left',
                    ...getColumnSearchProps('invoiceNumber'),
                },
                {
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
                    width: '150px',
                    fixed: 'left',
                    ...getColumnSearchProps('groupInvoiceNumber'),
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'invoiceStatus',
                    width: '50px',
                    ...getColumnSearchProps('invoiceStatus'),
                },
                // {
                //     title: 'Boxes',
                //     key: 'boxes',
                //     dataIndex: 'boxes',
                //     width: '50px',
                //     render:(text) =>{
                //         return <InputNumber />
                //     }
                // },
                // {
                //     title: 'Weight',
                //     key: 'weight',
                //     dataIndex: 'weight',
                //     width: '50px',
                //     render: (_,row) =>{
                //         return <InputNumber />
                //     }
                // },
                // {
                //     title: 'Transporter',
                //     key: 'transporter',
                //     dataIndex: 'transporter',
                //     width: '170px'  ,
                //     render: (_,row) =>{
                //         return <SelectTransportComponent />
                //     }
                // },
                // {
                //     title: 'LR No.',
                //     key: 'lrNo',
                //     dataIndex: 'lrNumber',
                //     width: '170px',
                //     render: (_,row) => {
                //         return <Input value={lrNo} onChange={(e) => {
                //             setLrNo(e.target.value);
                //             console.log(e.target.value)
                //         }}/>
                //     }
                // },
                // {
                //     title: '',
                //     key: 'lrNumber',
                //     dataIndex: '',
                //     width: '30px',
                //     render:(_,row) => {
                //         return <Button icon={<SaveOutlined />} onClick={() => {
                //             setDraftModal(true);
                //             setEmpId(row.employeeId)
                //             setPlanIds(row.planId)
                //         }}></Button>
                //     }
                // },
                {
                    title: '',
                    key: 'code',
                    dataIndex: 'code',
                    width: '30px',
                    render:(_,row) => {
                        return <Button icon={<ZoomInOutlined />} onClick={() => handleRecipientInvoice(row)}></Button>
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
                    fixed:'left',
                     ...getColumnSearchProps('teamName'),
                 },

                {
                    title:'City',
                    key: 'city',
                    dataIndex: 'city',
                    width:'150px',
                    fixed:'left',
                    ...getColumnSearchProps('city'),
                },
                {
                    title: 'State',
                    key: 'state',
                    dataIndex: 'state',
                    width:'150px',
                    fixed: 'left',
                    ...getColumnSearchProps('state'),
                },
                {
                    title: 'Employee',
                    key: 'employee',
                    dataIndex: 'employeeName',
                    width:'150px',
                    fixed: 'left',
                    ...getColumnSearchProps('employeeName'),

                },
                {
                    title: 'Code',
                    key: 'code',
                    dataIndex: 'code',
                    width:'150px',
                    fixed: 'left',
                    ...getColumnSearchProps('code'),

                },
                {
                    title:'Invoice No',
                    key: 'invoiceNo',
                    dataIndex: 'invoiceNumber',
                    width: '150px',
                    fixed: 'left',
                    ...getColumnSearchProps('invoiceNumber'),
                    sorter: (a, b) => a.invoiceNumber - b.invoiceNumber,
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'Group No',
                    key: 'groupNo',
                    dataIndex: 'groupInvoiceNumber',
                    width: '150px',
                    fixed: 'left',
                    ...getColumnSearchProps('groupInvoiceNumber'),
                },
                {
                    title: 'Redirected From',
                    key:'redirectedFrom',
                    dataIndex: 'redirectedFrom',
                    width:'150px',
                    ...getColumnSearchProps('redirectedFrom'),
                },
                {
                    title: 'Status',
                    key: 'status',
                    dataIndex: 'invoiceStatus',
                    width: '50px',
                    ...getColumnSearchProps('invoiceStatus'),
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
                    render: (_,row) =>{
                        return <SelectTransportComponent onChange={(e) => setTransport(e)} value={row.transporterID} disabled={true}/>
                    }
                },
                {
                    title: 'LR No.',
                    key: 'lrNo',
                    dataIndex: 'lrNumber',
                    width: '170px',
                    render:(_,row) =>{
                        return <Input defaultValue={row.lrNumber} style={{width: "150px"}} disabled/>
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
                // {
                //     title: 'Group' ,
                //     key: '',
                //     dataIndex: '',
                //     width: '30px',
                //     render:() => {
                //         return <Checkbox/>
                //     }
                // },
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

    useEffect(() => {
        console.log("These are boxes: ",box )
    },[box])

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
        console.log(location.state.planId);
        console.log(status);

        handleSpecialInvoiceDetailsList ({
            planId:location.state.planId,
            status:status,
            certificate: authInfo.token
        });
        searchData()
    }

    // const handleGen = (key) => () => {
    //     console.log(box)
    //     console.log(weight)
    //     // const data = {
    //     //     boxes: box,
    //     // }
    //     // console.log(data)
    // }

    const handleChecked = (event,row) => {
        console.log(row.invoiceNumber)
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

    useEffect(() => {
        console.log(checkedArr)
    },[checkedArr])

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
            inh: printInvoice?.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
        console.log(printInvoice)
        setCount(0)
    }

    const handleAllPrintInvoice = () => {
        setPrintAllAction(true)
        setPrintAllInvoice(specialInvoiceDetails)
        printData()
    }

    const handleAllInvoicePrint = () => {
        handleGenerateInvoice({
            inh: specialInvoiceDetails.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
        setCount(0)
    }

    const handleAllLabelPrint = () => {
        handleGenerateLabel({
            inh: specialInvoiceDetails.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
        setCountLabel(0)
    }

    const handleLabelPrint = () => {
        handleGenerateLabel({
            inh: printInvoice?.map((item) => ({inhId: item.invoiceHeaderID, invoiceNo: item.invoiceNumber})),
            certificate: authInfo.token
        })
        setCountLabel(0)
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
        console.log('me invoice')
        console.log(generateInvoiceList)
        if (count === 0) {
            if(generateInvoiceList?.length > 0) {
                generateInvoiceList?.map((invoice) => downloadPDF(invoice.content, invoice.fileName))
                // downloadPDF(generateInvoiceList.content, generateInvoiceList.fileName)
            } else {
                console.log("no download")
            }
        }
        setCount(1)
    },[generateInvoiceList])

    // useEffect(() => {
    //     console.log('me invoice')
    //     console.log(genInv)
    //     if(genInv?.length > 0) {
    //         genInv.map((invoice) => downloadPDF(invoice.content, invoice.fileName))
    //         // downloadPDF(generateInvoiceList.content, generateInvoiceList.fileName)
    //     } else {
    //         console.log("no download")
    //     }
    // },[c])

    useEffect(() => {
        console.log('me Lable')
        console.log(generateLabelList)
        if (countLabel === 0) {
            console.log(generateLabelList)
            if(generateLabelList?.length > 0) {
                generateLabelList?.map((label) => downloadPDF(label.content, label.fileName))
                // downloadPDF(generateLabelList.content, generateLabelList.fileName)
            } else {
                console.log("no download")
            }
        }
        setCountLabel(1)
    },[generateLabelList])

    // const handleExportAction = () => {
    //     handleExport({
    //         year: location.state.year,
    //         month: location.state.month,
    //         teamId: null,
    //         status: location.state.status,
    //         planId: location.state.planId,
    //         isVirtual: 0,
    //         isSpecial: 1,
    //         certificate: authInfo.token,
    //     })
    // }

    useEffect(() => {
        handleExport({
            year: location.state.year,
            month: location.state.month,
            teamId: null,
            status: location.state.status,
            planId: location.state.planId,
            isVirtual: 0,
            isSpecial: 1,
            certificate: authInfo.token,
        })
    },[authInfo])

    useEffect(() => {
        console.log("this is",exportAllocation)
        if (exportAllocation?.length > 0) {
            setExp(exportAllocation.map(item => {
                return {
                    "Month": item.month,
                    "Year": item.year,
                    "Plan Name": item.planName,
                    "State": item.state,
                    "Employee": item.employeeName,
                    "Designation": item.designation,
                    "Code": item.code,
                    "Boxes": item.boxes,
                    "Weight": item.weight,
                    "Dimension": item.dimension,
                    "Transporter": item.transporterID,
                    "LR Nov": item.lrNumber,
                    "PlanId": item.planId,
                    "Plan": item.plan,
                }
            }))
        } else {
            console.log("no Data")
        }
    }, [exportAllocation])

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const upload = async () => {
        console.log(file)
        const newFile = file[0].originFileObj
        const base64 = await convertBase64(newFile)
        const bytecode = base64.split(",")[1];
        console.log(newFile)
        console.log(bytecode)
        handleInvoiceUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
        })
    }

    const handleUpload = (info) => {
        setFile(info.fileList)
        console.log(info.file.name)
        console.log(info)
        // const file = info.file.originFileObj
        // const base64 = await convertBase64(file)
        // console.log(base64)
        // console.log(file.name)
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const props = {
        beforeUpload: (file) => {
            const isCSV = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (!isCSV) {
                message.error(`${file.name} is not a csv file`);
            }
            return isCSV || Upload.LIST_IGNORE;
        },
    };

    const handleSave = () => {
        console.log({
            "recipientId": empId,
            "boxes": box,
            "weight": weight,
            "transporter": transport,
            "lrNo": lrNo,
            "month": location.state.month,
            "year": location.state.year,
            "isSpecial": 1,
            "planId":planIds
        })

        handleGenInvoice({
            certificate: authInfo.token,
            genInv: {
                recipientId: empId,
                boxes: box,
                weight: weight,
                transporter: transport,
                lrNo: lrNo.toString(),
                dimension: dimension,
                month: location.state.month,
                year: location.state.year,
                isSpecial: 1,
                planId :planIds
            }
        })

        setDraftModal(false)
    }

    const generateInvoice= () =>{
        return navigate("/home/pickingSlip/monthlyDispatch/details/invoiceUpload", {state:
                {
                    year: location.state.year,
                    month: location.state.month,
                    type: "special",
                    all: location.state
                }});

    }



    return(
        <>
            <TitleWidget title={'Special Dispatch'} />
            <Row gutter={[16,16]}>
                <Col span={2}>
                    <Input value={location.state.year} disabled/>
                </Col>
                <Col span={2}>
                    <Input value={displayMonth} disabled/>
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
                {status === "00000000-0000-0000-0000-000000000024" &&
                    <>
                        <Row gutter={[8,8]}>
                            <Col span={3}>
                                <Button type={'primary'} style={{ width: '100%'}} onClick={() => generateInvoice()} >Generate Invoices</Button>
                            </Col>
                            <Col span={2}>
                                <CSVLink
                                    data={exp.length > 0 ? exp : [{
                                        "Month": "",
                                        "Year": "",
                                        "Plan Name": "",
                                        "State": "",
                                        "Employee": "",
                                        "Designation": "",
                                        "Code": "",
                                        "Boxes": "",
                                        "Weight": "",
                                        "Dimension": "",
                                        "Transporter": "",
                                        "LR Nov": "",
                                        "PlanId": "",
                                        "Plan": "",
                                    }]}
                                    filename={"exportAllocation.csv"}
                                    onClick={() => {
                                        console.log("clicked")
                                    }}
                                    style={{width: '100%'}}
                                >
                                    <Button type={'primary'} >Exports</Button>
                                </CSVLink>
                            </Col>
                        </Row>
                        {/*<Button type={'primary'} onClick={handleExportAction}>Export</Button>*/}
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
                            {/*<Col span={3}>*/}
                            {/*    <Button type={'primary'} style={{width: '100%'}}>Group Invoice</Button>*/}
                            {/*</Col>*/}
                            {/*<Col span={3}>*/}
                            {/*    <Button type={'primary'} style={{width: '100%'}} >Batch Invoice</Button>*/}
                            {/*</Col>*/}
                            <Col span={3}>
                                <Button type={'primary'} style={{width: '100%'}} onClick={handlePrint}>Print</Button>
                            </Col>
                            <Col span={3}>
                                <Button type={'primary'} style={{width: '100%'}} onClick={handleAllPrintInvoice} >Print All</Button>
                            </Col>
                        </Row>
                    </>
                }
            <br/><br/>
            <span>Total Rows: <b>{specialInvoiceDetails?.length}</b></span>
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
            <Modal open={recipientInvoice} title="Allocation Details" footer={null} width={"60vw"} onCancel={() => {
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
            <Modal open={printAllAction} title="Print All" footer={null} width={"70vw"} onCancel={() => {
                setPrintAllAction(false)
            }}>
                <p style={{fontSize: "1.2rem", fontWeight: "bold"}}>Print All</p>
                <Button type={"primary"} style={{marginRight: "20px"}} onClick={() => handleAllInvoicePrint()}>Print Invoice</Button>
                <Button type={"primary"} onClick={() => handleAllLabelPrint()} >Print Label</Button>
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
            <Modal open={draftModal} title="Special Draft Details" footer={null} width={"60vw"} onCancel={() => {
                setDraftModal(false)
            }}>
                <Row gutter={[16,16]}>
                    <Col span={3}>
                        Boxes:<br/>
                        <InputNumber value={box} min={0} onChange={(e) => setBox(e)} style={{width: "100%"}}/>
                    </Col>
                    <Col span={3}>
                        Weight:<br/>
                        <InputNumber value={weight} min={0} onChange={(e) => setWeight(e)} style={{width: "100%"}}/>
                    </Col>
                    <Col span={4}>
                        Transport:<br/>
                        <SelectTransportComponent onChange={(e) => setTransport(e)}/>
                    </Col>
                    <Col span={4}>
                        LR No.:<br/>
                        <InputNumber value={lrNo} min={0} onChange={(e) => setLrNo(e)} style={{width: "100%"}}/>
                    </Col>
                    <Col span={4}>
                        Dimension:<br/>
                        <Select onSelect={(e) => setDimension(e)} style={{width: "100%"}}>
                            <Option value='SMALL'>SMALL</Option>
                            <Option value='MEDIUM'>MEDIUM</Option>
                            <Option value='XLARGE'>XLARGE</Option>
                            <Option value='SMALL'>SMALL</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={[16,16]}>
                    <Col span={22}></Col>
                    <Col span={2}>
                        <Button type='primary' onClick={handleSave}>Save</Button>
                    </Col>
                </Row>
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
    exportAllocation:PropTypes.any,
    handleExport:PropTypes.func,
    getInvoiceSuccess: PropTypes.any
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
    const exportAllocation = selectExportAllocationData(state)
    const getInvoiceSuccess = selectGetInvoiceSuccess(state)
    return {authInfo,specialInvoiceDetails, specialInvoiceDetailsLoading,profileInfo,employeePopup,employeePopupLoading,generateInvoiceList,generateInvoiceLoading,generateLabelList,generateLabelLoading,exportAllocation, getInvoiceSuccess}
}

const actions = {
    handleSpecialInvoiceDetailsList: getSpecialEmployeeInvoiceDetailStartAction,
    handleGenerateInvoice: getGenerateInvoiceStartAction,
    handleGenerateLabel: getGenerateLabelStartAction,
    handleEmployeePopup: employeePopupStartAction,
    handleExport: exportAllocationStartAction,
    handleGenInvoice: getGenInvoiceStartAction,
    handleInvoiceUpload: invoiceUploadStartAction,
}

export default connect(mapState, actions)(SpecialDispatchDetailComponent)
