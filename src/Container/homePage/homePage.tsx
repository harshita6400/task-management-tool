import styled from "@emotion/styled";
import { Box, Button, Card, CardActionArea, CardContent, Modal, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { assignedTo, data, state } from "../../data/taskData";
import { TaskCard } from "../taskCard/taskCard";
import { StrictModeDroppable } from "../strictModeDropable";
import { TaskForm } from "../taskForm/taskForm";
import { Task } from "../../Interface/taskInterface";


const Container = styled.div`
  display: flex;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;
  
export const HomePage = ()=>{
    const [openModal, setOpenModal] = useState(false)
    const [formData, setFormData] = useState<any>({})
    const [taskdata, setTaskData] = useState(data)
    const [searchedValue, setSearchedValue] = useState("")
    const [filterdValue, setFilteredValue] = useState("")


    const addData = ()=>{
        setFormData({
            title:"",
            details:"",
            state:"",
            assignedTo:""
        })
        setOpenModal(true)
    }

    const handleClose = ()=>{
        setOpenModal(false)
        setFormData({})
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (event:any)=> {
        event?.preventDefault()
        const updatedTaskData: any = {...taskdata}
        if(formData?.id){
            if(formData?.state !== formData?.previousState){
                updatedTaskData[formData.previousState] = updatedTaskData[formData.previousState].filter((item)=>item?.id !== formData.id)
                updatedTaskData[formData.state].push(formData)
            }else{
                const index = taskdata[formData.state].findIndex((item)=>item.id === formData.id)
                updatedTaskData[formData.state].splice(index, 1, formData)
            }
        }else{
            const newData = {...formData, id: new Date().valueOf()}
            updatedTaskData[formData.state]?.push(newData)
        }
        setTaskData(updatedTaskData)
        handleClose()
    }

    const handleDelete =()=>{
        const updatedTaskData: any = {...taskdata}
        const index = taskdata[formData.state].findIndex((item)=>item.id === formData.id)
        updatedTaskData[formData.state].splice(index, 1)
        setTaskData(updatedTaskData)
        handleClose()
    }

    const filteredTasks = useMemo(()=>{
        if(filterdValue){
            const updatedTaskData: any = {...taskdata}
            state.forEach((item) => {
                updatedTaskData[item as keyof typeof data] = updatedTaskData[item as keyof typeof data].filter((item)=>item?.assignedTo === filterdValue)
            });
            return updatedTaskData
        }
        else return taskdata
    },[taskdata, filterdValue])

    const searchedTasks = useMemo(()=>{
        if(searchedValue){
            const updatedTaskData = {...filteredTasks}
            state.forEach((item) => {
                updatedTaskData[item as keyof typeof data] = updatedTaskData[item as keyof typeof data].filter((item)=>item?.title?.toLocaleLowerCase().includes(searchedValue?.toLocaleLowerCase()))
            });
            return updatedTaskData
        }
        else return filteredTasks
    },[searchedValue, filteredTasks])

    const onTaskEdit = (taskDetails: Task)=>{
        setFormData({
            ...taskDetails,
            previousState: taskDetails?.state
        })
        setOpenModal(true)
    }

    const onDragEnd=(result: any)=>{

        debugger

        if (!result.destination) {
            return;
        }

    }

    return (
        <>
        <Box>
            <input type="text" placeholder="  Search the tasks" value={searchedValue} onChange={(event)=>setSearchedValue(event?.target?.value)}/>
            <select name="assignedTo" value={filterdValue} onChange={(event)=>setFilteredValue(event?.target?.value)}>
            <option value={""}>All</option>
                {
                    assignedTo?.map((item, index)=>(
                        <option value={item} key={index}>{item}</option>
                    ))
                }
            </select>
            <Button onClick={addData} variant="contained">Add Task</Button>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <TaskColumnStyles>
                    {
                        Object.keys(taskdata).map((item)=>{
                            return(
                                <StrictModeDroppable
                                    key={item} 
                                    droppableId={'droppable'}
                                    type="COLUMN"
                                    direction="horizontal"
                                >

                                    {(provided) => (
                                        <>
                                        <TaskList
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        >
                                            <Title>{item}</Title>
                                           {
                                            (searchedTasks[item as keyof typeof data]).map((task, index)=>{
                                               return(
                                                <TaskCard onClick={onTaskEdit} key={task?.id} task={task} index={index}/>
                                               )
                                            })
                                           }
                                           {provided.placeholder}
                                        </TaskList>
                                        </>
                                    
                                )}
                                </StrictModeDroppable>
                            )
                        })
                    }
            </TaskColumnStyles>
        </Container>
        </DragDropContext>
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <TaskForm handleDelete={handleDelete} onChange={handleChange} formData={formData} handleSubmit={handleSubmit}/>
        </Modal>
        </>
    )
}
