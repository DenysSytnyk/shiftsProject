import React, {useEffect, useState} from 'react';
import Month from "./Month";
import LoginForm from "./forms/LoginForm";
import SignUp from "./forms/SignUp";
import {useDispatch, useSelector} from "react-redux";
import {loginFirebase, logoutFirebase} from "../firebase/auth-service";
import {AUTH_USER} from "../utils/constants";
import {login, logout} from "../redux/authSlice";
import {setCode} from "../redux/errorSlice";
import {setPage} from "../redux/statusPageSlice";
import ShiftsList1 from "./ShiftsList1";



const MonthList = () => {

    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.authUser);
    const currentPage = useSelector(store => store.page.page);
    const dataUser = JSON.parse(localStorage.getItem(`${user}Data`))? JSON.parse(localStorage.getItem(`${user}Data`)): [];
    const [dateTime, setDateTime] = useState(JSON.parse(localStorage.getItem(`${user}Data`)) ||[]);
    const [isHide, setIsHide] =useState(true);
    const [userIcon, setUserIcon] =useState(false);
    const userStyle = userIcon? 'modalUserActive': 'modalUserHide';
    const [state, setState] = useState(dataUser)
    const [isEdit, setIsEdit] = useState({isEdit: false});
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
    const taskEdit = (index, text) => {
        const temp = [...state];
        temp[index].month.name = text;
        setState(temp);
        const check = [...dateTime];
        check[index].month.name = text;
        setDateTime(check)
    }
    const handleHideMonth = (index, hide) =>
    {
        const temp = [...state];
        temp[index].month.hide = hide;
        setState(temp);
        const check = [...dateTime];
        check[index].month.hide = hide;
        setDateTime(check)
    }
    const taskRemove = index => {
        const temp = [...state];
        temp.splice(index, 1);
        setDateTime(temp);
        setState(temp);
    }

    const handleAddTaskClick = () => {
        const arr = [...dateTime];
        arr.push({month:{name: '', hide: false}, shifts:[]});
        setState(arr)
        setDateTime(arr);
        setIsHide(false);
        setIsEdit({isEdit: true})
        window.scrollBy({
            top: 100000,
            behavior: 'smooth'
        })
    }


    function renderWithLogin()
    {
        return (
            <div className={'wrapper'}>
                <div className={'userField'}>
                    <img alt={"ico"} onClick={() => setUserIcon(!userIcon)} className={'userIcon'} src={'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'}/>
                    <div className={userStyle}>
                        <p style={{color: "black"}}>{user}</p>
                        <img alt={"out"} onClick={logoutFn} className={'userIconLogout'} src={'https://icons.veryicon.com/png/o/internet--web/website-icons/logout-8.png'}/>
                    </div>
                </div>
                <div onClick={handleAddTaskClick} className="wrapper">
                    <div className="link_wrapper">
                        <a>Новый месяц</a>
                    </div>
                </div>
                <div className={'field'}>
                    {state.map((item, index) =>
                        <Month key={index} updateTask={taskEdit}
                               deleteTask={taskRemove} hideMonth={handleHideMonth} isHide={item.month.hide} isEdit={isEdit} name={item.month.name} index={index}><ShiftsList1 data={dateTime} shifts={item.shifts} name={item.month.name} index={index}/></Month>)}
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
            default:  return <LoginForm submitFn={loginFn}/>

        }
    }

    useEffect(() =>
    {
        localStorage.removeItem(`${user}Data`);
        localStorage.setItem(`${user}Data`, JSON.stringify(state));
    }, [state])



        return user? renderWithLogin() : renderType()



}
export default MonthList;