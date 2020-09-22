interface Action {
    type: string,
    data: {
      user: any,
      name: string
    }
  }
  
  const defaultState = {
    user: null,
    name: null
  }
  
  const activityReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          user: action.data.user,
          name: action.data.name
        };
      default:
        return state;
    }
  }
  
  export default activityReducer;
  