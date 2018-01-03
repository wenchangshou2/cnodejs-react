import React from 'react';
import { Button } from 'antd';
import {Link} from 'react-router-dom';
const LinkToLogin = props => {
    let { dispatch } = props
    const masterInfo = window.localStorage.getItem('masterInfo') ? true : false;
    return (
        <div>
                {!masterInfo&&
                    <Link to='/login'>
                    <Button type="primary">点击登录</Button>
                    </Link>
                }
        </div>
    )
}
export default LinkToLogin;