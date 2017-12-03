const test = (state = '000', action) => {
    switch (action.type) {
      case 'TEST':
        return action.msg + "!!!";
      default:
        return state;
    }
  }
  
  export default test