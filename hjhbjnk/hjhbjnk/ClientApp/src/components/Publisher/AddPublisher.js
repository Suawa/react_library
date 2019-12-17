import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export class AddPublisher extends Component {
    static displayName = AddPublisher.name;

    constructor(props) {
        super(props);

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    renderPublisher() {
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
            let contents = this.renderPublisher();

            return (
                <div>
                    <h1 id="tabelLabel">Издательство</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    FuncSave(event) {
        event.preventDefault();

        fetch('api/TblPublishers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/publishers"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/publishers");
    }
}