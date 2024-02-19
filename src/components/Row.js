import React, {useEffect} from 'react';

const Row = () => {

    useEffect((props) =>
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
                <option>Ночь до 24:00</option>
                <option>Ночь с 21:30</option>
            </select>
        </div>
    );
};

export default Row;