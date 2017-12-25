import React from 'react';
import {Row,Col,Affix,Icon} from 'antd';
import {Link} from 'react-router-dom';
class MobileHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Affix >
          <Row style={{ backgroundColor: 'rgb(0, 188, 212)', height: '50px' }} className="mobileTopicHeader">
            <Col span={6} className="mobileTopicTitle" >
              <Link to="/">
                <Icon type="rollback" style={{ color: 'white', fontSize2: '20px' }} />
              </Link>
            </Col>
            <Col span={12} className="mobileTopicTitle">
              文章详情
                        </Col>
            <Col span={6}>
            </Col>
          </Row>
        </Affix>
      </div>
    )
  }
}
export default MobileHeader;