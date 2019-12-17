import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'


export class TableInstitute extends Component {
    static displayName = TableInstitute.name;

    constructor(props) {
        super(props);
        this.state = { institutes: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateInstitutesData();
    }

    renderInstitutes(institutes) {
        return (
            <div>
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер института</th>
                            <th>Название</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            institutes.map(institute =>
                                <tr key={institute.idInstitute}>
                                    <td>{institute.idInstitute}</td>
                                    <td>{institute.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(institute.idInstitute)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(institute.idInstitute)}>Редактировать</a></td>
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
                : this.renderInstitutes(this.state.institutes);

            return (
                <div>
                    <h1 id="tabelLabel">Институты</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateInstitutesData() {
        const response = await fetch('api/TblInstitutes');
        const data = await response.json();
        this.setState({ institutes: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblInstitutes/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого института есть направления, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/institute/edit/"+id);
    }


}