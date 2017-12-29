import React from 'react';
import {Row, Col} from 'antd';
import {Input, Icon,Menu} from 'antd';
const SubMenu = Menu.SubMenu;
import {Link} from 'react-router-dom';
// import {selectSubreddit,fetchPostsIfNeeded,invalidateSubreddit} from '../actions'
export default class PCHeader extends React.Component {
    constructor(props){
        super(props);
        this.state={
            searchValue:'',
            current: 'Home',
        }
    }
    selectMenu=(e)=>{
        this.setState({
          current: e.key,
        });
    }
    toHome=(e)=>{
        this.setState({
            current:'Home'
        })
    }
    render() {
        const {searchValue} = this.state;
        return (
            <div className="pcHeader">
                <Row type="flex"  align="middle" style={{height:"100%"}}>

                    <Col span={1}></Col>
                    <Col span={2}>
                        <Link to="/" className="brand">
                            <img src="/src/images/cnodejs_light.svg" onClick={this.toHome.bind(this )}/>
                        </Link>
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
                        defaultSelectedKeys={['Home']}
                        // selectedKeys={[this.state.current]}
                        onClick={this.selectMenu}
                        >
                        <Menu.Item key="Home">
                        <Link to={'/'}>
                            首页
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="getstart">
                        <Link to={'/getstart'}>
                            新手入门
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="api">
                        <Link to={'/api'}>
                        API
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                        关于
                        </Menu.Item>
                        <Menu.Item key="register">
                        注册
                        </Menu.Item>
                        <Menu.Item key="login">
                            <Link to={'/signin'}>
                                登录
                            </Link>
                        </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}