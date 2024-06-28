import {Link, NavLink, Outlet} from 'react-router-dom';

import TotalCost from "./totalCost/TotalCost";

import './calculator.sass';

const Calculator = () => {
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

                <Link className='button button-accent calculator__button-login' to='admin/login'>Войти как администратор</Link>
            </div>
        </section>
    );
};

export default Calculator;