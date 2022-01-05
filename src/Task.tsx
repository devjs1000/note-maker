import React from 'react';

const Task = (props:any) => {
    const clickHandle=()=>{
       
        props.removefn(props.taskKey)
    }
    const MarkHandle=()=>{
        props.markfn(props.taskKey)
    }
    return (
        <div className='task'>
            {props.state ? 
        <h3 className='done'>{props.task}</h3>:
        <h3 className='not-done'>{props.task}</h3> }
        <div className='controllers'>
        <input type='checkbox' value={props.state} onClick={MarkHandle} />

        <button onClick={clickHandle} className='remove'><i className="fa fa-times"></i></button>
        
        </div>
        </div>
    );
}

export default Task;
