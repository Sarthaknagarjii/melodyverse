import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Signup() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      profilePicture: null,
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
      termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('confirmPassword', values.confirmPassword);
      formData.append('name', values.name);
      formData.append('profilePicture', values.profilePicture);
      formData.append('termsAccepted', values.termsAccepted);

      try {
        await axios.post('http://localhost:5000/api/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Signup successful! Redirecting to the post list.');
        history.push('/posts');
      } catch (error) {
        alert('Error during signup: ' + error.response.data.error);
      }
    },
  });

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username ? <div>{formik.errors.username}</div> : null}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={(event) => {
              formik.setFieldValue('profilePicture', event.currentTarget.files[0]);
            }}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              onChange={formik.handleChange}
              checked={formik.values.termsAccepted}
            />
            I accept the terms and conditions
          </label>
          {formik.errors.termsAccepted && formik.touched.termsAccepted ? <div>{formik.errors.termsAccepted}</div> : null}
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
