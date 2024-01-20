import styles from './LoginForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';

export const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
                    'http://localhost:3001/api/auth/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    },
                );

                if (response.ok) {
                    const data = await response.json();
                    const { accessToken } = data;
                    localStorage.setItem('accessToken', accessToken);
                    return redirect('/dashboard');
                } else {
                    console.error('Wystąpił błąd podczas logowania');
                }
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        },
    });

    return (
        <div className={styles['container']}>
            <div className={styles['login-box']}>
                <h2>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles['input-box']}>
                        <input
                            type='email'
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            required
                        />
                        <label htmlFor='email'>
                            {formik.values.email ? '' : <p>E-mail</p>}
                        </label>
                        {formik.touched.email ? (
                            <p>{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className={styles['input-box']}>
                        <input
                            type='password'
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            required
                        />
                        <label>Password</label>
                        {formik.touched.password ? (
                            <div className={styles.error}>
                                {formik.errors.password}
                            </div>
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
                        <Link to='/register'>Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
