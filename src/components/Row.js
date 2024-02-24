import React, {useEffect} from 'react';

const Row = () => {

    useEffect(() =>
    {
        document.getElementById("now").valueAsDate = new Date();
    })

    return (
        <div className={'rowTime'}>
            <input id={'now'} type={"date"}/>
            <select id={'time'}>
                <option>19:15</option>
                <option>16:15</option>
                <option>15:15</option>
                <option>Ночь</option>
                <option>до 24</option>
                <option>с 21:30</option>
                <option>Болезнь</option>
                <option>Отпуск</option>
            </select>
        </div>
    );
};

export default Row;