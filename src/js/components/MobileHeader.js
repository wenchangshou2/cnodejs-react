import React from 'react';
import {Row,Col} from 'antd';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                {/* <Row className="mobileHeader">
                    <Col span={1}></Col>
                    <Col span={7}>
                        <img src="/src/images/cnodejs_light.svg" className="mobilelogo"/>
                    </Col>
                    <Col span={16}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                        </Tabs>
                    </Col>
                </Row> */}
                <header className="mobileHeader">
                    < a href="/">
                        <img src="/src/images/cnodejs_light.svg" className="mobilelogo"/>
                        <span>cnodejs</span>
                    </a>
                </header>
            </div>
        )
    }
}
export default MobileHeader