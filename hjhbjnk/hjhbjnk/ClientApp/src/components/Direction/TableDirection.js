import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class TableDirection extends Component {
    static displayName = TableDirection.name;

    constructor(props) {
        super(props);
        this.state = { directions: [], directionsWithInstName: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populateDirectionsData();
    }

    renderDirections(directions) {

        const Export = () => {
            return (
                <ExcelFile filename={"Направления " + new Date().toLocaleDateString()} element={<button className="btn exportBtn">Экспорт в Excel</button>}>
                    <ExcelSheet data={this.state.directionsWithInstName} name="Направления">
                        <ExcelColumn label="Номер направления" value="idDirection" />
                        <ExcelColumn label="Институт" value="instituteName" />
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
                            <th>Номер направления</th>
                            <th>Институт</th>
                            <th>Название</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            directions.map(direction =>
                                <tr key={direction.idDirection}>
                                    <td>{direction.idDirection}</td>
                                    <td>{direction.institute.name}</td>
                                    <td>{direction.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(direction.idDirection)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(direction.idDirection)}>Редактировать</a></td>
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
                : this.renderDirections(this.state.directions);

            return (
                <div>
                    <h1 id="tabelLabel">Направления</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populateDirectionsData() {
        const response = await fetch('api/TblDirections');
        const data = await response.json();
        this.setState({ directions: data, loading: false });

        this.state.directions = this.state.directions
            .forEach(direction => this.state.directionsWithInstName
                .push({
                    idDirection: direction.idDirection,
                    instituteName: direction.institute.name,
                    name: direction.name
                }));
    }

    FuncDelete(id) {
        try {
            fetch('api/TblDirections/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этого направления есть группы, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/direction/edit/"+id);
    }


}