import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export class AddStudent extends Component {
    static displayName = AddStudent.name;

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            selectedGroup:[],
            loading: true,
            dateCs: new Date(),
            dateCr: new Date()
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);


    }

    handleChangeCr = date => {
        this.setState({
            dateCr: date
        });
    };

    handleChangeCs = date => {
        this.setState({
            dateCs: date
        });
    };

    componentDidMount() {
        this.GroupsData();
    }

    renderStudent() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <label>Имя</label>
                            <input name="fullName" />
                            <label>Институт</label>
                            <Select
                                labelField="name"
                                valueField={"idStudent"}
                                options={this.state.groups}
                                onChange={value =>
                                    this.state.selectedGroup = value
                                }
                            />
                            <label>Телефон</label>
                            <input name="telephone" />

                            <label>Номер билета студенческого</label>
                            <input name="csNumber" />

                            <label>Дата выдачи студенческого билета</label>
                            <DatePicker selected={this.state.dateCs} onChange={this.handleChangeCs} name="dateCs" />

                            <label>Номер билета читательского</label>
                            <input name="crNumber" />

                            <label>Дата выдачи студенческого билета</label>
                            <DatePicker selected={this.state.dateCr} onChange={this.handleChangeCr} name="dateCr" />

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
            let contents = this.renderStudent();

            return (
                <div>
                    <h1 id="tabelLabel">Студент</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async GroupsData() {
        var response = await fetch('api/TblGroups');
        var data = await response.json();
        this.setState({ groups: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        fetch('api/TblStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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