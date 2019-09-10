import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component {
    state = {
        course: [],
        errors:""
    }

    componentDidMount(){
          
        const id = this.props.match.params.id; 
        if(id !== 'create'){
            axios.get(`http://localhost:5000/api/courses/${id}`)
                .then((response) => {
              
                    this.setState({
                        course: response.data.course
                    })
                }).catch((e) => {
                    if(e){
                        this.props.history.push('/notfound')
                    }
            })
        }
        
    }

    deleteCourse = () => {
        const id = this.props.match.params.id; 
        const context = this.props.context; 

        const axiosInstance = axios.create({
            baseURL:`http://localhost:5000`,
            headers: {
                "Authorization": `Basic ${context.encodedCredentials}`,
                "Content-Type": "application/json"
            }
        });

        axiosInstance.delete(`/api/courses/${id}`)
            .then(() => {
                this.props.history.push('/') 
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data.errors 
                })

                if(err.response.status === 401){
                    this.props.history.push('/forbidden') 
                }
        })
    }
    render(){
        if (!this.state.course.User) {
            return null;
        } 
        const id = this.props.match.params.id; 
        const context = this.props.context; 
      console.log(id);
        return(
        
        <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                {(context.authUser 
                && 
                (context.authUser.id === this.state.course.User.id)) ? (
                     <div className="actions--bar">
                     <div className="bounds">
                         <div className="grid-100">
                             <span>
                                 <Link to={`/courses/${id}/update`} className="button a1" >
                                     Update Course
                                 </Link>
                                 
                                 <button 
                                     className="button" 
                                     onClick={this.deleteCourse}
                                 >
                                     Delete Course
                                 </button>
                             </span>
                         </div>
                         </div>
                     </div>
                ): null
                
            }
               <Link to={`/`} className="button button-secondary a1" >
                    Return to List
                </Link>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.course.title}</h3>
                    <p>By {this.state.course.User.firstName} {this.state.course.User.lastName}</p>
                </div>
                <div className="course--description">
                    <ReactMarkdown source={this.state.course.description} />
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{this.state.course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                        <li>
                            <ReactMarkdown source={this.state.course.materialsNeeded} />
                        </li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
          </div>
        )
    }
}

export default CourseDetail;