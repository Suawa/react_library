import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class TableBook extends Component {
    static displayName = TableBook.name;

    constructor(props) {
        super(props);
        this.state = { books: [], booksWithPubNames:[], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateBooksData();
    }

    renderBooksTable(books) {

        const Export = () => {
            return (
                <ExcelFile filename={"Книги " + new Date().toLocaleDateString()} element={<button className="btn exportBtn">Экспорт в Excel</button>}>
                    <ExcelSheet data={this.state.booksWithPubNames} name="Книги">
                        <ExcelColumn label="Номер книги" value="idBook" />
                        <ExcelColumn label="Издатель" value="publisherName" />
                        <ExcelColumn label="Название" value="name" />
                        <ExcelColumn label="Год" value="year" />
                        <ExcelColumn label="Число" value="count" />
                    </ExcelSheet>
                </ExcelFile >
            );
        }

        return (
            <div className="mainDiv">
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер книги</th>
                            <th>Издатель</th>
                            <th>Название</th>
                            <th>Год</th>
                            <th>Число</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map(book =>
                                <tr key={book.idBook}>
                                    <td>{book.idBook}</td>
                                    <td>{book.publisher.name}</td>
                                    <td>{book.name}</td>
                                    <td>{book.year}</td>
                                    <td>{book.count}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(book.idBook)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(book.idBook)}>Редактировать</a></td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <Export />
            </div>
        );
    }

    render() {
        if (cookie.load('workerId')) {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderBooksTable(this.state.books);

            return (
                <div>
                    <h1 id="tabelLabel">Книги</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />}
    }

    async populateBooksData() {
        const response = await fetch('api/TblBooks');
        const data = await response.json();
        this.setState({ books: data, loading: false });

        this.state.books = this.state.books
            .forEach(book => this.state.booksWithPubNames
                .push({
                    idBook: book.idBook,
                    publisherName: book.publisher.name,
                    name: book.name,
                    year: book.year,
                    count: book.count
                }));
    }

    FuncDelete(id) {
        fetch('api/TblBooks/' + id, {
            method: 'delete'
        }).then(document.location.reload(true));
    }

    FuncEdit(id) {
        this.props.history.push("/book/edit/"+id);
    }


}