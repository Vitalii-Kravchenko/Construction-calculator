import './login.sass';

const Login = () => {
    return (
        <section className='login'>
            <div className="container login-container">
                <h2 className="login__title">Авторизация администратора</h2>

                <form className="login-form">
                    <div className="login-input">
                        <h4 className="login-input__title">Логин</h4>
                        <input type="text" className="input login-input__item" placeholder='Login'/>
                    </div>

                    <div className="login-input">
                        <h4 className="login-input__title">Пароль</h4>
                        <input type="password" className="input login-input__item" placeholder='Password'/>
                    </div>

                    <span className="login-error">Неверный логин или пароль</span>

                    <button className='button login__button'>Войти</button>
                </form>
            </div>
        </section>
    );
};

export default Login;