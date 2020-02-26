import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Moment from 'moment';
import ReactExport from "react-data-export";
import { Link } from 'react-router-dom';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class TableRecord extends Component {
    static displayName = TableRecord.name;

    constructor(props) {
        super(props);
        this.state = { records: [], recordsWithNames:[], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
        this.resetLoading = this.resetLoading.bind(this);


    }

    componentDidMount() {
        this.populateRecordsData();
    }

    renderRecords(records) {

        const Export = () => {
            return (
                <ExcelFile filename={"Записи " + new Date().toLocaleDateString()} element={<button className="btn exportBtn">Экспорт в Excel</button>}>
                    <ExcelSheet data={this.state.recordsWithNames} name="Книги">
                        <ExcelColumn label="Номер записи" value="idRecord" />
                        <ExcelColumn label="Студент" value="studentName" />
                        <ExcelColumn label="Книга" value="bookName" />
                        <ExcelColumn label="Работник" value="workerName" />
                        <ExcelColumn label="Дата выдачи" value="dateOfIssue" />
                        <ExcelColumn label="Дата возврата план" value="dateOfIssueP" />
                        <ExcelColumn label="Дата возврата факт" value="dateOfIssueF" />
                        <ExcelColumn label="ISBN" value="isbn" />
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
                            <th>Номер записи</th>
                            <th>Студент</th>
                            <th>Книга</th>
                            <th>Работник</th>
                            <th>Дата выдачи</th>
                            <th>Дата возврата план</th>
                            <th>Дата возврата факт</th>
                            <th>ISBN</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map(record =>
                                <tr key={record.idRecord}>
                                    <td>{record.idRecord}</td>
                                    <td>{record.student.fullName}</td>
                                    <td>{record.book.name}</td>
                                    <td>{record.worker.fullName}</td>
                                    <td>{Moment(record.dateOfIssue).format('DD/MM/YYYY')}</td>
                                    <td>{Moment(record.dateOfIssueP).format('DD/MM/YYYY')}</td>
                                    <td>{Moment(record.dateOfIssueF).format('DD/MM/YYYY')}</td>
                                    <td>{record.isbn}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(record.idRecord)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(record.idRecord)}>Редактировать</a></td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <Link to="/record/add">
                    <button onClick={() => this.resetLoading()} className="btn">Добавить</button>
                </Link>
                <Export/>
            </div>
        );
    }

    render() {
        if (cookie.load('workerId')) {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderRecords(this.state.records);

            return (
                <div>
                    <h1 id="tabelLabel">Записи</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateRecordsData() {
        const response = await fetch('api/TblRecords');
        const data = await response.json();
        this.setState({ records: data, loading: false });

        this.state.records = this.state.records
            .forEach(record => this.state.recordsWithNames
                .push({
                    idRecord: record.idRecord,
                    studentName: record.student.fullName,
                    bookName: record.book.name,
                    workerName: record.worker.fullName,
                    dateOfIssue: Moment(record.dateOfIssue).format('DD/MM/YYYY'),
                    dateOfIssueP: Moment(record.dateOfIssueP).format('DD/MM/YYYY'),
                    dateOfIssueF: Moment(record.dateOfIssueF).format('DD/MM/YYYY'),
                    isbn: record.isbn
                }));

    }

    FuncDelete(id) {
        const conf = window.confirm("Вы точно хотите удалить эту запись?");
        if (conf) {
            try {

                fetch('api/TblRecords/' + id, {
                    method: 'delete'
                }).then(document.location.reload(true));
            }

            catch{ alert("У этого направления есть группы, сначала удалите их!") }
        }
    }

    FuncEdit(id) {
        this.resetLoading();
        this.props.history.push("/record/edit/"+id);
    }

    resetLoading() {
        this.setState({ loading: true });
    }
}