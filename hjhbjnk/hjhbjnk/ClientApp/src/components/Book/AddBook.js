import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../Main';
import Select from 'react-dropdown-select';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';



export class AddBook extends Component {
    static displayName = AddBook.name;

    constructor(props) {
        super(props);
        this.state = {
            publishers: [],
            authors: [],
            genres: [],
            loading: true,
            selectedAuthors: [],
            selectedGenres: [],
            selectedPublisher: []
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);

    }

    componentDidMount() {
        this.AuthorsData();
        this.GenresData();
        this.PublishersData();
    }

    renderBookTable() {
        const Multi = ({ options, valueId, selectType }) => (
            <React.Fragment>
                <Select
                    multi
                    labelField="name"
                    valueField={valueId}
                    options={options}
                    onChange={value => {
                        if (selectType == 0) {
                            this.state.selectedAuthors = value;
                        }
                        else {
                            this.state.selectedGenres = value;
                        }
                    }
                    }
        />
            </React.Fragment>
        );
        //че это
        Multi.propTypes = {};

        return (
            <div>
                <Main/> 
                <div className="content">
                {
                    <form onSubmit={this.FuncSave}>             
                            <p />
                            <label>Издатель</label>
                            <Select
                                required
                                labelField="name"
                                valueField={"idPublisher"}
                                options={this.state.publishers}
                                onChange={value =>
                                    this.state.selectedPublisher = value
                                }
                            />
                            <label>Авторы</label>
                            <Multi
                            multi
                                options={this.state.authors}
                                valueId="idAuthor"
                                selectType={0} />
                            <label>Жанры</label>
                            <Multi
                            multi
                                options={this.state.genres}
                                valueId="idGenre"
                                selectType={1}/>
                            <p />
                            <label>Название</label>
                        <input name="name"/>
                            <p />
                            <label>Год</label>
                        <input name="year"/>
                            <p />
                            <label>Количество</label>
                        <input name="count"/>
                        <p />
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
                : this.renderBookTable();

            return (
                <div>
                    <h1 id="tabelLabel">Книга</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    //разобраться с ответом api для возвращения id новой книги, вернуть id, скомпановать массивы с жанрами и авторами для отправки 

    async PublishersData() {
        var response = await fetch('api/TblPublishers');
        var data = await response.json();
        this.setState({ publishers: data, loading: false });
    }

    async AuthorsData() {
        var response = await fetch('api/TblAuthors');
        var data = await response.json();
        this.setState({ authors: data, loading: false });
    }

    async GenresData() {
        var response = await fetch('api/TblGenres');
        var data = await response.json();
        this.setState({ genres: data, loading: false });
    }

    async FuncSave(event) {
        event.preventDefault();

        let response = await fetch('api/TblBooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                publisherId: this.state.selectedPublisher[0].idPublisher,
                name: event.target.elements.name.value,
                year: event.target.elements.year.value,
                count: event.target.elements.count.value
            })
        });
        let data = await response.json();
        console.log(data.idBook);
        var idBook = data.idBook;
        
        //авторы для добавления
        var authorsToPost = this.state.selectedAuthors;

        var authorsPostJSON = new Array();
        authorsToPost.forEach(a => authorsPostJSON.push({ bookId: idBook, authorId: a.idAuthor }));
        var authorsPostJSON = JSON.stringify(authorsPostJSON);

        //жанры для добавления
        var genresToPost = this.state.selectedGenres;

        var genresPostJSON = new Array();
        genresToPost.forEach(a => genresPostJSON.push({ bookId: idBook, genreId: a.idGenre }));
        var genresPostJSON = JSON.stringify(genresPostJSON);

        fetch('api/TblBookAuthors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: authorsPostJSON
        });

        fetch('api/TblBookGenres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: genresPostJSON
        }).then(this.props.history.push("/books"));

    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/books");
    }
}