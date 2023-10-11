import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import {Alert, Button, Col, Input, InputNumber, Modal, Row, Table} from "antd";
import {allocateToAllTeamsAction, allocateToTeamAction, monthlyCommonAllocationStartAction, monthlyCommonTeamStartAction, monthlyDifferentialAllocationStartAction} from "../../redux/actions/allocation/allocationActions";
import {selectCommonAllocationDone, selectMonthlyCommonTeamListData, selectMonthlyCommonTeamListKeys, selectMonthlyDifferentialAllocation} from "../../redux/selectors/allocationSelectors";
import DifferentialAllocationComponent from "./DifferentialAllocationComponent";
import LabelComponent from "../../widgets/LabelComponent";
import TeamAllocationDetailsComponent from "./TeamAllocationDetailsComponent";
import ChangeAllocationComponent from "./ChangeAllocationComponent";

const TeamAllocationComponent = ({item, teams, total, costCenterId,month, year, inventoryId, commonAllocationDone, teamForDifferentialAllocation, handleSaveCommonAllocation, handleChangeQuantity, handleMonthlyDifferentialAllocationSave, handleAllocationToAllTeams, monthlyCommonTeam,handleMonthlyCommonTeam,authInfo, profileInfo, teamKeys}) => {
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
        teams.forEach(t => {
            if (t.id = team.id) {
                total = total + qty * t.recipient
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
            qty
        })
    }
    let sameKey;
    let sameKey1;
    let sameKey2;


    const columns = [
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: '# Members',
            dataIndex : 'recipientCount',
            key: 'recipientCount'
        },
        {
            title: 'Allocated',
            dataIndex: 'allocatedQuantity',
            key: 'allocatedQuantity',

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, row)=> {
                return <Input style={{width: '50px'}}
                    value={row.quantity}
                     onChange={(value)=> onChangeQuantity(row, value)}
                />
            }
        },

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

    const SaveCommonAllocation = (team) => {
        let data = []
        monthlyCommonTeam[team].forEach( t => {
            if(t.quantity == undefined){
                t.quantity = 0
            }
            let allocationData = {}
            allocationData["dispatchPlanId"] = item.planId
            allocationData["teamId"] = t.teamId
            allocationData["designationId"] = t.designationId
            allocationData["inventoryId"] = inventoryId
            allocationData["quantity"] = t.quantity
            data.push(allocationData)
        })
        console.log(data)
        handleSaveCommonAllocation({
            certificate: authInfo.token,
            data: data
        });

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
                certificate:authInfo.token,
                ccmId: costCenterId,
                userId: profileInfo.id,
                month: month,
                year: year,
                inventoryId: inventoryId
            });

    },[costCenterId])

    const SaveDifferentialAllocation = (team) => {
        console.log(teamForDifferentialAllocation)
        let data = []
        teamForDifferentialAllocation.forEach(i => {
                if(i.quantity == undefined){
                    i.quantity = 0
                }
                const d = {
                    "dispatchPlanId": item.planId,
                    "recipientId": i.recipientID,
                    "inventoryId": inventoryId,
                    "quantity": i.quantity
                }
                data.push(d)
            }
        )

        handleMonthlyDifferentialAllocationSave({
            certificate: authInfo.token,
            data: data
        })
        setOpen(false)
    }

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
            {
                teamKeys.map(team  =>
                    // <TeamAllocationDetailsComponent inventoryId={inventoryId} planId={item.planId} teams={teams} total={total} monthlyCommonTeam={monthlyCommonTeam[item]}/>
                <>
                    <Table size={'small'} dataSource={monthlyCommonTeam[team]}
                           columns={columns}
                           rowKey={'id'} loading={teams.length === 0}
                    />
                    <br/>
                    <Row gutter={[8,8]}>
                    <Col span={3} offset={18}>
                        <Button type={'primary'} onClick={() => SaveCommonAllocation(team)}>Allocate & Save</Button>
                    </Col>
                    <Col span={3}>
                        <Button type={'primary'}
                        onClick={() => openChangeAllocation()}
                        >Change</Button>
                    </Col>
                    </Row>
                    <Modal
                        centered
                        open={open}
                        okText={"Save"}
                        onOk={() => SaveDifferentialAllocation(team)}
                        onCancel={() => setOpen(false)}
                        cancelText={"Close"}
                        width={1500}

                    >
                        <ChangeAllocationComponent item={item} planId={item.planId} inventoryId={inventoryId} teamId={monthlyCommonTeam[team]}/>
                      </Modal>
                    </>
                )
            }

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

TeamAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    teams: PropTypes.array,
    item: PropTypes.any,
    total: PropTypes.number,
    commonAllocationDone: PropTypes.any,
    handleChangeQuantity: PropTypes.func,
    handleAllocationToAllTeams: PropTypes.func,
    monthlyCommonTeam:PropTypes.any,
    handleMonthlyCommonTeam:PropTypes.func,
    teamKeys: PropTypes.any,
    handleSaveCommonAllocation: PropTypes.any,
    handleMonthlyDifferentialAllocationSave: PropTypes.func,
    teamForDifferentialAllocation: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const monthlyCommonTeam = selectMonthlyCommonTeamListData(state)
    const teamKeys = selectMonthlyCommonTeamListKeys(state)
    const profileInfo = selectProfileInfo(state)
    console.log(monthlyCommonTeam)
    console.log(teamKeys)
    const teamForDifferentialAllocation = selectMonthlyDifferentialAllocation(state)
    return { authInfo, commonAllocationDone,monthlyCommonTeam, profileInfo, teamKeys, teamForDifferentialAllocation }
}

const actions = {
    handleChangeQuantity: allocateToTeamAction,
    handleAllocationToAllTeams: allocateToAllTeamsAction,
    handleMonthlyCommonTeam:monthlyCommonTeamStartAction,
    handleSaveCommonAllocation: monthlyCommonAllocationStartAction,
    handleMonthlyDifferentialAllocationSave: monthlyDifferentialAllocationStartAction,
}

export default connect(mapState, actions)(TeamAllocationComponent)

