import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export class AddPost extends Component {
    static displayName = AddPost.name;

    constructor(props) {
        super(props);

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    renderPost() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <label>Название</label>
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
            let contents = this.renderPost();

            return (
                <div>
                    <h1 id="tabelLabel">Должность</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    FuncSave(event) {
        event.preventDefault();

        fetch('api/TblPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/posts"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/posts");
    }
}