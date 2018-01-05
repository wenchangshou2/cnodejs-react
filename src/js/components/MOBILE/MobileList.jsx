import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';

import transformDate from '../../../utils/transformDate';
import { fetchPostsIfNeeded } from '../../actions/index';

class MobileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      page: 1,
      isMore: true,
      loading: true,
      hasMore: true,
      articles: [],
      lastMenu: 'all',
    };
  }
  componentWillReceiveProps(nextProps) {
    let articles = this.state.articles;
    const { isFetching } = this.props;
    if (nextProps.type !== this.state.lastMenu && !isFetching) {
      this.state.articles = [];
      this.state.articles.length = 0;
      this.setState({ lastMenu: nextProps.type, page: 1, articles: [], hasMore: false });
      this.props.dispatch(fetchPostsIfNeeded(nextProps.type, 1));
    } else {
      if (isFetching) {
        nextProps.items.map((article) => {
          articles.push(article);
        })
      }
    }
  }
  loadMore() {
    const { page } = this.state;
    const { isFetching } = this.props;
    if (!isFetching) {
      this.setState({
        page: page + 1,
      });
      this.props.dispatch(fetchPostsIfNeeded(this.props.type, page));
    }
  }
  debounce(func, delay) {
    let inDebounce
    return function () {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
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
  isTop = (top) => top ? <span style={{ color: 'blue' }}>&nbsp;&nbsp;顶</span> : '';
  isGood = (good) => good ? <span style={{ color: 'red' }}>&nbsp;&nbsp;精</span> : ''
  render() {
    const { news } = this.state;
    const { isMore, loading, hasMoreItems, hasMore } = this.state;
    const { items } = this.props;
    let newArticle = [];
    this.state.articles.map((newsItem, index) => {
      newArticle.push(
        <Row key={index} className="mobileTopicList">
          <Col span={5}>
            <Link to={`/user/${newsItem.author.loginname}`} className="mobile_user_avatar">
              <LazyLoad height={200} throttle={200}>
                <img src={newsItem.author.avatar_url} title={newsItem.author.loginname} alt="author_avatar" />
              </LazyLoad >
            </Link>
          </Col>
          <Col span={17}>
            <Link to={`/topic/${newsItem.id}`}>
              <section className="mobile_article">
                <header className="">
                  <div className="mobile_title">
                    {this.isGood(newsItem.good)}{this.isTop(newsItem.top)}
                    &nbsp;&nbsp;{newsItem.title}
                  </div>
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
                    {this.strToTop(newsItem.good, newsItem.top, newsItem.tab)}
                  </span>
                  <span className="mobile_last_reply_at">
                    {transformDate(newsItem.create_at)}
                  </span>
                </p>
              </section>
            </Link>
          </Col>
        </Row>);
    });
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore.bind(this)}
          hasMore={this.state.hasMore}
          loader={<div className="loader">Loading ...</div>}
        >
          <div>
            {newArticle}
          </div>
        </InfiniteScroll>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    articleList,
  } = state;
  const { items, isFetching } = articleList || [];
  return {
    items,
    isFetching,
  };
};
export default connect(mapStateToProps)(MobileList);
