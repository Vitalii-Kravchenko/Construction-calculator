import {Link} from 'react-router-dom';

import './header.sass';

const Header = () => {
    return (
        <header className="header">
            <div className="container header-container">
                <h1 className="header__title">
                    <Link to='/'><span className='header__title-line'>Калькулятор</span> стоимости ремонта</Link>
                </h1>
            </div>
        </header>
    );
};

export default Header;