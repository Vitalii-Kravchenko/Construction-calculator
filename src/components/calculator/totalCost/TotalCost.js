import './totalCost.sass';

const TotalCost = () => {
    return (
        <div className="total-cost">
            <div className="total-cost__wrapper">
                <span className="total-cost__wrapper-price">0 грн</span>
                <h4 className="total-cost__wrapper-text">Примерная <br/> общая стоимость работ</h4>
            </div>
            <div className="total-cost__wrapper">
                <span className="total-cost__wrapper-price">0 $</span>
                <h4 className="total-cost__wrapper-text">Сумма в долларах США по текущему курсу</h4>
            </div>
        </div>
    );
};

export default TotalCost;