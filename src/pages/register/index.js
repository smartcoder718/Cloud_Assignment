import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import store from "../../Reducers/Store"
import Header from "../../components/Header"
import FormData from "../../constants/form-data.json"

import { USER_ADDED } from '../../Reducers/Actions';

import './register.css';

/**
 * @description this component is used to submit personal information
 * 
 */
const Register = () => {

    // handle state for  avatar of personal image..
    const [avatar, setAvatar] = useState(
        "https://i.ibb.co/WyXN6sG/kindpng-1503922.png"
    )
    const [isAvatarLodaed, setAvatarLoaded] = useState(false)

    // state for first clicked submitted or not...
    const [isFirstSubmitted, setFirstSubmitted] = useState(false)

    const navigate = useNavigate();

    /**
     * @description : this function generate the validation schema of form.
     * @returns   validationSchema
     */
    const getValidationSchema = () => {
        let result = {};
        FormData.map(item => {

            let required = item.required;
            let key = item.key;
            let label = item.label;
            let type = item.type;

            if (required) {
                switch (type) {
                    case 'text':
                        if (key == 'email')
                            result['email'] = Yup.string().required('Email is required').email('Email is invalid')
                        else
                            result[key] = Yup.string().required(label + 'is required');
                        break;
                    case 'image':
                        result[key] = Yup.string().required('please upload a image');
                        break;
                    case 'radio':
                        result[key] = Yup.string().required('please select one option');
                        break;
                    case 'date':
                        result[key] = Yup.string().required('please choose any date');
                        break;
                    default:
                        result[key] = Yup.string().required(label + 'is required');
                        break;
                }
            }
        })
        return result;
    }

    //create validationSchema for Formik
    const validationSchema = Yup.object().shape(getValidationSchema());

    //set initial values...
    const getInitialValue = () => {
        let result = {};
        FormData.map(item => {
            result[item['key']] = '';
        })

        return result;
    }

    //create new formik varliables to  validate form datas.
    const formik = useFormik({

        initialValues: getInitialValue(),
        validationSchema,

        onSubmit: (data) => {
            //when the form is validated...
            store.dispatch(
                USER_ADDED({ ...data, profile_pic: avatar })
            )
            //go to home page
            navigate('/home')
        },
    });

    // change avatar from local device.
    const changeAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar(URL.createObjectURL(e.target.files[0]))
            setAvatarLoaded(true)
            formik.handleChange(e)
        }
    }

    //change each data with name
    const handleChange = (e) => {
        formik.handleChange(e)
    }

    //the function is working when 'submit' button is clicked...
    const handleSubmit = (e) => {
        setFirstSubmitted(true)
        formik.handleSubmit(e)
    }

    /**
     * @description : generate dynamic fome data from 'constants/form-data.json'
     * @returns : new Form
     */
    const generateForm = () => {
        return FormData.map((item, index) => {

            let key = item.key;
            let label = item.label;
            let required = item.required;
            let placeholder = item.placeholder;

            switch (item.type) {
                case 'image':
                    return (
                        <div key={index} className="form-group">
                            <div className="picture">
                                <img src={avatar} className="picture-src" id="wizardPicturePreview" title="" />
                                <input type="file"
                                    value={formik.values[key]}
                                    name={key}
                                    id="wizard-picture" className="" onChange={changeAvatar} />
                            </div>
                            {
                                required && isFirstSubmitted &&
                                < div className="text-danger mt-1 text-center">
                                    {!isAvatarLodaed ? "please upload your avatar " : null}
                                </div>
                            }
                        </div>
                    )

                case 'text':
                    return (
                        <div key={index} className="form-group">
                            <label>{label}</label>
                            <input
                                name={key}
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                placeholder={placeholder}
                                value={formik.values[key]}
                            />
                            <div className="text-danger">
                                {
                                    required && isFirstSubmitted && formik.errors[key] ?
                                        formik.errors[key] : null}
                            </div>
                        </div>
                    )

                case 'radio':
                    let options = item.options;
                    return (
                        <div key={index} className="form-group">
                            <label>{label}</label>
                            <div className="radio-group">
                                {
                                    options.map((option, id) =>
                                        <div key={id} className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name={key} value={option.key} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="inlineRadio1">{option.label}</label>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="text-danger text-center">
                                {required && isFirstSubmitted && formik.errors[key] ? formik.errors[key] : null}
                            </div>
                        </div>
                    )
                case 'date':

                    return (
                        <div key={index} className="form-group">
                            <label>{label}</label>
                            <input
                                name={key}
                                type="date"
                                className="form-control"
                                placeholder={placeholder}
                                onChange={handleChange}
                                value={formik.values[key]}
                            />
                            <div className="text-danger">
                                {required && isFirstSubmitted && formik.errors[key] ? formik.errors[key] : null}
                            </div>
                        </div>
                    )
                default:
                    break;
            }
        })
    }


    return (
        <div>
            <Header pageName={"Personal Info"} />

            <div className='bg-white p-3'>
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        {generateForm()}
                        <div className="form-group text-center">
                            <button type="submit" className="btn  w-100 btn-submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    );
}

export default Register;
