import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {selectDeliveryUpdateListData} from "../../redux/selectors/deliveryUpdateSelector";
import {deliveryUpdateStartAction} from "../../redux/actions/dispatchInvoice/deliveryUpdateAction";
import {deliveryUpdateRequest} from "../../api/invoiceRequests";


const DeliveryUpdateComponent = ({authInfo,profileInfo,deliveryUpdateList,handleDeliveryUpdateList}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
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
              dataIndex: 'status',
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
                key:'1',
                startTime: '',
                endTime: '',
                totalRecords:'',
                recordsUploaded: '',
                status:''
            }
        ])
    }

    useEffect(() => {
        handleDeliveryUpdateList({
            certificate: authInfo.token
        })
        searchData()
    },[authInfo.token])

    useEffect(() => {
        console.log(deliveryUpdateList)
    },[deliveryUpdateList])

    // const handleFileRead = async (event) => {
    //     const file = event
    //     console.log(file)
    //     const base64 = await convertBase64(file)
    //     console.log(base64)
    // }

    // const convertBase64 = async (file) => {
    //     let result_base64 = await new Promise((resolve) => {
    //         let fileReader = new FileReader();
    //         fileReader.onload = (e) => resolve(fileReader.result);
    //         fileReader.readAsDataURL(file);
    //     });
    //
    //     console.log(result_base64); // aGV5IHRoZXJl...
    //
    //     return result_base64;
    // }

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

    const handleUpload = (info) => {
        setFile(info.fileList)
        console.log(info)
        // const file = info.file.originFileObj
        // const base64 = await convertBase64(file)
        // console.log(base64)
        // console.log(file.name)
    }

    const upload = async () => {
        console.log(file)
        const newFile = file[0].originFileObj
        const base64 = await convertBase64(newFile)
        console.log(newFile)
        console.log(base64)
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    return(
        <div>
            <TitleWidget title={'Delivery Update'} />
            <Row>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={deliveryUpdateList}/>
            }
        </div>
    )
}

DeliveryUpdateComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    deliveryUpdateList:PropTypes.array,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const deliveryUpdateList = selectDeliveryUpdateListData(state)
    return {authInfo,profileInfo,deliveryUpdateList}
}

const actions = {
    handleDeliveryUpdateList: deliveryUpdateStartAction,
}

export default connect(mapState, actions)(DeliveryUpdateComponent)
