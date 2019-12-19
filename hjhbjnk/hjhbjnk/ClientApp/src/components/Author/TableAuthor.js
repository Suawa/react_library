import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import ReactExport from "react-data-export";
import deleteIcon from '../deleteIcon.png';
import editIcon from '../editIcon.png';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

        const Export = () => {
            return (
                <ExcelFile element={<button className="btn exportBtn">Экспорт в Excel</button>}>
                    <ExcelSheet data={this.state.authors} name="Авторы">
                        <ExcelColumn label="Номер автора" value="idAuthor" />
                        <ExcelColumn label="Имя" value="name" />
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
                            <th>Номер автора</th>
                            <th>Имя</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authors.map(author =>
                                <tr key={author.idAuthor}>
                                    <td>{author.idAuthor}</td>
                                    <td>{author.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(author.idAuthor)}>
                                        <img src={deleteIcon} width={20,20} />
                                    </a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(author.idAuthor)}>
                                        <img src={editIcon} width={20, 20} />
                                    </a></td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <Export/>
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