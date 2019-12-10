import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import './styles.css';

export class Main extends Component {
    static displayName = Main.name;

    render() {
        return (
            <div id='cssmenu'>
                <ul>
                    <li><Link tag={Link} to="/Main">Главная</Link></li>
                    <li class='active has-sub'><a>Справочники</a>
                        <ul>
                            <li><Link tag={Link} to="/Table">Журналы</Link></li>
                            <li><Link tag={Link} to="/Table">Книги</Link></li>
                            <li><Link tag={Link} to="/Table">Авторы</Link></li>
                            <li><Link tag={Link} to="/Table">Издательства</Link></li>
                            <li><Link tag={Link} to="/Table">Жанры</Link></li>
                            <li><Link tag={Link} to="/Table">Сотрудники</Link></li>
                            <li><Link tag={Link} to="/Table">Должности</Link></li>
                            <li><Link tag={Link} to="/Table">Институты</Link></li>
                            <li><Link tag={Link} to="/Table">Направления</Link></li>
                            <li><Link tag={Link} to="/Table">Группы</Link></li>
                            <li><Link tag={Link} to="/Table">Студенты</Link></li>
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
                    <li class='last'><Link tag={Link} to="/Login">Выход</Link></li>
                </ul>
            </div>
        );
    }
}