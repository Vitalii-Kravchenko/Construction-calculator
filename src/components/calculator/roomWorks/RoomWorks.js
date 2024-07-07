import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {roomWorksFetchData, selectAll, roomWorksUpdateOne} from "./roomWorksSlice";
import {addAmountOfMoney, removeAmountOfMoney} from '../totalCost/totalCostSlice';

import useRoomAreaCalculate from "../../../hooks/useRoomAreaCalculate";

import Notes from "../../notes/Notes";
import Spinner from "../../spinner/Spinner";

import './roomWorks.sass'

const RoomWorks = () => {
    const roomWorksItems = useSelector(selectAll);
    const roomWorksLoadingStatus = useSelector(
        state => state.roomWorks.roomWorksLoadingStatus
    );

    const dispatch = useDispatch();
    const {calculate} = useRoomAreaCalculate();

    useEffect(() => {
        if (roomWorksItems.length === 0) {
            dispatch(roomWorksFetchData());
        }
    }, [roomWorksItems]);

    const workCalculate = (e, calculateName, count, id) => {
        const checked = e.target.checked;
        dispatch(roomWorksUpdateOne({id, changes: {checked}}))

        if (checked) {
            dispatch(addAmountOfMoney(calculate(calculateName, count)));
        } else {
            dispatch(removeAmountOfMoney(calculate(calculateName, count)));
        }
    }

    const formatUnit = (unit) => {
        const parts = unit.split(/(м2)/g);

        return parts.map((part, index) => {
            if (part === 'м2') {
                return (
                    <span key={index}>
                                  м<sup>2</sup>
                                </span>
                );
            }

            return part;
        });
    }

    const renderRoomWorksItems = (arr) => {
        if (arr.length === 0) {
            return (
                <span className='room-works__content-none'>Элементов нету.</span>
            )
        } else {
            return arr.map(({name, count, unit, calculateName, id, checked = false}) => {
                return (
                    <div className="room-works__checkbox" key={id}>
                        <label className="room-works__checkbox-title" htmlFor={id}>{name} <span
                            className="room-works__checkbox-price">{count}{formatUnit(unit)}</span></label>
                        <div className="custom-checkbox-container">
                            <input
                                type="checkbox"
                                id={id}
                                checked={checked}
                                className="custom-checkbox"
                                onChange={e => workCalculate(e, calculateName, count, id)}
                            />
                            <label htmlFor={id} className="custom-checkbox-label"></label>
                        </div>
                    </div>
                )
            })
        }
    }

    const elements = renderRoomWorksItems(roomWorksItems);

    return (
        <div className="room-works">
            <div className="room-works__title">
                <h3 className='room-works__title-item'>Название необходимых работ:</h3>
            </div>

            <div className="room-works__content">
                {roomWorksLoadingStatus === 'loading' ? <Spinner/> : elements}
            </div>

            <Notes/>
        </div>
    );
};

export default RoomWorks;