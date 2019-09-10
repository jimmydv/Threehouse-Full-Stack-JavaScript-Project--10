import React, { Component } from 'react'
import axios from 'axios';


class CreateCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
       userId:this.props.context.authUser.id,
        errors:""
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const { title , description, estimatedTime, materialsNeeded, userId} = this.state;
        const context = this.props.context;

        const axiosInstance = axios.create({
            baseURL:`http://localhost:5000`,
            headers: {
                "Authorization": `Basic ${context.encodedCredentials}`,
                "Content-Type": "application/json"
            }
        });
        axiosInstance.post('/api/courses', {title, description, estimatedTime, materialsNeeded, userId})
            .then(() => {
                this.props.history.push('/') 
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data.errors 
                })
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
 // Redirect to the courses page
    handleCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const context = this.props.context;
        return (
            <div>
                <div>
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
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
                                        <p>By {context.authUser.firstName} {context.authUser.lastName}</p>
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
                                        Create Course
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

export default CreateCourse;