import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';



export class EditGenre extends Component {
    static displayName = EditGenre.name;

    constructor(props) {
        super(props);
        this.state = {
            genre: [],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.GenreData();
    }

    renderGenre() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idGenre" hidden defaultValue={this.state.genre.idGenre} />
                            <label>Название</label>
                            <input name="name" defaultValue={this.state.genre.name} />
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
                : this.renderGenre();

            return (
                <div>
                    <h1 id="tabelLabel">Жанры</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async GenreData() {
        var idGenre = this.props.match.params["idGenre"];
        var response = await fetch('api/TblGenres/' + idGenre);
        var data = await response.json();
        this.setState({ genre: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idGenre = event.target.elements.idGenre.value;
        fetch('api/TblGenres/' + idGenre, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idGenre: idGenre,
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/genres"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/genres");
    }
}