import React from 'react';
import { Row, Col, Affix, Icon } from 'antd';
import { Link } from 'react-router-dom';

class MobileHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <Affix key="a">
          <Row type="flex" id="mobileTopicHeader" align="middle">
            <Col span={6} push={2}>
              <Link to="/">
                <Icon type="rollback" style={{ color: 'white', fontSize2: '20px' }} />
              </Link>
            </Col>
            <Col span={12} className="mobileTopicTitle">
              {this.props.title === undefined ? '文章详情' : this.props.title}
            </Col>
            <Col span={6}>
            </Col>
          </Row>
        </Affix>
    )
  }
}
export default MobileHeader;