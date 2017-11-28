import React from 'react';
import {Row, Col} from 'antd';
import {Input, Icon,Menu} from 'antd';
const SubMenu = Menu.SubMenu;
export default class PCHeader extends React.Component {
    constructor(props){
        super(props);
        this.state={
            searchValue:''
        }
    }
    render() {
        const {searchValue} = this.state;
        return (
            <div className="pcHeader">
                <Row type="flex"  align="middle" style={{height:"100%"}}>

                    <Col span={1}></Col>
                    <Col span={2}>
                        <a href="#" className="brand">
                            <img src="/src/images/cnodejs_light.svg"/>
                        </a>
                    </Col>
                    <Col span={4}>
                        <Input 
                            prefix={<Icon type="search"/>}
                            value={searchValue}
                            size={"default"}
                            className="header_search"
                            />
                    </Col>
                    <Col span={7}></Col>
                    <Col span={10}>
                        <Menu
                        mode="horizontal"
                        theme="dark"
                        style={{background:"#444444"}}
                        >
                        <Menu.Item key="Home">
                            首页
                        </Menu.Item>
                        <Menu.Item key="getstart">
                            新手入门
                        </Menu.Item>
                        <Menu.Item key="api">
                        API
                        </Menu.Item>
                        <Menu.Item key="about">
                        关于
                        </Menu.Item>
                        <Menu.Item key="register">
                        注册
                        </Menu.Item>
                        <Menu.Item key="login">
                        登录
                        </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}