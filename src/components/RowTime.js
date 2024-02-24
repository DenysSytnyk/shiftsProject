import React from 'react';

const RowTime = ({date, time}) => {

    let d = new Date(date);
    let day = d.getDate();
    let month = d.getUTCMonth() +1;
    let year = d.getFullYear();

    switch (month) {
        case 1:
            month = 'Янв';
            break;
        case 2:
            month = 'Фев';
            break;
        case 3:
            month = 'Мар';
            break;
        case 4:
            month = 'Апр';
            break;
        case 5:
            month = 'Май';
            break;
        case 6:
            month = 'Июнь';
            break;
        case 7:
            month = 'Июль';
            break;
        case 8:
            month = 'Авг';
            break;
        case 9:
            month = 'Сен';
            break;
        case 10:
            month = 'Окт';
            break;
        case 11:
            month = 'Ноб';
            break;
        case 12:
            month = 'Дек';
            break;
        default: month = '';
    }

    let formattedDate = day + "-" + month + "-" + year;
    return (
        <div className={'rowSave'}>
            <p className={'date'}>{formattedDate}</p>
            <p>-</p>
            <p className={'time'}>{time}</p>
        </div>
    );
};

export default RowTime;