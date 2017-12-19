import React from 'react';
import {Row,Col,Icon} from 'antd';
import {Tabs} from 'antd';
import { BurgerMenu } from 'react-burger-menu'


import classNames from 'classnames';

const TabPane = Tabs.TabPane;

class MenuWrap extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        hidden: false
      };
    }
  
    componentWillReceiveProps(nextProps) {
      const sideChanged = this.props.children.props.right !== nextProps.children.props.right;
  
      if (sideChanged) {
        this.setState({hidden : true});
  
        setTimeout(() => {
          this.show();
        }, this.props.wait);
      }
    }
  
    show() {
      this.setState({hidden : false});
    }
  
    render() {
      let style;
  
      if (this.state.hidden) {
        style = {display: 'none'};
      }
  
      return (
        <div style={style} className={this.props.side}>
          {this.props.children}
        </div>
      );
    }
  }
class MobileHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentMenu:'slide',
            side:'left'
        }
    }
    changeMenu(menu){
        this.setState({currentMenu:menu});
    }
    changeSide(side){
        this.setState({side});
    }
    getItems(){
        let items;
        switch(this.props.menus[this.state.currentMenu].items){
            case 1:
            items = [
              <a key="0" href=""><i className="fa fa-fw fa-star-o" /><span>Favorites</span></a>,
              <a key="1" href=""><i className="fa fa-fw fa-bell-o" /><span>Alerts</span></a>,
              <a key="2" href=""><i className="fa fa-fw fa-envelope-o" /><span>Messages</span></a>,
              <a key="3" href=""><i className="fa fa-fw fa-comment-o" /><span>Comments</span></a>,
              <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o" /><span>Analytics</span></a>,
              <a key="5" href=""><i className="fa fa-fw fa-newspaper-o" /><span>Reading List</span></a>
            ];
            break;
          case 2:
            items = [
              <h2 key="0"><i className="fa fa-fw fa-inbox fa-2x" /><span>Sidebar</span></h2>,
              <a key="1" href=""><i className="fa fa-fw fa-database" /><span>Data Management</span></a>,
              <a key="2" href=""><i className="fa fa-fw fa-map-marker" /><span>Location</span></a>,
              <a key="3" href=""><i className="fa fa-fw fa-mortar-board" /><span>Study</span></a>,
              <a key="4" href=""><i className="fa fa-fw fa-picture-o" /><span>Collections</span></a>,
              <a key="5" href=""><i className="fa fa-fw fa-money" /><span>Credits</span></a>
            ];
            break;
          default:
            items = [
              <a key="0" href=""><i className="fa fa-fw fa-star-o" /><span>Favorites</span></a>,
              <a key="1" href=""><i className="fa fa-fw fa-bell-o" /><span>Alerts</span></a>,
              <a key="2" href=""><i className="fa fa-fw fa-envelope-o" /><span>Messages</span></a>,
              <a key="3" href=""><i className="fa fa-fw fa-comment-o" /><span>Comments</span></a>,
              <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o" /><span>Analytics</span></a>,
              <a key="5" href=""><i className="fa fa-fw fa-newspaper-o" /><span>Reading List</span></a>
            ];
        }
        return items;
    }
    getMenu(){
        const Menu=BurgerMenu[this.state.currentMenu];
        const items=this.getItems();
        let jsx;
        if(this.state.side==='right'){
            jsx=(
                <MenuWrap wait={20} side={this.state.side}>
                <Menu id={this.state.currentMenu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} right>
                  {items}
                </Menu>
              </MenuWrap>        
            )
        }else{
            jsx = (
                <MenuWrap wait={20}>
                  <Menu id={this.state.currentMenu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
                    {items}
                  </Menu>
                </MenuWrap>
              );
        }
        return jsx;
    }
    render(){
        return (
            <div>
                <header className="mobileHeader">
                    {/* < a href="/">
                        <img src="/src/images/cnodejs_light.svg" className="mobilelogo"/>
                        <span>cnodejs</span>
                    </a> */}
                    <Menu isOpen={true}>
                        <ul>
                            <li>l1</li>
                        </ul>
                    </Menu>
                    <Row type="flex" align="middle" >
                        <Col span={6}>
                            <Icon type="setting" />
                        </Col>
                        <Col span={12}>
                            <p style={{textAlign:'center'}}>
                            cnodejs论坛
                            </p>
                        </Col>
                    </Row>
                </header>
            </div>
        )
    }
}
const menus = {
    slide: {buttonText: 'Slide', items: 1},
    stack: {buttonText: 'Stack', items: 1},
    elastic: {buttonText: 'Elastic', items: 1},
    bubble: {buttonText: 'Bubble', items: 1},
    push: {buttonText: 'Push', items: 1},
    pushRotate: {buttonText: 'Push Rotate', items: 2},
    scaleDown: {buttonText: 'Scale Down', items: 2},
    scaleRotate: {buttonText: 'Scale Rotate', items: 2},
    fallDown: {buttonText: 'Fall Down', items: 2},
    reveal: {buttonText: 'Reveal', items: 1}
  };

export default MobileHeader