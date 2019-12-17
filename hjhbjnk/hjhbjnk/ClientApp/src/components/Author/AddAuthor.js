import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export class AddAuthor extends Component {
    static displayName = AddAuthor.name;

    constructor(props) {
        super(props);

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    renderAuthor() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <label>Имя</label>
                            <input name="name" />
                            <button type="submit" >Сохранить</button>
                            <button onClick={this.FuncCancel}>Отмена</button>
                        </form>
                    }
                </div>
            </div>
        )
    }

    render() {
        if (cookie.load('workerId')) {
            let contents = this.renderAuthor();

            return (
                <div>
                    <h1 id="tabelLabel">Автор</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    FuncSave(event) {
        event.preventDefault();

        fetch('api/TblAuthors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/authors"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/authors");
    }
}