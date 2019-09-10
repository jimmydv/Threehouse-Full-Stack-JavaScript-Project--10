import React, { Component } from 'react'
import axios from 'axios';
class UpdateCourse extends Component {
    state = {
        id:"",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors:""
    }

    componentDidMount(){
     
        const id = this.props.match.params.id;

        if(id !== 'create'){
            axios.get(`http://localhost:5000/api/courses/${id}`)
                .then((response) => {
                    const course = response.data.course;
                    this.setState({
                        id:course.User.id,
                        title: course.title,
                        description:course.description,
                        estimatedTime:course.estimatedTime,
                        materialsNeeded:course.materialsNeeded
                    })
                }).then(() => {
                //Redirect to Forbidden if the logged in user doesn't own the course
                    const context = this.props.context;
                    // console.log(this.state.id);
                    if((context.authUser && (context.authUser.id !== this.state.id))){
                        this.props.history.push('/forbidden')
                    }
                }).catch((err) => {
                    if(err){
                        this.props.history.push('/notfound') 
                    }
            })
        }
    }

   
    handleSubmit = (event) => {
        event.preventDefault();
        const id = this.props.match.params.id;
        const context = this.props.context;
        const { title , description, estimatedTime, materialsNeeded, userId } = this.state;
        const axiosInstance = axios.create({
            baseURL:`http://localhost:5000`,
            headers: {
                "Authorization": `Basic ${context.encodedCredentials}`,
                "Content-Type": "application/json"
            }
        });
       
        axiosInstance.put(`/api/courses/${id}`,
            {
                title, 
                description, 
                estimatedTime, 
                materialsNeeded,
                userId
            }
        )
            .then(() => {
                this.props.history.push(`/courses/${id}`) 
            })
            .catch((e) => {
                this.setState({
                    errors: e.response.data.errors 
                })
              
                if(e.response.status === 403){
                    this.props.history.push('/forbidden')
                }
            })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    
    //Redirect to the courses page on click
    handleCancel = () => {
        this.props.history.push('/')
    }
    render() {
        
        return (
            <div>
                <div>
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <div>
                        {
                            this.state.errors ? (
                                <div>
                                    <h2 className="validation--errors--label">Validation errors</h2>
                                        <div className="validation-errors">
                                            <ul>
                                                {
                                                    this.state.errors.map((error) => {
                                                        return <li key={error}>{error}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                ) :  null
                            }
                        </div>
                            <form>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input 
                                                id="title" 
                                                name="title" 
                                                type="text" 
                                                className="input-title course--title--input" 
                                                placeholder="Course title..."
                                                value={this.state.title}
                                                onChange={this.handleChange} 
                                            />
                                        </div>
                                        <p>By Joe Smith</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                className="" 
                                                placeholder="Course description..."
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input 
                                                    id="estimatedTime" 
                                                    name="estimatedTime" 
                                                    type="text" 
                                                    className="course--time--input"
                                                    placeholder="Hours" 
                                                    value={this.state.estimatedTime}
                                                    onChange={this.handleChange}
                                                />
                                                </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded" 
                                                    name="materialsNeeded" 
                                                    className="" 
                                                    placeholder="List materials..."
                                                    value={this.state.materialsNeeded}
                                                    onChange={this.handleChange}
                                                >
                                                </textarea>
                                            </div>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button 
                                        className="button" 
                                        type="submit"
                                        onClick={this.handleSubmit}
                                    >
                                       Update Course
                                    </button>
                                    <button 
                                        className="button button-secondary" 
                                        onClick={this.handleCancel}
                                    >
                                    Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateCourse;
