const initState = {
  task: [],
  value: {},
  selected: undefined,
};

export const addTask = (state = initState, action) => {
  switch (action.type) {
    case "ADD_VALUES":
      return { ...state, value: action.payload };
    case "ADD_TASK":
      return { ...state, task: state.task.concat(action.payload), value: {} };
    case "DELETE_TASK":
      return {
        ...state,
        task: state.task.filter((task, i) => i !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        value: state.task[action.payload],
        selected: action.payload,
      };
    case "EDITED_TASK":
      return {
        ...state,
        task: state.task.map((tasks, i) =>
          i !== action.payload.selected ? tasks : action.payload.value
        ),
        selected: undefined,
      };
    default:
      return state;
  }
};
