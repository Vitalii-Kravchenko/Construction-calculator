import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {totalCostFetchExchangeRate} from "./totalCostSlice";

import './totalCost.sass';

const TotalCost = () => {
    const exchangeRate = useSelector(state => state.totalCost.exchangeRate);
    const uah = useSelector(state => state.totalCost.uah);

    const [usd, setUsd] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(totalCostFetchExchangeRate())
    }, []);

    useEffect(() => {
        if (exchangeRate !== null) {
            exchangeRate.forEach(({cc, rate}) => {
                if (cc === 'USD') {
                    setUsd(rate);
                }
            })
        }
    }, [exchangeRate]);

    const transformMoney = (currency) => {
        switch (currency) {
            case 'uah':
                return uah.toFixed(2);
            case 'usd':
                return (uah / usd).toFixed(2);
            default:
                return 0;
        }
    }

    return (
        <div className="total-cost">
            <div className="total-cost__wrapper">
                <span className="total-cost__wrapper-price">{transformMoney('uah')} грн</span>
                <h4 className="total-cost__wrapper-text">Примерная общая стоимость работ</h4>
            </div>
            <div className="total-cost__wrapper">
                <span className="total-cost__wrapper-price">{transformMoney('usd')} $</span>
                <h4 className="total-cost__wrapper-text">Сумма в долларах США по текущему курсу</h4>
            </div>
        </div>
    );
};

export default TotalCost;