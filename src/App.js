import React from 'react';
import "./style/style.css";
import Header from "./component/header/Header";
import NavBar from "./component/navBar/NavBar";
import 'antd/dist/antd.css';
import Router from "./router/Router";
import "./style/media.css"

const App = () => {
    

    return (
        <div>
            <Header/>
            <NavBar/>
            <Router/>
        </div>
    );
};

export default App;