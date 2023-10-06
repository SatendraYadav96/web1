import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import {Alert, Button, Col, InputNumber, Modal, Row, Table} from "antd";
import ChangeAllocationComponent from "./ChangeAllocationComponent";
import { useNavigate } from 'react-router-dom'
import DifferentialAllocationComponent from "./DifferentialAllocationComponent";

const TeamAllocationDetailsComponent = ({inventoryId, planId, authInfo, total, teams, profileInfo, monthlyCommonTeam}) => {
    const navigate = useNavigate()
    console.log(monthlyCommonTeam)
    const [showDifferential, setShowDifferential] = useState(false)
    const [column, setColumn] = useState([])
    const [teamForDifferential, setTeamForDifferential] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [open, setOpen] = useState(false);


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
                return <InputNumber
                    value={row.quantity || 0} step={20}
                     // onChange={(value)=> onChangeQuantity(row, value)}
                />
            }
        },

        // {
        //     title: '',
        //     dataIndex: '',
        //     key: 'allocate',
        //     render: (_, row)=> {
        //         return <Button type={'primary'}>Allocate & Save</Button>
        //     }
        // },
        // {
        //     title: '',
        //     dataIndex: 'change',
        //     key: 'change',
        //     render: (_, row)=> {
        //         return <Button type={'link'}
        //                        onClick={()=> {
        //                            // setTeamForDifferential(row.id)
        //                            // setShowDifferential(true)
        //                        }}>Change</Button>
        //     }
        // },
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

    const openChangeAllocation = () => {
        // return navigate("/home/changeAllocation")
        setOpen(true)
    }

    useEffect(()=>{
        // handleMonthlyCommonTeam({
        //     certificate:authInfo.token,
        //     ccmId: costCenterId,
        //     userId: profileInfo.id,
        //     month: month,
        //     year: year,
        //     inventoryId: inventoryId
        // });
        // console.log(monthlyCommonTeam)
        // setKeyList(monthlyCommonTeam.keys())
        // console.log(keyList)
    },[])

    return (
        <div>
            <br/>
            <Table size={'small'} dataSource={monthlyCommonTeam}
                   columns={columns}
                   rowKey={'id'} loading={teams.length === 0}
            />
            <br/>
            <Row gutter={[8,8]}>
                <Col span={3} offset={18}>
                    <Button type={'primary'}>Allocate & Save</Button>
                </Col>
                <Col span={3}>
                    <Button type={'primary'}
                            // onClick={()=> {
                            //     setTeamForDifferential(row.id)
                            //     setShowDifferential(true)
                            // }}
                            onClick={() => openChangeAllocation()}
                    >Change</Button>
                </Col>
            </Row>
            <Modal
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1500}
                height={1500}
            >
                <ChangeAllocationComponent planId={planId} inventoryId={inventoryId} teamId={monthlyCommonTeam.teamId}/>
            </Modal>

        </div>
    )
}

TeamAllocationDetailsComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    total: PropTypes.number,
    // commonAllocationDone: PropTypes.any,
    // handleChangeQuantity: PropTypes.func,
    // handleAllocationToAllTeams: PropTypes.func,
    // monthlyCommonTeam:PropTypes.any,
    // handleMonthlyCommonTeam:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    // const commonAllocationDone = selectCommonAllocationDone(state)
    // const monthlyCommonTeam = selectMonthlyCommonTeamListData(state)
    const profileInfo = selectProfileInfo(state)
    return { authInfo,  profileInfo }
}

const actions = {
    // handleChangeQuantity: allocateToTeamAction,
    // handleAllocationToAllTeams: allocateToAllTeamsAction,
    // handleMonthlyCommonTeam:monthlyCommonTeamStartAction

}

export default connect(mapState, actions)(TeamAllocationDetailsComponent)

