import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';



export class EditPublisher extends Component {
    static displayName = EditPublisher.name;

    constructor(props) {
        super(props);
        this.state = {
            publisher: [],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.PublisherData();
    }

    renderPublisher() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idPublisher" hidden defaultValue={this.state.publisher.idPublisher} />
                            <label>Название</label>
                            <input name="name" defaultValue={this.state.publisher.name} />
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
                : this.renderPublisher();

            return (
                <div>
                    <h1 id="tabelLabel">Издательство</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async PublisherData() {
        var idPublisher = this.props.match.params["idPublisher"];
        var response = await fetch('api/TblPublishers/' + idPublisher);
        var data = await response.json();
        this.setState({ publisher: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idPublisher = event.target.elements.idPublisher.value;
        fetch('api/TblPublishers/' + idPublisher, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPublisher: idPublisher,
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/publishers"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/publishers");
    }
}