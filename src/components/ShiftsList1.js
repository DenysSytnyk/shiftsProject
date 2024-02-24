import React, {useEffect, useState} from 'react';
import Shift from "./Shift";
import Row from "./Row";
import RowTime from "./RowTime";
import {useSelector} from "react-redux";



const ShiftsList = (props) => {


    const user = useSelector(store => store.auth.authUser);
    const [state, setState] = useState({tasks:  props.shifts.map((item) => <RowTime date={item.date} time={item.time}/>)});
    const [dateTime, setDateTime] = useState(props.data ||[]);
    const [isEdit, setIsEdit] = useState({isEdit: false});


    const taskEdit = (index) => {
        const temp = [...state.tasks];
        temp[index] = <Row/>;
        setState({tasks: temp});
    }
    const taskSave = (index) => {
        const check = [...dateTime];
        const temp = [...state.tasks];
        temp[index] =
            <RowTime date={document.getElementById('now').value} time={document.getElementById('time').value}/>;
        setState({tasks: temp});
        check[props.index].shifts[index] = {date: document.getElementById('now').value, time: document.getElementById('time').value};
        setDateTime(check)
    }
    const taskRemove = index => {
        const check = [...dateTime];
        const temp = [...state.tasks];
        temp.splice(index, 1);
        setState({tasks: temp});
        check[props.index].shifts.splice(index, 1);
        setDateTime(check);
    }

    const handleAddTaskClick = () => {
        const arr = [...state.tasks];
        arr.push(<Row/>);
        setState({tasks: arr});
        setIsEdit({isEdit: true});
    }



    useEffect(() =>
    {
        localStorage.removeItem(`${user}Data`);
        localStorage.setItem(`${user}Data`, JSON.stringify(dateTime));
    }, [state])



        return (

        <div >
            <div className="AddWrapper">
                <div className="link_wrapper">
                    <button onClick={handleAddTaskClick} className={'button-88'}>+</button>
                </div>
            </div>
            {state.tasks.map((item, index) =>
                <Shift key={index} updateTask={taskEdit}
                       deleteTask={taskRemove} saveTask={taskSave} index={index} isEdit={isEdit}>{item}</Shift>)}
        </div>

    );


    }
export default ShiftsList;