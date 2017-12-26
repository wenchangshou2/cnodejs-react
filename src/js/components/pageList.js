import Item from 'antd/lib/transfer/item';
import React from 'react';
import 'whatwg-fetch';
import {
    Card,
    Row,
    Col,
    Pagination,
    Spin,
    Alert
} from 'antd';
import transformDate from '../../utils/transformDate';
import { fetchPostsIfNeeded } from '../actions/index';

import {
    Link
} from 'react-router-dom';
import {
    connect
} from 'react-redux';

class PageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: '',
            lastTab:'all',
            currPage:1,
            loading:false
        }
    }
    strToTop(isGood, isTop, tab) {
        if (isGood || isTop) {
            return '置顶'
        }
        switch (tab) {
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
    lastReplyTime(date) {
        let time = Date.parse(new Date(date))
        console.log('time', time);
        let now = new Date()
        let timeDiff = (now - time) / 1000
        console.log(timeDiff)
    }
    onChange(pageNumber) {
        console.log(pageNumber)
        this.setState({loading:true})
        this.props.dispatch(fetchPostsIfNeeded(this.props.menu,pageNumber,30))
        this.setState({currPage:pageNumber,loading:false})
        
    }
    render() {
            const container = ( <
                Alert message = "Alert message title"
                description = "Further details about the context of this alert."
                type = "info" /
                >
            );
            const {
                items,menu
            } = this.props
            const {
                news,lastTab,currPage,loading
            } = this.state;
            if(menu!=lastTab){
                this.setState({lastTab:menu,currPage:1})
            }
            const pageList = items.length ?
                items.map((itm, index) => ( 
                    <div key={index} className="pcTopicList">
                        <Row style = {
                            index == 0 ? {
                                marginBottom: '10px'
                            } : {
                                marginBottom: '10px',
                                borderTop: '1px solid #f0f0f0'
                            }
                        } >
                        <Col span = {1} >
                        <Link to = {
                            `/user/${itm.author.loginname}`
                        }className = "user_avatar" >
                        <img src = {
                            itm.author.avatar_url
                        }
                        title = {
                            itm.author.loginname
                        }
                        /> 
                        </Link > 
                        </Col> 
                        <Col span = {2} >
                        <span title = "回复数" className = "count_of_replies" > {
                            itm.reply_count
                        } 
                        </span> 
                        <span className = "count_seperator" >/ </span > 
                        <span className = "count_of_visits" > {
                            itm.visit_count
                        } 
                        </span> 
                        </Col >
                         <Col span = {17} >
                        <div className = "topic_title_wrapper" >
                        <span className = {
                            itm.top ? 'put_top' : itm.good ? 'put_good' : 'topiclist-tab'
                        } > {
                            this.strToTop(itm.good, itm.top, itm.tab)
                        } </span> {
                        /* <a className="topic_title" href={`/topic/${itm.id}`} title={itm.title}>
                                                        {itm.title}
                                                    </a> */
                    } <Link to = {
                        `/topic/${itm.id}`
                    } > {
                        itm.title
                    } 
                    </Link>

                    </div> 
                    </Col > 
                    <Col span = {2} >
                        <Link to = {
                            `/user/${itm.author.loginname}`
                        } className = "user_small_avatar" >
                            <img src = {itm.author.avatar_url} title = 
                            {itm.author.loginname}/> 
                        </Link > &nbsp;&nbsp; 
                        {transformDate(itm.last_reply_at)}

                    </Col> 
                    </Row >
                    </div>
                )):
        ''
    console.log('pagelist', pageList)
    return ( 
    <div>
        <Card bordered = {false}>
        <Spin spinning = {loading}
        size = "large"
        delay = {100} > 
            {pageList} 
        </Spin>

        <Pagination defaultCurrent = {1}
        total = {
            100
        }
        onChange = {
            this.onChange.bind(this)
        }
        current={currPage}
        /> </Card > </div>
    )
}
}

const mapStateToProps = state => {
    const {
        article_list,tab
    }=state
    console.log('111',tab)
    let menu=state['tab']['tab']
    const {items,isFetching} = article_list || []
    return {
        items,
        isFetching,
        menu
    }
}

export default connect(mapStateToProps)(PageList)