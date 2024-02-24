import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import {Alert, Button, Col, Input, InputNumber, Modal, Row, Table,message} from "antd";
import {
    allocateToAllTeamsAction,
    allocateToTeamAction, getMultipleAllocationDownloadStartAction,
    monthlyCommonAllocationStartAction,
    monthlyCommonTeamStartAction,
    monthlyDifferentialAllocationStartAction, multipleAllocationUploadStartAction,
    virtualAllocateToTeamAction,
    virtualCommonAllocationStartAction,
    virtualCommonTeamStartAction, virtualDifferentialAllocationStartAction
} from "../../redux/actions/allocation/allocationActions";
import {
    selectCommonAllocationDone,
    selectMonthlyCommonTeamListData,
    selectMonthlyCommonTeamListKeys,
    selectMonthlyDifferentialAllocation, selectMultipleAllocationUpload, selectMultipleAllocationUploadSuccess, selectVirtualCommonAllocationSave, selectVirtualCommonAllocationSaveSuccess,
    selectVirtualCommonTeamListData,
    selectVirtualCommonTeamListKeys,
    selectVirtualDifferentialAllocation,
    selectVirtualDifferentialAllocationSaveSuccess
} from "../../redux/selectors/allocationSelectors";
import DifferentialAllocationComponent from "./DifferentialAllocationComponent";
import LabelComponent from "../../widgets/LabelComponent";
import TeamAllocationDetailsComponent from "./TeamAllocationDetailsComponent";
import ChangeAllocationComponent from "./ChangeAllocationComponent";
import ChangeVirtualAllocationComponent from "./ChangeVirtualAllocationComponent";

const VirtualTeamAllocationComponent = ({item, teams, total, costCenterId,month, year, handleMonthlyDifferentialAllocationSave, inventoryId, commonAllocationDone, teamForDifferentialAllocation,
                                            handleSaveCommonAllocation, handleChangeQuantity, handleAllocationToAllTeams, virtualCommonTeam,handleMonthlyCommonTeam,authInfo, profileInfo, teamKeys,
                                            virtualDifferentialAllocationSaveSuccess, virtualCommonAllocationSaveSuccess,virtualCommonAllocationSave,multipleAllocationUpload,
                                            multipleAllocationUploadSuccess}) => {
    const [showDifferential, setShowDifferential] = useState(false)
    const [teamForDifferential, setTeamForDifferential] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [column, setColumn] = useState([])
    const [keyList, setKeyList] = useState([])
    const [open, setOpen] = useState(false);
    const [teamId, setTeamId] = useState([])
    console.log(item)

    useEffect(() => {
        // let t = []
        // teams.forEach(i=> {
        //     t.push(i.id)
        // })
        // setTeamId(t)
    },[teams])

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
        virtualCommonTeam[team].forEach( t => {
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

    useEffect(() => {
        // const teamId = []
        // teams.forEach(i=>
        //     teamId.push(i.id)
        // )
        if(virtualDifferentialAllocationSaveSuccess){
            handleMonthlyCommonTeam({
                certificate:authInfo.token,
                ccmId: costCenterId,
                userId: profileInfo.id,
                month: month,
                year: year,
                inventoryId: inventoryId,
                planId: item.planId,
                teamId:teamId
            });
        }
        if(virtualCommonAllocationSaveSuccess){
            handleMonthlyCommonTeam({
                certificate:authInfo.token,
                ccmId: costCenterId,
                userId: profileInfo.id,
                month: month,
                year: year,
                inventoryId: inventoryId,
                planId: item.planId,
                teamId:teamId
            });
        }
    },[virtualDifferentialAllocationSaveSuccess, virtualCommonAllocationSaveSuccess])


    useEffect(()=>{
        let t = []
        teams.forEach(i=> {
            t.push(i.id)
        })
        setTeamId(t)
        console.log(teamId)
        console.log(teamId)
        handleMonthlyCommonTeam({
            certificate:authInfo.token,
            ccmId: costCenterId,
            userId: profileInfo.id,
            month: month,
            year: year,
            inventoryId: inventoryId,
            planId: item.planId,
            teamId:teamId
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



    // useEffect(() => {
    //     if(virtualCommonAllocationSaveSuccess){
    //
    //         console.log(virtualCommonAllocationSave)
    //         console.log(Object.keys(virtualCommonAllocationSave).length !== 0)
    //         if(virtualCommonAllocationSave!== undefined && Object.keys(virtualCommonAllocationSave).length !== 0  && virtualCommonAllocationSave.info == "error"){
    //             message.error(virtualCommonAllocationSave.body.message);
    //         }else{
    //             message.success(virtualCommonAllocationSave.body.message);
    //         }
    //     }
    // }, [virtualCommonAllocationSaveSuccess])


    useEffect(() => {
        if(multipleAllocationUploadSuccess){

            console.log(multipleAllocationUpload)
            console.log(Object.keys(multipleAllocationUpload).length !== 0)
            if(multipleAllocationUpload!== undefined && Object.keys(multipleAllocationUpload).length !== 0  && multipleAllocationUpload.info == "error"){
                message.error(multipleAllocationUpload.message);
            }else{
                message.success(multipleAllocationUpload.message);
            }
        }
    }, [multipleAllocationUploadSuccess])




    return (
        <>
            {showErrorMessage &&
                <Alert message={errorMessage} type="error" />
            }
            <Row>
                <Col span={4}>
                    <LabelComponent>Qty Received: {item.stock}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Qty Dispatched: {item.quantityAllocated}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Pack Size: {item.packSize}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Allocated Quantity: {item.quantityAllocated}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Allocation Balance: {item.stock}</LabelComponent>
                </Col>
            </Row>
            {
                teamKeys.map(team  =>
                    // <TeamAllocationDetailsComponent inventoryId={inventoryId} planId={item.planId} teams={teams} total={total} monthlyCommonTeam={monthlyCommonTeam[item]}/>
                    <>
                        <span>Total Rows: <b>{virtualCommonTeam[team]?.length}</b></span>
                        <Table size={'small'} dataSource={virtualCommonTeam[team]}
                               columns={columns}
                               rowKey={'id'} loading={teams.length === 0}
                        />
                        <br/>
                        <Row gutter={[8,8]}>
                            <Col span={3} offset={18}>
                                <Button type={'primary'} onClick={() => SaveCommonAllocation(team)}>Allocate & Save</Button>
                            </Col>
                            {/*<Col span={3}>*/}
                            {/*    <Button type={'primary'}*/}
                            {/*            onClick={() => openChangeAllocation()}*/}
                            {/*    >Change</Button>*/}
                            {/*</Col>*/}
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
                            <ChangeVirtualAllocationComponent item={item} planId={item.planId} inventoryId={inventoryId} teamId={virtualCommonTeam[team]}/>
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
VirtualTeamAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    teams: PropTypes.array,
    item: PropTypes.any,
    total: PropTypes.number,
    commonAllocationDone: PropTypes.any,
    handleChangeQuantity: PropTypes.func,
    handleAllocationToAllTeams: PropTypes.func,
    virtualCommonTeam:PropTypes.any,
    handleMonthlyCommonTeam:PropTypes.func,
    teamKeys: PropTypes.any,
    handleSaveCommonAllocation: PropTypes.any,
    handleMonthlyDifferentialAllocationSave: PropTypes.func,
    teamForDifferentialAllocation: PropTypes.any,
    virtualDifferentialAllocationSaveSuccess: PropTypes.any,
    virtualCommonAllocationSaveSuccess: PropTypes.any,
    virtualCommonAllocationSave:PropTypes.any,
    multipleAllocationUpload:PropTypes.any,
    multipleAllocationUploadSuccess: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const virtualCommonTeam = selectVirtualCommonTeamListData(state)
    const teamKeys = selectVirtualCommonTeamListKeys(state)
    const profileInfo = selectProfileInfo(state)
    console.log(virtualCommonTeam)
    console.log(teamKeys)

    const teamForDifferentialAllocation = selectVirtualDifferentialAllocation(state)
    const virtualDifferentialAllocationSaveSuccess = selectVirtualDifferentialAllocationSaveSuccess(state)
    const virtualCommonAllocationSaveSuccess = selectVirtualCommonAllocationSaveSuccess(state)
    const virtualCommonAllocationSave = selectVirtualCommonAllocationSave(state)
    const multipleAllocationUpload = selectMultipleAllocationUpload(state)
    const multipleAllocationUploadSuccess = selectMultipleAllocationUploadSuccess(state)
    return { authInfo, commonAllocationDone,virtualCommonTeam, profileInfo, teamKeys, teamForDifferentialAllocation,
        virtualDifferentialAllocationSaveSuccess, virtualCommonAllocationSaveSuccess ,virtualCommonAllocationSave,multipleAllocationUpload,multipleAllocationUploadSuccess}
}

const actions = {
    handleChangeQuantity: virtualAllocateToTeamAction,
    handleAllocationToAllTeams: allocateToAllTeamsAction,
    handleMonthlyCommonTeam:virtualCommonTeamStartAction,
    handleSaveCommonAllocation: virtualCommonAllocationStartAction,
    handleMonthlyDifferentialAllocationSave: virtualDifferentialAllocationStartAction,
    handleMultipleAllocationUpload: multipleAllocationUploadStartAction
}

export default connect(mapState, actions)(VirtualTeamAllocationComponent)

