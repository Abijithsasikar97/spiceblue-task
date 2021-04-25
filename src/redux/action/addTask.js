export const addObject = value => ({
    type: 'ADD_VALUES',
    payload: value
})

export const addTask = task => ({
    type: 'ADD_TASK',
    payload: task
});

export const deleteTask = task => ({
    type: 'DELETE_TASK',
    payload: task
})

export const editTask = task => ({
    type: 'EDIT_TASK',
    payload: task
})

export const editedTask = valueObj => ({
    type: 'EDITED_TASK',
    payload: valueObj
})