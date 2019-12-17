import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'


export class TableAuthor extends Component {
    static displayName = TableAuthor.name;

    constructor(props) {
        super(props);
        this.state = { authors: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateAuthorsData();
    }

    renderAuthorsTable(authors) {
        return (
            <div>
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер автора</th>
                            <th>Имя</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authors.map(author =>
                                <tr key={author.idAuthor}>
                                    <td>{author.idAuthor}</td>
                                    <td>{author.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(author.idAuthor)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(author.idAuthor)}>Редактировать</a></td>
                                </tr>
                            )}
                    </tbody>
                </table>

            </div>
        );
    }

    render() {
        if (cookie.load('workerId')) {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderAuthorsTable(this.state.authors);

            return (
                <div>
                    <h1 id="tabelLabel">Авторы</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateAuthorsData() {
        const response = await fetch('api/TblAuthors');
        const data = await response.json();
        this.setState({ authors: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblAuthors/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого автора есть книги, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/author/edit/"+id);
    }


}