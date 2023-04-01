import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row } from "antd";
import { addBoxWeightStartAction } from '../../redux/actions/hsnInvoice/hsnActions'
import {selectBoxWeight,selectBoxWeightLoading} from "../../redux/selectors/hsnSelector"

const AddInvoiceComponent = ({authInfo,profileInfo,boxWeight,boxWeightLoading,handleAddBoxWeight}) => {

    const [box, setBox] = useState()
    const [weight, setWeight] = useState()
    const [invoice, setInvoice] = useState()



    const searchData = () => {
        }

        const handleBoxChange = (e) => {
             setBox(e.target.value)

          }

        const handleWeightChange = (e) => {

              setWeight(e.target.value)

         }


          const handleInvoiceChange = (e) => {

              setInvoice(e.target.value)

         }



          const handleInsertBoxWeight = () => {
           console.log(box);
           console.log(weight);
           console.log(invoice);


                const data  = {"noOfBoxes":box, "weight":weight,"invoiceNo":invoice }
                handleAddBoxWeight({
                certificate: authInfo.token,
                inh: data

                });


                searchData()


}




    return(
        <>
            <TitleWidget title="Invoice Box & Weight" />
            <Row gutter={[16,16]}>
                <Col span={6}>
                    Box <Input style={{width:'150px'}}  value={box} onChange={handleBoxChange}  ></Input>
                </Col>
                <Col span={6}>
                    Weight <Input style={{width:'150px'}} value={weight} onChange={handleWeightChange}  ></Input>
                </Col>
                <Col span={6}>
                    Invoice No. <Input style={{width:'150px'}} value={invoice} onChange={handleInvoiceChange}  ></Input>
                </Col>
                <Col span={6}>
                    <Button type={"primary"} onClick={()=>handleInsertBoxWeight()} >Submit</Button>
                </Col>
            </Row>
        </>
    )

}

AddInvoiceComponent.propTypes = {
                    authInfo: PropTypes.any,
                    profileInfo: PropTypes.any,
                    boxWeight:PropTypes.array,
                    boxWeightLoading:PropTypes.any,
                    handleAddBoxWeight:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const boxWeight = selectBoxWeight(state)
    const boxWeightLoading = selectBoxWeightLoading(state)
    const profileInfo = selectProfileInfo(state)
    return {authInfo,boxWeight,boxWeightLoading,profileInfo}
}

const actions = {
handleAddBoxWeight: addBoxWeightStartAction,
}

export default connect(mapState, actions)(AddInvoiceComponent)
