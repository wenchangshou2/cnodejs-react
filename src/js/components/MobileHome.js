import React from 'react';
// import MobileHeader from './MobileHeader';
import {Tabs,Icon,BackTop,Affix} from 'antd';
const TabPane = Tabs.TabPane;
import MobileList from './MobileList';
class MobileHome extends React.Component{
    render(){
        return(
            <div>
            {/* <MobileHeader/> */}
                <Tabs>
                    <TabPane tab="全部" key="1">
                        <MobileList type="all"/>
                    </TabPane>
                    <TabPane tab="精华" key="2">
                        <MobileList type="good"/>
                    </TabPane>
                    <TabPane tab="分享" key="3">
                        <MobileList type="share"/>
                    </TabPane>
                    <TabPane tab="问答" key="4">
                        <MobileList type="ask"/>
                    </TabPane>
                    <TabPane tab="招聘" key="5">
                        <MobileList type="job"/>
                    </TabPane>
                </Tabs>
                <div id="custom-back-top">
                    <BackTop >
                        {/* <div className="ant-back-top-inner">UP</div> */}
                        <Icon type="to-top" className="ant-back-top-inner" />

                    </BackTop>
                </div>

            </div>
        )
    }
}
export default MobileHome;