const setUser = (user: any, name: string) => {
    return {
      type: 'SET_USER',
      data: {
        user: user,
        name: name
      }
    }
  }
  
  export {setUser};
  