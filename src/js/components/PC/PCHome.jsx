import React from 'react';

import {Row, Col, Card, Button} from 'antd';
import ListHeader from './listHeader.jsx';
import PageList from './pageList.jsx';
import PCRightPanel from './PCRightPanel.jsx';
// import App from './App'
export default class PCHome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div
                className="panel"
                style={{
                marginTop: '20px'
            }}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <ListHeader/>
                        <PageList/>
                    </Col>
                    <Col
                        span={5}
                        style={{
                        marginLeft: '20px'
                    }}>
                    <PCRightPanel/>
                    </Col>
                </Row>
            </div>
        )
    }
}