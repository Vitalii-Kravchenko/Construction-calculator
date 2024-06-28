import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    roomAreaFetchData,
    roomAreaSetTotalSizeArea,
    roomAreaSetTotalSizeHeight,
    roomAreaSetCeilingHeight,
    roomAreaUpdateOne,
    selectAll,
} from './roomAreaSlice';

import {selectAll as selectAllRoomWorks} from '../roomWorks/roomWorksSlice';

import {addAmountOfMoney, resetAmountOfMoney} from '../totalCost/totalCostSlice';

import useCalculate from "../../../hooks/useCalculate";

import Notes from "../../notes/Notes";
import Spinner from "../../spinner/Spinner";

import './roomArea.sass';

const RoomArea = () => {
    const roomAreaCeilingHeight = useSelector(
        state => state.roomArea.roomAreaCeilingHeight
    );
    const roomAreaItems = useSelector(selectAll);
    const roomAreaLoadingStatus = useSelector(
        state => state.roomArea.roomAreaLoadingStatus
    );
    const roomAreaTotalSize = useSelector(
        state => state.roomArea.roomAreaTotalSize
    );
    const roomWorksItems = useSelector(selectAllRoomWorks);

    const inputMin = 0;
    const inputMax = 99999;

    const dispatch = useDispatch();
    const {calculate} = useCalculate();

    useEffect(() => {
        if (roomAreaItems.length === 0) {
            dispatch(roomAreaFetchData());
        }
    }, []);

    useEffect(() => {
        if (roomAreaItems.length !== 0) {
            const totalSize = roomAreaItems.reduce((acc, {value}) => {
                if (value < inputMin || value > inputMax || value === '') {
                    return acc + 0;
                }

                return acc + parseFloat(value);
            }, 0);

            let height;

            if (roomAreaCeilingHeight < inputMin || roomAreaCeilingHeight > inputMax || roomAreaCeilingHeight === '') {
                height = 0;
            } else {
                height = parseFloat(roomAreaCeilingHeight);
            }

            dispatch(roomAreaSetTotalSizeArea(totalSize));
            dispatch(roomAreaSetTotalSizeHeight(height));
        }
    }, [roomAreaItems, roomAreaCeilingHeight]);

    useEffect(() => {
        dispatch(resetAmountOfMoney());

        roomWorksItems.forEach(({calculateName, count, checked}) => {
            if (checked) {
                dispatch(addAmountOfMoney(calculate(calculateName, count)));
            }
        })
    }, [roomAreaTotalSize]);

    const onChangeInputValue = (e, id) => {
        const value = e.target.value === '' ? 0 : e.target.value;
        dispatch(roomAreaUpdateOne({id, changes: {value}}))
    }

    const renderRoomAreaItems = (arr) => {
        if (arr.length === 0) {
            return (
                <span className='room-area__content-none'>Элементов нету.</span>
            )
        } else {
            return arr.map(({name, value, id}) => {
                return (
                    <div className="room-area__input" key={id}>
                        <label className='room-area__input-label' htmlFor={id}>{name}</label>
                        <div className="room-area__input-wrapper">
                            <input
                                className='room-area__input-item'
                                id={id}
                                type="number"
                                placeholder='0.0'
                                min={inputMin}
                                max={inputMax}
                                step='0.1'
                                value={value === 0 ? '' : value}
                                onChange={(e) => onChangeInputValue(e, id)}
                            />
                            <span className='room-area__input-text'>м<sup>2</sup></span>
                        </div>
                    </div>
                )
            })
        }
    }

    const onChangeInputCeiling = (e) => {
        const value = e.target.value === '' ? 0 : e.target.value;

        dispatch(roomAreaSetCeilingHeight(value));

    }

    const elements = renderRoomAreaItems(roomAreaItems);

    return (
        <div className="room-area">
            <div className="room-area__input">
                <label className='room-area__input-label' htmlFor='input-ceiling-height'>Высота потолка в
                    квартире:</label>
                <div className="room-area__input-wrapper">
                    <input
                        className='room-area__input-item'
                        id='input-ceiling-height'
                        type="number"
                        placeholder='0.0'
                        min={inputMin}
                        max={inputMax}
                        step='0.1'
                        value={roomAreaCeilingHeight === 0 ? '' : roomAreaCeilingHeight}
                        onChange={e => onChangeInputCeiling(e)}
                    />
                    <span className='room-area__input-text'>м</span>
                </div>
            </div>

            <div className="room-area__title">
                <h3 className='room-area__title-item'>Площадь отдельных комнат:</h3>
            </div>

            <div className="room-area__content">
                {roomAreaLoadingStatus === 'loading' ? <Spinner/> : elements}
            </div>

            <Notes/>
        </div>
    );
};

export default RoomArea;