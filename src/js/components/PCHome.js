import React from 'react';

import {Row,Col} from 'antd';
import ListHeader from './listHeader';
import PageList from './pageList';
export default class PCHome extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="panel" style={{marginTop:'20px'}}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14}>
                        <ListHeader/>
                        <PageList/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}