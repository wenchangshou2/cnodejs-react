import React from 'react';
import { Row, Col, Icon, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import transformDate from '../../../utils/transformDate';
import LinkToLogin from './LinkToLogin';
import { fetchComment } from '../../actions';
const FormItem = Form.Item;
class MobileReply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        const { replies } = this.props;
        console.log(replies)

    }
    render() {
        const { replies, login, dispatch, currentTopicId } = this.props
        console.log(this.props)
        let reply_list = replies.length > 0 ?
            replies.map((reply, idx) => (
                <div key={idx}>
                    <div className="mobile_reply_author">
                        <Row>
                            <Col span={4}>
                                <Link to={`/user/${reply.author.loginname}`} className="mobile_user_avatar">
                                    <img src={reply.author.avatar_url} title={reply.author.loginname} />
                                </Link>
                            </Col>
                            <Col span={16}>
                                <div>{idx}楼 &nbsp;&nbsp;{transformDate(reply.create_at)}</div>
                            </Col>
                            <Col span={4}>
                                <div ups={1} onClick={this.onLike}>
                                    <Icon type="like-o " />
                                    {reply.ups.length}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="mobile_reply_content markdown-body" dangerouslySetInnerHTML={{ __html: reply.content }}>
                    </div>
                </div>
            )) : ''
        return (
            <div>
                {replies.length}次回复
                {reply_list}
                <NeedComment {...({ login, dispatch, currentTopicId }) } />
            </div>
        )
    }
}
class NeedComment extends React.Component {
    onReply(e) {
        e.preventDefault();
        const { login, dispatch, currentTopicId, pHeight } = this.props;
        const { getFieldValue } = this.props.form;
        let textarea=getFieldValue('replyContent');
        if(!textarea.trim()){
            return null;
        }
        dispatch(fetchComment(login.accessToken, currentTopicId, textarea));
        this.props.form.setFields({
            replyContent:{
                value: '',
            }
        })
    }
    render() {
        const { login, dispatch, currentTopicId, pHeight } = this.props;
        const sHeight = pHeight ? pHeight : 0;
        const style = pHeight ? { overflow: 'hidden', minHeight: pHeight } : { overflow: 'hidden', height: 0 }
        const tail = '<p style="text-align:right"><a href="https://github.com/lumia2046/cnode"> — — 来自lumia2046-react-cnode</a></p>'
        const {getFieldDecorator} = this.props.form;
        if (login.loginId) {
            return (
                <div >
                    <Form>
                        <FormItem  >
                            {getFieldDecorator('replyContent', {
                                rules: [{
                                    required: true,
                                }],
                            })(
                                <Input placeholder="请输入内容" />
                                )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={(e)=>{
                                this.onReply(e);
                            }}>
                                回复
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            )
        } else {
            return (
                <div>
                    <LinkToLogin dispatch={dispatch} />
                </div>
            );
        }
    }
}
NeedComment = Form.create({})(NeedComment)
export default MobileReply;