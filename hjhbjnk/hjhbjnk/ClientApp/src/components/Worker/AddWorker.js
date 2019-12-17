import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import Select from 'react-dropdown-select';


export class AddWorker extends Component {
    static displayName = AddWorker.name;

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            selectedPost:[],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.PostsData();
    }

    renderWorker() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <label>Имя</label>
                            <input name="fullName" />
                            <label>Должность</label>
                            <Select
                                labelField="name"
                                valueField={"idWorker"}
                                options={this.state.posts}
                                onChange={value =>
                                    this.state.selectedPost = value
                                }
                            />
                            <label>Пароль</label>
                            <input name="password" />
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
            let contents = this.renderWorker();

            return (
                <div>
                    <h1 id="tabelLabel">Работник</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async PostsData() {
        var response = await fetch('api/TblPosts');
        var data = await response.json();
        this.setState({ posts: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        fetch('api/TblWorkers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: this.state.selectedPost[0].idPost,
                fullName: event.target.elements.fullName.value,
                password: event.target.elements.fullName.value,
                isAdmin: false,

            })
        }).then(this.props.history.push("/workers"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/workers");
    }
}