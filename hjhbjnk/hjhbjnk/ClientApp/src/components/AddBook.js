import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from './Main';
import './styles.css';

export class AddBook extends Component {
    static displayName = AddBook.name;


    constructor(props) {
        super(props);
        this.state = { book: [], loading: true };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.BookData();
    }

    renderBookTable() {
        return (
            <div>
                <Main/> 
                <div>
                    <form onSubmit={this.FuncSave}>
                        <input name="idBook" type="hidden" value={this.state.book.idBook} />
                        <p/>
                        <input name="publisherId" defaultValue={this.state.book.publisherId} />
                        <p />
                        
                        
                        <p />
                        <input name="name" defaultValue={this.state.book.name} />
                        <p/>
                        <input name="year" defaultValue={this.state.book.year} />
                        <p/>
                        <input name="count" defaultValue={this.state.book.count} />
                        <p/>
                        <button type="submit" >Сохранить</button>
                        <button onClick={this.FuncCancel}>Отмена</button>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBookTable(this.state.book);

        return (
            <div>
                <h1 id="tabelLabel">Книга</h1>
                {contents}
            </div>
        );
    }

    async BookData() {
        var idBook = this.props.match.params["idBook"];
        const response = await fetch('api/TblBooks/' + idBook);
        const data = await response.json();
        this.setState({ book: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        //console.log(json_s);

        var idBook = this.props.match.params["idBook"];
       // if (idBook != null) {
            fetch('api/TblBooks/' + idBook, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idBook: event.target.elements.idBook.value,
                    publisherId: event.target.elements.publisherId.value,
                    name: event.target.elements.name.value,
                    year: event.target.elements.year.value,
                    count: event.target.elements.count.value
                })
            }).then(this.props.history.push("/table"));    
        /*}
        else {
            fetch('api/TblBooks', {
                method: 'POST',
                body: formData,
            }).then(this.props.history.push("/table"));
        }*/
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/table");
    }
}