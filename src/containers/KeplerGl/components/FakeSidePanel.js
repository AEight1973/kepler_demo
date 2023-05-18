import {useEffect, useState} from "react";
import {Button, Card, Input, List, Modal, Skeleton, Space, Tabs} from "antd";
import {ReactComponent as Show} from "../../../images/show.svg"
import {ReactComponent as Hidden} from "../../../images/hidden.svg"
import Icon, {EditOutlined, DeleteOutlined} from "@ant-design/icons"

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
            itemLayout="horizontal"
            dataSource={layers}
            renderItem={(item, index) => (
                <List.Item
                    actions={[
                        // <a key="list-loadmore-edit" onClick={() => handleEdit(index)}>编辑</a>,
                        <EditOutlined onClick={() => handleEdit(index)} title="编辑"/>,
                        // <a key="list-loadmore-edit">显示</a>,
                        item.show? <Icon component={Show} title="隐藏" onClick={() => onClickShow(index, false)}/> : <Icon component={Hidden} title="显示" onClick={() => onClickShow(index, true)}/>,
                        // <a key="list-loadmore-more" onClick={deleteLayers}>删除</a>
                        <DeleteOutlined onClick={() => deleteLayers(index)} title="删除"/>,
                    ]}
                >
                    <Skeleton avatar title={false} loading={false} active>
                        <List.Item.Meta style={{textAlign: "left"}}
                            // avatar={<Avatar src={item.picture.large} />}
                            title={<span>{item.title}</span>}
                            // description={item.description}
                        />
                    </Skeleton>
                </List.Item>
            )}
            />
            <Button type="primary" style={{float: "left"}} onClick={handleAdd}>加载数据</Button>
            <Modal title="新增图层" open={openAdd} onOk={addLayers} onCancel={() => setOpenAdd(false)}>
                <Input value={layerName} onChange={onChangeLayerName} placeholder="请输入图层名称"/>
            </Modal>
            <Modal title="修改图层" open={openEdit} onOk={editLayers} onCancel={() => setOpenEdit(false)}>
                <Input value={layerName} onChange={onChangeLayerName} placeholder="请输入图层名称"/>
            </Modal>
        </>
    }

    // 最短路径查询模块
    const renderMinRoute = () => {
        return <>
            <Space direction="vertical" align="start" size="small" style={{width: "100%", display: "flex"}}>
                <span>起始地</span>
                <Input placeholder="请输入起始地" style={{width: 350}}/>
                <span>目的地</span>
                <Input placeholder="请输入目的地" style={{width: 350}}/>
                <Button type="primary" style={{float: "left"}}>查询</Button>
            </Space>
        </>
    }


    // 储存仓库推荐
    const renderStore = () => {
        return <>
            <Space direction="vertical" align="start" size="small" style={{width: "100%", display: "flex"}}>
                <span>货物配送目的地</span>
                <Input placeholder="请输入货物配送目的地" style={{width: 350}}/>
                <span>推荐仓库数量</span>
                <Input placeholder="请输入推荐仓库数量" style={{width: 350}}/>
                <Button type="primary" style={{float: "left"}}>查询</Button>
            </Space>
        </>
    }

    // 仓库负责片区分析
    const renderStoreArea = () => {
        return <>
            <Space direction="vertical" align="start" size="small" style={{width: "100%", display: "flex"}}>
                <span>带划分区域</span>
                <Input placeholder="请输入带划分区域" style={{width: 350}}/>
                <span>选择负责该区域的仓库</span>
                <Input placeholder="请输入选择负责该区域的仓库" style={{width: 350}}/>
                <Button type="primary" style={{float: "left"}}>分析</Button>
            </Space>
        </>
    }


    // FakeSidePanel控制
    const [visible, setVisible] = useState(true)
    const items = [
        {
            key: '1',
            label: `数据预览`,
            children: renderDataPreview(),
        },
        {
            key: '2',
            label: `最短路径查询`,
            children: renderMinRoute(),
        },
        {
            key: '3',
            label: `储存仓库推荐`,
            children: renderStore(),
        },
        {
            key: '4',
            label: `仓库负责片区分析`,
            children: renderStoreArea(),
        },
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
            title= "智慧物流分析系统"
            style={{
                position: "fixed",
                zIndex: 99,
                left: 16,
                top: 16,
                width: 400,
                height: window.innerHeight - 32,
                background: "#ffffff",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            bodyStyle={{
                marginTop: 0,
                paddingTop: 0
            }}
        >
            <Tabs defaultActiveKey="1" items={items}/>
        </Card>}
    </>
}
