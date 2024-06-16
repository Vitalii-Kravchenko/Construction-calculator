import RoomArea from "./roomArea/RoomArea";
import RoomWorks from "./roomWorks/RoomWorks";
import TotalCost from "./totalCost/TotalCost";

import './calculator.sass';

const Calculator = () => {
    return (
        <section className="calculator">
            <div className="container">
                <div className="calculator-content">
                    <div className="calculator-settings">
                        <div className="calculator-tabs">
                            <a className="calculator-tabs__item" href="#">Площадь помещения</a>
                            <a className="calculator-tabs__item" href="#">Необходимые работы</a>
                            <div className="calculator-tabs__line calculator-tabs__line--active"></div>
                        </div>

                        {/*<RoomArea/>*/}
                        <RoomWorks/>
                    </div>

                    <TotalCost/>
                </div>

                <a className='button button-accent calculator__button-login' href="#">Войти как администратор</a>
            </div>
        </section>
    );
};

export default Calculator;