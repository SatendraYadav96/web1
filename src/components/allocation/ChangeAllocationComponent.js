import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import TitleWidget from "../../widgets/TitleWidget";
import {Alert, Button, Col, Input, Row, Space, Table} from "antd";
import {allocateToDifferentialAction, monthlyDifferentialAllocationStartAction, monthlyDifferentialTeamStartAction} from "../../redux/actions/allocation/allocationActions";
import {selectMonthlyDifferentialAllocation} from "../../redux/selectors/allocationSelectors";
import {InputNumber} from "antd/es";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const ChangeAllocationComponent = ({authInfo, profileInfo, item, planId, inventoryId, teamId, handleMonthlyDifferentialAllocationSave, handleChangeDifferentialQuantity, handleDifferentialAllocation, teamForDifferentialAllocation}) => {

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


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

    useEffect(() => {
        console.log(planId)
        console.log(inventoryId)
        console.log(teamId)
        console.log(teamId[0].teamId)
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
            key: '',
            ...getColumnSearchProps('zone'),
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: '',
            ...getColumnSearchProps('state'),
        },
        {
            title: 'Designation',
            dataIndex: 'roleName',
            key: '',
            ...getColumnSearchProps('roleName'),
        },
        {
            title: 'Person',
            dataIndex: 'recipientName',
            key: '',
            ...getColumnSearchProps('recipientName'),
        },
        {
            title: 'Code',
            dataIndex: 'recipientCode',
            key: '',
            ...getColumnSearchProps('recipientCode'),
        },
        {
            title: 'Headquarter',
            dataIndex: 'headQuarter',
            key: '',
            ...getColumnSearchProps('headQuarter'),
        },
        {
            title: 'Allocated Quantity',
            dataIndex: 'allocatedQuantity',
            key: '',
            //...getColumnSearchProps('allocatedQuantity'),
        },
        {
            title: 'Qty',
            dataIndex: '',
            key: '',
            render: (_, row)=> {
                return <Input style={{width: '100px'}} value={row.quantity}
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
            <span>Total Rows: <b>{teamForDifferentialAllocation?.length}</b></span>
                <Table columns={columns} pagination={{pageSize: 6}} scroll={{y: 500}} dataSource={teamForDifferentialAllocation}></Table>
            {/*<Row gutter={[8,8]}>*/}
            {/*    <Col span={1} offset={23}><Button type={'primary'} onClick={() => SaveDifferentialAllocation()}>Save</Button></Col>*/}
            {/*</Row>*/}
        </div>
    )
}

ChangeAllocationComponent.propTypes = {
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

export default connect(mapState, actions)(ChangeAllocationComponent)

