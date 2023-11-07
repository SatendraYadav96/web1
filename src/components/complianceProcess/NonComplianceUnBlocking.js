import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table, customFormat, Space, Checkbox} from "antd";
import moment from 'moment'
import {CSVLink} from "react-csv"
import XLSX from "xlsx"
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import {getNonComplianceStartAction, saveNonComplianceStartAction} from "../../redux/actions/compliance/nonComplianceActions";
import SelectUnBlockingStatusComponent from "../widgets/SelectUnBlockingStatus";
import * as nonComplianceList from "rxjs";
import {selectNonComplianceListData, selectSaveNonComplianceAdminRemarkSuccess} from "../../redux/selectors/nonComplianceSelector";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


const NonComplianceUnBlockingComponent = ({authInfo, profileInfo,nonComplianceList,handleNonCompliance, handleSaveNonComplianceAdminRemark, saveNonComplianceAdminRemarkSuccess}) => {

   // const date = new Date()

   // const currentYear = date.getFullYear()
   //const currentMonth = date.getMonth()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [status, setStatus] = useState(1)
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [nsmFlag, setNsmFlag] = useState(false)
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
                    color: filtered ? '#1677ff' : undefined,
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

    const setColumnData = (id, field, value) => {
        nonComplianceList.forEach(i => {
                if(i.idRlf === id){
                    if(field === "isBlockedFF"){
                        i[field] = (value===1)?0:1
                    }else if(field === "isRejected"){
                        i[field] = (value===1)?0:1
                    }else{
                        i[field] = value
                    }
                }
            }
        )
    }




    const searchData = () => {
        setFlag(true)
        if(profileInfo.userDesignation.id === "AD81065F-35E4-4488-B17B-EEA6A0E04711"){
            setColumn([
                {
                    title:'Employee Code',
                    key:'employeeCode',
                    dataIndex:'employeeCode',
                    width:'100px',
                     ...getColumnSearchProps('employeeCode'),
                },
                {
                    title:'Employee Name',
                    key:'employeeCode',
                    dataIndex:'employeeName',
                    width:'100px',
                     ...getColumnSearchProps('employeeName'),
                },
                {
                    title: 'Team',
                    key: 'team',
                    dataIndex: 'team',
                    width: '100px',
                     ...getColumnSearchProps('team'),
                },
                {
                    title: 'Headquater',
                    key: 'headquater',
                    dataIndex: 'headquarter',
                    width: '100px',
                     ...getColumnSearchProps('headquarter'),
                },
                {
                    title: 'AM',
                    key: 'am',
                    dataIndex: 'emailAM',
                    width: '100px',
                     ...getColumnSearchProps('emailAM'),
                },
                {
                    title: 'RBM',
                    key: 'rbm',
                    dataIndex: 'emailRM',
                    width: '100px',
                    ...getColumnSearchProps('emailRM'),
                },
                {
                    title: 'Month',
                    key: 'month',
                    dataIndex: 'month',
                    width: '100px',
                     ...getColumnSearchProps('month'),
                },
                {
                    title: 'Year',
                    key: 'year',
                    dataIndex: 'year',
                    width: '100px',
                    ...getColumnSearchProps('year'),
                },
                {
                    title: 'Is Blocked',
                    key: 'IsBlockedFF',
                    dataIndex: 'IsBlockedFF',
                    width: '100px',
                    render:  (_,row) => {
                        return <Checkbox defaultChecked={(row.isBlockedFF==1)?true:false} onChange={()=> setColumnData(row.idRlf, "isBlockedFF", row.isBlockedFF)}/>
                    },
                    // ...getColumnSearchProps('isBockedFF'),
                },
                {
                    title: 'Remark',
                    key: 'remark',
                    dataIndex: 'remark',
                    width: '100px',
                     ...getColumnSearchProps('remark'),
                },
                {
                    title: 'Admin Remark',
                    key: 'remarkByAdmin',
                    dataIndex: 'remarkByAdmin',
                    width: '200px',
                    render: (_,row) => {
                        return <Input placeholder={"Enter Admin Remark"} defaultValue={row.remarkByAdmin} value={row.remarkByAdmin} onChange={(e)=> setColumnData(row.idRlf, "remarkByAdmin",e.target.value)}/>
                    }
                    // ...getColumnSearchProps('remarkByAdmin'),
                },
                {
                    title: 'Rejected',
                    key: 'isRejected',
                    dataIndex: 'isRejected',
                    width: '100px',
                    render: (_,row) => {
                        return <Checkbox defaultChecked={(row.isRejected==1)?true:false} onChange={()=> setColumnData(row.idRlf, "IsRejected", row.isRejected)}/>
                    }
                    // ...getColumnSearchProps('remarkByAdmin'),
                },
            ])
        } else if(profileInfo.userDesignation.id === "24720986-A3EE-4DCA-9538-36F52625EB70"){
            setColumn([
                {
                    title:'Employee Code',
                    key:'employeeCode',
                    dataIndex:'employeeCode',
                    width:'100px',
                     ...getColumnSearchProps('employeeCode'),
                },
                {
                    title:'Employee Name',
                    key:'employeeCode',
                    dataIndex:'employeeName',
                    width:'100px',
                     ...getColumnSearchProps('employeeName'),
                },
                {
                    title: 'Team',
                    key: 'team',
                    dataIndex: 'team',
                    width: '100px',
                    ...getColumnSearchProps('team'),
                },
                {
                    title: 'Headquater',
                    key: 'headquater',
                    dataIndex: 'headquarter',
                    width: '100px',
                     ...getColumnSearchProps('headquarter'),
                },
                {
                    title: 'AM',
                    key: 'am',
                    dataIndex: 'emailAM',
                    width: '100px',
                    ...getColumnSearchProps('emailAM'),
                },
                {
                    title: 'RBM',
                    key: 'rbm',
                    dataIndex: 'emailRM',
                    width: '100px',
                    ...getColumnSearchProps('emailRM'),
                },
                {
                    title: 'Month',
                    key: 'month',
                    dataIndex: 'month',
                    width: '100px',
                    ...getColumnSearchProps('month'),
                },
                {
                    title: 'Year',
                    key: 'year',
                    dataIndex: 'year',
                    width: '100px',
                     ...getColumnSearchProps('year'),
                },
                {
                    title: 'Is Blocked',
                    key: 'isBlockedFF',
                    dataIndex: 'isBlockedFF',
                    width: '100px',
                    render:  (_,row) => {
                        return <Checkbox defaultChecked={(row.isBlockedFF==1)?true:false} disabled={true}/>
                    },
                    // ...getColumnSearchProps('isBockedFF'),
                },
                {
                    title: 'Remark',
                    key: 'remark',
                    dataIndex: 'remark',
                    width: '100px',
                    render: (_,row) => {
                        return <Input placeholder={"Enter Remark"} defaultValue={row.remark} value={row.remark} onChange={(e) => setColumnData(row.idRlf,"remark", e.target.value)}/>
                    }
                    // ...getColumnSearchProps('remark'),
                },
                {
                    title: 'Admin Remark',
                    key: 'remarkByAdmin',
                    dataIndex: 'remarkByAdmin',
                    width: '200px',
                     ...getColumnSearchProps('remarkByAdmin'),
                },
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '100px',
                    render: (_,row) => {
                        return <Checkbox defaultChecked={(row.isRejected==1)?true:false} disabled={true}/>
                    }
                    // ...getColumnSearchProps('remarkByAdmin'),
                },
            ])
        }

        setDataSource([])
    }

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    const saveAdminRemark = () => {
        let nonComp = []
        if(profileInfo.userDesignation.id === "AD81065F-35E4-4488-B17B-EEA6A0E04711"){
            nonComplianceList.forEach(i => {
                let data = {
                    "id":i.idRlf,
                    "adminRemark":i.remarkByAdmin,
                    "isBlocked":i.isBlocked,
                    "isRejected":i.isRejected
                }
                nonComp.push(data)
            })

        }else if(profileInfo.userDesignation.id === "24720986-A3EE-4DCA-9538-36F52625EB70"){
            nonComplianceList.forEach(i => {
                let data = {
                    "id":i.idRlf,
                    "adminRemark":i.remarkByAdmin,
                }
                nonComp.push(data)
            })
        }

        handleSaveNonComplianceAdminRemark({
            certificate: authInfo.token,
            nonComp: nonComp
        })
    }

    useEffect(() => {
        handleNonComplianceData()
    },[saveNonComplianceAdminRemarkSuccess])

    const getPurchaseReportList = () => {
        // console.log(businessUnit);
        // console.log(division);
        // console.log(startDate);
        // console.log(endDate);
        // console.log(profileInfo.id);
        // console.log(profileInfo.userDesignation.id);
        //
        // console.log(purchaseList);

        // handlePurchaseReportList ({
        //     businessUnit:businessUnit,
        //     divison:division,
        //     userId: profileInfo.id,
        //     userDesgId: profileInfo.userDesignation.id,
        //     startDate:formatedStartDateString,
        //     endDate:formatedEndDateString,
        //     // startDate:startDate,
        //     // endDate:endDate,
        //
        //
        //
        //     certificate: authInfo.token
        // });
        searchData()

    }

    const handleNonComplianceData = () => {
        handleNonCompliance({
            certificate: authInfo.token,
            statusType: status,
            month: month,
            year: year,
        })
        searchData()
    }

    useEffect(() => {
        {nonComplianceList.length > 0 ? setData(nonComplianceList?.map(item => {
            return {
               employeeCode:item.employeeCode,
                employeeName:item.employeeName,
                team:item.team,
                headquarter:item.headquarter,
                month:item.month,
                year:item.year,
                am:item.emailAM,
                rm:item.emailRM,
                isBockedFF:item.isBockedFF,
                remark:item.remark,
                remarkByAdmin:item.remarkByAdmin,
                isRejected: item.isRejected,
                idRlf: item.idRlf
            }
        })) : console.log('no data')}

        console.log(nonComplianceList)
    },[nonComplianceList])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"NonComplianceUnBlocking.xlsx")
    }

    return(
        <>
            <TitleWidget title="Non Compliance UnBlocking" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Status<br/>
                    <SelectUnBlockingStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    Month <br/>
                    <SelectMonthComponent onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>handleNonComplianceData()}>Search</Button>
                </Col>
                <Col span={3} offset={9}>
                    <br/>
                    <Button type={"primary"} onClick={() => saveAdminRemark()}>Save</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"NonComplianceUnBlocking.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={nonComplianceList}/>
            }
        </>
    )

}

NonComplianceUnBlockingComponent.propTypes = {
    authInfo: PropTypes.any,
     profileInfo: PropTypes.any,
    nonComplianceList: PropTypes.array,
    handleSaveNonComplianceAdminRemark: PropTypes.func,
    saveNonComplianceAdminRemarkSuccess: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
     const profileInfo = selectProfileInfo(state)
    const nonComplianceList = selectNonComplianceListData(state)
    const saveNonComplianceAdminRemarkSuccess = selectSaveNonComplianceAdminRemarkSuccess(state)
    return {authInfo, profileInfo,nonComplianceList, saveNonComplianceAdminRemarkSuccess}
}

const actions = {
    handleNonCompliance: getNonComplianceStartAction,
    handleSaveNonComplianceAdminRemark : saveNonComplianceStartAction
}

export default connect(mapState, actions)(NonComplianceUnBlockingComponent)
