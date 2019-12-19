import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Moment from 'moment';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class TableStudent extends Component {
    static displayName = TableStudent.name;

    constructor(props) {
        super(props);
        this.state = { students: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateStudentsData();
    }

    renderStudents(students) {

        const Export = () => {
            return (
                <ExcelFile filename={"Студенты " + new Date().toLocaleDateString()} element={<button className="btn exportBtn">Экспорт в Excel</button>}>
                    <ExcelSheet data={this.state.students} name="Студенты">
                        <ExcelColumn label="Номер студента" value="idStudent" />
                        <ExcelColumn label="Имя" value="fullName" />
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
                            <th>Номер студента</th>
                            <th>Имя</th>
                            <th>Группа</th> 
                            <th>Телефон</th>
                            <th>Номер СБ</th> 
                            <th>Дата выдачи СБ</th> 
                            <th>Номер ЧБ</th> 
                            <th>Дата выдачи ЧБ</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(student =>
                                <tr key={student.idStudent}>
                                    <td>{student.idStudent}</td>
                                    <td>{student.fullName}</td>
                                    <td>{student.group.name}</td>
                                    <td>{student.telephone}</td>
                                    <td>{student.csNumber}</td>
                                    <td>{Moment(student.dateCs).format('DD/MM/YYYY')}</td>
                                    <td>{student.crNumber}</td>
                                    <td>{Moment(student.dateCr).format('DD/MM/YYYY')}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(student.idStudent)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(student.idStudent)}>Редактировать</a></td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <Export/>
            </div>
        );
    }

    render() {
        console.log(this.state.students);

        if (cookie.load('workerId')) {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderStudents(this.state.students);

            return (
                <div>
                    <h1 id="tabelLabel">Студенты</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateStudentsData() {
        const response = await fetch('api/TblStudents');
        const data = await response.json();
        this.setState({ students: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblStudents/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого направления есть группы, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/student/edit/"+id);
    }


}