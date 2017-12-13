import React from 'react';
import {connect} from 'react-redux';
import { fetchPostsIfNeeded } from '../actions/index';
// import {changeTag} from '../actions';
class  listHeader extends React.Component{
    componentDidMount() {
        // this.props.dispatch(fetchPostsIfNeeded('job'))
    }
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
        this.props.dispatch(fetchPostsIfNeeded('all'))
        return (
            <div className="panel_header">
                <a href="#" onClick={this.handleChange.bind(this,'all')} className="topic-tab">全部</a>
                <a href="#" className="topic-tab" onClick={this.handleChange.bind(this,'good')}>精华</a>
                <a href="#" className="topic-tab" onClick={this.handleChange.bind(this,'share')}>分享</a>
                <a href="#" className="topic-tab" onClick={this.handleChange.bind(this,'ask')}>问答</a>
                <a href="#" className="topic-tab" onClick={this.handleChange.bind(this,'job')}>招聘</a>
                <a href="#" className="topic-tab">客户端测试</a>
            </div>
        )
    }
}


export default connect()(listHeader);