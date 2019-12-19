import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class TableGroup extends Component {
    static displayName = TableGroup.name;

    constructor(props) {
        super(props);
        this.state = { groups: [], groupsWithDirNames: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateGroupsData();
    }

    renderGroups(groups) {

        const Export = () => {
            return (
                <ExcelFile filename={"Группы " + new Date().toLocaleDateString()} element={<button className="btn exportBtn">Экспорт в Excel</button>}>
                    <ExcelSheet data={this.state.groupsWithDirNames} name="Группы">
                        <ExcelColumn label="Номер группы" value="idGroup" />
                        <ExcelColumn label="Направление" value="directionName" />
                        <ExcelColumn label="Название" value="name" />
                    </ExcelSheet>
                </ExcelFile >
            );
        }

        return (
            <div>
                <Main />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Номер группы</th>
                            <th>Направление</th>
                            <th>Название</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groups.map(group =>
                                <tr key={group.idGroup}>
                                    <td>{group.idGroup}</td>
                                    <td>{group.direction.name}</td>
                                    <td>{group.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(group.idGroup)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(group.idGroup)}>Редактировать</a></td>
                                </tr>
                            )}
                    </tbody>
                </table>
                <Export/>
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

        this.state.groups = this.state.groups
            .forEach(group => this.state.groupsWithDirNames
                .push({
                    idGroup: group.idGroup,
                    directionName: group.direction.name,
                    name: group.name
                }));

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