import Item from 'antd/lib/transfer/item';
import React from 'react';
import 'whatwg-fetch';
import {Card} from 'antd';

export default class PageList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            news:''
        }
    }
    componentWillMount() {
        let options = {
            method: 'GET'
        }
        fetch('https://cnodejs.org/api/v1/topics', {
            qs: {
                page: 1,
                tab: 'all',
                limit: 20
            }
        }).then((response) => response.json()).then((data) => {
            this.setState({news:data['data']})
            // console.log(data['data'])
            console.log('data', data);
        })
    }
    render() {
        const {news} = this.state;
        console.log(news)
        const pageList=news.length?
        news.map((itm,index)=>(
            <div>
                <a href={`/user/${itm.author.loginname}`} className="user_avatar">
                    <img src={itm.author.avatar_url} title={itm.author.loginname}/>
                </a>
                <span className="count_of_replies" title="回复数">
                 {itm.reply_count}
                </span>
                <span className="count_seperator">
                    /
                </span>
                <span className="count_of_visits">
                {itm.visit_count}
                </span>
                <a className="last_time" href={`/topic/`}>
                </a>
                <div className="topic_title_wrapper">
                    <span className="topiclist-tab"></span>
                    <a className="topic_title" href={`/topic/${itm.id}`} title={itm.title}>
                    {itm.title}
                    </a>
                </div>
            </div>
        ))
            : 
            ''
        console.log('pagelist',pageList)
        return (
            <div>
                <Card>
                    {pageList}
                </Card>
            </div>
        )
    }
}