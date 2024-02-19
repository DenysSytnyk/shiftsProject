
import React, {useState} from 'react';


const Shift = (props) =>
{
const [state, setState] = useState(props.isEdit)

   const handleClickEdit = function ()
    {
        props.updateTask(props.index)
       setState({isEdit: true});
    }
  const  handleClickRemove = () => props.deleteTask(props.index);

   const handleClickSave = () =>
    {
        props.saveTask(props.index);
        setState({isEdit: false});
    }

  const  renderNorm = () =>
    {
        return (
            <div className='boxDone'>
                <div className={'right'}>{props.children}</div>
                <img onClick={handleClickRemove} className={'icons'} src={'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'}/>
                <img onClick={handleClickEdit} className={'icons'} src={'https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png'}/>
            </div>
        );
    }

  const  renderEdit = () =>
    {
        return (
            <div className='box'>
                <div className={'right'}>{props.children}</div>
                <img onClick={handleClickRemove} className={'icons'} src={'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'}/>
                <img onClick={handleClickSave} className={'icons'} src={'https://static.thenounproject.com/png/2853302-200.png'}/>

            </div>
        )
    }
    {
        if(state.isEdit)
            return renderEdit();
        else
            return renderNorm();
    }
}

export default Shift;