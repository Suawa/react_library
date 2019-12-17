import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'


export class TableGroup extends Component {
    static displayName = TableGroup.name;

    constructor(props) {
        super(props);
        this.state = { groups: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateGroupsData();
    }

    renderGroups(groups) {
        return (
            <div>
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер группы</th>
                            <th>Название</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groups.map(group =>
                                <tr key={group.idGroup}>
                                    <td>{group.idGroup}</td>
                                    <td>{group.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(group.idGroup)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(group.idGroup)}>Редактировать</a></td>
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
                : this.renderGroups(this.state.groups);

            return (
                <div>
                    <h1 id="tabelLabel">Группы</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateGroupsData() {
        const response = await fetch('api/TblGroups');
        const data = await response.json();
        this.setState({ groups: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblGroups/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого направления есть группы, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/group/edit/"+id);
    }


}