import { useFormik } from 'formik';
import styles from './LoginForm.module.css';
interface IError {
    firstName?: string;
    lastName?: string;
    email?: string;
}

interface IEvent extends Event {
    firstName: string;
    lastName: string;
    email: string;
}

interface IInitialValues {
    firstName: string;
    lastName: string;
    email: string;
}

const validate = (values: IEvent) => {
    const errors: IError = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    return errors;
};
interface Type {
    [n: string]: number;
}

export const LoginForm = () => {
    const spans = Array.from({ length: 50 }, (_, index) => index);

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h2>Login</h2>
                <form action='#'>
                    <div className={styles['input-box']}>
                        <input
                            type='email'
                            required
                        />
                        <label>Email</label>
                    </div>
                    <div className={styles['input-box']}>
                        <input
                            type='password'
                            required
                        />
                        <label>Password</label>
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
    );
};
