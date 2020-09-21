interface Action {
    type: string
  }
  
  const defaultState = {
    load: false
  }
  
  const loadingReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
      case 'LOAD_ON':
        return {
          load: true
        };
      case 'LOAD_OFF':
        return {
          load: false
        };
      default:
        return state;
    };
  }
  
  export default loadingReducer;
  