import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import {selectNearToExpiryInputListData, selectLoadingNearToExpiryInputReportData} from "../../redux/selectors/nearToExpiryInputSelector";
import {getNearToExpiryInputReportStartAction} from "../../redux/actions/reports/nearToExpiryInputReportActions";
import {CSVLink} from "react-csv";
import XLSX from "xlsx"
import {selectBuDropdown, selectDivisionDropdown} from "../../redux/selectors/dropDownSelector";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const NearToExpiryReportComponent = ({authInfo,profileInfo,nearToExpiryInputList,nearToExpiryInputReportLoading,handleNearToExpiryInputReportList,buDropdown,divisionDropdown}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState()
    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [division, setDivision] = useState()
    const [d, setD] = useState()
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

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Team',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px',
            },
            {
                title:'SubTeam',
                key:'division',
                dataIndex:'division',
                width:'100px',
            },{
                title:'Cost Center',
                key:'costCenter',
                dataIndex:'costCenterName',
                width:'100px',
            },
            {
                title:'Item Code',
                key:'itemCode',
                dataIndex:'productCode',
                width:'100px',
                ...getColumnSearchProps('productCode'),
            },
            {
                title:'Item Name',
                key:'itemName',
                dataIndex:'productName',
                width:'100px',
                ...getColumnSearchProps('productName'),
            },
            {
                title:'Item Category',
                key:'itemCategory',
                dataIndex:'category',
                width:'100px',
                ...getColumnSearchProps('category'),
            },
            {
                title:'(31-60) days',
                key:'',
                dataIndex:'thirtyOneToSixty',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'thirtyOneToSixtyValue',
                width:'100px'
            },
            {
                title:'(61-90) days',
                key:'',
                dataIndex:'sixtyOneToNighty',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'sixtyOneToNightyValue',
                width:'100px'
            },
            {
                title:'(91-120) days',
                key:'',
                dataIndex:'nightyOneToHundredTwenty',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'nightyOneToHundredTwentyValue',
                width:'100px'
            },
            {
                title:'(> 120) days',
                key:'',
                dataIndex:'aboveHundredTwenty',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'aboveHundredTwentyValue',
                width:'100px'
            },
            {
                title:'Total Stock',
                key:'totalStock',
                dataIndex:'totalQuantity',
                width:'100px'
            },
            {
                title:'Total Value',
                key:'totalValue',
                dataIndex:'totalValue',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"NearToExpiryInputReport.xlsx")
    }

    useEffect(() => {
        setData(nearToExpiryInputList.map(item => {
            return {
                businessUnit: item.businessUnit,
                division: item.division,
                costCenterName: item.costCenterName,
                productCode: item.productCode,
                productName: item.productName,
                category: item.category,
                "(31-60) days": item.thirtyOneToSixtyValue,
                '(61-90) days': item.sixtyOneToNightyValue,
                '(>120) days': item.aboveHundredTwentyValue,
                totalQuantity: item.totalQuantity,
                totalValue: item.totalValue,
            }
        }))
        console.log(nearToExpiryInputList)
    },[nearToExpiryInputList])

    const getNearToExpiryInputReportList = () => {
        handleNearToExpiryInputReportList ({
            sample: {
                businessUnit:bu,
                userId: profileInfo.id,
                userDesgId: profileInfo.userDesignation.id,
                divison: d,
                type: "Input",
            },
            certificate: authInfo.token
        });
        searchData()
    }

    useEffect(() => {
        console.log(buDropdown)
        let array = [buDropdown?.map(item => item.id)]
        setBU(array[0])
    },[buDropdown])

    useEffect(() => {
        setBU(businessUnit)
    },[businessUnit])

    useEffect(() => {
        console.log(divisionDropdown)
        let array = [divisionDropdown?.map(item => item.id)]
        setD(array[0])
    },[divisionDropdown])

    useEffect(() => {
        setD(division)
    },[division])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    useEffect(() => {
        if (bu?.length === 0) {
            let array = [buDropdown?.map(item => item.id)]
            setBU(array[0])
        }
        // console.log(bu)
        if (d?.length === 0) {
            let array = [divisionDropdown?.map(item => item.id)]
            setD(array[0])
        }
        // console.log(d)
    })

    // useEffect(() => {
    //     if (d?.length === 0) {
    //         let array = [divisionDropdown?.map(item => item.id)]
    //         setD(array[0])
    //     }
    //     console.log(d)
    // })

    return(
        <>
            <TitleWidget title="Near To Expiry Report Input" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    SubTeam <br/>
                    <SelectDivisionComponent value={division} onChange={handleDivision} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getNearToExpiryInputReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"NearToExpiryInputReport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{width: 300}}/>
                    </div>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} dataSource={nearToExpiryInputList}/>
            }
        </>
    )

}

NearToExpiryReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    buDropdown:PropTypes.array,
    divisionDropdown:PropTypes.array,
    nearToExpiryInputList:PropTypes.array,
    nearToExpiryInputReportLoading:PropTypes.any,
    handleNearToExpiryInputReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const buDropdown = selectBuDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const profileInfo = selectProfileInfo(state)
    const nearToExpiryInputList = selectNearToExpiryInputListData(state)
    const nearToExpiryInputReportLoading = selectLoadingNearToExpiryInputReportData(state)
    return {authInfo,nearToExpiryInputList,nearToExpiryInputReportLoading,profileInfo,buDropdown,divisionDropdown}
}

const actions = {
    handleNearToExpiryInputReportList : getNearToExpiryInputReportStartAction
}

export default connect(mapState, actions)(NearToExpiryReportComponent)
