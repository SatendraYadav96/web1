import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {grnStartAction} from "../../redux/actions/grn/grnActions";
import {selectGrnUpload} from "../../redux/selectors/grnSelectors";
import {empty} from "rxjs";
import {UploadOutlined} from "@ant-design/icons";
import {grnUploadStartAction} from "../../redux/actions/upload/uploadActions";



const GRNUploadComponent = ({authInfo,grnUpload,handleGrn,handleGrnUpload}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)
    const [file, setFile] = useState([])


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Start Time',
                key: 'startTime',
                dataIndex: 'startTime',
                width:'100px'
            },
            {
                title: 'End Time',
                key: 'endTime',
                dataIndex: 'endTime',
                width:'200px'
            },
            {
                title: 'Total Records',
                key: 'totalRecords',
                dataIndex: 'totalRecord',
                width:'100px'
            },
            {
                title: 'Records Uploaded',
                key: 'recordsUploaded',
                dataIndex: 'recordUpload',
                width:'100px'
            },
            {
              title: 'Status',
              key:'status',
              dataIndex: 'statusId.id',
              width:'100px'
            },
            {
                title:'',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return (<><Link to="">View Errors</Link> | <Link to="">Download Details</Link></>)
                }
            }
        ]);
        setDataSource([
            {
                key:'',
                startTime: '',
                endTime: '',
                totalRecords:'',
                recordsUploaded: '',
                status:''
            }
        ])
    }

    const getGrnUpload = () => {
        handleGrn ({
            certificate: authInfo.token
        });
    }

    useEffect(() => {
        {Object.keys(grnUpload).length === 0 ? console.log('no data') : setData(grnUpload) }
    }, [grnUpload])

    useEffect(() => {
        handleGrn ({
            certificate: authInfo.token
        });
        searchData()
    }, [authInfo.token])

    const handleUpload = (info) => {
        setFile(info.fileList)
        console.log(info.file.name)
        console.log(info)
        // const file = info.file.originFileObj
        // const base64 = await convertBase64(file)
        // console.log(base64)
        // console.log(file.name)
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const props = {
        beforeUpload: (file) => {
            const isCSV = file.type === 'text/csv';
            if (!isCSV) {
                message.error(`${file.name} is not a csv file`);
            }
            return isCSV || Upload.LIST_IGNORE;
        },
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const upload = async () => {
        console.log(file)
        const newFile = file[0].originFileObj
        const base64 = await convertBase64(newFile)
        const bytecode = base64.split(",")[1];
        console.log(newFile)
        console.log(bytecode)
        handleGrnUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
        })
    }

    return(
        <div>
            <TitleWidget title={'GRN Upload Log'} />
            <Row>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={data}/>
            }
        </div>
    )
}

GRNUploadComponent.propTypes = {
    authInfo: PropTypes.any,
    grnUpload:PropTypes.any,
    handleGrnUpload:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const grnUpload = selectGrnUpload(state)
    return {authInfo,grnUpload}
}

const actions = {
    handleGrn: grnStartAction,
    handleGrnUpload: grnUploadStartAction,
}

export default connect(mapState, actions)(GRNUploadComponent)
