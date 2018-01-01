import React from 'react';

import {Row, Col, Card, Button} from 'antd';
import ListHeader from './listHeader.jsx';
import PageList from './pageList.jsx';
import PCRightPanel from './PCRightPanel.jsx';
// import App from './App'
export default class PCApi extends React.Component {
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
                        {/* <ListHeader/> */}
                        {/* <PageList/> */}
                        <div className="markdown-text">
                            <p>以下 api 路径均以 <strong><a href="https://cnodejs.org/api/v1" target="_blank">https://cnodejs.org/api/v1</a></strong> 为前缀</p>
                            <h3>主题</h3>
                            <h4>get /topics 主题首页</h4>
                            <p>接收 get 参数</p>
                            <ul>
                                <li>page <code>Number</code> 页数</li>
                                <li>tab <code>String</code> 主题分类。目前有 <code>ask</code> <code>share</code> <code>job</code> <code>good</code></li>
                                <li>limit <code>Number</code> 每一页的主题数量</li>
                                <li>mdrender <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
                            </ul>
                            <p>示例：<a href="/api/v1/topics" target="_blank">/api/v1/topics</a></p>
                        </div>


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