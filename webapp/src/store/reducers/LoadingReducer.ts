interface Action {
    type: string
  }
  
  const defaultState = {
    load: false,
    frame: 'loadOff'
  }
  
  const loadingReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
      case 'LOAD_ON':
        return {
          load: true,
          frame: 'loadOn'
        };
      case 'LOAD_OFF':
        return {
          load: false,
          frame: 'loadOff'
        };
      default:
        return state;
    };
  }
  
  export default loadingReducer;
  