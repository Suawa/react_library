import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class TableGenre extends Component {
    static displayName = TableGenre.name;

    constructor(props) {
        super(props);
        this.state = { genres: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateGenresData();
    }

    renderGenres(genres) {

        const Export = () => {
            return (
                <ExcelFile filename={"Жанры " + new Date().toLocaleDateString()} element={<button className="btn exportBtn">Экспорт в Excel</button>}>
                    <ExcelSheet data={this.state.genres} name="Жанры">
                        <ExcelColumn label="Номер жанра" value="idGenre" />
                        <ExcelColumn label="Название" value="name" />
                    </ExcelSheet>
                </ExcelFile >
            );
        }

        return (
            <div>
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер жанра</th>
                            <th>Название</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            genres.map(genre =>
                                <tr key={genre.idGenre}>
                                    <td>{genre.idGenre}</td>
                                    <td>{genre.name}</td>
                                    <td><a className="action" onClick={(id)=>this.FuncDelete(genre.idGenre)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) =>this.FuncEdit(genre.idGenre)}>Редактировать</a></td>
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
                : this.renderGenres(this.state.genres);

            return (
                <div>
                    <h1 id="tabelLabel">Жанры</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateGenresData() {
        const response = await fetch('api/TblGenres');
        const data = await response.json();
        this.setState({ genres: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblGenres/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого жанра есть книги, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/genre/edit/"+id);
    }


}