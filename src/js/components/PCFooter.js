import React from 'react';
import {Row,Col} from 'antd';
export default class PCFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="footerPanel" style={{marginTop:'20px'}}>
                <Row className="footer">
                    <Col span={2}></Col>
                    <Col span={20}>
                    <div className="links">
                        <p>RSS|源码地址</p>
                    </div>
                    <div className="col_fade">
                        <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
                        <p>
                            服务器赞助商为 
                            <a href="http://www.ucloud.cn/?utm_source=zanzhu&utm_campaign=cnodejs&utm_medium=display&utm_content=yejiao&ytag=cnodejs_logo">
                            <img src="//dn-cnode.qbox.me/FuIpEaM9bvsZKnQ3QfPtBHWQmLM9" title="ucloud" alt="ucloud" style={{width:'92px'}}/>
                            </a>
                            ，存储赞助商为
            < a href = "http://www.qiniu.com/?ref=cnode" target = "_blank" className = "sponsor_outlink" > <img
                src="//dn-cnode.qbox.me/Fg0jtDIcTqVC049oVu5-sn6Om4NX"
                title="七牛云存储"
                alt="七牛云存储"
                 style={{width:'115px'}}/></a>
                 由<a href="https://alinode.aliyun.com/?ref=cnode" target="_blank" className="sponsor_outlink" data-label="alinode_bottom">
      <img src="//dn-cnode.qbox.me/FpMZk31PDyxkC8yStmMQL4XroaGD" title="alinode" alt="alinode" style={{height:'54px',width:'166px'}}/>
    </a>提供应用性能服务
                        </p>
                        <p>
                            新手搭建 Node.js 服务器，推荐使用无需备案的 <a href="https://www.digitalocean.com/?refcode=eba02656eeb3">DigitalOcean(https://www.digitalocean.com/)</a>
                        </p>
                    </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}