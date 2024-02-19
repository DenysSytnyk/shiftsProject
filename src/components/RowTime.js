import React from 'react';

const RowTime = ({date, time}) => {


    return (
        <div className={'rowSave'}>
            <p className={'date'}>{date}</p>
            <p>-</p>
            <p className={'time'}>{time}</p>
        </div>
    );
};

export default RowTime;