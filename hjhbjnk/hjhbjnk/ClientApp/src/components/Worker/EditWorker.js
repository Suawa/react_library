import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';


export class EditWorker extends Component {
    static displayName = EditWorker.name;

    constructor(props) {
        super(props);
        this.state = {
            worker: [],
            posts: [],
            selectedPost: [],
            isAdmin: false,
            loading: true,
            saveBtn: null
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);

    }

    componentDidMount() {
        this.WorkerData();
        this.PostsData();
    }

    renderWorker() {
        console.log(cookie.load('isAdmin'));
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idWorker" hidden defaultValue={this.state.worker.idWorker} />
                            <label>Название</label>
                            <input name="fullName" defaultValue={this.state.worker.fullName} />
                            <label>Институт</label>
                            <Select
                                labelField="name"
                                valueField={"idWorker"}
                                options={this.state.posts}
                                values={this.state.posts.filter(post => post.idPost == this.state.worker.postId)}
                                onChange={value =>
                                    this.state.selectedPost = value
                                }
                            />
                            <label>Пароль</label>
                            <input name="password" defaultValue={this.state.worker.password} />
                            {this.saveBtn}
                            <button onClick={this.FuncCancel}>Отмена</button>
                        </form>
                    }
                </div>
            </div>
        )
    }

    render() {
        //я ебал
        if (cookie.load('isAdmin'))
            this.saveBtn = < button type="submit" > Сохранить</button >;
        else
            this.saveBtn = null;

        if (cookie.load('workerId')) {
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : this.renderWorker();

            return (
                <div>
                    <h1 id="tabelLabel">Работник</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async WorkerData() {
        var idWorker = this.props.match.params["idWorker"];
        var response = await fetch('api/TblWorkers/' + idWorker);
        var data = await response.json();
        this.setState({ worker: data, loading: false });
    }

    async PostsData() {
        var response = await fetch('api/TblPosts');
        var data = await response.json();
        this.setState({ posts: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idWorker = event.target.elements.idWorker.value;
        fetch('api/TblWorkers/' + idWorker, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idWorker: idWorker,
                postId: this.state.selectedPost[0].idPost,
                fullName: event.target.elements.fullName.value,
                password: event.target.elements.password.value
            })
        }).then(this.props.history.push("/workers"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/workers");
    }
}