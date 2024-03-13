
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
    const  renderDiv = () =>
    {
        return (
          <div onDoubleClick={handleClickRemove} className='boxDone'>
             <div className={'dividerWeek'}>{props.children}</div>
              </div>
        );
    }

  const  renderNorm = () =>
    {
        return (
            <div className='boxDone'>
                <div className={'right'}>{props.children}</div>

                <img onClick={handleClickRemove} alt={"del"} className={'icons'} src={'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'}/>
                <img onClick={handleClickEdit} alt={"edit"} className={'icons'} src={'https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png'}/>

            </div>
        );
    }

  const  renderEdit = () =>
    {
        return (
            <div className='boxShift'>
                <div className={'right'}>{props.children}</div>
        <div className={'buttons'}>
                <img onClick={handleClickRemove} alt={"del"} className={'icons'} src={'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'}/>
                <img onClick={handleClickSave} alt={"save"} className={'icons'} src={'https://static.thenounproject.com/png/2853302-200.png'}/>
        </div>
            </div>
        )
    }


    if (props.children.props.date === '')
    {
        return renderDiv()
    }

        if(state.isEdit)
            return renderEdit();
        else
            return renderNorm();

}

export default Shift;