import styles from './LoginForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Type {
    [n: string]: number;
}
export const RegisterForm = () => {
    const spans = Array.from({ length: 50 }, (_, index) => index);

    const formik = useFormik({
        initialValues: {
            email: '',
            login: '',
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
        <div className={styles.container}>
            <div className={styles.loginBox}>
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
                            type='login'
                            name='login'
                            onChange={formik.handleChange}
                            value={formik.values.login}
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
            </div>
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
