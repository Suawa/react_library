import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from './Main';


import './styles.css';

export class Report extends Component {
    static displayName = Report.name;

    render() {
        return (
            <div>
                <Main />
                <a className='temp'>Отчеты</a>
            </div>
        );
    }
}