import { React } from 'react';
import BurgerMenu from 'react-burger-menu';
import MenuWrap from './MenuWrap'

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMenu: 'slide',
            side: 'left'
        }
    }
    changeMenu(menu) {
        this.setState({ currentMenu: menu })
    }
    changeSide(side) {
        this.setState({ side })
    }
    getItems() {
        items = [
            <a key="0" href=""><i className="fa fa-fw fa-star-o" /><span>Favorites</span></a>,
            <a key="1" href=""><i className="fa fa-fw fa-bell-o" /><span>Alerts</span></a>,
            <a key="2" href=""><i className="fa fa-fw fa-envelope-o" /><span>Messages</span></a>,
            <a key="3" href=""><i className="fa fa-fw fa-comment-o" /><span>Comments</span></a>,
            <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o" /><span>Analytics</span></a>,
            <a key="5" href=""><i className="fa fa-fw fa-newspaper-o" /><span>Reading List</span></a>
        ];
        return items;
    }
    getMenu() {
        const Menu = BurgerMenu[this.state.currentMenu]
        const items = this.getItems();
        let jsx;
        jsx = (
            <MenuWrap wait={20}>
                <Menu id={this.state.currentMenu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
                    {items}
                </Menu>
            </MenuWrap>
        )
        return jsx;
    }
}
const menus = {
    slide: { buttonText: 'Slide', items: 1 },
    stack: { buttonText: 'Stack', items: 1 },
    elastic: { buttonText: 'Elastic', items: 1 },
    bubble: { buttonText: 'Bubble', items: 1 },
    push: { buttonText: 'Push', items: 1 },
    pushRotate: { buttonText: 'Push Rotate', items: 2 },
    scaleDown: { buttonText: 'Scale Down', items: 2 },
    scaleRotate: { buttonText: 'Scale Rotate', items: 2 },
    fallDown: { buttonText: 'Fall Down', items: 2 },
    reveal: { buttonText: 'Reveal', items: 1 }
};