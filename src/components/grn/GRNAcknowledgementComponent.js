import React, {useEffect, useState} from 'react';
import TitleWidget from '../../widgets/TitleWidget';
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {approveAcknowledgeStartAction, rejectAcknowledgeStartAction, unacknowledgeListStartAction} from "../../redux/actions/grn/grnActions";
import {Button, Checkbox, Col, DatePicker, Input, Modal, Row, Table} from "antd";
import {selectApproveAcknowledge, selectUnacknowledged} from "../../redux/selectors/grnSelectors";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {toDdMmYYYY} from "../../utils/DateUtils";
import moment from "moment";
import {isArray} from "@craco/craco/lib/utils";


const GRNAcknowledgementComponent = ({authInfo, handleLoadList, data, rejectAcknowledge, handleRejectAcknowledge, approveAcknowledge, handleApproveAcknowledge}) => {
    const ackData = []
    const [arr, setArr] = useState([])
    const [reasonModal, setReasonModal] = useState(false)
    const [grnId, setGrnId] = useState()
    const [reason, setReason] = useState()
    const [flag, setFlag] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [rowData, setRowData] = useState()
    const [itemCode, setItemCode] = useState()

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


    const column=[
        {
            title:'PO No.',
            key:'poNo',
            dataIndex: 'poNo',
            fixed:'left',
            width:'100px'
        },
        {
            title:'Cost Center',
            key:'costCenter',
            dataIndex: 'costCenter',
            width:'150px'
        },
        {
            title:'Cost Center Code',
            key:'costCenterCode',
            dataIndex: 'costCenterCode',
            width:'150px',
            render: (_,{costCenterCode})=> (<Input value={costCenterCode || ''} disabled={true}/>)
        },
        {
            title:'Item',
            key:'itemName',
            dataIndex: 'itemName',
            width:'100px'
        },
        {
            title:'Category',
            key:'category',
            dataIndex: 'category',
            width:'100px',
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
                setItemCode(i)
                return (<Input.Search value={i} onSearch={e =>changeGrnData(id, 'itemCode', i)} />)
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
        const r = arr[row.id]
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
            <Row gutter={[8,8]}>
                <Table dataSource={data ? data.grn : ackData} columns={column}  pagination={false} size="small" scroll={{ x: 2000 }} rowKey={'ID_GRN'}/>
            </Row>
            <Modal title={'Reason'} onOk={() => reject()} onCancel={() => setReasonModal(false)} open={reasonModal}>
                <Input.TextArea onChange={(e) =>{setReason(e.target.value)}} value={reason} placeholder={"Write Reason.."}/>
            </Modal>
            <Modal title={'Are You Sure'} onOk={() => {
                acknowledge(rowData);
                setShowModal(false)
            }} onCancel={() => setShowModal(false)} open={showModal}>
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
    handleApproveAcknowledge: PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const data = selectUnacknowledged(state)
    const rejectAcknowledge = selectUnacknowledged(state)
    const approveAcknowledge = selectApproveAcknowledge(state)
    return { authInfo, data, rejectAcknowledge, approveAcknowledge }
}

const actions = {
    handleLoadList: unacknowledgeListStartAction,
    handleRejectAcknowledge: rejectAcknowledgeStartAction,
    handleApproveAcknowledge: approveAcknowledgeStartAction,
}

export default connect(mapState, actions)(GRNAcknowledgementComponent)
