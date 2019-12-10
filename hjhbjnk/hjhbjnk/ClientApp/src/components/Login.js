import React, { Component } from 'react';
import './styles.css';
export class Login extends Component {
    static displayName = Login.name;

    render() {
        return (
            <div className="logindiv">
                <a className="tempLS">Вход</a>
                <div className="logincontent">
                    <label className="labelname">Логин</label>
                <input type="text"></input>
                <p/>
                    <label className="labelname">Пароль</label>
                <input type="text"></input>
                <p />
                    <button>Вход</button>
                    </div>
            </div>
        );
    }
}