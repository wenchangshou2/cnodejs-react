
import { Tabs, Icon, BackTop, Affix, Row, Col, Badge, Menu } from 'antd';

import React from 'react';
// import MobileHeader from './MobileHeader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileList from './MobileList.jsx';
import MobileDrawer from './MobileDrawer.jsx';
const TabPane = Tabs.TabPane;
class MobileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '80%',
      openLeft: false,
      menu: 'all',
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(openState) {
  }
  changeMenu = (e) => {
    this.setState({ menu: e.key });
  }
  render() {
    let { openLeft, menu } = this.state;
    return (
      <div>
        <MobileDrawer openLeft={openLeft} onChange={this.onChange} />
        <Affix>
          <Row id="mobileHomeHeader" type="flex" align="middle" justify="space-between">
            <Col span={5} push={1}>
              <a
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
            <Col span={3} pull={1} >
              <Badge count={0}>
                <img src="/src/images/ld.svg" alt="ld" />
              </Badge>
            </Col>
          </Row>
          <Menu mode="horizontal" className="mobileMenu" onClick={this.changeMenu} defaultSelectedKeys={['all']}>
            <Menu.Item key="all">
              全部
            </Menu.Item>
            <Menu.Item key="good">
              精华
            </Menu.Item>
            <Menu.Item key="share">
              分享
            </Menu.Item>
            <Menu.Item key="ask">
              问答
            </Menu.Item>
            <Menu.Item key="job">
              招聘
            </Menu.Item>
          </Menu>
        </Affix>
        {/* <Tabs>
          <TabPane tab="全部" key="1">
            <MobileList type="all" />
          </TabPane>
          <TabPane tab="精华" key="2">
            <MobileList type="good" />
          </TabPane>
          <TabPane tab="分享" key="3">
            <MobileList type="share" />
          </TabPane>
          <TabPane tab="问答" key="4">
            <MobileList type="ask" />
          </TabPane>
          <TabPane tab="招聘" key="5">
            <MobileList type="job" />
          </TabPane>
        </Tabs> */}
        <MobileList type={menu} />
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
const mapStateToProps = (state) => {
  const {
    user, login,
  } = state;
  return {
    user, login,
  };
};
export default connect(mapStateToProps)(MobileHome);
