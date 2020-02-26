import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Moment from 'moment';

import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)


export class EditRecord extends Component {
    static displayName = EditRecord.name;

    constructor(props) {
        super(props);
        this.state = {
            record: [],
            students: [],
            books: [],
            workers: [],
            selectedStudent: [],
            selectedBook: [],
            selectedWorker: [],
            loadingR: true,
            loadingS: true,
            loadingB: true,
            loadingW: true,
            dateOfIssue: new Date(),
            dateOfReturnP: new Date(),
            dateOfReturnF: new Date(),
            countKostil: true

        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.RecordData();
        this.StudentsData();
        this.BooksData();
        this.WorkersData();
    }


    handleChangeDOI = date => {
        this.setState({
            dateOfIssue: date,
            countKostil: false
        });
    };

    handleChangeDORP = date => {
        this.setState({
            dateOfReturnP: date,
            countKostil: false
        });
    };

    handleChangeDORF = date => {
        this.setState({
            dateOfReturnF: date,
            countKostil: false
        });
    };

    renderRecord() {
        if (this.state.countKostil) {
            Moment.locale('en');
            const tempDOI = Moment(this.state.record.dateOfIssue).toDate();
            const tempDORP = Moment(this.state.record.dateOfIssueP).toDate();
            const tempDORF = Moment(this.state.record.dateOfIssueF).toDate();
            this.state.dateOfIssue = tempDOI;
            this.state.dateOfReturnP = tempDORP;
            this.state.dateOfReturnF = tempDORF;
        }

        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idRecord" hidden defaultValue={this.state.record.idRecord} />
                            <label>Работник</label>
                            <input name="fullNameWorker" readOnly defaultValue={this.state.workers
                                .filter(worker => worker.idWorker == this.state.record.workerId)
                                .map(x => x.fullName)[0]} />
                            <label>Студент</label>
                            <Select
                                labelField="fullName"
                                valueField={"idStudent"}
                                options={this.state.students}
                                values={this.state.students.filter(student => student.idStudent == this.state.record.studentId)}
                                onChange={value =>
                                    this.state.selectedStudent = value
                                }
                            />
                            <label>Книга</label>
                            <Select
                                labelField="name"
                                valueField={"idBook"}
                                options={this.state.books}
                                values={this.state.books.filter(book => book.idBook == this.state.record.bookId)}
                                onChange={value =>
                                    this.state.selectedBook = value
                                }
                            />
                            <label>Дата выдачи</label>
                            <DatePicker selected={this.state.dateOfIssue} onChange={this.handleChangeDOI} name="DOI" locale="ru" />
                            <label>Дата возврата факт</label>
                            <DatePicker selected={this.state.dateOfReturnP} onChange={this.handleChangeDORP} name="DORP" locale="ru" />
                            <label>Дата возврата план</label>
                            <DatePicker selected={this.state.dateOfReturnF} onChange={this.handleChangeDORF} name="DORF" locale="ru" />
                            <label>ISBN</label>
                            <input name="ISBN" defaultValue={this.state.record.isbn} />
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
            let contents = this.state.loadingR && this.state.loadingS && this.state.loadingB && this.state.loadingW
                ? <p><em>Загрузка...</em></p>
                : this.renderRecord();

            return (
                <div>
                    <h1 id="tabelLabel">Запись</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async RecordData() {
        var idRecord = this.props.match.params["idRecord"];
        var response = await fetch('api/TblRecords/' + idRecord);
        var data = await response.json();
        this.setState({ record: data, loadingR: false });
    }

    async StudentsData() {
        var response = await fetch('api/TblStudents');
        var data = await response.json();
        this.setState({ students: data, loadingS: false });
    }

    async BooksData() {
        var response = await fetch('api/TblBooks');
        var data = await response.json();
        this.setState({ books: data, loadingB: false });
    }

    async WorkersData() {
        var response = await fetch('api/TblWorkers');
        var data = await response.json();
        this.setState({ workers: data, loadingW: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idRecord = event.target.elements.idRecord.value;
        fetch('api/TblRecords/' + idRecord, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRecord: idRecord,
                studentId: this.state.selectedStudent[0].idStudent,
                bookId: this.state.selectedBook[0].idBook,
                dateOfIssue: event.target.elements.DOI.value,
                dateOfIssueP: event.target.elements.DORP.value,
                dateOfIssueF: event.target.elements.DORF.value,
                isbn: event.target.elements.ISBN.value
            })
        }).then(this.props.history.push("/records"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/records");
    }
}