require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import Main from './views/Main';

function App(props) {
    return (
        <BrowserRouter>
            <Route path='/' component={Main}/>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
