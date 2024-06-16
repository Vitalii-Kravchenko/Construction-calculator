import './notes.sass';

const Notes = () => {
    return (
        <div className="notes">
            <h4 className="notes__title">Примечания:</h4>
            <ul className="notes-list">
                <li className="notes-list__item">устанавливайте площадь помещений там, где необходим ремонт</li>
                <li className="notes-list__item">если есть дополнительные комнаты, например, Спальня №3, то добавляйте их площадь к существующим в калькуляторе</li>
            </ul>
        </div>
    );
};

export default Notes;