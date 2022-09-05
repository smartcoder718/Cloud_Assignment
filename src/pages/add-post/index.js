import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import './add-post.css';

import Header from "../../components/Header"

/**
 * @Description : this component is used to add new Blog data.
 * 
 */

const url = 'https://jsonplaceholder.typicode.com/posts'

const AddPost = () => {

    const [isFirstSubmitted, setFirstSubmitted] = useState(false)
    const [isSubmitted, setSubmitted] = useState(false)

    const navigate = useNavigate();

    const successToast = () => toast("Successfully saved!!!");
    const errorToast = () => toast("Failed to save.  Please try again");

    //crate validation schema
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        body: Yup.string()
            .required('Description is required')
    });

    //create fomik var to validate form data
    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validationSchema,
        onSubmit: (data) => {
            //when we create 'submit' button
            if (!isSubmitted) {
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        ...data,
                        userId: 11,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log("here is response", json)
                        setSubmitted(true)
                        successToast();
                    }).catch(e => {
                        console.log('here is the error', e)
                        errorToast();
                    });
            }
            else {

                //when we click 'back to home' button
                navigate('/home')
            }
        },
    });


    // update input values by name
    const handleChange = (e) => {
        formik.handleChange(e)
    }

    //' click submit button
    const handleSubmit = (e) => {
        setFirstSubmitted(true)
        formik.handleSubmit(e)
    }


    return (
        <div className='bg-white'>
            <Header pageName={"Add New Post"} />

            <div style={{ height: window.innerHeight - 100 + 'px' }}>
                <div className="add-post-form " >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group  mt-3 pl-3 pr-3">
                            <label>Title</label>
                            <input
                                name="title"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={formik.values.title}
                            />
                            <div className="text-danger">
                                {isFirstSubmitted && formik.errors.title ? formik.errors.title : null}
                            </div>
                        </div>

                        <div className="form-group pl-3 pr-3">
                            <label htmlFor="username"> Description </label>
                            <textarea
                                name="body"
                                rows={10}
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={formik.values.body}
                            />
                            <div className="text-danger">
                                {isFirstSubmitted && formik.errors.body ? formik.errors.body : null}
                            </div>
                        </div>
                        <div className="submit-div">
                            <button type="submit" className="btn w-100 h-100 mt-0 btn-submit">
                                {!isSubmitted ? 'Submit' : 'Back to Home'}
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div >
        </div>
    );
}

export default AddPost;
