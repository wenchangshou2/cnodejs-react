import React from 'react';
import {Row,Col,Divider} from 'antd';
import {Link} from 'react-router-dom';
import transformDate from '../../utils/transformDate';
// import ReactPullToRefresh from 'react-pull-to-refresh';
import PropTypes from 'prop-types';
import {lazyload} from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import { fetchPostsIfNeeded } from '../actions/index';



class MobileList extends React.Component{
    constructor(){
        super();
        this.state={
            news:'',
            page:1,
            isMore:true,
            loading: true,
            hasMore: true
        };
    }
    handleScroll(e,force){
        console.log(e,force)
    }
    componentDidMount()  {
        // setInterval(handleScroll,100)
        setTimeout(() => {
            this.setState({loading:false})
        }, 3000);
    }
    componentWillMount(){
        var myFetchOptions={
            method:'GET'
        };
        // this.props.dispatch(fetchPostsIfNeeded(this.props.type,this.state.page))
        // fetch(`https://cnodejs.org/api/v1/topics?tab=${this.props.type}`).then(response=>response.json()).then(json=>{
        //     this.setState({
        //         news:json['data']
        //     })
        // })
    }
    loadMore(){
        console.log('lore moad')
        // let {page}=this.state;
        // console.log(page)
        // this.setState({page:page+1})
        // this.setState({
        //     loading: true,
        //   });
        // // this.props.dispatch(fetchPostsIfNeeded(this.props.type))
        // fetch(`https://cnodejs.org/api/v1/topics?tab=${this.props.type}&page=${this.state.page}`).then(response=>response.json()).then(json=>{
        //     this.setState({
        //         news:json['data']
        //     })
        // })
        // this.setState({
        //     loading: false
        //   });

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
        const {isMore,loading} =this.state
        // const {posts}=this.props
        // console.log(posts)
        const newsList = news.length
        ? news.map((newsItem,index)=>(
            <Row key={index}>
                <Col span={5}>
                    <Link to={`/user/${newsItem.author.loginname}`} className="mobile_user_avatar">
                        <lazyload height={200} >
                            <img src={newsItem.author.avatar_url} title={newsItem.author.loginname} /> 
                        </lazyload>
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
                <div style={{height:'700px',overflow:'auto'}}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={true || false}
                        loader={<div className="loader">Loading ...</div>}
                        useWindow={false}
                    >
                    <div>
                        {newsList}
                    </div>
                    </InfiniteScroll>
                </div>

        )
    }
}
const mapStateToProps=state=>{
    const {
        postsBySubreddit
    }=state
    const posts = postsBySubreddit['post'] || []
    return {
        posts
    }
}
export default connect(mapStateToProps)(MobileList);