import { Box, Button } from "@mui/material";
import React, { ChangeEvent, FormEvent, FormEventHandler } from "react";
import { assignedTo, state } from "../../data/taskData";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps{
    formData:  {
        id?: number,
        title?: string,
        details?: string,
        state?:string,
        assignedTo?: string
    },
    onChange: any
    handleSubmit: any
    handleDelete: any

}

export const TaskForm:React.FC<IProps> =({formData, onChange, handleSubmit, handleDelete})=>{

    return(
        <>
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData?.title} onChange={onChange}/>
            <br/><br/><br/>
            <input type="text" name="details" value={formData?.details} onChange={onChange}/>
            <br/><br/><br/>
            <select name="state" value={formData?.state} onChange={onChange}>
                {
                    state?.map((item, index)=>(
                        <option value={item} key={index}>{item}</option>
                    ))
                }
            </select>
            <br/><br/><br/>
            <select name="assignedTo" value={formData?.assignedTo} onChange={onChange}>
                {
                    assignedTo?.map((item, index)=>(
                        <option value={item} key={index}>{item}</option>
                    ))
                }
            </select>
            <br/><br/><br/>
            <Button type="button" variant="contained" onClick={handleDelete}>Delete</Button>
            <Button type="submit" variant="contained">Submit</Button>
        </form>
        </Box>
        </>
    )
}
