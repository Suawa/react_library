import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';



export class EditPost extends Component {
    static displayName = EditPost.name;

    constructor(props) {
        super(props);
        this.state = {
            post: [],
            loading: true
        };

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    componentDidMount() {
        this.PostData();
    }

    renderPost() {
        return (
            <div>
                <Main />
                <div className="content">
                    {
                        <form onSubmit={this.FuncSave}>
                            <input name="idPost" hidden defaultValue={this.state.post.idPost} />
                            <label>Название</label>
                            <input name="name" defaultValue={this.state.post.name} />
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
                : this.renderPost();

            return (
                <div>
                    <h1 id="tabelLabel">Должность</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />; }
    }

    async PostData() {
        var idPost = this.props.match.params["idPost"];
        var response = await fetch('api/TblPosts/' + idPost);
        var data = await response.json();
        this.setState({ post: data, loading: false });
    }

    FuncSave(event) {
        event.preventDefault();
        var idPost = event.target.elements.idPost.value;
        fetch('api/TblPosts/' + idPost, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPost: idPost,
                name: event.target.elements.name.value,
            })
        }).then(this.props.history.push("/posts"));
    }

    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/posts");
    }
}