import Item from 'antd/lib/transfer/item';
import React from 'react';
import 'whatwg-fetch';
import {Card,Row,Col,Pagination} from 'antd';
import transformDate from '../../utils/transformDate';
import {Link} from 'react-router-dom';

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
    strToTop(isGood, isTop, tab) {
        if(isGood||isTop){
            return '置顶'
        }
        switch(tab){
            case 'share':
                return '共享'
            case 'ask':
                return '问答'
            case 'job':
                return '求职'
            case 'good':
                return '置顶'
        }
    }
    lastReplyTime(date){
        let time=Date.parse(new Date(date))
        console.log('time',time);
        let now = new Date() 
        let timeDiff= (now-time)/1000
        console.log(timeDiff)
    }
    render() {
        const {news} = this.state;
        console.log(news)
        const pageList=news.length?
        news.map((itm,index)=>(
            <div>
                <Row style={index==0?{marginBottom:'10px'}:{marginBottom:'10px',borderTop:'1px solid #f0f0f0'}}>
                    <Col span={1}>
                        <Link to={`/user/${itm.author.loginname}`} className="user_avatar">
                            <img src={itm.author.avatar_url} title={itm.author.loginname}/>
                        </Link>
                    </Col>
                    <Col span={2}>
                        <span title="回复数" className="count_of_replies">
                            {itm.reply_count}
                        </span>
                        <span className="count_seperator">
                            /
                        </span>
                        <span className="count_of_visits">
                            {itm.visit_count}
                        </span>
                    </Col>
                    <Col span={19}>
                        <div className="topic_title_wrapper">
                            <span className={itm.top?'put_top':itm.good?'put_good':'topiclist-tab'}>
                                {this.strToTop(itm.good,itm.top,itm.tab)}
                            </span>
                            {/* <a className="topic_title" href={`/topic/${itm.id}`} title={itm.title}>
                                {itm.title}
                            </a> */}
                            <Link to={`/topic/${itm.id}`}>
                                {itm.title}
                            </Link>

                        </div>
                    </Col>
                    <Col span={2}>
                        <Link to={`/user/${itm.author.loginname}`} className="user_small_avatar">
                            <img src={itm.author.avatar_url} title={itm.author.loginname}/>
                        </Link>
                        &nbsp;&nbsp;
                        {transformDate(itm.last_reply_at)}

                    </Col>
                </Row>

            </div>
        ))
            : 
            ''
        console.log('pagelist',pageList)
        return (
            <div>
                <Card bordered={false}>
                    {pageList}

                    <Pagination defaultCurrent={1} total={100}/>
                </Card>
            </div>
        )
    }
}