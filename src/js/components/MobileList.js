import React from 'react';
import {Row,Col,Divider} from 'antd';
import {Link} from 'react-router-dom';
import transformDate from '../../utils/transformDate';
import ReactPullToRefresh from 'react-pull-to-refresh';
import PropTypes from 'prop-types';
var Infinite = require('react-infinite');

class MobileList extends React.Component{
    constructor(){
        super();
        this.state={
            news:''
        };
    }
    handleScroll(e,force){
        console.log(e,force)
    }
    componentDidMount()  {
        // setInterval(handleScroll,100)
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
    isTop=(top)=> top?<span style={{color:'blue'}}>&nbsp;&nbsp;顶</span>:''
    isGood=(good)=> good?<span style={{color:'red'}}>&nbsp;&nbsp;精</span>:''
    render(){
        const {news} = this.state;
        console.log(news)
        const newsList = news.length
        ? news.map((newsItem,index)=>(
            // <section key={index} className="">
            //     <Link to={`/topic/${newsItem.id}`} >
            //         <div className="m_article_info">
            //             <div className="m_article_title">
            //                 <span>{newsItem.title}</span>
            //             </div>
            //             <div className="m_article_desc">
            //                 <span>
            //                     {this.strToTop(newsItem['good'],newsItem['top'],newsItem['tab'])}
            //                 </span>
            //                 <span className="m_article_author">
            //                     {newsItem['author']['loginname']}
            //                 </span>
            //                 <span className="m_article_post_time">
            //                     {transformDate(newsItem['create_at'])}
            //                 </span>
            //             </div>
            //         </div>
            //     </Link>
            //     <Divider />
            // </section>
            <Row >
                <Col span={5}>
                    <Link to={`/user/${newsItem.author.loginname}`} className="mobile_user_avatar">
                        <img src={newsItem.author.avatar_url} title={newsItem.author.loginname} /> 
                    </Link>
                </Col>
                <Col span={17}>
                    <Link to={`/topic/${newsItem.id}`}>
                        <section className="mobile_article">
                            <header className="">
                            <div className="mobile_title">
                            {this.isGood(newsItem.good)}{this.isTop(newsItem.top)} 
                            &nbsp;&nbsp;{newsItem.title}</div>
                            </header>
                            <p className="mobile_article_extra">
                                <span className="mobile_reply_count">
                                    {newsItem.reply_count}
                                </span>
                                /
                                <span className="mobile_visit_count">
                                    {newsItem.visit_count}
                                </span>
                                &nbsp;&nbsp;
                                <span className="mobile_tab">
                                    {this.strToTop(newsItem.good,newsItem.top,newsItem.tab)}
                                </span>
                                <span className="mobile_last_reply_at">
                                    {transformDate(newsItem.create_at)}
                                </span>
                            </p>
                        </section>
                    </Link>
                </Col>
            </Row>
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
MobileList.propTypes ={
    news:PropTypes.object
}
export default MobileList;