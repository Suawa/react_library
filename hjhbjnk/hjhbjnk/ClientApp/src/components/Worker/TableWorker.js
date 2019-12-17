import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'


export class TableWorker extends Component {
    static displayName = TableWorker.name;

    constructor(props) {
        super(props);
        this.state = { workers: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateWorkersData();
    }

    renderWorkers(workers) {
        return (
            <div>
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер работника</th>
                            <th>Имя</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            workers.map(worker =>
                                <tr key={worker.idWorker}>
                                    <td>{worker.idWorker}</td>
                                    <td>{worker.fullName}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(worker.idWorker)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(worker.idWorker)}>Редактировать</a></td>
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
                : this.renderWorkers(this.state.workers);

            return (
                <div>
                    <h1 id="tabelLabel">Работники</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateWorkersData() {
        const response = await fetch('api/TblWorkers');
        const data = await response.json();
        this.setState({ workers: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblWorkers/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого работника есть записи, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/worker/edit/"+id);
    }


}