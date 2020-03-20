import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';


const validationSchema = yup.object().shape({
    name: yup.string().required('Name is requred'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().min(6, 'Passwords must be at least 6 characters').required('Password is required'),
    tos: yup.boolean().oneOf([true], 'Please agree to Terms of Service')
})


export default function UserForm() {

    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    return(
        <Formik 
        initialValues={{ name:'', email:'', password:'' }}
        validationSchema={validationSchema}
        onSubmit={(values, tools) => {
            axios.post('https://reqres.in/api/users', values).then( res => {
                setUsers(res.data.name);
                setMessage(res.data);
            }).catch().finally()
          console.log(values);
          tools.resetForm();
        }}
        render={props => {
          return(
            <Form>
              Full Name  
              <Field name='name' type='text' placeholder='Enter you name' />
              <ErrorMessage name='name' component='h4' className='red' />
              <br/>
              Email  
              <Field name='email' type='email' placeholder='Enter your email' />
              <ErrorMessage name='email' component='h4' className='red' />
              <br/>
              Password  
              <Field name='password' type='password' placeholder='Enter your password'/>
              <ErrorMessage name='password' component='h4' className='red' />
              <br/>
              <Field name='tos' type='checkbox' />Agree to Terms and Service
              <ErrorMessage name='tos' component='h4' className='red' />
              <br/>
              <input type='submit' disabled={props.isSubmitting} />
              <h5>
                Post result: <br/>
                Name: {message.name} | Email: {message.email} <br/>
              </h5>

            </Form>
            
          )
        }}
      />
    )
}
