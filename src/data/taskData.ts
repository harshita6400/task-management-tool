
export const state = [ 'Todo', 'In-progress', 'Ready-for-QA', 'Done']
export const assignedTo = [ 'John', 'Mack', 'Herry', 'Annie']

export const data = {
    'Todo': [
        {
            id: 1,
            title: 'Task 1',
            details:"task 1 details",
            state:"Todo",
            assignedTo: "John",
        },
        {
            id: 2,
            title: 'Task 2',
            details:"Task 2 details",
            state:"Todo",
            assignedTo: "Mack",
        },
        {
            id: 3,
            title: 'Task 3',
            details:"Task 3 details",
            state:"Todo",
            assignedTo: "Annie",
        },
        {
            id: 4,
            title: 'Task 4',
            details:"Task 4 details",
            state:"Todo",
            assignedTo: "John",
        },
    ],
    'In-progress':[
        {
            id: 5,
            title: 'Task 5',
            details:"Task 5 details",
            state:"In-progress",
            assignedTo: "Herry",
        },
        {
            id: 6,
            title: 'Task 6',
            details:"Task 6 details",
            state:"In-progress",
            assignedTo: "John",
        },
    ],
    'Ready-for-QA':[],
    'Done':[],      
}