import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';


export class EditGroup extends Component {
    static displayName = EditGroup.name;

    constructor(props) {
        super(props);
        this.state = {
            group: [],
            directions: [],
            selectedDirection: [],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.GroupData();
        this.DirectionsData();
    }

    renderGroup() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idGroup" hidden defaultValue={this.state.group.idGroup} />
                            <label>Название</label>
                            <input name="name" defaultValue={this.state.group.name} />
                            <label>Институт</label>
                            <Select
                                labelField="name"
                                valueField={"idGroup"}
                                options={this.state.directions}
                                values={this.state.directions.filter(direction => direction.idDirection == this.state.group.directionId)}
                                onChange={value =>
                                    this.state.selectedDirection = value
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
                : this.renderGroup();

            return (
                <div>
                    <h1 id="tabelLabel">Направление</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async GroupData() {
        var idGroup = this.props.match.params["idGroup"];
        var response = await fetch('api/TblGroups/' + idGroup);
        var data = await response.json();
        this.setState({ group: data, loading: false });
    }

    async DirectionsData() {
        var response = await fetch('api/TblDirections');
        var data = await response.json();
        this.setState({ directions: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idGroup = event.target.elements.idGroup.value;
        fetch('api/TblGroups/' + idGroup, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idGroup: idGroup,
                directionId: this.state.selectedDirection[0].idDirection,
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/groups"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/groups");
    }
}