import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import {Alert, Button, Col, InputNumber, Modal, Row, Table} from "antd";
import {allocateToAllTeamsAction, allocateToTeamAction, monthlyCommonTeamStartAction} from "../../redux/actions/allocation/allocationActions";
import {selectCommonAllocationDone, selectMonthlyCommonTeamListData, selectMonthlyCommonTeamListKeys} from "../../redux/selectors/allocationSelectors";
import DifferentialAllocationComponent from "./DifferentialAllocationComponent";
import LabelComponent from "../../widgets/LabelComponent";
import TeamAllocationDetailsComponent from "./TeamAllocationDetailsComponent";

const TeamAllocationComponent = ({item, teams, total, costCenterId,month, year, inventoryId, commonAllocationDone, handleChangeQuantity, handleAllocationToAllTeams, monthlyCommonTeam,handleMonthlyCommonTeam,authInfo, profileInfo, teamKeys}) => {
    const [showDifferential, setShowDifferential] = useState(false)
    const [teamForDifferential, setTeamForDifferential] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [column, setColumn] = useState([])
    const [keyList, setKeyList] = useState([])

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
    let sameKey;
    let sameKey1;
    let sameKey2;
    const newColumns = [
        {
            title: "Team",
            dataIndex: "team",
            key: "team",
            // render: (value, row, index) => {
            //     const obj = {
            //         children: value,
            //         props: {}
            //     };
            //     console.log(obj.children, index);
            //
            //     if (!(sameKey !== value)) {
            //         obj.props.rowSpan = 0;
            //         return obj;
            //     }
            //     const count = monthlyCommonTeam.filter(item => item.team === value).length;
            //     sameKey = value;
            //     obj.props.rowSpan = count;
            //     return obj;
            // }
        },
        {
            title: "Team Allocation",
            children: [
                {
                    title: 'Designation',
                    dataIndex: 'designation',
                    key: 1,
                },
                {
                    title: '# Members',
                    dataIndex : 'recipientCount',
                    key: 2
                },
                {
                    title: 'Allocated',
                    dataIndex: 'allocatedQuantity',
                    key: 3,

                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 4,
                    render: (_, row)=> {
                        return <InputNumber
                            value={row.quantity || 0}
                            onChange={(value)=> onChangeQuantity(row, value)}/>
                    }
                },

            ]
        },
        // {
        //     title: "",
        //     dataIndex: "",
        //     key: "",
        //     render:
        //     //     value = row.team
        //     //     const obj = {
        //         (return <><Button type={'primary'}>Allocate & Save</Button></>)
        //     //         props: {}
        //     //     };
        //     //     console.log(obj.children, index);
        //     //     if (!(sameKey1 !== value)) {
        //     //         obj.props.rowSpan = 0;
        //     //         return obj;
        //     //     }
        //     //     const count = monthlyCommonTeam.filter(item => item.team === value).length;
        //     //     sameKey1 = value;
        //     //     obj.props.rowSpan = count;
        //     //     return obj;
        //     // }
        // },
        // {
        //     title: "",
        //     dataIndex: "",
        //     key: "",
        //     render:
        //         // value = row.team
        //         // const obj = {
        //              return <Button type={'link'}
        //                               onClick={()=> {
        //                                   setTeamForDifferential(row.id)
        //                                   setShowDifferential(true)
        //                               }}>Change</Button>
        //     //         props: {}
        //     //     };
        //     //     console.log(obj.children, index);
        //     //     if (!(sameKey2 !== value)) {
        //     //         obj.props.rowSpan = 0;
        //     //         return obj;
        //     //     }
        //     //     const count = monthlyCommonTeam.filter(item => item.team === value).length;
        //     //     sameKey2 = value;
        //     //     obj.props.rowSpan = count;
        //     //     return obj;
        //     // }
        // },
        {
            title: '',
            dataIndex: '',
            key: 'allocate',
            render: (_, row)=> {
                return <Button type={'primary'}>Allocate & Save</Button>
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
                    value={row.quantity || 0}
                    onChange={(value)=> onChangeQuantity(row, value)}/>
            }
        },

        {
            title: '',
            dataIndex: '',
            key: 'allocate',
            render: (_, row)=> {
                return <Button type={'primary'}>Allocate & Save</Button>
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
                certificate:authInfo.token,
                ccmId: costCenterId,
                userId: profileInfo.id,
                month: month,
                year: year,
                inventoryId: inventoryId
            });
            // let kList=[]
            // monthlyCommonTeam.keys((key, value) => kList.push(key))
            // setKeyList(kList)
            // console.log(keyList)
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
                <Col span={4} offset={2}>
                    <LabelComponent>Qty Dispatched: {item.qtyDispatched}</LabelComponent>
                </Col>
                <Col span={4} offset={2}>
                    <LabelComponent>Pack Size: {item.packSize}</LabelComponent>
                </Col>
                {/*<Col span={4} offset={4}>*/}
                {/*    Quantity:*/}
                {/*    <InputNumber onChange={(value)=>onCommonAllocation(value)} ></InputNumber>*/}
                {/*</Col>*/}
            </Row>
            {
                teamKeys.map(item  =>
                    <TeamAllocationDetailsComponent teams={teams} total={total} monthlyCommonTeam={monthlyCommonTeam[item]}/>
                )
            }

                                {/*<Table size={'small'} dataSource={monthlyCommonTeam}*/}
                                {/*       columns={newColumns}*/}
                                {/*       footer={() => `Total Allocations: ${total || 0}`}*/}
                                {/*       rowKey={'id'} loading={teams.length === 0}*/}
                                {/*/>*/}
            <label>Total Allocations: {total || 0}</label>
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
    profileInfo: PropTypes.any,
    teams: PropTypes.array,
    item: PropTypes.any,
    total: PropTypes.number,
    commonAllocationDone: PropTypes.any,
    handleChangeQuantity: PropTypes.func,
    handleAllocationToAllTeams: PropTypes.func,
    monthlyCommonTeam:PropTypes.any,
    handleMonthlyCommonTeam:PropTypes.func,
    teamKeys: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const monthlyCommonTeam = selectMonthlyCommonTeamListData(state)
    const teamKeys = selectMonthlyCommonTeamListKeys(state)
    const profileInfo = selectProfileInfo(state)
    console.log(monthlyCommonTeam)
    console.log(teamKeys)
    return { authInfo, commonAllocationDone,monthlyCommonTeam, profileInfo, teamKeys }
}

const actions = {
    handleChangeQuantity: allocateToTeamAction,
    handleAllocationToAllTeams: allocateToAllTeamsAction,
    handleMonthlyCommonTeam:monthlyCommonTeamStartAction
}

export default connect(mapState, actions)(TeamAllocationComponent)

