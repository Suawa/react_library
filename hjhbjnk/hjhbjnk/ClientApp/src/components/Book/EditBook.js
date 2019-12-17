import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../Main';
import Select from 'react-dropdown-select';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'



export class EditBook extends Component {
    static displayName = EditBook.name;

    constructor(props) {
        super(props);
        this.state = {
            book: [],
            authors: [],
            genres: [],
            publishers: [],
            loading: true,
            selectedAuthors: [],
            defaultAuthors: [],
            selectedGenres: [],
            defaultGenres: [],
            selectedPublishers: [],
            defaultPublishers: []
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);

    }

    componentDidMount() {
        this.BookData();
        this.AuthorsData();
        this.GenresData();
        this.PublishersData();
    }

    renderBookTable() {
        const Multi = ({ options, valueId, defaultValue, selectType }) => (
            <React.Fragment>
                <Select
                    multi
                    required
                    labelField="name"
                    valueField={valueId}
                    options={options}
                    defaultValue={defaultValue}
                    values={defaultValue}
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
                <Main />
                <div className="content">
                {
                    this.state.book.map(s_book =>
                    <form onSubmit={this.FuncSave}>             
                        <input name="idBook" type="hidden" value={s_book.idBook} />
                            <p />
                            <label>Издатель</label>
                            <Select
                                required
                                labelField="name"
                                valueField={"idPublisher"}
                                options={this.state.publishers}
                                defaultValue={this.state.defaultPublishers = this.state.selectedPublishers = this.state.publishers.filter(publisher => publisher.idPublisher == s_book.publisherId ? publisher : null)}
                                values={this.state.defaultPublishers = this.state.selectedPublishers = this.state.publishers.filter(publisher => publisher.idPublisher == s_book.publisherId ? publisher : null)}
                                onChange={value =>
                                        this.state.selectedPublishers = value
                                }
                            />
                            <label>Авторы</label>
                            <Multi
                            multi
                                options={this.state.authors}
                                valueId="idAuthor"
                                selectType={0}
                                defaultValue={this.state.defaultAuthors = this.state.selectedAuthors = this.state.authors.filter(author => s_book.tblBookAuthor.map(a => a.authorId).includes(author.idAuthor) ? author : null)} />
                            <label>Жанры</label>
                            <Multi
                            multi
                                options={this.state.genres}
                                valueId="idGenre"
                                selectType={1}
                                defaultValue={this.state.defaultGenres = this.state.selectedGenres = this.state.genres.filter(genre => s_book.tblBookGenre.map(g => g.genreId).includes(genre.idGenre) ? genre : null)} />
                            <p />
                            <label>Название</label>
                        <input name="name" defaultValue={s_book.name} />
                            <p />
                            <label>Год</label>
                        <input name="year" defaultValue={s_book.year} />
                            <p />
                            <label>Количество</label>
                        <input name="count" defaultValue={s_book.count} />
                        <p />
                        <button type="submit" >Сохранить</button>
                        <button onClick={this.FuncCancel}>Отмена</button>
                        </form>
                        )
                    }
                </div>
            </div>
        )
    }

    render() {
        if (cookie.load('workerId')) {
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : this.renderBookTable(this.state.book);

            return (
                <div>
                    <h1 id="tabelLabel">Книга</h1>
                    {contents}
                </div>
            );
        }
        else {
            return <Redirect to='/Login' />;
        }
    }

    async BookData() {
        var idBook = this.props.match.params["idBook"];
        var response = await fetch('api/TblBooks/' + idBook);
        var data = await response.json();
        this.setState({ book: data, loading: false });
    }

    async AuthorsData() {
        var response = await fetch('api/TblAuthors');
        var data = await response.json();
        this.setState({ authors: data, loading: false });
    }

    async PublishersData() {
        var response = await fetch('api/TblPublishers');
        var data = await response.json();
        this.setState({ publishers: data, loading: false });
    }

    async GenresData() {
        var response = await fetch('api/TblGenres');
        var data = await response.json();
        this.setState({ genres: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();

        var idBook = this.props.match.params["idBook"];

        //авторы для удаления
        var authorsToDelete = this.state.defaultAuthors;
        var removeTo = this.state.selectedAuthors;
        authorsToDelete = authorsToDelete.filter(function (el) {
            return !removeTo.includes(el);
        });

        var authorsDeleteJSON = new Array();
        authorsToDelete.forEach(a => authorsDeleteJSON.push({ bookId: idBook, authorId: a.idAuthor }));
        var authorsDeleteJSON = JSON.stringify(authorsDeleteJSON);
        //авторы для добавления
        var authorsToPost = this.state.selectedAuthors;
        var removeTo = this.state.defaultAuthors;
        authorsToPost = authorsToPost.filter(function (el) {
            return !removeTo.includes(el);
        });

        var authorsPostJSON = new Array();
        authorsToPost.forEach(a => authorsPostJSON.push({ bookId: idBook, authorId: a.idAuthor }));
        var authorsPostJSON = JSON.stringify(authorsPostJSON);
        //жанры для удаления
        var genresToDelete = this.state.defaultGenres;
        var removeTo = this.state.selectedGenres;
        genresToDelete = genresToDelete.filter(function (el) {
            return !removeTo.includes(el);
        });

        var genresDeleteJSON = new Array();
        genresToDelete.forEach(a => genresDeleteJSON.push({ bookId: idBook, genreId: a.idGenre }));
        var genresDeleteJSON = JSON.stringify(genresDeleteJSON);
        //жанры для добавления
        var genresToPost = this.state.selectedGenres;
        var removeTo = this.state.defaultGenres;
        genresToPost = genresToPost.filter(function (el) {
            return !removeTo.includes(el);
        });

        var genresPostJSON = new Array();
        genresToPost.forEach(a => genresPostJSON.push({ bookId: idBook, genreId: a.idGenre }));
        var genresPostJSON = JSON.stringify(genresPostJSON);


        console.log(this.state.defaultPublishers[0].idPublisher);

        if (idBook != null) {
            //обновление книги
            fetch('api/TblBooks/' + idBook, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idBook: event.target.elements.idBook.value,
                    publisherId: this.state.selectedPublishers.length == 0 ? this.state.defaultPublishers[0].idPublisher : this.state.selectedPublishers[0].idPublisher,
                    name: event.target.elements.name.value,
                    year: event.target.elements.year.value,
                    count: event.target.elements.count.value
                })
            });    
            //добавление новых жанров если они есть
            fetch('api/TblBookGenres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: genresPostJSON
            });
            //удаление жанров если их количество уменьшилось
            fetch('api/TblBookGenres', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: genresDeleteJSON
            });
            //добавление авторов если они есть
            fetch('api/TblBookAuthors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: authorsPostJSON
            });
        //удаление авторов
            fetch('api/TblBookAuthors', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: authorsDeleteJSON
            }).then(this.props.history.push("/books"));
        }
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/books");
    }
}