import React from 'react';
// import MobileHeader from './MobileHeader';
import {connect} from 'react-redux';
import {Tabs,Icon,BackTop,Affix,Row,Col,Badge,Avatar} from 'antd';
const TabPane = Tabs.TabPane;
import MobileList from './MobileList';
import Drawer from 'react-motion-drawer';
import {Link} from 'react-router-dom';
const style = {
    background: "#F9F9F9",
    boxShadow: "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
  };
class MobileHome extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            width:'80%' ,
            openLeft:false  
        }
    }

    render(){
        console.log('222',this.props)
        let {login,user} = this.props
        const {succeed} = login

        const drawerProps = {
            overlayColor: "rgba(255,255,255,0.6)",
            drawerStyle: style
          };
          let {openLeft} =this.state;

        return(
            <div>
                <Drawer
                    {...drawerProps}
                    width={this.state.width}
                    fadeOut={true}
                    open={openLeft}
                    onChange={openState => this.setState({ openLeft: openState })}
                    className="myDrawer"
                >
                    {succeed&&
                    <div>
                        <h1>登录成功</h1>
                    </div>
                    }
                    {!succeed&&<div className="up">
                        <Link to="/login">
                            <Avatar icon="user" className="icon" size="large" />
                        </Link>
                        <h3>通过头像登录</h3>
                    </div>}
                </Drawer>

                <Affix>
                    <Row id="mobileHomeHeader" type="flex" align="middle" justify="space-between">
                        <Col span={6} push={2}>
                              <a
                              style={{ padding: 15 }}
                              className=""
                              onClick={() =>
                                this.setState({ openLeft: !openLeft })}
                            >
                                <Icon type="folder-open" className="more" />
                            </a>
                        </Col>
                        <Col span={12} className="title">
                            NodeJS论坛
                        </Col>
                        <Col span={6} push={3}>
                            <Badge count={5}>
                                <img src="/src/images/ld.svg"/>
                            </Badge>
                        </Col>
                    </Row>
                </Affix>
                <Tabs>
                    <TabPane tab="全部" key="1">
                        <MobileList type="all"/>
                    </TabPane>
                    <TabPane tab="精华" key="2">
                        <MobileList type="good"/>
                    </TabPane>
                    <TabPane tab="分享" key="3">
                        <MobileList type="share"/>
                    </TabPane>
                    <TabPane tab="问答" key="4">
                        <MobileList type="ask"/>
                    </TabPane>
                    <TabPane tab="招聘" key="5">
                        <MobileList type="job"/>
                    </TabPane>
                </Tabs>
                <div id="custom-back-top">
                    <BackTop >
                        {/* <div className="ant-back-top-inner">UP</div> */}
                        <Icon type="to-top" className="ant-back-top-inner" />
                    </BackTop>
                </div>

            </div>
        )
    }
}
const mapStateToProps=state=>{
    const {
        user,login
    }=state
    return {
        user,login
    }
}
export default connect(mapStateToProps)(MobileHome)