 import React, {useEffect, useRef, useState} from 'react';
import TitleWidget from '../../widgets/TitleWidget';
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {approveAcknowledgeStartAction, rejectAcknowledgeStartAction, unacknowledgeListStartAction} from "../../redux/actions/grn/grnActions";
import {Button, Checkbox, Col, DatePicker, Input, Modal, Row, Space, Table} from "antd";
import {selectApproveAcknowledge, selectRefreshAcknowledge, selectUnacknowledged} from "../../redux/selectors/grnSelectors";
import {CheckOutlined, CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {toDdMmYYYY} from "../../utils/DateUtils";
import moment from "moment";
import {isArray} from "@craco/craco/lib/utils";
import Highlighter from "react-highlight-words";


const GRNAcknowledgementComponent = ({authInfo, handleLoadList, data, rejectAcknowledge, handleRejectAcknowledge, approveAcknowledge, handleApproveAcknowledge, refresh}) => {
    const ackData = []
    const [arr, setArr] = useState([])
    const [reasonModal, setReasonModal] = useState(false)
    const [grnId, setGrnId] = useState()
    const [reason, setReason] = useState()
    const [flag, setFlag] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [rowData, setRowData] = useState()
    const [itemCode, setItemCode] = useState()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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
                    color: filtered ? '#1677ff' : undefined,
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

    useEffect(()=> {
        handleLoadList({
            certificate: authInfo.token
        })
    },[])

    const handleRefresh = () => {
        handleLoadList({
            certificate: authInfo.token
        })
    }

    useEffect(() => {
        if(data.grn !== undefined){
            if(flag) {
                data.grn.forEach((it) => {
                    ackData[it.id] = it
                })
                setFlag(false)
            }
            setArr(ackData)
        }
        console.log(data)
        console.log(arr)
        console.log(isArray(arr))
    }, [data])

    const changeGrnData = (id, field, value) => {
        console.log(arr)
        arr[id][field] = value
        setArr(arr)
        console.log(arr)
    }

    useEffect(() => {
        console.log(arr)
    },[arr])

    const generateItemCode = (limid, categoryId, id) => {
        if(arr === undefined){
            let icode = '';
            if (data.itemCategory["NON_MEDICAL"] == categoryId) {
                icode = ("N" + (data.nonMedicalItemCount +1).toString().padStart(5, 0))
            }
            else if(data.itemCategory["MEDICAL"] == categoryId){
                icode = ("M" + (data.medicalItemCount+1).toString().padStart(5, 0))
            }
            else{
                icode = limid
            }
            changeGrnData(id, 'itemCode', icode)
        }
    }

    const SetItemCodeOfRow = (value, id) => {
        console.log(data.grn)
        data.grn.forEach(a => {
            if(a.id == id){
                a.itemCode = value;
            }
        })
        // arr[id]['itemCode'] = value;
        setArr(data.grn)
    }

    useEffect(() => {
        handleLoadList({
            certificate: authInfo.token
        })
    },[refresh])


    const column=[
        {
            title:'PO No.',
            key:'poNo',
            dataIndex: 'poNo',
            fixed:'left',
            width:'100px',
            ...getColumnSearchProps('poNo'),
        },
        {
            title:'Cost Center',
            key:'costCenter',
            dataIndex: 'costCenter',
            width:'150px',
            ...getColumnSearchProps('costCenter'),
        },
        {
            title:'Cost Center Code',
            key:'costCenterCode',
            dataIndex: 'costCenterCode',
            width:'150px',
            ...getColumnSearchProps('costCenterCode'),
            // render: (_,{costCenterCode})=> (<Input value={costCenterCode || ''} disabled={true}/>)
        },
        {
            title:'Item',
            key:'itemName',
            dataIndex: 'itemName',
            width:'100px',
            ...getColumnSearchProps('itemName'),
        },
        {
            title:'Category',
            key:'category',
            dataIndex: 'category',
            width:'100px',
            ...getColumnSearchProps('category'),
            render:(_,{category})=> (data.categoryList[category.id] )
        },
        {
            title:'Quantity',
            key:'qty',
            dataIndex: 'qty'
        },
        {
            title:'Value',
            key:'value',
            dataIndex: 'value'
        },
        {
            title:'HSN Code',
            key:'hsnCode',
            dataIndex: 'hsnCode',
            width:'150px',
            render: (_,{id, hsnCode}) => {
                const row = arr[id];
                let hsn = '';
                if (row !== undefined){
                    hsn = row.hsn;
                }
                return ( <Input value={hsnCode != null ? hsnCode : hsn} onChange={e => changeGrnData(id,'hsn',e.target.value)} />)
            }
        },
        {
            title:'Rate %',
            key:'ratePerGRN',
            dataIndex: 'ratePerGRN',
            render: (_,{id, ratePerGRN}) =>{const row = arr[id];
                let rate = '';
                if(row !== undefined){
                    rate = row.ratePer;
                }
                return (<Input value={ratePerGRN != null ? ratePerGRN : rate } onChange={e => changeGrnData(id,'ratePer',e.target.value)}/>)
            }
        },
        {
            title:'Received Date',
            key:'postingDate',
            dataIndex: 'postingDate',
            width:'150px',
            render: (_, {postingDate})=>(toDdMmYYYY(postingDate))
        },
        {
            title:'Expiry Date',
            key:'expiryDate',
            dataIndex: 'expiryDate',
            width:'200px',
            render: (_,{expiryDate})=>{return <DatePicker defaultValue={moment(toDdMmYYYY(expiryDate), 'DD-MM-YYYY') || ''} disabled={true}/>}
        },
        {
            title:'Medical Code/ Batch No',
            key:'batchNo',
            dataIndex: 'batchNo | lineText',
            width:'200px',
            render: (_, {batchNo, lineText})=> {
                return lineText != null ? <Input value={lineText} /> : <Input value={ batchNo } disabled={true}/>
            }
        },
        {
            title: 'Base Pack',
            dataIndex: '',
            editable: true,
            render: (_, {id}) => {const row = arr[id];
                let base = '';
                if (row !== undefined) {
                    base = row.basePack;
                }
                return (<Input value={base} onChange={e => changeGrnData(id, 'basePack', e.target.value)} />)
            }
        },
        {title:'Pack Size Unit',
            dataIndex: '',
            editable: true,
            render: (_, {id})=> {const row = arr[id];
                let unit = '';
                if(row !== undefined){
                    unit = row.units;
                }
                return (<Input value={unit} onChange={e => changeGrnData(id,'units',e.target.value)}/>)
            }
        },
        {
            title:'No Of Boxes',
            dataIndex: '',
            editable: true,
            render: (_, {id})=> {const row = arr[id];
                let num = '';
                if(row !== undefined){
                    num = row.numBoxes;
                }
                return (<Input value={num} onChange={e => changeGrnData(id,'numBoxes',e.target.value)}/>)
            }
        },
        {
            title:'Item Code',
            key:'itemCode',
            dataIndex: 'itemCode',
            width:'150px',
            // ...getColumnSearchProps('itemCode'),
            render: (_,{limid, category, id})=> {
                let i = ''
                if (data.itemCategory["NON_MEDICAL"] == category.id) {
                    i = ("N" + (data.nonMedicalItemCount +1).toString().padStart(5, 0))
                }
                else if(data.itemCategory["MEDICAL"] == category.id){
                    i =("M" + (data.medicalItemCount+1).toString().padStart(5, 0))
                }
                else {
                    i = limid
                }
                console.log(i)
                console.log(itemCode)
                console.log(data)
                // setItemCode(i)
                return (<Input defaultValue={i} onChange={(e) => SetItemCodeOfRow(e.target.value, id)} />)
            }
        },
        {
            title:'',
            key:'',
            dataIndex: '',
            render: (_, row)=> (<><Button type="primary" onClick={()=> {
                setRowData(row)
                setShowModal(true)
            }} icon={<CheckOutlined />} size={"small"} />&nbsp;&nbsp;<Button type="primary" onClick={()=> rejectBox(row.id)} icon={<CloseOutlined />} size={"small"} /></>),
            fixed: 'right'
        },
    ]

    const rejectBox = (id) =>{
        setGrnId(id)
        setReasonModal(true)
    }

    const reject = () =>{
        handleRejectAcknowledge({
            certificate: authInfo.token,
            id: grnId,
            reason: reason,
        })
        setGrnId(null)
        setReason(null)
        setReasonModal(false)
    }

    const acknowledge = (row) => {
        console.log(row)
        console.log(arr[row.id])
        const r = arr.find(a=> a.id == row.id)
        console.log(r)
        let grnData = {
            "category":  r.category.id ,
            "costCenterCode": r.costCenterCode,
            "expiryDate": moment(r.expiryDate).format('yyyy-MM-DD').toString(),
            "itemCode": itemCode,
            "medicalCode": (r.lineText !== null ? r. lineText: ""),
            "basePack": r.basePack,
            "numBoxes": r.numBoxes,
            "hsnCode": (r.hsnCode !== null ? r.hsnCode: r.hsn),
            "ratePer": (r.ratePerGRN !== null ? r.ratePerGRN : r.ratePer),
            "units": r.units,
            "grnId": r.id
        }
        console.log(data);
        handleApproveAcknowledge({
            data: grnData,
            certificate: authInfo.token
        })
    }

    useEffect(() => {
        handleLoadList({
            certificate: authInfo.token
        })
    },[authInfo.token])

    return (
        <div>
            <TitleWidget title={'GRN'} subTitle={'Acknowledge'}/>
            <Row gutter={[8,8]}>
               <Col span={2}>
                   <Button type='primary' onClick={handleRefresh} >Refresh</Button>
               </Col>
            </Row>
            <br/>
            <Row gutter={[8,8]}>
                <Table dataSource={data.grn} columns={column}  pagination={false} size="small" scroll={{ x: 2000 }} rowKey={'ID_GRN'}/>
            </Row>
            <Modal title={'GRN UnAcknowledge'} onOk={() => reject()} onCancel={() => setReasonModal(false)} open={reasonModal}>
                <Input.TextArea onChange={(e) =>{setReason(e.target.value)}} value={reason} placeholder={"Write Reason.."}/>
            </Modal>
            <Modal title={'GRN Acknowledgement'} onOk={() => {
                acknowledge(rowData);
                setShowModal(false)
            }} onCancel={() => setShowModal(false)} open={showModal}>
                Are you sure you want to acknowledge this product?
            </Modal>
        </div>
    )
}

GRNAcknowledgementComponent.propTypes = {
    authInfo: PropTypes.any,
    handleLoadList: PropTypes.func,
    data: PropTypes.any,
    rejectAcknowledge: PropTypes.any,
    handleRejectAcknowledge: PropTypes.func,
    approveAcknowledge: PropTypes.any,
    handleApproveAcknowledge: PropTypes.func,
    refresh: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const data = selectUnacknowledged(state)
    const rejectAcknowledge = selectUnacknowledged(state)
    const approveAcknowledge = selectApproveAcknowledge(state)
    const refresh = selectRefreshAcknowledge(state)
    return { authInfo, data, rejectAcknowledge, approveAcknowledge, refresh }
}

const actions = {
    handleLoadList: unacknowledgeListStartAction,
    handleRejectAcknowledge: rejectAcknowledgeStartAction,
    handleApproveAcknowledge: approveAcknowledgeStartAction,
}

export default connect(mapState, actions)(GRNAcknowledgementComponent)
