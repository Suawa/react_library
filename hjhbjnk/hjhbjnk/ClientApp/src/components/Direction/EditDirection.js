import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';


export class EditDirection extends Component {
    static displayName = EditDirection.name;

    constructor(props) {
        super(props);
        this.state = {
            direction: [],
            institutes: [],
            selectedInstitute: [],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.DirectionData();
        this.InstitutesData();
    }

    renderDirection() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idDirection" hidden defaultValue={this.state.direction.idDirection} />
                            <label>Название</label>
                            <input name="name" defaultValue={this.state.direction.name} />
                            <label>Институт</label>
                            <Select
                                labelField="name"
                                valueField={"idDirection"}
                                options={this.state.institutes}
                                values={this.state.institutes.filter(institute => institute.idInstitute == this.state.direction.instituteId)}
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
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : this.renderDirection();

            return (
                <div>
                    <h1 id="tabelLabel">Направление</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async DirectionData() {
        var idDirection = this.props.match.params["idDirection"];
        var response = await fetch('api/TblDirections/' + idDirection);
        var data = await response.json();
        this.setState({ direction: data, loading: false });
    }

    async InstitutesData() {
        var response = await fetch('api/TblInstitutes');
        var data = await response.json();
        this.setState({ institutes: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idDirection = event.target.elements.idDirection.value;
        fetch('api/TblDirections/' + idDirection, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idDirection: idDirection,
                instituteId: this.state.selectedInstitute[0].idInstitute,
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/directions"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/directions");
    }
}