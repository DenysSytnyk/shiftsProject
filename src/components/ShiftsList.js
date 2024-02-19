import React, {useEffect, useState} from 'react';
import Shift from "./Shift";
import Row from "./Row";
import RowTime from "./RowTime";
import {useDispatch, useSelector} from "react-redux";
import LoginForm from "./forms/LoginForm";
import {login, logout} from "../redux/authSlice";
import {loginFirebase, logoutFirebase} from "../firebase/auth-service";
import {AUTH_USER} from "../utils/constants";
import {setCode} from "../redux/errorSlice";
import SignUp from "./forms/SignUp";
import {setPage} from "../redux/statusPageSlice";


const ShiftsList = () => {


    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.authUser);
const currentPage = useSelector(store => store.page.page);
const dataUser = JSON.parse(localStorage.getItem(`${user}Data`))? JSON.parse(localStorage.getItem(`${user}Data`)): [];
    const [state, setState] = useState({tasks:  dataUser.map((item) => <RowTime date={item.date} time={item.time}/>)});
    const [dateTime, setDateTime] = useState(JSON.parse(localStorage.getItem(`${user}Data`)) ||[]);
    const [isEdit, setIsEdit] =useState({isEdit: false});
    const [userIcon, setUserIcon] =useState(false);
    const userStyle = userIcon? 'modalUserActive': 'modalUserHide';
    async function loginFn(loginData)
    {
        try {
            const email = await loginFirebase(loginData);
            localStorage.setItem(AUTH_USER, email);
            dispatch(login(email));
            dispatch(setCode('OK'));
            dispatch(setPage('home'));
        } catch (e)
        {
            dispatch(setCode('Неверный логин или пароль'));
        }
    }

    async function logoutFn()
    {
      await logoutFirebase();
      localStorage.setItem(AUTH_USER,'');
      dispatch(logout());
        dispatch(setPage('in'));
    }

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
        check[index] = {date: document.getElementById('now').value, time: document.getElementById('time').value};
        setDateTime(check)
    }

    const taskRemove = index => {
        const check = [...dateTime];
        const temp = [...state.tasks];
        temp.splice(index, 1);
        setState({tasks: temp});
        check.splice(index, 1);
        setDateTime(check);
    }

    const handleAddTaskClick = () => {
        const arr = [...state.tasks];
        arr.push(<Row/>);
        setState({tasks: arr});
        setIsEdit({isEdit: true});
    }


function renderWithLogin()
    {
        return (
            <div className={'wrapper'}>
               <div className={'userField'}>
                   <img onClick={() => setUserIcon(!userIcon)} className={'userIcon'} src={'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'}/>
                  <div className={userStyle}>
                      <p style={{color: "black"}}>{user}</p>
                      <img onClick={logoutFn} className={'userIconLogout'} src={'https://icons.veryicon.com/png/o/internet--web/website-icons/logout-8.png'}/>
                  </div>
               </div>
            <div className={'field'}>
                <div onClick={handleAddTaskClick} className="wrapper">
                    <div className="link_wrapper">
                        <a href="#">Добавить смену</a>
                    </div>

                </div>
                {state.tasks.map((item, index) =>
                    <Shift key={index} updateTask={taskEdit}
                           deleteTask={taskRemove} saveTask={taskSave} index={index} isEdit={isEdit}>{item}</Shift>)}
            </div>
            </div>
        );
    }
    function renderType()
    {
        switch (currentPage) {
            case 'home':
                return renderWithLogin();
            case 'in':
                return <LoginForm submitFn={loginFn}/>
            case 'up':
                return <SignUp/>

        }
    }
    useEffect(() =>
    {
        localStorage.removeItem(`${user}Data`);
        localStorage.setItem(`${user}Data`, JSON.stringify(dateTime));
    })

    {

        return user? renderWithLogin() : renderType()

        }
    }
export default ShiftsList;