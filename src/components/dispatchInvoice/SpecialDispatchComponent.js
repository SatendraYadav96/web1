import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table} from "antd";
import {Option} from "antd/es/mentions";
import {Link} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import { getSpecialDispatchStartAction } from '../../redux/actions/dispatchInvoice/specialDispatchAction'
import {selectSpecialData,selectLoadingSpecialDispatchData} from "../../redux/selectors/specialDispatchSelector"

const SpecialDispatchComponent = ({authInfo,specialData,specialDispatchLoading,handleSpecialDispatchList,profileInfo}) => {

    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Plan Purpose',
                key: 'planPurpose',
                dataIndex: 'namePlan',
                width:'100px'
            },
            {
                title: 'Brand Manager Name',
                key: 'brandManagerName',
                dataIndex: 'nameBmRec',
                width:'200px'
            },
            {
                title: 'Plan Status',
                key: 'planStatus',
                dataIndex: 'nameStatusDip',
                width:'100px'
            },
            {
                title: 'Invoice Status',
                key: 'invoiceStatus',
                dataIndex: 'invoiceStatus',
                width:'100px'
            },
            {
                title: 'Approval Date',
                key: 'approvalDate',
                dataIndex: 'approvalDate',
                width:'100px'
            },
            {
                title:'',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Link to="/home/dispatchInvoicing/specialDispatch/details">Show</Link>
                }
            }
        ]);
        setDataSource([
            {
                key:'',
                planPurpose: '',
                brandManagerName: '',
                planStatus:'',
                invoiceStatus: '',
                approvalDate:''
            }
        ])


}


         const getSpecialDispatchList = () => {
                console.log(year);
                console.log(month);
                console.log(specialData);
                handleSpecialDispatchList ({
                year:year,
                month:month,
                certificate: authInfo.token
                });
                  searchData()

        }




    return(
        <div>
            <TitleWidget title={'Special Dispatch'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={4}>
                    <Button type={'primary'} onClick={() => getSpecialDispatchList()}>Submit</Button>
                </Col>
                <Col span={14}>
                    <>
                        <div align="right">
                            <Input.Search style={{ width: 300 }} />
                        </div>
                    </>
                </Col>
            </Row>
            <br/><br/>
            <Table columns={column} dataSource={specialData}/>
            {/*<>*/}
            {/*/!*<div align="right">*!/*/}
            {/*/!*    <Input.Search style={{ width: 304 }} />*!/*/}
            {/*/!*</div>*!/*/}
            {/*/!*<br/><br/>*!/*/}
            {/*    <Table columns={column} dataSource={specialData}/>*/}
            {/*</>*/}

        </div>
    )
}

SpecialDispatchComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    specialData:PropTypes.array,
    specialDispatchLoading:PropTypes.any,
    handleSpecialDispatchList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const specialData = selectSpecialData(state)
    const specialDispatchLoading = selectLoadingSpecialDispatchData(state)

            return {authInfo,specialData, specialDispatchLoading,profileInfo}
}

const actions = {
    handleSpecialDispatchList : getSpecialDispatchStartAction
}

export default connect(mapState, actions)(SpecialDispatchComponent)
