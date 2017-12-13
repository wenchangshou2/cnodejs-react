import React from 'react';
import {
    Form, Input, Button, checkbox,
    Row, Col, Icon,Card
} from 'antd'
import ListHeader from './listHeader';
import PageList from './pageList';
import PCRightPanel from './PCRightPanel';
const FormItem = Form.Item;


class PCSignin extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout={
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          };
        const formLayout="horizontal"
        return (
            <div
                className="panel"
                style={{
                    marginTop: '20px'
                }}>
                <Row style={{height:'800px'}}>
                    <Col span={2}></Col>
                    <Col span={13}>
                        <Card>
                            <Row>
                                <Col span={5}>

                                </Col>
                                <Col span={10}>
                                    <Form onSubmit={this.handleSubmit} className="login-form" layout={formLayout}>
                                        <FormItem label="用户名" {...formItemLayout}>
                                            {getFieldDecorator('userName', {
                                                rules: [{ required: true, message: 'Please input your username!' }]
                                            })(
                                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                                )}
                                        </FormItem>
                                        <FormItem label="密码" {...formItemLayout}>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: 'please input your password!' }]
                                            })(
                                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='password' />
                                                )}
                                        </FormItem>
                                        <FormItem label="Token" {...formItemLayout}>
                                            {getFieldDecorator('token', {
                                                rules: [{ required: true, message: 'please input your password!' }]
                                            })(
                                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type='text' placeholder='token' />
                                                )}
                                                <Button type="primary" htmlType="submit">
                                                    登录
                                                </Button>
                                        </FormItem>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col
                        span={5}
                        style={{
                            marginLeft: '20px'
                        }}>
                        <Card title="关于">
                        <p>CNode：Node.js专业中文社区</p>
                        <p>在这里你可以：</p>
                        <ul style={{marginLeft:'40px'}}>
                            <li>向别人提出你遇到的问题</li>
                            <li>帮助遇到问题的人</li>
                            <li>分享自己的知识</li>
                            <li>和其它人一起进步</li>
                        </ul>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
PCSignin = Form.create()(PCSignin)
export default PCSignin;