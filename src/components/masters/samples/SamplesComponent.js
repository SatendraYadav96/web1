import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import { selectLoadingSamplesData, selectSamplesListData} from "../../../redux/selectors/masterSelector";
import {getSamplesStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import {CSVLink} from "react-csv";
import XLSX from "xlsx"

const SamplesComponent = ({authInfo,profileInfo,samplesList,samplesLoading,handleSamplesList}) => {

  const [status, setStatus] = useState(1)
  const navigate = useNavigate()
  const [column, setColumn] = useState([])
  const [data, setData] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [flag, setFlag] = useState(false)

  const searchData = () => {
    setFlag(true)
    setColumn([
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        width: '100px'
      },
      {
        title: 'Code',
        key: 'lmid',
        dataIndex: 'lmid',
        width: '100px'
      },
      {
        title: '',
        key: '',
        dataIndex: '',
        width: '100px',
        render: (_,row) => {
          return <Button icon={<EditOutlined />} onClick={() => editSamples(row) } ></Button>
        }
      }
    ]);
    setDataSource([
      {
        key: '',
        name: '',
        code: ''
      }
    ]);
  }

  const createSamples = () => {
    return navigate("/home/masters/samples/create")
  }

  const editSamples = (row) => {
    return navigate(`/home/masters/samples/edit/${row.id}`)
  }

  const getSamplesList = () => {
    console.log(status);
    console.log(samplesList);

    handleSamplesList ({
      status:status,
      samples: samplesList,
      certificate: authInfo.token
    });
    searchData()
  }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"SamplesList.xlsx")
    }

    useEffect(() => {
        setData(samplesList.map(item => {
            return {
                name: item.name,
                code: item.lmid,
            }
        }))
        console.log(samplesList)
    },[samplesList])

    return(
      <>
        <TitleWidget title={"Master - Samples"}/>
        <Row gutter={[8,8]}>
          <Col span={3}>
              <SelectStatusComponent value={status} onChange={(e) => setStatus(e)} />
          </Col>
          <Col span={2}>
              <Button type={"primary"} onClick={() => getSamplesList()} style={{width: '100%'}}>Search</Button>
          </Col>
          <Col span={1}>
              <Button icon={<PlusOutlined />} onClick={()=> createSamples()}></Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span={6}>
              <CSVLink
                  data={data}
                  filename={"sample.csv"}
                  onClick={() => {
                      console.log("clicked")
                  }}
              >
                  <Button>CSV</Button>
              </CSVLink>
              &nbsp;
              <Button onClick={handleExcel}>EXCEL</Button>
          </Col>
          <Col span={18}>
            <div align="right">
              <Input.Search style={{ width: 300}} />
            </div>
          </Col>
        </Row>
        <br/><br/>
        {flag &&
          <Table columns={column} scroll={{y: '100%'}} dataSource={samplesList} />
        }
      </>
    )
}

SamplesComponent.propTypes = {
  authInfo: PropTypes.any,
  profileInfo: PropTypes.any,
  samplesList: PropTypes.array,
  samplesLoading: PropTypes.any,
  handleSamplesList: PropTypes.func,
}

const mapState = (state) => {
  const authInfo = selectAuthInfo(state)
  const profileInfo = selectProfileInfo(state)
  const samplesList = selectSamplesListData(state)
  const samplesLoading = selectLoadingSamplesData(state)

  return {authInfo,profileInfo,samplesList,samplesLoading}

}

const actions = {
  handleSamplesList: getSamplesStartAction,
}

export default connect(mapState, actions) (SamplesComponent)

