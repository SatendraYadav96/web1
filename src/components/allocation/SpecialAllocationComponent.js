import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Collapse, DatePicker, Input, message, Row, Select, Spin, Steps, Table, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {MonthlyAllocationInventoryColumns} from "./AllocationColumns";
import TeamAllocationComponent from "./TeamAllocationComponent";
import moment from "moment/moment";
import {toYyyyMm} from "../../utils/DateUtils";
import {selectAllocations, selectAllocationsLoading, selectCommonAllocationDone, selectItemsLoading, selectItemsToAllocate, selectPlan} from "../../redux/selectors/allocationSelectors";
import {getAllocationsForPlanStartAction, monthlyAllocationStartAction} from "../../redux/actions/allocation/allocationActions";
const { Step } = Steps
const { Panel } = Collapse
const allocationSteps = [
    {
        title: 'Select Items',
        content: 'First-content',
    },
    {
        title: 'Allocate Items',
        content: 'Second-content',
    }
]
const { Title } = Typography

const SpecialAllocationComponent = ({authInfo,itemsLoading,
                                        items,
                                        plan,
                                        allocations,
                                        allocationsLoading,
                                        selectCommonAllocationDone,
                                        handleCreateViewPlan,
                                        handleGoToAllocations,}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])

    const createViewClicked = () => {
        handleCreateViewPlan({
            certificate: authInfo.token,
            yearMonth: toYyyyMm(yearMonth)
        })
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedItems(selectedRows)
        },
        getCheckboxProps: (row) => ({
            disabled: (row.stock) == 0
        }),
    }

    const goToAllocation = () => {
        handleGoToAllocations({
            certificate: authInfo.token,
            selectedItems: selectedItems,
            planId: plan.id
        })
        setCurrentStep(currentStep + 1)
    }

    const prev = () => {
        setCurrentStep(currentStep - 1)
    }

    // const searchData = () => {
    //     setFlag(true)
    //     setColumn([
    //         {
    //             title: 'Purpose',
    //             key: 'purpose',
    //             dataIndex: 'purpose',
    //             width: '250px'
    //         },
    //         {
    //             title: 'Requested On',
    //             key: 'requestedOn',
    //             dataIndex: 'requestedOn',
    //             width: '250px'
    //         },
    //         {
    //             title: '',
    //             key: '',
    //             dataIndex: '',
    //             width: '50px',
    //             render: () => {
    //                 return <Button type={"link"}>Edit</Button>
    //             }
    //         }
    //     ])
    //
    //     setDataSource([
    //         {
    //             key:'1',
    //             purpose: '',
    //             requestedOn: ''
    //         }
    //     ])
    // }

    const newAllocation = () => {
        return navigate('/home/allocations/special/createNew')
    }

    return(
        <>
            <TitleWidget title={'Special Allocation'} subTitle={'Create'}/>
            <Row style={{marginBottom: 40}}>
                <Col span={3}>
                    <DatePicker onChange={(date) => setYearMonth(date)} picker='month' />
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={createViewClicked}>Create/View</Button>
                </Col>
                <Col span={2} offset={17}>
                    <Button type={'secondary'}>Submit</Button>
                </Col>
            </Row>
            <Steps current={currentStep} style={{marginBottom: 20}}>
                {allocationSteps.map((item) =>
                    <Step key={item.title} title={item.title} />
                )}
            </Steps>
            {currentStep === 0 &&
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    scroll={{y: '100%'}}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    dataSource={items}
                    columns={MonthlyAllocationInventoryColumns()}
                    size={'small'}
                    rowKey={'itemID'}
                    loading={itemsLoading}
                />
            }
            {currentStep === 1 && allocations !== undefined &&
                <Spin spinning={allocationsLoading}>
                    <Collapse
                        defaultActiveKey={['1']}
                        onChange={(f)=> console.log(f)}
                        expandIconPosition={'end'}
                    >
                        {allocations.map(allocation =>
                            <Panel
                                header={<AllocationHeaderComponent item={allocation.item}/>}
                                key={`${allocation.item.itemID}`}
                            >
                                <TeamAllocationComponent
                                    total={allocation.totalAllocation}
                                    teams={allocation.teams}
                                    item={allocation.item}/>
                            </Panel>)
                        }
                    </Collapse>
                </Spin>
            }
            <div style={{marginTop: 20}}>
                {currentStep < allocationSteps.length - 1 && (
                    <Button type='primary' onClick={goToAllocation}>
                        Start Allocation
                    </Button>
                )}
                {currentStep === allocationSteps.length - 1 && (
                    <Button type='primary' onClick={() => message.success('Processing complete!')}>
                        Save
                    </Button>
                )}
                {currentStep > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Select Items
                    </Button>
                )}
            </div>
        </>
    )
}

SpecialAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    itemsLoading: PropTypes.bool,
    items: PropTypes.array,
    plan: PropTypes.any,
    allocationsLoading: PropTypes.bool,
    allocations: PropTypes.any,
    selectCommonAllocationDone: PropTypes.any,
    handleCreateViewPlan: PropTypes.func,
    handleGoToAllocations: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const items = selectItemsToAllocate(state)
    const itemsLoading = selectItemsLoading(state)
    const allocationsLoading = selectAllocationsLoading(state)
    const allocations = selectAllocations(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const plan=selectPlan(state)
    return { authInfo, itemsLoading, items, plan, allocationsLoading, allocations, commonAllocationDone }
}

const actions = {
    handleCreateViewPlan: monthlyAllocationStartAction,
    handleGoToAllocations: getAllocationsForPlanStartAction,
}

export default connect(mapState, actions) (SpecialAllocationComponent)
