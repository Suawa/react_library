import React, { Component } from 'react';
import './styles.css';
export class Signup extends Component {
    static displayName = Signup.name;

    render() {
        return (
            <div className="logindiv">
                <a className="tempLS">Регистрация</a>
                <div className="logincontent">
                    <label className="labelname">E-mail</label>
                    <input type="text"></input>
                    <p />
                    <label className="labelname">Пароль</label>
                    <input type="text"></input>
                    <p />
                    <button>Регистрация</button>
                </div>
            </div>
        );
    }
}