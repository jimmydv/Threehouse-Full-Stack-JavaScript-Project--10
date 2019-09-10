import React from 'react';
import './styles/App.css';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Import Components
import Course from './components/Courses'
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import Errors from './components/Error';
import NotFound from './components/NotFound';

//Import Context

import withContext from './Context';
import PrivateRoute from './components/PrivateRoute';

const UserSignInWithContext = withContext(UserSignIn);
const HeaderContext = withContext(Header);
const UserSignOutWithConext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignUpWithContext = withContext(UserSignUp)

const App = () => {
  
  return (
    <Router>
      <Route render={(props) => <HeaderContext {...props}/>} />
      
      <Switch>
        <Route exact path="/" component={Course} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <Route exact path="/signout" component={UserSignOutWithConext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path= "/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/forbidden" component={Forbidden}/>
        <Route path="/error" component={Errors} />
        <Route path="/notfound" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
