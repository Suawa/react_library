import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'


export class TablePublisher extends Component {
    static displayName = TablePublisher.name;

    constructor(props) {
        super(props);
        this.state = { publishers: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populatePublishersData();
    }

    renderPublishers(publishers) {
        return (
            <div>
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер должности</th>
                            <th>Название</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            publishers.map(publisher =>
                                <tr key={publisher.idPublisher}>
                                    <td>{publisher.idPublisher}</td>
                                    <td>{publisher.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(publisher.idPublisher)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(publisher.idPublisher)}>Редактировать</a></td>
                                </tr>
                            )}
                    </tbody>
                </table>

            </div>
        );
    }

    render() {
        if (cookie.load('workerId')) {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderPublishers(this.state.publishers);

            return (
                <div>
                    <h1 id="tabelLabel">Издательства</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populatePublishersData() {
        const response = await fetch('api/TblPublishers');
        const data = await response.json();
        this.setState({ publishers: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblPublishers/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого издательства есть книги, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/publisher/edit/"+id);
    }


}