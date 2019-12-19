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


export class EditStudent extends Component {
    static displayName = EditStudent.name;

    constructor(props) {
        super(props);
        this.state = {
            student: [],
            groups: [],
            selectedGroup: [],
            loading: true,
            dateCs: new Date(),
            dateCr: new Date(),
            countKostil: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.StudentData();
        this.GroupsData();
    }

    handleChangeCr = date => {
        this.setState({
            dateCr: date,
            countKostil:false
        });
    };

    handleChangeCs = date => {
        this.setState({
            dateCs: date,
            countKostil:false
        });
    };

    renderStudent() {
        if (this.state.countKostil) {
            Moment.locale('en');
            const tempDateCr = Moment(this.state.student.dateCr).toDate();
            const tempDateCs = Moment(this.state.student.dateCs).toDate();
            this.state.dateCr = tempDateCr;
            this.state.dateCs = tempDateCs;
        }
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idStudent" hidden defaultValue={this.state.student.idStudent} />
                            <label>Имя</label>
                            <input name="fullName" defaultValue={this.state.student.fullName} />
                            <label>Институт</label>
                            <Select
                                labelField="name"
                                valueField={"idStudent"}
                                options={this.state.groups}
                                values={this.state.groups.filter(group => group.idGroup == this.state.student.groupId)}
                                onChange={value =>
                                    this.state.selectedGroup = value
                                }
                            />

                            <label>Телефон</label>
                            <input name="telephone" defaultValue={this.state.student.telephone} />

                            <label>Номер билета студенческого</label>
                            <input name="csNumber" defaultValue={this.state.student.csNumber}/>

                            <label>Дата выдачи студенческого билета</label>
                            <DatePicker selected={this.state.dateCs} onChange={this.handleChangeCs} name="dateCs" locale="ru" />

                            <label>Номер билета читательского</label>
                            <input name="crNumber" defaultValue={this.state.student.crNumber}/>

                            <label>Дата выдачи студенческого билета</label>
                            <DatePicker selected={this.state.dateCr} onChange={this.handleChangeCr} name="dateCr" locale="ru"/>

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
                : this.renderStudent();

            return (
                <div>
                    <h1 id="tabelLabel">Студент</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async StudentData() {
        var idStudent = this.props.match.params["idStudent"];
        var response = await fetch('api/TblStudents/' + idStudent);
        var data = await response.json();
        this.setState({ student: data, loading: false });
    }

    async GroupsData() {
        var response = await fetch('api/TblGroups');
        var data = await response.json();
        this.setState({ groups: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idStudent = event.target.elements.idStudent.value;
        fetch('api/TblStudents/' + idStudent, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idStudent: idStudent,
                groupId: this.state.selectedGroup[0].idGroup,
                fullName: event.target.elements.fullName.value,
                telephone: event.target.elements.telephone.value,
                csNumber: event.target.elements.csNumber.value,
                dateCs: event.target.elements.dateCs.value,
                crNumber: event.target.elements.crNumber.value,
                dateCr: event.target.elements.dateCr.value
            })
        }).then(this.props.history.push("/students"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/students");
    }
}