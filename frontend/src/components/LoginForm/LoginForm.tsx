import styles from './LoginForm.module.css';
import { useState } from 'react';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';

interface Type {
    [n: string]: number;
}
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const spans = Array.from({ length: 50 }, (_, index) => index);

    const formik = useFormik({
        initialValues: {
            email: 'przykladowy@email.com',
            password: 'tajnehaslooooooooo',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch(
                    'http://localhost:3001/api/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    },
                );
                console.log(values);
                const data = await response.json();

                if (data.success) {
                    console.log('Zalogowano pomyślnie');
                } else {
                    console.log('Błąd logowania:', data.message);
                }
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        },
    });

    return (
        <div className={styles.container}>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '' }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),

                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),

                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    const response = await fetch(
                        'http://localhost:3001/api/login',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        },
                    );
                    console.log(values);
                    const data = await response.json();
                    console.log(data);
                }}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor='firstName'>First Name</label>

                        <input
                            id='firstName'
                            type='text'
                            {...formik.getFieldProps('firstName')}
                        />

                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}

                        <label htmlFor='lastName'>Last Name</label>

                        <input
                            id='lastName'
                            type='text'
                            {...formik.getFieldProps('lastName')}
                        />

                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}

                        <label htmlFor='email'>Email Address</label>

                        <input
                            id='email'
                            type='email'
                            {...formik.getFieldProps('email')}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}

                        <button
                            type='button'
                            onClick={formik.handleSubmit}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
            {/* <div className={styles.loginBox}>
                <h2>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles['input-box']}>
                        <input
                            type='email'
                            placeholder='E-mail'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            required
                        />
                        <label htmlFor='email'>
                            {formik.values.email ? '' : <p>E-mail</p>}
                        </label>
                        {formik.touched.email && formik.errors.email ? (
                            <p>{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className={styles['input-box']}>
                        <input
                            type='password'
                            placeholder='Password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            required
                        />
                        <label>Password</label>
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className={styles['forgot-pass']}>
                        <a href='#'>Forgot your password?</a>
                    </div>
                    <button
                        type='submit'
                        className={styles.btn}>
                        Login
                    </button>
                    <div className={styles['signup-link']}>
                        <a href='#'>Signup</a>
                    </div>
                </form>
            </div> */}
            <div>
                {spans.map((index) => {
                    const type: Type = { '--i': index };
                    return (
                        <span
                            key={index}
                            className={styles.animatedElement}
                            style={type}></span>
                    );
                })}
            </div>
        </div>
    );
};
