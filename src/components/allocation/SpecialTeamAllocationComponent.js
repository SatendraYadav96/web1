import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import {Alert, Button, Col, Input, InputNumber, Modal, Row, Table} from "antd";
import {
    allocateToAllTeamsAction, allocateToDifferentialAction,
    allocateToTeamAction,
    monthlyCommonAllocationStartAction,
    monthlyCommonTeamStartAction,
    monthlyDifferentialAllocationStartAction, specialAllocateToDifferentialAction, specialDifferentialAllocationSaveStartAction, specialDifferentialTeamStartAction,
    virtualAllocateToTeamAction,
    virtualCommonAllocationStartAction,
    virtualCommonTeamStartAction, virtualDifferentialAllocationStartAction
} from "../../redux/actions/allocation/allocationActions";
import {
    selectCommonAllocationDone,
    selectMonthlyCommonTeamListData,
    selectMonthlyCommonTeamListKeys,
    selectMonthlyDifferentialAllocation,
    selectSpecialDifferentialAllocation, selectSpecialDifferentialAllocationSaveSuccess,
    selectVirtualCommonTeamListData,
    selectVirtualCommonTeamListKeys,
    selectVirtualDifferentialAllocation
} from "../../redux/selectors/allocationSelectors";
import DifferentialAllocationComponent from "./DifferentialAllocationComponent";
import LabelComponent from "../../widgets/LabelComponent";
import TeamAllocationDetailsComponent from "./TeamAllocationDetailsComponent";
import ChangeAllocationComponent from "./ChangeAllocationComponent";
import ChangeVirtualAllocationComponent from "./ChangeVirtualAllocationComponent";

const SpecialTeamAllocationComponent = ({item, teams, costCenterId,month, year, handleChangeDifferentialQuantity, handleSpecialDifferentialAllocationSave, inventoryId, commonAllocationDone, handleSaveCommonAllocation, handleChangeQuantity, handleAllocationToAllTeams, specialDifferentialTeam,handleSpecialDifferentialTeam,authInfo, profileInfo, teamKeys, specialDifferentialAllocationSaveSuccess}) => {
    const [showDifferential, setShowDifferential] = useState(false)
    const [teamForDifferential, setTeamForDifferential] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [column, setColumn] = useState([])
    const [keyList, setKeyList] = useState([])
    const [open, setOpen] = useState(false);
    console.log(item)

    const onChangeQuantity = (team, quantity) => {
        let qty = quantity.currentTarget.value
        if (qty % item.packSize !== 0) {
            setShowErrorMessage(true)
            setErrorMessage('Quantity is not a multiple of Pack Size')
            return;
        } else {
            setShowErrorMessage(false)
            setErrorMessage(null)
        }
        let total = 0
        let recipientID = null
        specialDifferentialTeam.forEach(t => {
            if (t.id == team.id) {
                recipientID = team.id
                total = total + qty
                // } else {
                //     if (t.quantity !== undefined) {
                //         total = total + t.quantity
                //     }
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

        handleChangeDifferentialQuantity({
            recipientID,
            qty
        })
    }
    let sameKey;
    let sameKey1;
    let sameKey2;


    const columns = [
        {
            title: 'Zone',
            dataIndex: 'zone',
            key: ''
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: ''
        },
        {
            title: 'Designation',
            dataIndex: 'roleName',
            key: ''
        },
        {
            title: 'Person',
            dataIndex: 'name',
            key: ''
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: ''
        },
        {
            title: 'Headquarter',
            dataIndex: 'headQuarter',
            key: ''
        },
        {
            title: 'Qty',
            dataIndex: '',
            key: '',
            render: (_, row)=> {
                return <Input style={{width: '100px'}}
                              value={row.quantity}
                              onChange={(value)=> onChangeQuantity(row, value)}
                />
            }
        }
    ]

    const handleSave = () => {

    }

    const handleCancel = () => {
        setShowDifferential(false)
    }

    const openChangeAllocation = () => {
        // return navigate("/home/changeAllocation")
        setOpen(true)
    }

    const SaveCommonAllocation = () => {
        let data = []
        specialDifferentialTeam.forEach( t => {
            if(t.quantity == undefined){
                t.quantity = 0
            }
            let allocationData = {}
            allocationData["dispatchPlanId"] = item.planId
            allocationData["recipientId"] = t.id
            allocationData["inventoryId"] = inventoryId
            allocationData["quantity"] = t.quantity
            data.push(allocationData)
        })
        console.log(data)
        handleSpecialDifferentialAllocationSave({
            certificate: authInfo.token,
            data: data
        });

    }

    useEffect(() => {
        if(specialDifferentialAllocationSaveSuccess){
            handleSpecialDifferentialTeam({
                certificate:authInfo.token,
                ccmId: costCenterId,
                userId: profileInfo.id,
                month: month,
                year: year,
                inventoryId: inventoryId,
                planId: item.planId,
                teamId: teams[0].id
            });
        }
    },[specialDifferentialAllocationSaveSuccess])



    useEffect(()=>{
        console.log(teams)
        handleSpecialDifferentialTeam({
            certificate:authInfo.token,
            ccmId: costCenterId,
            userId: profileInfo.id,
            month: month,
            year: year,
            inventoryId: inventoryId,
            planId: item.planId,
            teamId: teams[0].id
        });

    },[costCenterId])


    return (
        <>
            {showErrorMessage &&
                <Alert message={errorMessage} type="error" />
            }
            <Row>
                <Col span={4}>
                    <LabelComponent>Qty Received: {item.qtyReceived}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Qty Dispatched: {item.qtyDispatched}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Pack Size: {item.packSize}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Allocated Quantity: {item.quantityAllocated}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Allocation Balance: {item.balance}</LabelComponent>
                </Col>
            </Row>
                        <Table size={'small'} dataSource={specialDifferentialTeam}
                               columns={columns}
                               rowKey={'id'} loading={teams.length === 0}
                        />
                        <br/>
                        <Row gutter={[8,8]}>
                            <Col span={3} offset={21}>
                                <Button type={'primary'} onClick={() => SaveCommonAllocation()}>Allocate & Save</Button>
                            </Col>
                            {/*<Col span={3}>*/}
                            {/*    <Button type={'primary'}*/}
                            {/*            onClick={() => openChangeAllocation()}*/}
                            {/*    >Change</Button>*/}
                            {/*</Col>*/}
                        </Row>


            {/*<Table size={'small'} dataSource={monthlyCommonTeam}*/}
            {/*       columns={newColumns}*/}
            {/*       footer={() => `Total Allocations: ${total || 0}`}*/}
            {/*       rowKey={'id'} loading={teams.length === 0}*/}
            {/*/>*/}
            {/*<label>Total Allocations: {total || 0}</label>*/}

            {/*<Modal title="Differential Allocation"*/}
            {/*       width={'600'}*/}
            {/*       visible={showDifferential} onOk={handleSave} onCancel={handleCancel}>*/}
            {/*    <DifferentialAllocationComponent teamId={teamForDifferential}/>*/}
            {/*</Modal>*/}
        </>
    )
}

SpecialTeamAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    teams: PropTypes.array,
    item: PropTypes.any,
    total: PropTypes.number,
    commonAllocationDone: PropTypes.any,
    handleChangeQuantity: PropTypes.func,
    handleAllocationToAllTeams: PropTypes.func,
    specialDifferentialTeam:PropTypes.any,
    handleSpecialDifferentialTeam:PropTypes.func,
    teamKeys: PropTypes.any,
    handleSaveCommonAllocation: PropTypes.any,
    handleSpecialDifferentialAllocationSave: PropTypes.func,
    handleChangeDifferentialQuantity: PropTypes.func,
    specialDifferentialAllocationSaveSuccess: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const specialDifferentialTeam = selectSpecialDifferentialAllocation(state)
    const teamKeys = selectVirtualCommonTeamListKeys(state)
    const profileInfo = selectProfileInfo(state)
    console.log(specialDifferentialTeam)
    console.log(teamKeys)
    const specialDifferentialAllocationSaveSuccess = selectSpecialDifferentialAllocationSaveSuccess(state)
    return { authInfo, commonAllocationDone,specialDifferentialTeam, profileInfo, teamKeys, specialDifferentialAllocationSaveSuccess }
}

const actions = {
    handleChangeQuantity: virtualAllocateToTeamAction,
    handleAllocationToAllTeams: allocateToAllTeamsAction,
    handleSpecialDifferentialTeam:specialDifferentialTeamStartAction,
    handleChangeDifferentialQuantity: specialAllocateToDifferentialAction,
    handleSpecialDifferentialAllocationSave: specialDifferentialAllocationSaveStartAction
}

export default connect(mapState, actions)(SpecialTeamAllocationComponent)

