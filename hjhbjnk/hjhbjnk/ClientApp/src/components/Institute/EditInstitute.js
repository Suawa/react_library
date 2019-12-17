import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';



export class EditInstitute extends Component {
    static displayName = EditInstitute.name;

    constructor(props) {
        super(props);
        this.state = {
            institute: [],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.InstituteData();
    }

    renderInstitute() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idInstitute" hidden defaultValue={this.state.institute.idInstitute} />
                            <label>Название</label>
                            <input name="name" defaultValue={this.state.institute.name} />
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
                : this.renderInstitute();

            return (
                <div>
                    <h1 id="tabelLabel">Институт</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async InstituteData() {
        var idInstitute = this.props.match.params["idInstitute"];
        var response = await fetch('api/TblInstitutes/' + idInstitute);
        var data = await response.json();
        this.setState({ institute: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idInstitute = event.target.elements.idInstitute.value;
        fetch('api/TblInstitutes/' + idInstitute, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idInstitute: idInstitute,
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/institutes"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/institutes");
    }
}