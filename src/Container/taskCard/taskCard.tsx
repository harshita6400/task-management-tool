import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

import { Task } from '../../Interface/taskInterface'

interface IProps{
    task:  Task,
    index: number,
    onClick: (task:Task)=> void
}

export const TaskCard:React.FC<IProps> =({ task, index, onClick })=>{
    return(
        <Draggable key={`item-${task.id}`} draggableId={`item-${task.id}`} index={task?.id}>

        {(provided) => (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >

                <Card key={`item-${task.id}`} sx={{ margin: "5px 0px",}}>
                    <CardActionArea
                        sx={{
                        height: '100%',
                        '&[data-active]': {
                            backgroundColor: 'action.selected',
                            '&:hover': {
                            backgroundColor: 'action.selectedHover',
                            },
                        },
                        }}
                        onClick={()=>onClick(task)}
                    >
                        <CardContent sx={{ height: '100%' }}>
                        <Typography variant="h5" component="div">
                            {task?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {task.details}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Assigned To:</b>&nbsp;{task.assignedTo}
                        </Typography>
                        
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )}
        </Draggable>
    )

}
