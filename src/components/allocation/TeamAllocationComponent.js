import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import {Alert, Button, Col, InputNumber, Modal, Row, Table} from "antd";
import {allocateToAllTeamsAction, allocateToTeamAction, monthlyCommonTeamStartAction} from "../../redux/actions/allocation/allocationActions";
import {selectCommonAllocationDone, selectMonthlyCommonTeamListData} from "../../redux/selectors/allocationSelectors";
import DifferentialAllocationComponent from "./DifferentialAllocationComponent";
import LabelComponent from "../../widgets/LabelComponent";

const TeamAllocationComponent = ({item, teams, total, commonAllocationDone, handleChangeQuantity, handleAllocationToAllTeams, monthlyCommonTeam,handleMonthlyCommonTeam,authInfo}) => {
    const [showDifferential, setShowDifferential] = useState(false)
    const [teamForDifferential, setTeamForDifferential] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [column, setColumn] = useState([])
    const onChangeQuantity = (team, quantity) => {
        if (quantity % item.packSize !== 0) {
            setShowErrorMessage(true)
            setErrorMessage('Quantity is not a multiple of Pack Size')
            return;
        } else {
            setShowErrorMessage(false)
            setErrorMessage(null)
        }
        let total = 0
        teams.forEach(t => {
            if (t.id = team.id) {
                total = total + quantity * t.recipient
            } else {
                if (t.quantity !== undefined) {
                    total = total + t.quantity
                }
            }
        })
        if (total > item.stock) {
            setShowErrorMessage(true)
            setErrorMessage('Quantity exceeds available quantity')
            return
        }else {
            setShowErrorMessage(false)
            setErrorMessage(null)
        }
        handleChangeQuantity({
            item,
            team,
            quantity
        })
    }
    const columns = [
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'name',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'name',
        },
        {
            title: '# Members',
            dataIndex : 'recipientCount',
            key: 'recipient'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, row)=> {
                return <InputNumber
                    value={row.quantity || 0}
                    onChange={(value)=> onChangeQuantity(row, value)}/>
            }
        },
        {
            title: '',
            dataIndex: 'change',
            key: 'change',
            render: (_, row)=> {
                return <Button type={'link'}
                   onClick={()=> {
                       setTeamForDifferential(row.id)
                       setShowDifferential(true)
                   }}>Change</Button>
            }
        },
    ]

    const handleSave = () => {

    }

    const handleCancel = () => {
        setShowDifferential(false)
    }

    const onCommonAllocation = ( quantity) => {
        if (quantity % item.packSize !== 0) {
            setShowErrorMessage(true)
            setErrorMessage('Quantity is not a multiple of Pack Size')
            return;
        } else {
            setShowErrorMessage(false)
            setErrorMessage(null)
        }
        let total = 0
        teams.forEach(team => total = total + quantity * team.recipient)
        if (total > item.stock) {
            setShowErrorMessage(true)
            setErrorMessage('Quantity exceeds available quantity')
            return
        }else {
            setShowErrorMessage(false)
            setErrorMessage(null)
        }
        handleAllocationToAllTeams({
            item: item.itemID, quantity
        })
    }

    useEffect(()=>{
        handleMonthlyCommonTeam({
            certificate:authInfo.token

        });


    },[authInfo.token])

    return (
        <>
            {showErrorMessage &&
                <Alert message={errorMessage} type="error" />
            }
            <Row>
                <Col span={4}>
                    <LabelComponent>Qty Received: {item.qtyReceived}</LabelComponent>
                </Col>
                <Col span={4} offset={2}>
                    <LabelComponent>Qty Dispatched: {item.qtyDispatched}</LabelComponent>
                </Col>
                <Col span={4} offset={2}>
                    <LabelComponent>Pack Size: {item.packSize}</LabelComponent>
                </Col>
                <Col span={4} offset={4}>
                    Quantity:
                    <InputNumber onChange={(value)=>onCommonAllocation(value)} ></InputNumber>
                </Col>
            </Row>
            <Table size={'small'} dataSource={teams}
                   columns={columns}
                   footer={()=>`Total Allocations: ${total || 0}`}
                   rowKey={'id'} loading={teams.length === 0}
            />
            <Modal title="Differential Allocation"
                   width={'600'}
                   visible={showDifferential} onOk={handleSave} onCancel={handleCancel}>
                <DifferentialAllocationComponent teamId={teamForDifferential}/>
            </Modal>
        </>
    )
}

TeamAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    teams: PropTypes.array,
    item: PropTypes.any,
    total: PropTypes.number,
    commonAllocationDone: PropTypes.any,
    handleChangeQuantity: PropTypes.func,
    handleAllocationToAllTeams: PropTypes.func,
    monthlyCommonTeam:PropTypes.array,
    handleMonthlyCommonTeam:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const monthlyCommonTeam = selectMonthlyCommonTeamListData(state)
    console.log(monthlyCommonTeam)

    return { authInfo, commonAllocationDone,monthlyCommonTeam }
}

const actions = {
    handleChangeQuantity: allocateToTeamAction,
    handleAllocationToAllTeams: allocateToAllTeamsAction,
    handleMonthlyCommonTeam:monthlyCommonTeamStartAction
}

export default connect(mapState, actions)(TeamAllocationComponent)

