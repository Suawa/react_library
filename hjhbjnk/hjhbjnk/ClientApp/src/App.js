import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { Otchet } from './components/Otchet';
import { Help } from './components/Help';
import { Report } from './components/Report';
import { TableBook } from './components/Book/TableBook';
import { EditBook } from './components/Book/EditBook';
import { AddBook } from './components/Book/AddBook';
import { AddAuthor } from './components/Author/AddAuthor';
import { EditAuthor } from './components/Author/EditAuthor';
import { TableAuthor } from './components/Author/TableAuthor';
import { AddInstitute } from './components/Institute/AddInstitute';
import { EditInstitute } from './components/Institute/EditInstitute';
import { TableInstitute } from './components/Institute/TableInstitute';
import { AddGenre } from './components/Genre/AddGenre';
import { EditGenre } from './components/Genre/EditGenre';
import { TableGenre } from './components/Genre/TableGenre';
import { AddPost } from './components/Post/AddPost';
import { EditPost } from './components/Post/EditPost';
import { TablePost } from './components/Post/TablePost';
import { AddPublisher } from './components/Publisher/AddPublisher';
import { EditPublisher } from './components/Publisher/EditPublisher';
import { TablePublisher } from './components/Publisher/TablePublisher';
import { AddDirection } from './components/Direction/AddDirection';
import { EditDirection } from './components/Direction/EditDirection';
import { TableDirection } from './components/Direction/TableDirection';
import { AddGroup } from './components/Group/AddGroup';
import { EditGroup } from './components/Group/EditGroup';
import { TableGroup } from './components/Group/TableGroup';
import { AddWorker } from './components/Worker/AddWorker';
import { EditWorker } from './components/Worker/EditWorker';
import { TableWorker } from './components/Worker/TableWorker';
import { AddStudent } from './components/Student/AddStudent';
import { EditStudent } from './components/Student/EditStudent';
import { TableStudent } from './components/Student/TableStudent';
import { AddRecord } from './components/Record/AddRecord';
import { EditRecord } from './components/Record/EditRecord';
import { TableRecord } from './components/Record/TableRecord';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Main} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/Login' component={Login} />
        <Route path='/Main' component={Main} />
        <Route path='/Otchet' component={Otchet} />
        <Route path='/Help' component={Help} />
        
            <Route path='/Report' component={Report} />

            <Route path='/books' component={TableBook} />
            <Route path='/book/edit/:idBook' component={EditBook} />
            <Route path='/book/add' component={AddBook} />

            <Route path='/authors' component={TableAuthor} />
            <Route path='/author/edit/:idAuthor' component={EditAuthor} />
            <Route path='/author/add' component={AddAuthor} />

            <Route path='/institutes' component={TableInstitute} />
            <Route path='/institute/edit/:idInstitute' component={EditInstitute} />
            <Route path='/institute/add' component={AddInstitute} />

            <Route path='/genres' component={TableGenre} />
            <Route path='/genre/edit/:idGenre' component={EditGenre} />
            <Route path='/genre/add' component={AddGenre} />

            <Route path='/posts' component={TablePost} />
            <Route path='/post/edit/:idPost' component={EditPost} />
            <Route path='/post/add' component={AddPost} />

            <Route path='/publishers' component={TablePublisher} />
            <Route path='/publisher/edit/:idPublisher' component={EditPublisher} />
            <Route path='/publisher/add' component={AddPublisher} />

            <Route path='/directions' component={TableDirection} />
            <Route path='/direction/edit/:idDirection' component={EditDirection} />
            <Route path='/direction/add' component={AddDirection} />

            <Route path='/groups' component={TableGroup} />
            <Route path='/group/edit/:idGroup' component={EditGroup} />
            <Route path='/group/add' component={AddGroup} />

            <Route path='/workers' component={TableWorker} />
            <Route path='/worker/edit/:idWorker' component={EditWorker} />
            <Route path='/worker/add' component={AddWorker} />

            <Route path='/students' component={TableStudent} />
            <Route path='/student/edit/:idStudent' component={EditStudent} />
            <Route path='/student/add' component={AddStudent} />

            <Route path='/records' component={TableRecord} />
            <Route path='/record/edit/:idRecord' component={EditRecord} />
            <Route path='/record/add' component={AddRecord} />

      </Layout>
    );
  }
}
