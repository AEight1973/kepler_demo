import {useEffect, useState} from "react";
import {Button, Card, Input, List, Modal, Space, Tabs} from "antd";
import {ReactComponent as Show} from "../../../images/show.svg"
import {ReactComponent as Hidden} from "../../../images/hidden.svg"
import {ReactComponent as Layers} from "../../../images/layers.svg"
import {ReactComponent as Route} from "../../../images/route.svg"
import {ReactComponent as Store} from "../../../images/store.svg"
import Icon, {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import "./index.css"

export function FakeSidePanel() {

    // 数据预览模块
    const [layers, setLayers] = useState([
        {title: "仓库", show: true},
        {title: "运输资源线路", show: true},
        {title: "地点", show: true},
        {title: "公路线", show: true}
    ])

    const onClickShow = (index, isShow) => {
        setLayers(prevState => {
            const _prevState = [...prevState]
            if (index >= 0) _prevState[index].show = isShow
            return _prevState
        })
    }

    const addLayers = () => {
        setOpenAdd(false)
        setLayers(prevState => {
            const _prevState = [...prevState]
            _prevState.push({title: layerName, show: true})
            return _prevState
        })
    }

    const deleteLayers = (index) => {
        setLayers(prevState => {
            const _prevState = [...prevState]
            _prevState.splice(index, 1)
            return _prevState
        })
    }

    const [layerIndex, setLayerIndex] = useState(-1)
    const [openEdit, setOpenEdit] = useState(false)
    const handleEdit = (index) => {
        setLayerName("")
        setLayerIndex(index)
        setOpenEdit(true)
    }
    const editLayers = () => {
        setOpenEdit(false)
        setLayers(prevState => {
            const _prevState = [...prevState]
            if (layerIndex >= 0) _prevState[layerIndex].title = layerName
            return _prevState
        })
    }

    const [openAdd, setOpenAdd] = useState(false)
    const [layerName, setLayerName] = useState('')
    const onChangeLayerName = (e) => {
        setLayerName(e.target.value)
    }
    const handleAdd = () => {
        setLayerName("")
        setOpenAdd(true)
    }

    const renderDataPreview = () => {
        return <>
            <List
            // itemLayout="horizontal"
            dataSource={layers}
            split={true}
            style={{borderBottomColor: '#ffffff'}}
            renderItem={(item, index) => (
                <List.Item
                    actions={[
                        <EditOutlined onClick={() => handleEdit(index)} title="编辑" style={{color: "#fdfdfd"}}/>,
                        item.show?
                            <Icon component={Show} title="隐藏" onClick={() => onClickShow(index, false)} style={{color: "#fdfdfd"}}/>
                            : <Icon component={Hidden} title="显示" onClick={() => onClickShow(index, true)} style={{color: "#fdfdfd"}}/>,
                        <DeleteOutlined onClick={() => deleteLayers(index)} title="删除" style={{color: "#fdfdfd"}}/>,
                    ]}
                >
                    <span style={{color: "#fdfdfd", fontWeight: "normal"}}>{item.title}</span>
                </List.Item>
            )}
            />
            <Button type="primary" style={{float: "left", marginTop:15}} onClick={handleAdd}>加载数据</Button>
            <Modal title="加载数据" open={openAdd} onOk={addLayers} onCancel={() => setOpenAdd(false)} cancelText="取消" okText="确认">
                <Input value={layerName} onChange={onChangeLayerName} placeholder="请输入数据类型名称"/>
            </Modal>
            <Modal title="修改数据" open={openEdit} onOk={editLayers} onCancel={() => setOpenEdit(false)} cancelText="取消" okText="确认">
                <Input value={layerName} onChange={onChangeLayerName} placeholder="请输入数据类型名称"/>
            </Modal>
        </>
    }

    // 最短路径查询模块
    const renderMinRoute = () => {
        return <>
            <Space direction="vertical" align="start" size="small" style={{width: "100%", display: "flex"}}>
                <span style={{color: "#fdfdfd"}}>起始地</span>
                <Input placeholder="请输入起始地" style={{width: 394}}/>
                <span style={{color: "#fdfdfd"}}>目的地</span>
                <Input placeholder="请输入目的地" style={{width: 394}}/>
                <Button type="primary" style={{float: "left", marginTop:15}}>查询</Button>
            </Space>
        </>
    }


    // 储存仓库推荐
    const renderStore = () => {
        return <>
            <Space direction="vertical" align="start" size="small" style={{width: "100%", display: "flex"}}>
                <span style={{color: "#fdfdfd"}}>货物配送目的地</span>
                <Input placeholder="请输入货物配送目的地" style={{width: 394}}/>
                <span style={{color: "#fdfdfd"}}>推荐仓库数量</span>
                <Input placeholder="请输入推荐仓库数量" style={{width: 394}}/>
                <Button type="primary" style={{float: "left", marginTop:15}}>分析</Button>
            </Space>
        </>
    }


    // FakeSidePanel控制
    const [visible, setVisible] = useState(true)

    const [activeKey, setActiveKey] = useState("1")
    const onChangeActiveKey = (value) => {
        setActiveKey(value)
    }
    const items = [
        {
            key: '1',
            label: <div style={{color: activeKey === "1" ? "#20adc8": "#697385"}}>
                <Icon component={Layers} style={{color: activeKey === "1" ? "#20adc8": "#697385"}}/>
                物流资源视图</div>,
            children: renderDataPreview(),
        },
        {
            key: '2',
            label: <div style={{color: activeKey === "2" ? "#20adc8": "#697385"}}>
                <Icon component={Route} style={{color: activeKey === "2" ? "#20adc8": "#697385"}}/>
                运输线路规划</div>,
            children: renderMinRoute(),
        },
        {
            key: '3',
            label: <div style={{color: activeKey === "3" ? "#20adc8": "#697385"}}>
                <Icon component={Store} style={{color: activeKey === "3" ? "#20adc8": "#697385"}}/>
                仓储资源推荐</div>,
            children: renderStore(),
        }
    ];

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'f') setVisible(!visible)
        }
        document.addEventListener("keypress", handleKey)

        return () => {
            document.removeEventListener('keypress', handleKey)
        }
    })

    return <>
        {visible && <Card
            title= "科捷物流智能分析"
            style={{
                position: "fixed",
                zIndex: 99,
                left: 0,
                top: 0,
                width: 442,
                height: window.innerHeight,
                background: "#242731",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                color: "#fdfdfe",
                borderRadius: 0
            }}
            bordered={false}
            bodyStyle={{
                paddingTop: 0,
                border: 0,
            }}
            headStyle={{
                background: "#29323d",
                color: "#20adc8",
                border: 0,
                fontSize: 30
            }}
        >
            <Tabs
                activeKey={activeKey}
                onChange={onChangeActiveKey}
                items={items}
                size="middle"
            />
        </Card>}
    </>
}
