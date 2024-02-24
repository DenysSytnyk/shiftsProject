
import React, {useState} from 'react';


const Month = (props) =>
{
const [state, setState] = useState(props.isEdit)
    const [hide, setHide] = useState(props.isHide);
const newText = React.createRef();
   const handleClickEdit = function ()
    {
       setState({isEdit: true});
    }
  const  handleClickRemove = () => props.deleteTask(props.index);

   const handleClickSave = () =>
    {
        const value = newText.current.value;
        props.updateTask(props.index, value);
        setState({isEdit: false});
    }
const handleHideMonth = () =>
{
    setHide(!hide)
    props.hideMonth(props.index, !hide);
}
  const  renderNorm = () =>
    {
        return (
            <div className='box'>
                <div className={hide? 'monthWrapperHide':'monthWrapper'}>
                    <img alt={"lock"} className={hide? 'lockIco' : 'shiftHide'} onClick={() => handleHideMonth()} src={'https://cdn.iconscout.com/icon/free/png-256/free-lock-1438412-1213982.png'}></img>
                    <img alt={"lock"} className={hide? 'shiftHide' : 'lockIco'} onClick={() => handleHideMonth()} src={'https://cdn-icons-png.flaticon.com/512/158/158599.png'}></img>
                    <div className={'monthName'}>{props.name}</div>
                    <div className={'buttons'}>
                        <img alt={"del"} onClick={handleClickRemove} className={'icons'} src={'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'}/>
                        <img alt={"edit"} onClick={handleClickEdit} className={'icons'} src={'https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png'}/>
                    </div>
                </div>
              <div className={hide? 'shiftHide' : 'shiftNonHide'}>{props.children}</div>
            </div>
        );
    }

  const  renderEdit = () =>
    {
        return (<div className={'box'}>
            <div className={hide? 'monthWrapperHide':'monthWrapper'}>
            <img alt={"lock"} className={hide? 'lockIco' : 'shiftHide'} onClick={() => handleHideMonth()} src={'https://cdn.iconscout.com/icon/free/png-256/free-lock-1438412-1213982.png'}></img>
            <img alt={"lock"} className={hide? 'shiftHide' : 'lockIco'} onClick={() => handleHideMonth()} src={'https://cdn-icons-png.flaticon.com/512/158/158599.png'}></img>
            <div className={'monthWrapper'}>
            <textarea className={'holderMonth'} placeholder={"Название периода"}  ref={newText}></textarea>
            <img alt={"del"} onClick={handleClickRemove} className={'icons'} src={'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'}/>
            <img alt={"save"} onClick={handleClickSave} className={'icons'} src={'https://static.thenounproject.com/png/2853302-200.png'}/>
        </div>
            </div>
            <div className={hide? 'shiftHide' : 'shiftNonHide'}>{props.list}</div>
        </div>)
    }


        if(state.isEdit)
            return renderEdit();
        else
            return renderNorm();

}

export default Month;