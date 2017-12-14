import React from 'react';
import {Row,Col,Divider} from 'antd';
import {Link} from 'react-router-dom';
import transformDate from '../../utils/transformDate';
import ReactPullToRefresh from 'react-pull-to-refresh';

class MobileList extends React.Component{
    constructor(){
        super();
        this.state={
            news:''
        };
    }
    componentWillMount(){
        var myFetchOptions={
            method:'GET'
        };
        fetch(`https://cnodejs.org/api/v1/topics?tab=${this.props.type}`).then(response=>response.json()).then(json=>{
            this.setState({
                news:json['data']
            })
        })
    }
    strToTop(isGood, isTop, tab) {
        if(isGood||isTop){
            return '置顶'
        }
        switch(tab){
            case 'share':
                return '分享'
            case 'ask':
                return '问答'
            case 'job':
                return '求职'
            case 'good':
                return '置顶'
        }
    }
    render(){
        const {news} = this.state;
        const newsList = news.length
        ? news.map((newsItem,index)=>(
            <section key={index} className="">
                <Link to={`/topic/${newsItem.id}`} >
                    <div className="m_article_info">
                        <div className="m_article_title">
                            <span>{newsItem.title}</span>
                        </div>
                        <div className="m_article_desc">
                            <span>
                                {this.strToTop(newsItem['good'],newsItem['top'],newsItem['tab'])}
                            </span>
                            <span className="m_article_author">
                                {newsItem['author']['loginname']}
                            </span>
                            <span className="m_article_post_time">
                                {transformDate(newsItem['create_at'])}
                            </span>
                        </div>
                    </div>
                </Link>
                <Divider />
            </section>
        )):'没有加载任何新闻'
        return(
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        )
    }
}
export default MobileList;