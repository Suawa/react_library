import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

import './styles.css';

export class Main extends Component {
    static displayName = Main.name;

    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        cookie.remove('workerId', { path: '/' });
        cookie.remove('workerName', { path: '/' });
        cookie.remove('isAdmin', { path: '/' });
    }

    render() {
        return (
            <div id='cssmenu'>
                <ul>
                    <li><Link tag={Link} to="/Main">Главная</Link></li>
                    <li class='active has-sub'><a>Справочники</a>
                        <ul>
                            <li><Link tag={Link} to="/journal">Журналы</Link></li>
                            <li><Link tag={Link} to="/books">Книги</Link></li>
                            <li><Link tag={Link} to="/authors">Авторы</Link></li>
                            <li><Link tag={Link} to="/publishers">Издательства</Link></li>
                            <li><Link tag={Link} to="/genres">Жанры</Link></li>
                            <li><Link tag={Link} to="/workers">Сотрудники</Link></li>
                            <li><Link tag={Link} to="/posts">Должности</Link></li>
                            <li><Link tag={Link} to="/institutes">Институты</Link></li>
                            <li><Link tag={Link} to="/directions">Направления</Link></li>
                            <li><Link tag={Link} to="/groups">Группы</Link></li>
                            <li><Link tag={Link} to="/students">Студенты</Link></li>
                        </ul>
                    </li>
                    <li class='active has-sub'><a>Отчеты</a>
                        <ul>
                            <li class='has-sub'><a>Выдачи</a>
                                <ul>
                                    <li><Link tag={Link} to="/Report">По студенту</Link></li>
                                    <li><Link tag={Link} to="/Report">По книге</Link></li>
                                    <li><Link tag={Link} to="/Report">По сотруднику</Link></li>
                                </ul>
                            </li>
                            <li><Link tag={Link} to="/Report">Задолженности</Link></li>
                            <li><Link tag={Link} to="/Report">Состояние книг</Link></li>
                            <li><Link tag={Link} to="/Report">Популярные жанры</Link></li>
                            <li><Link tag={Link} to="/Report">Популярные писатели</Link></li>
                            <li><Link tag={Link} to="/Report">Сотрудники</Link></li>
                        </ul>
                    </li>
                    <li><Link tag={Link} to="/Help">Справка</Link></li>
                    <li class='last'><Link onClick={this.logout} tag={Link} to="/Login">Выход</Link></li>
                </ul>
            </div>
        );
    }
}