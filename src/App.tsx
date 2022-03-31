import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Affix, Layout, Menu } from 'antd';
import './App.css';
import Home from './pages/Home';
import Comparison from './pages/Comparison';

const { Header } = Layout;

interface IApp {

}
const App: React.FC<IApp> = (props) => {
    return (
        <div className="App">
            <Affix>
                <Header style={{background: 'white', padding: 0}}>
                    <Menu style={{padding:'0 50px'}}selectedKeys={['/']} mode="horizontal">
                        <Menu.Item>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/compare">Comparison</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
            </Affix>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="compare" element={<Comparison />} />
            </Routes>
        </div>
  );
}

export default App;
