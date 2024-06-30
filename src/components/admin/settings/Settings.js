import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {
    settingsFetchData,
    settingsSendData,
    setNewItemsCount,
    selectAll,
} from "./settingsSlice";

import Notes from "../../notes/Notes";

import './settings.sass';
import {setLoginStatus} from "../login/loginSlice";

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settingsItems = useSelector(selectAll);
    const newItemsCount = useSelector(
        state => state.settings.newItemsCount
    );
    const minInputValue = 10;
    const maxInputValue = 99999;

    useEffect(() => {
        dispatch(settingsFetchData());
    }, []);

    const onChangeInputValue = (e, id) => {
        const count = e.target.value;

        dispatch(setNewItemsCount({[id]: parseFloat(count)}));
    }

    const onSubmitInputValue = (e, id, oldCount) => {
        if (newItemsCount[id] < minInputValue || newItemsCount[id] > maxInputValue) {
            dispatch(setNewItemsCount({[id]: oldCount}));
        } else {
            dispatch(settingsSendData(newItemsCount));
        }
    }

    const onKeyDown = (e, id, oldCount) => {
        if (e.key === 'Enter') {
            onSubmitInputValue(e, id, oldCount);
            e.target.blur(); // Потеря фокуса
        }
    }

    const renderSettingsItems = (arr) => {
        if (arr.length === 0) {
            return (
                <span className='settings-content__none'>Элементов нету.</span>
            )
        } else {
            return arr.map(({name, count, unit, id}) => {
                return (
                    <div className="settings-input" key={id}>
                        <label className='settings-input__label' htmlFor={id}>{name}</label>
                        <div className="settings-input__wrapper">
                            <input
                                className='settings-input__item'
                                id={id}
                                type="number"
                                placeholder={count}
                                min={minInputValue}
                                max={maxInputValue}
                                step='1'
                                value={newItemsCount[id] === count ? '' : newItemsCount[id] === 0 || newItemsCount[id] ? newItemsCount[id] : ''}
                                onChange={(e) => onChangeInputValue(e, id, count)}
                                onBlur={e => onSubmitInputValue(e, id)}
                                onKeyDown={(e) => onKeyDown(e, id, count)}
                            />
                            <span className='settings-input__text'>{unit}</span>
                        </div>
                    </div>
                )
            })
        }
    }

    const exit = (e) => {
        e.preventDefault();

        localStorage.removeItem("logged");
        dispatch(setLoginStatus(false));

        navigate('/');
    }

    const elements = renderSettingsItems(settingsItems);

    return (
        <div className="settings">
            <div className="container settings-container">
                <div className="settings__title">
                    <h3 className='settings__title-item'>Установите средний ценник каждой работы:</h3>
                </div>
                <div className="settings-content">
                    {elements}
                </div>

                <div className="settings-footer">
                    <Notes/>
                    <a className='button button-accent settings-footer__button' href="#" onClick={exit}>Выйти</a>
                </div>
            </div>
        </div>
    );
};

export default Settings;