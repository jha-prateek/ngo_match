import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

export class Form extends Component {
    constructor(props) {
        super(props);

        this.sendData = this.sendData.bind(this);
        this.validateData = this.validateData.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    sendData(data) {
        console.log(data);
        fetch(`http://localhost:8000/api/add`,
            {
                method: "POST",
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => console.log(json));
    }

    validateData(values) {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.full_address) {
            errors.address = 'Required';
        }
        if (!values.state) {
            errors.state = 'Required';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    }

    submitData(values, { setSubmitting }) {
        this.sendData(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }

    render() {

        const initialValues = {
            name: '',
            full_address: '',
            city: '',
            state: '',
            pincode: '',
            contact_1: '',
            contact_2: '',
            website: '',
            email: '',
        }

        const validationSchema = Yup.object()
            .shape({
                // firstName: Yup.string()
                //     .min(2, 'Too Short!')
                //     .max(50, 'Too Long!')
                //     .required('Required'),
                // lastName: Yup.string()
                //     .min(2, 'Too Short!')
                //     .max(50, 'Too Long!')
                //     .required('Required'),
                email: Yup.string()
                    .email('Invalid email')
                    .required('Required'),
            });

        return (
            <div className="main-form">
                <Formik
                    initialValues={initialValues}
                    // validate={this.validateData}
                    validationSchema={validationSchema}
                    onSubmit={this.submitData}
                >
                    {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">NGO Name</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputName"
                                        type="name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        placeholder="e.g. Helping Hand"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Full Address</label>
                                <div className="col-sm-5">
                                    <textarea
                                        className="form-control"
                                        id="inputAddress"
                                        type="text"
                                        name="full_address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                        placeholder="e.g. 1234 Main St"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputState" className="col-sm-2 col-form-label">State</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputState"
                                        type="state"
                                        name="state"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.state}
                                        placeholder="e.g. Bihar" />
                                    {/* <select className="custom-select" id="validationCustom04" required>
                                            <option selected disabled value="">Choose...</option>
                                            <option>...</option>
                                        </select> */}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputCity" className="col-sm-2 col-form-label">City</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputCity"
                                        type="city"
                                        name="city"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        placeholder="e.g. Patna" />
                                    {/* <select className="custom-select" id="validationCustom04" required>
                                            <option selected disabled value="">Choose...</option>
                                            <option>...</option>
                                        </select> */}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputPincode" className="col-sm-2 col-form-label">Pincode</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputPincode"
                                        type="pincode"
                                        name="pincode"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.pincode}
                                        placeholder="e.g. 800001" />
                                    {/* <select className="custom-select" id="validationCustom04" required>
                                            <option selected disabled value="">BCA</option>
                                            <option>ABC</option>
                                            <option>CBD</option>
                                            <option>ACB</option>
                                        </select> */}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPrimaryContact" className="col-sm-2 col-form-label">Primary contact</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputPrimaryContact"
                                        type="phone"
                                        name="phone"
                                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                        name="contact_1"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.contact_1}
                                        placeholder="e.g. 9874563210" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputSecondayContact" className="col-sm-2 col-form-label">Seconday contact</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputSecondayContact"
                                        type="phone"
                                        name="phone"
                                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                        name="contact_2"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.contact_2}
                                        placeholder="e.g. 9874563210" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email Address</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputEmail"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="e.g. my-name@example.com" />
                                </div>
                            </div>
                            {console.log(errors.email)}
                            {errors.email !== 'Required' ? <div>{errors.email}</div> : null}
                            <div className="form-group row">
                                <label htmlFor="inputWebsite" className="col-sm-2 col-form-label">Website</label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        id="inputWebsite"
                                        type="url"
                                        name="website"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.website}
                                        placeholder="helpinghand.org" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label" htmlFor="gridCheck" >
                                        Check me out
                                        </label>
                                </div>
                            </div>
                            <button
                                className="btn btn-primary mb-2"
                                type="submit"
                                disabled={isSubmitting}>
                                Submit
                                </button>
                        </form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default Form
