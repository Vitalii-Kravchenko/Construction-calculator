import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {roomAreaFetchData, selectAll} from './roomAreaSlice';

import Notes from "../../notes/Notes";
import Spinner from "../../spinner/Spinner";

import './roomArea.sass';

const RoomArea = () => {
    const roomAreaItems = useSelector(selectAll);
    const roomAreaLoadingStatus = useSelector(
        state => state.roomArea.roomAreaLoadingStatus
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(roomAreaFetchData());
    }, []);

    const renderRoomAreaItems = (arr) => {
        if (arr.length === 0) {
            return (
                <span className='room-area__content-none'>Элементов нету.</span>
            )
        } else {
            return arr.map(({name, value, id}) => {
                return (
                    <div className="room-area__input" key={id}>
                        <label className='room-area__input-label'>{name}</label>
                        <div className="room-area__input-wrapper">
                            <input
                                className='room-area__input-item'
                                type="number"
                                placeholder='0.0'
                                min='0'
                                max='99999'
                                step='0.1'
                            />
                            <span className='room-area__input-text'>м<sup>2</sup></span>
                        </div>
                    </div>
                )
            })
        }
    }

    const elements = renderRoomAreaItems(roomAreaItems);

    return (
        <div className="room-area">
            <div className="room-area__input">
                <label className='room-area__input-label'>Высота потолка в квартире:</label>
                <div className="room-area__input-wrapper">
                    <input
                        className='room-area__input-item'
                        type="number"
                        placeholder='0.0'
                        min='0'
                        max='99999'
                        step='0.1'
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