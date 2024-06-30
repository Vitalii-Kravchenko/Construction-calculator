import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";

import {useHttp} from "../../../hooks/http.hook";

import {setLoginStatus} from './loginSlice';

import './login.sass';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {request} = useHttp();

    const validationSchema = Yup.object({
        login: Yup.string()
            .max(20, 'Логин должен содержать максимум 20 символов')
            .required('Неверный логин или пароль'),
        password: Yup.string()
            .required('Неверный логин или пароль')
    })

    const handleSubmit = (values, actions) => {
        request('/admin')
            .then(res => {
                if (values.login === res.login && values.password === res.password) {
                    localStorage.setItem('logged', 'true');
                    dispatch(setLoginStatus(true));

                    return navigate('/admin/settings');
                } else {
                    localStorage.setItem('logged', 'false');
                    dispatch(setLoginStatus(false));

                    actions.setErrors({
                        general: 'Неверный логин или пароль',
                    })
                }
            })
            .catch(error => {
                console.error('Ошибка запроса', error);
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
            }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
        >
            {({errors, setErrors, handleChange, isSubmitting}) => (
                <section className='login'>
                    <div className="container login-container">
                        <h2 className="login__title">Авторизация администратора</h2>

                        <Form className="login-form">
                            <div className="login-input">
                                <h4 className="login-input__title">Логин</h4>
                                <Field
                                    type="text"
                                    name='login'
                                    className={errors.general || errors.login || errors.password ? 'input login-input__item login-input__item--error' : 'input login-input__item'}
                                    placeholder='Login'
                                    onChange={(e) => {
                                        setErrors({});
                                        handleChange(e);
                                    }}
                                />
                            </div>

                            <div className="login-input">
                                <h4 className="login-input__title">Пароль</h4>
                                <Field
                                    type="password"
                                    name='password'
                                    className={errors.general || errors.login || errors.password ? 'input login-input__item login-input__item--error' : 'input login-input__item'}
                                    placeholder='Password'
                                    onChange={(e) => {
                                        setErrors({});
                                        handleChange(e);
                                    }}
                                />
                            </div>

                            {
                                errors.general ?
                                    <span className="login-error">{errors.general}</span> :
                                    errors.login ?
                                        <span className="login-error">{errors.login}</span> :
                                        errors.password ?
                                            <span className="login-error">{errors.password}</span> :
                                            null

                            }

                            <button className='button login__button' type='submit' disabled={isSubmitting}>Войти
                            </button>
                        </Form>
                    </div>
                </section>
            )}
        </Formik>
    );
};

export default Login;