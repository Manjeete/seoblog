import Header from './Header';
import React from 'react';

const Layout = ({children}) =>{
    return (
        <React.Fragment>
            <Header />
                {children}

            <p>Footer</p>
        </React.Fragment>
    );
};

export default Layout;