import styles from './RegisterForm.module.css';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

export const RegisterForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            login: '',
            password: '',
            repeatPassword: '',
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string().required('Required'),
        }),

        onSubmit: async (values) => {
            try {
                await fetch('http://localhost:3001/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        },
    });

    return (
        <div className={styles['container']}>
            <div className={styles['login-box']}>
                <h2>Register</h2>
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
                            type='login'
                            name='login'
                            onChange={formik.handleChange}
                            value={formik.values.login}
                            required
                        />
                        <label htmlFor='login'>
                            {formik.values.email ? '' : <p>Login</p>}
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
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className={styles['input-box']}>
                        <input
                            type='repeatPassword'
                            name='repeatPassword'
                            onChange={formik.handleChange}
                            value={formik.values.repeatPassword}
                            required
                        />
                        <label>Confirm password</label>
                        {formik.touched.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className={styles['forgot-pass']}>
                        <a href='#'>Forgot your password?</a>
                    </div>
                    <button
                        type='submit'
                        className={styles.btn}>
                        Register
                    </button>
                    <div className={styles['signup-link']}>
                        <Link to='/login'>Signin</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
