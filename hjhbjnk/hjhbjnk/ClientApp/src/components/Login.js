import React, { Component } from 'react';
import './styles.css';
import cookie from 'react-cookies';

export class Login extends Component {
    static displayName = Login.name;

    constructor() {
        super();
        this.onLogout = this.onLogout.bind(this);
        this.WorkerDataCheck = this.WorkerDataCheck.bind(this);
    }

    onLogout() {
        cookie.remove('workerId', { path: '/' });
    }

    async WorkerDataCheck(event) {
        event.preventDefault();
        var currentTarget = event.target;
        var idWorker = currentTarget.elements.idWorker.value;
        var password = currentTarget.elements.password.value;
        try {
            var response = await fetch('api/TblWorkers/' + idWorker);
            var data = await response.json();
            console.log(data);
            console.log(data.password);
            console.log(idWorker);
            console.log(password);
            if (data.password == password) {
                cookie.save('workerId', idWorker, { path: '/' });
                cookie.save('workerName', data.fullName, { path: '/' });
                cookie.save('isAdmin', data.isAdmin, { path: '/' });
                this.props.history.push("/books");
                console.log(cookie.load('workerName'));
            }
            else {
                alert("Логин или пароль неверны!");
            }
        }
        catch{ alert("Логин или пароль неверны!");}
    }

    render() {
        if (cookie.load('workerId')) {
            this.props.history.push("/books");
        }
        else {
            return (
                <div className="logindiv">
                    <form onSubmit={this.WorkerDataCheck}>
                        <a className="tempLS">Вход</a>
                        <div className="logincontent">
                            <label className="labelname">Логин</label>
                            <input name="idWorker" type="text"></input>
                            <p />
                            <label className="labelname">Пароль</label>
                            <input name="password" type="text"></input>
                            <p />
                            <button type="submit">Вход</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}