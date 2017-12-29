import React from 'react';
import { Card, Button } from 'antd';

export default class PCRightPanel extends React.Component {
    render() {
        return (
            <div>
                <Card title="CNode：Node.js专业中文社区">
                    <p>您可以
                        <a href="#">登录</a>
                        或
                        <a href="#">注册</a>
                    </p>
                    <p>
                        <Button type="primary">通过 GitHub 登录</Button>
                    </p>
                </Card>
                <Card
                    title="无人回复的话题"
                    style={{
                    marginTop: '10px'
                }}>
                    <p>
                        <a href="#">在 Express 使用 Modelar ORM</a>
                    </p>
                    <p>
                        <a href="#">渐进式Express源码学习6-独孤求败</a>
                    </p>
                    <p>
                        <a href="#">渐进式Express源码学习5-全副武装</a>
                    </p>
                    <p>
                        <a href="#">渐进式Express源码学习4-如虎添翼</a>
                    </p>
                    <p>
                        <a href="#">渐进式Express源码学习3-初露锋芒</a>
                    </p>

                </Card>

                <Card
                    title={<p> 积分榜 <a href = "#" > TOP 100 >></a> </p>}
                    className="mtp10">
                    <ol style={{
                        lineHeight: '2em'
                    }}>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                        <li>20300&nbsp;&nbsp;<a href="#">i5ting</a>
                        </li>
                    </ol>
                </Card>
                <Card title="友情社区" className="mtp10">
                    <ol className="friendship-community">
                        <li>
                            <a href="https://ruby-china.org/">
                                <img src="/src/images/ruby-china-20150529.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="http://golangtc.com/">
                                <img src="/src/images/golangtc-logo.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="http://phphub.org/">
                                <img src="/src/images/phphub-logo.png"/>
                            </a>
                        </li>
                        <li>
                            <a href="http://testerhome.com/">
                                <img src="/src/images/last-image.png"/>
                            </a>
                        </li>
                    </ol>
                </Card>
                <Card title="客户端二维码" className="mtp10 cnode-app-download">
                    <img src="/src/images/matrixCode.png"/>
                </Card>
            </div>
        )
    }
}