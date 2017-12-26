import React from 'react';
export default class MenuWrap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hidden: false
        };
    }
    componentWillReceiveProps(nextProps) {
        const sideChanged = this.props.children.props.right !== nextProps.children.props.right;
        if (sideChanged) {
            this.setState({ hidden: true })
            setTime(() => {
                this.show();
            }, this.props.wait);
        }
    }
    show(){
        this.setState({hidden:false});
    }
    render() {
        let style;
        if (this.state.hidden) {
            style = { display: 'none' };
        }
        return (
            <div style={style} className={this.props.side}>
                {this.props.children}
            </div>
        )
    }
}