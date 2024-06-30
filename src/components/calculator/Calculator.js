import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";

import TotalCost from "./totalCost/TotalCost";

import './calculator.sass';
import {useEffect} from "react";

const Calculator = () => {
    const navigate = useNavigate();

    const logged = useSelector(
        state => state.login.logged
    )

    const onLogin = (e) => {
        e.preventDefault();

        if (logged) {
            navigate("/admin/settings");
        } else{
            navigate("admin/login");
        }
    }

    return (
        <section className="calculator">
            <div className="container calculator-container">
                <div className="calculator-content">
                    <div className="calculator-settings">
                        <div className="calculator-tabs">
                            <NavLink
                                className={({isActive}) =>
                                    isActive
                                        ? 'calculator-tabs__item calculator-tabs__item--active'
                                        : 'calculator-tabs__item'
                                }
                                to='/'
                            >
                                Площадь помещения
                            </NavLink>
                            <NavLink
                                className={({isActive}) =>
                                    isActive
                                        ? 'calculator-tabs__item calculator-tabs__item--active'
                                        : 'calculator-tabs__item'
                                }
                                to='room-works'
                            >
                                Необходимые работы
                            </NavLink>
                        </div>

                        <Outlet/>
                    </div>

                    <TotalCost/>
                </div>

                <a className='button button-accent calculator__button-login' href='#' onClick={onLogin}>Войти как администратор</a>
            </div>
        </section>
    );
};

export default Calculator;