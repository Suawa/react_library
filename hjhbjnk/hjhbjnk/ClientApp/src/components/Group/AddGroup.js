import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';


export class AddGroup extends Component {
    static displayName = AddGroup.name;

    constructor(props) {
        super(props);

        this.state = {
            directions: [],
            selectedDirection:[],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.DirectionsData();
    }

    renderGroup() {
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
                                valueField={"idGroup"}
                                options={this.state.directions}
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
            let contents = this.renderGroup();

            return (
                <div>
                    <h1 id="tabelLabel">Группа</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async DirectionsData() {
        var response = await fetch('api/TblDirections');
        var data = await response.json();
        this.setState({ directions: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        fetch('api/TblGroups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                directionId: this.state.selectedDirection[0].idDirection,
                name: event.target.elements.name.value
            })
        }).then(this.props.history.push("/groups"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/groups");
    }
}