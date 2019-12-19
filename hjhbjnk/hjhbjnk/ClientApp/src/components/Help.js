import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from './Main';


import './styles.css';

export class Help extends Component {
    static displayName = Help.name;

    render() {
        return (
            <div>
                <Main />
                <h1>Здесь должна находиться справочная информация по использованию данного веб-приложения</h1>
            </div>
        );
    }
}