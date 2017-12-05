import React from 'react';
import {connect} from 'react-redux';
// import {changeTag} from '../actions';
import {add} from '../actions';
let mapStateToProps=(state)=>{
    console.log('state1:',state)
    return {
        defaultState:state
    }
}
const mapDispatchToProps=(dispatch,defaultSTate,ownProps)=>({
    onClick:()=>{
        dispatch(add(5))
    }
})
let listHeader=({dispatch,defaultState,onClick})=>{
        return (
            <div className="panel_header">
                <a href="#" onClick={e=>{
                    e.preventDefault();
                    onClick()
                }} className="topic-tab">全部</a>
                <a href="#" className="topic-tab">精华</a>
                <a href="#" className="topic-tab">分享</a>
                <a href="#" className="topic-tab">问答</a>
                <a href="#" className="topic-tab">招聘</a>
                <a href="#" className="topic-tab">客户端测试{defaultState}</a>
            </div>
        )

}
listHeader=connect(
    mapStateToProps,
    mapDispatchToProps
)(listHeader);
export default listHeader;