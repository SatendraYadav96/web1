import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Select} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import TextArea from "antd/es/input/TextArea";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";

const EditFFComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/ffMaster")
    }

    return(
        <>
            <TitleWidget title={"Edit FF"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Employee Code:<br/><Input placeholder={"Recipient Code"} />
                </Col>
                <Col span={8} offset={2}>
                    Employee Name:<br/><Input placeholder={"Recipient Name "} />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Address:<br/><TextArea placeholder={"Recipient Address"} />
                </Col>
                <Col span={8} offset={2}>
                    City :<br/><Input placeholder={"City "} />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Role :<br/><Select style={{width: "100%"}} placeholder="Select Designation"></Select>
                </Col>
                <Col span={8} offset={2}>
                    State :<br/><Input placeholder={"State "} />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Zip :<br/><Select style={{width: "100%"}} placeholder="Select Zip"></Select>
                </Col>
                <Col span={8} offset={2}>
                    Zone :<br/><Input placeholder={"Zone "} />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Employee Workday id :<br/><Select style={{width: "100%"}} placeholder="Work ID"></Select>
                </Col>
                <Col span={8} offset={2}>
                    Gender :<br/><Select style={{width: "100%"}} placeholder="Select Gender"></Select>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Joining Date :<br/><Select style={{width: "100%"}} placeholder="Joining Date"></Select>
                </Col>
                <Col span={8} offset={2}>
                    Mobile Number :<br/><Input placeholder={"Contact "} />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Email Address :<br/><Select style={{width: "100%"}} placeholder="Email Address"></Select>
                </Col>
                <Col span={8} offset={2}>
                    Team :<br/><Select style={{width: "100%"}} placeholder="Select Team"></Select>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Sub Team :<br/><Select style={{width: "100%"}} placeholder="Select Sub Team"></Select>
                </Col>
                <Col span={8} offset={2}>
                    RBM Email :<br/><Input style={{width: "100%"}} placeholder="RM Email"></Input>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    AM Email :<br/><Input style={{width: "100%"}} placeholder="AM Email"></Input>
                </Col>
                <Col span={8} offset={2}>
                    Headquater :<br/><Input style={{width: "100%"}} placeholder="Headquater"></Input>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Status :<br/><Input style={{width: "100%"}} placeholder="Status"></Input>
                </Col>
                <Col span={8} offset={2}>
                    Remarks :<br/><TextArea style={{width: "100%"}} placeholder="Remarks"></TextArea>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={16}></Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertVendor()} style={{width: "100%"}}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
            </Row>
        </>
    )

}

EditFFComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (EditFFComponent)
