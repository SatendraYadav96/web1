import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import TitleWidget from "../../widgets/TitleWidget";
import {Alert, Button, Col, Input, Row, Table} from "antd";
import {allocateToDifferentialAction, monthlyDifferentialAllocationStartAction, monthlyDifferentialTeamStartAction} from "../../redux/actions/allocation/allocationActions";
import {selectMonthlyDifferentialAllocation} from "../../redux/selectors/allocationSelectors";
import {InputNumber} from "antd/es";

const ChangeVirtualAllocationComponent = ({authInfo, profileInfo, item, planId, inventoryId, teamId, handleMonthlyDifferentialAllocationSave, handleChangeDifferentialQuantity, handleDifferentialAllocation, teamForDifferentialAllocation}) => {

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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
        teamForDifferentialAllocation.forEach(t => {
            if (t.recipientID == team.recipientID) {
                recipientID = team.recipientID
                total = total + qty
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

        handleChangeDifferentialQuantity({
            recipientID,
            qty
        })
    }

    useEffect(() => {
        console.log(planId)
        console.log(inventoryId)
        console.log(teamId)
        handleDifferentialAllocation({
            certificate: authInfo.token,
            planId: planId,
            inventoryId: inventoryId,
            teamId: teamId[0].teamId
        });
    },[])

    useEffect(() => {

    },[])

    const SaveDifferentialAllocation = () => {
        console.log(teamForDifferentialAllocation)
        // let data = []
        // teamForDifferentialAllocation.forEach(t => {
        //         let arr = {}
        //         if(t.quantity == undefined){
        //             t.quantity = 0
        //         }
        //         arr["dispatchPlanId"] = planId
        //         arr["recipientId"] = t.recipientID
        //         arr["inventoryId"] = inventoryId
        //         arr["quantity"] = t.quantity
        //         data.push(arr)
        //     }
        // )
        // console.log(data)
        // handleMonthlyDifferentialAllocationSave({
        //     certificate: authInfo.token,
        //     data: data
        // })
    }

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
            dataIndex: 'recipientName',
            key: ''
        },
        {
            title: 'Code',
            dataIndex: 'roleCode',
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

    return (
        <div>
            <TitleWidget title={"Team Details"}></TitleWidget>
            {showErrorMessage &&
                <Alert message={errorMessage} type="error" />
            }
            <Table columns={columns} pagination={{pageSize: 6}} scroll={{y: 500}} dataSource={teamForDifferentialAllocation}></Table>
            {/*<Row gutter={[8,8]}>*/}
            {/*    <Col span={1} offset={23}><Button type={'primary'} onClick={() => SaveDifferentialAllocation()}>Save</Button></Col>*/}
            {/*</Row>*/}
        </div>
    )
}

ChangeVirtualAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    handleDifferentialAllocation: PropTypes.func,
    teamForDifferentialAllocation: PropTypes.any,
    handleChangeDifferentialQuantity: PropTypes.func,
    handleMonthlyDifferentialAllocationSave: PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const teamForDifferentialAllocation = selectMonthlyDifferentialAllocation(state)
    return { authInfo,  profileInfo, teamForDifferentialAllocation }
}

const actions = {
    handleDifferentialAllocation : monthlyDifferentialTeamStartAction,
    handleChangeDifferentialQuantity: allocateToDifferentialAction,
    handleMonthlyDifferentialAllocationSave: monthlyDifferentialAllocationStartAction
}

export default connect(mapState, actions)(ChangeVirtualAllocationComponent)

