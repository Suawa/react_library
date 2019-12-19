import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)


export class AddRecord extends Component {
    static displayName = AddRecord.name;

    constructor(props) {
        super(props);

        this.state = {
            record: [],
            students: [],
            books: [],
            selectedStudent: [],
            selectedBook: [],
            loadingR: true,
            loadingS: true,
            loadingB: true,
            loadingW: true,
            dateOfIssue: new Date(),
            dateOfReturnP: new Date(),
            dateOfReturnF: new Date()
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.RecordData();
        this.StudentsData();
        this.BooksData();
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
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <label>Студент</label>
                            <Select
                                labelField="fullName"
                                valueField={"idStudent"}
                                options={this.state.students}
                                onChange={value =>
                                    this.state.selectedStudent = value
                                }
                            />
                            <label>Книга</label>
                            <Select
                                labelField="name"
                                valueField={"idBook"}
                                options={this.state.books}
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
                            <input name="ISBN" />
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


    FuncSave(event) {
        event.preventDefault();
        fetch('api/TblRecords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentId: this.state.selectedStudent[0].idStudent,
                bookId: this.state.selectedBook[0].idBook,
                workerId: cookie.load("workerId"),
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