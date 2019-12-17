import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';


export class AddDirection extends Component {
    static displayName = AddDirection.name;

    constructor(props) {
        super(props);

        this.state = {
            institutes: [],
            selectedInstitute:[],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.InstitutesData();
    }

    renderDirection() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <label>Название</label>
                            <input name="name" />
                            <label>Институт</label>
                            <Select
                                labelField="name"
                                valueField={"idDirection"}
                                options={this.state.institutes}
                                onChange={value =>
                                    this.state.selectedInstitute = value
                                }
                            />
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
            let contents = this.renderDirection();

            return (
                <div>
                    <h1 id="tabelLabel">Направление</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async InstitutesData() {
        var response = await fetch('api/TblInstitutes');
        var data = await response.json();
        this.setState({ institutes: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        fetch('api/TblDirections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                instituteId: this.state.selectedInstitute[0].idInstitute,
                name: event.target.elements.name.value
            })
        }).then(this.props.history.push("/directions"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/directions");
    }
}