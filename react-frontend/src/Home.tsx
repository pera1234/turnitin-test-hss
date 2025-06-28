import React, { FC } from 'react';
import './App.css';
import turnitinLogo from './turnitin-logo.png';

const Home: FC<any> = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={turnitinLogo} alt='logo' />
                <div>
                    <p>Welcome to the Turnitin Test.</p>
                    <p>Please select a menu item.</p>
                </div>
            </header>
        </div>
    );
}

export default Home;
