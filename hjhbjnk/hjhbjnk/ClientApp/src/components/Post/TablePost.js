import React, { Component } from 'react';
import { Main } from '../Main';
import '../styles.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'


export class TablePost extends Component {
    static displayName = TablePost.name;

    constructor(props) {
        super(props);
        this.state = { posts: [], loading: true };

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

    componentDidMount() {
        this.populatePostsData();
    }

    renderPosts(posts) {
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
                            posts.map(post =>
                                <tr key={post.idPost}>
                                    <td>{post.idPost}</td>
                                    <td>{post.name}</td>
                                    <td><a className="action" onClick={(id) => this.FuncDelete(post.idPost)}>Удалить</a></td>
                                    <td><a className="action" onClick={(id) => this.FuncEdit(post.idPost)}>Редактировать</a></td>
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
                : this.renderPosts(this.state.posts);

            return (
                <div>
                    <h1 id="tabelLabel">Должности</h1>
                    {contents}
                </div>
            );
        }
        else { return <Redirect to='/Login' />;}
    }

    async populatePostsData() {
        const response = await fetch('api/TblPosts');
        const data = await response.json();
        this.setState({ posts: data, loading: false });
    }

    FuncDelete(id) {
        try {
            fetch('api/TblPosts/' + id, {
                method: 'delete'
            }).then(document.location.reload(true));
        }
        catch{ alert("У этой должности есть сотрудники, сначала удалите их!") }
    }

    FuncEdit(id) {
        this.props.history.push("/post/edit/"+id);
    }


}