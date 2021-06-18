import React, {ReactChild, ReactChildren} from 'react';

interface layoutProps {
    children: ReactChild | ReactChildren;
}

const Layout = ({children}: layoutProps) =>{
    return(
        <div className="limiter">
            <div className="container-login100">
                <main>{children}</main>
            </div>
        </div>
    )
}

export default Layout;
