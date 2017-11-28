import React from 'react';

export default class listHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="panel_header">
                <a href="#" className="topic-tab">全部</a>
                <a href="#" className="topic-tab">精华</a>
                <a href="#" className="topic-tab">分享</a>
                <a href="#" className="topic-tab">问答</a>
                <a href="#" className="topic-tab">招聘</a>
                <a href="#" className="topic-tab">客户端测试</a>
            </div>
        )
    }
}