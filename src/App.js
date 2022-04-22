import React from 'react';
import "./style/style.css";
import Header from "./component/header/Header";
import NavBar from "./component/navBar/NavBar";
import 'antd/dist/antd.css';
import Router from "./router/Router";

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