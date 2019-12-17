import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';



export class EditAuthor extends Component {
    static displayName = EditAuthor.name;

    constructor(props) {
        super(props);
        this.state = {
            author: [],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.AuthorData();
    }

    renderAuthor() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idAuthor" hidden defaultValue={this.state.author.idAuthor} />
                            <label>Имя</label>
                            <input name="name" defaultValue={this.state.author.name} />
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
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : this.renderAuthor();

            return (
                <div>
                    <h1 id="tabelLabel">Автор</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async AuthorData() {
        var idAuthor = this.props.match.params["idAuthor"];
        var response = await fetch('api/TblAuthors/'+idAuthor);
        var data = await response.json();
        this.setState({ author: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idAuthor = event.target.elements.idAuthor.value;
        fetch('api/TblAuthors/' + idAuthor, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idAuthor: idAuthor,
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/authors"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/authors");
    }
}