import React from 'react';
import {connect} from 'react-redux';
import { fetchPostsIfNeeded } from '../actions/index';
// import {changeTag} from '../actions';
class  listHeader extends React.Component{
    componentDidMount(){
        const {dispatch,selectedSubreddit}=this.props;
        // dispatch(fetchPostsIfNeeded('share'))
    }
    handleChange = tab => {
        console.log('chhange',tab)
        this.props.dispatch(fetchPostsIfNeeded(tab))
      }
    render(){
        const {selectedSubreddit,posts,isFetching,lastUpdated} = this.props
        console.log('props',this.props)
        return (
            <div className="panel_header">
                <a href="#" onClick={this.handleChange.bind(this,'job')} className="topic-tab">全部</a>
                <a href="#" className="topic-tab">精华</a>
                <a href="#" className="topic-tab">分享</a>
                <a href="#" className="topic-tab">问答</a>
                <a href="#" className="topic-tab">招聘</a>
                <a href="#" className="topic-tab">客户端测试</a>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { selectedSubreddit, postsBySubreddit } = state
    const {
      isFetching,
      lastUpdated,
      items: posts
    } = postsBySubreddit[selectedSubreddit] || {
      isFetching: true,
      items: []
    }
  
    return {
      selectedSubreddit,
      posts,
      isFetching,
      lastUpdated
    }
  }
  


export default connect(mapStateToProps)(listHeader);