import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {roomAreaFetchData, roomAreaSetCeilingHeight, roomAreaSetTotalSize, selectAll} from './roomAreaSlice';

import Notes from "../../notes/Notes";
import Spinner from "../../spinner/Spinner";

import './roomArea.sass';

const RoomArea = () => {
    const roomAreaItems = useSelector(selectAll);
    const roomAreaLoadingStatus = useSelector(
        state => state.roomArea.roomAreaLoadingStatus
    );

    const [inputValueCeilingHeight, setInputValueCeilingHeight] = useState('');
    const [inputsValue, setInputsValue] = useState({});
    const [inputMin, setInputMin] = useState(0);
    const [inputMax, setInputMax] = useState(99999);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(roomAreaFetchData());
    }, []);

    useEffect(() => {
        if (roomAreaItems.length !== 0) {
            const initInputsValue = {};

            roomAreaItems.forEach(({id, value}) => {
                initInputsValue[id] = value;
            })

            setInputsValue({...inputsValue, ...initInputsValue});
        }
    }, [roomAreaItems]);

    useEffect(() => {
        if (Object.keys(inputsValue).length !== 0) {
            const totalSize = Object.values(inputsValue).reduce((acc, value) => {
                if (value < inputMin || value > inputMax || value === '') {
                    return acc + 0;
                }

                return acc + parseFloat(value);
            }, 0);

            dispatch(roomAreaSetTotalSize(totalSize));
        }
    }, [inputsValue]);

    const onChangeInputValue = (e, id) => {
        setInputsValue({...inputsValue, [id]: e.target.value});
    }

    const renderRoomAreaItems = (arr) => {
        if (arr.length === 0) {
            return (
                <span className='room-area__content-none'>Элементов нету.</span>
            )
        } else {
            return arr.map(({name, id}) => {
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
                                value={inputsValue[id] || ''}
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
        const ceilingHeight = e.target.value;

        setInputValueCeilingHeight(ceilingHeight);

        if (ceilingHeight < inputMin || ceilingHeight > inputMax || ceilingHeight === '') {
            dispatch(roomAreaSetCeilingHeight(0));
        } else {
            dispatch(roomAreaSetCeilingHeight(parseFloat(ceilingHeight)));
        }
    }

    const elements = renderRoomAreaItems(roomAreaItems);

    return (
        <div className="room-area">
            <div className="room-area__input">
                <label className='room-area__input-label' htmlFor='input-ceiling-height'>Высота потолка в квартире:</label>
                <div className="room-area__input-wrapper">
                    <input
                        className='room-area__input-item'
                        id='input-ceiling-height'
                        type="number"
                        placeholder='0.0'
                        min={inputMin}
                        max={inputMax}
                        step='0.1'
                        value={inputValueCeilingHeight}
                        onChange={onChangeInputCeiling}
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