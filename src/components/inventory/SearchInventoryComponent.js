import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Select, Table} from "antd";

const SearchInventoryComponent = ({authInfo}) => {

    const [columns, setColumns] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [blockItemVisible, setBlockItemVisible] = useState(false)
    const [checked, setChecked] = useState(false)
    const [reverse, setReverse] = useState(false)
    const [switchForm, setSwitchForm] = useState(false)
    const [switchColumns, setSwitchColumns] = useState([])

    const blockItem = (e) => {
        if(e.target.checked){
            setBlockItemVisible(true)
        }
    }
  
    const reverseInventory = () => {
        setReverse(true)
    }

    const switchInventory = () => {
        setSwitchForm(true)
    }

    const searchData = () =>{
        setFlag(true)
        setColumns([
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Item Code',
                key: 'itemCode',
                dataIndex: 'itemCode',
                width:'100px'
            },
            {
                title: 'Rate',
                key: 'key',
                dataIndex: 'rate',
                width: '100px'
            },
            {
                title: 'PO No.',
                key: 'poNo',
                dataIndex: 'poNo',
                width: '100px'
            },
            {
                title: 'Base Pack',
                key:'basePack',
                dataIndex: 'basePack',
                width: '100px'
            },
            {
                title: 'Unit',
                key:'unit',
                dataIndex: 'unit',
                width: '100px'
            },
            {
                title: 'Batch No',
                key:'batchNo',
                dataIndex: 'batchNo',
                width: '100px'
            },
            {
                title: 'Expiry Date',
                key:'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title: 'Qty Received',
                key:'qtyReceived',
                dataIndex: 'qtyReceived',
                width: '100px'
            },
            {
                title: 'Qty Balance',
                key:'qtyBalance',
                dataIndex: 'qtyBalance',
                width: '100px'
            },
            {
                title: 'Unit Allocation',
                key:'unitAllocation',
                dataIndex: 'unitAllocation',
                width: '100px',
                render: () => {
                    return <Checkbox style={{width:'20px', height:'20px'}}/>
                }
            },
            {
                title: 'Block Item',
                key:'blockItem',
                dataIndex: 'blockItem',
                width: '100px',
                render: () => {
                    return <Checkbox onChange={(e) => blockItem()}/>
                }
            },
            {
                title: 'Comment',
                key:'comment',
                dataIndex: 'comment',
                width: '100px'
            },
            {
                title: '',
                key:'',
                dataIndex: '',
                width: '100px',
                render:() =>{
                    return(<><Button onClick={() => reverseInventory()}>Reverse</Button>&nbsp;<Button onClick={() => switchInventory()}>Switch From</Button></>)
                }
            }

        ]);
        setDataSource([
            {
                key: '1',
                name: '',
                itemCode: '',
                rate: '',
                poNo: '',
                basePack: '',
                unit: '',
                batchNo: '',
                expiryDate: '',
                qtyReceived: '',
                qtyBalance: '',
                comment: ''
            }
        ])
    }

    const searchSwitchData = () => {
        setSwitchColumns([
            {
                title:'',
                key:'',
                dataIndex: '',
                width: '50px',
                render:() => {
                    return <Checkbox />
                }
            },
            {
                title:'Category',
                key:'category',
                dataIndex: 'category',
                width: '100px'
            },
            {
                title:'Medical Code',
                key:'medicalCode',
                dataIndex: 'medicalCode',
                width: '100px'
            },
            {
                title:'Name',
                key:'name',
                dataIndex: 'name',
                width: '150px'
            },
            {
                title:'Item Code',
                key:'itemCode',
                dataIndex: 'itemCode',
                width: '100px'
            },
            {
                title:'Expiry Date',
                key:'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title:'Qty Received',
                key:'qtyReceived',
                dataIndex: 'qtyReceived',
                width: '100px'
            },
            {
                title:'Qty Balance',
                key:'qtyBalance',
                dataIndex: 'qtyBalance',
                width: '100px'
            }
        ])
    }

    return(
        <div>
            <TitleWidget title={"Search Inventory"}/>
            <div>
                Item Name <Input style={{width:"200px"}}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Exhuasting Quantity <Checkbox />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type={"primary"} onClick={() => searchData()}>Search</Button>
            </div>
            <br/><br/>
            {flag &&
                <Table dataSource={dataSource} columns={columns}/>
            }
            <Modal visible={blockItemVisible} title="Inventory Block Item Reason"  footer={null}>
                <Row>
                    <Col><Input placeholder={"Comments"}/></Col>
                    <Col><Button>Save</Button></Col>
                </Row>
            </Modal>
            <Modal visible={reverse} title="Reverse Inventory" footer={null} onCancel={() => setReverse(false)}>
                <p>Reverse Inventory of Acrylic lady tablet(Multivite Women)</p>
                <p>Balance quantity is 300</p>
                <br/>
                <p>Inventory has not been yet reversed</p>
                <br/>
                <Row>
                    <Col>Qty <Input /></Col>
                </Row>
                <br/>
                <Row>
                    <Col>Remarks <br/><Select style={{width:'100px'}}></Select></Col>
                </Row>
                <br/>
                <Row>
                    <Col><Button type={"primary"}>Reverse</Button></Col>
                </Row>
            </Modal>
            <Modal visible={switchForm} width={700} title="Switch Inventory from" footer={null} onCancel={() => setSwitchForm(false)}>
                <Row gutter={[8,8]}>
                    <Col span={8}><Input /></Col>
                    <Col span={8}><Button onClick={() => searchSwitchData()}>Search</Button></Col>
                    <Col span={8}></Col>
                </Row>
                <br/>
                <Row>
                    <Col span={20}></Col>
                    <Col span={4}>
                        <Input.Search />
                    </Col>
                </Row>
                <br/>
                <Table columns={switchColumns}></Table>
                <br/>
                <Row gutter={[8,8]}>
                    <Col span={6}>Qty To Switch<Input/></Col>
                    <Col span={6}>Remarks<Input/></Col>
                    <Col span={6}><Button>Switch</Button></Col>
                </Row>
            </Modal>
        </div>
    )
}

SearchInventoryComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(SearchInventoryComponent)
