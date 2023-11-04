import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Form, message} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import {selectInsertBuisnessUnitData, selectInsertBusinessUnitFailError, selectInsertCostCenterData} from "../../../redux/selectors/masterSelector";
import {propTypes} from "react-csv/lib/metaProps";
import {addBuisnessUnitStartAction, addCostCenterStartAction} from "../../../redux/actions/master/masterActions";
//import {RightCircleOutlined } from "@ant-design/icons";


const CreateBusinessUnitComponent = ({authInfo,insertBuisnessUnit,handleAddBuisnessUnit, insertBusinessUnitFailError}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [active, setActive] = useState(1)
    const [name, setName] = useState();
   // const [errors, setErrors] = useState([]);
    const [code, setCode] = useState();
    const [ciName, setCiName] = useState();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //
    //     if (code === "") {
    //         setErrors(["code is required."]);

    //     } else {
    //         setErrors([]);
    //     }
    // };





    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setActive(e.target.checked ? 1 : 0)
    }

    useEffect(() => {
        console.log(active)
    },[active])

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }

    const handleBack = () => {
        return navigate("/home/masters/businessUnit")
    }

    const handleInsertBuisnessUnit = () => {

        const data  = {
            "name":name,
            "code":code ,
            "active": 1,
        }
        handleAddBuisnessUnit({
            certificate: authInfo.token,
            bu: data

        });
        // MessageWidget.success();
    }

    // const form = Form.create()({
    //     name: 'my-form',
    // });


    useEffect(()=>{
        console.log(Object.keys(insertBusinessUnitFailError).length !== 0)
        if(insertBusinessUnitFailError!== undefined && Object.keys(insertBusinessUnitFailError).length !== 0){
            message.error(insertBusinessUnitFailError.message);
        }
    },[insertBusinessUnitFailError])

    return(
        <>
            <TitleWidget title={"Create Business Unit"}/>


            <Row gutter={[16,16]}>




                <Col span={8} offset={2}>

                        Name: <Input   placeholder={"Business Unit Name"} onChange={handleNameChange} autoComplete />

                </Col>

                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Business Unit Code"} onChange={handleCodeChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertBuisnessUnit()}>Submit</Button>
                </Col>
            </Row>




        </>
    )
}

CreateBusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
    insertBuisnessUnit: PropTypes.any,
    handleAddBuisnessUnit: PropTypes.func,
    insertBusinessUnitFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertBuisnessUnit = selectInsertBuisnessUnitData(state)
    const insertBusinessUnitFailError = selectInsertBusinessUnitFailError(state)
    return {authInfo,insertBuisnessUnit, insertBusinessUnitFailError}
}

const actions = {
    handleAddBuisnessUnit: addBuisnessUnitStartAction,
}

export default connect(mapState, actions) (CreateBusinessUnitComponent)
