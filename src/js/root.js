import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/button/style'; 
import PCHeader from './components/PCHeader';
import PCHome from './components/PCHome';
export default class Root extends React.Component{
    render(){
        return (
            <div>
                <PCHeader/>
                <PCHome/>
            </div>
        )
    }
}
ReactDOM.render(<Root/>,document.getElementById('mainContainer'));