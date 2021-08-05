
import { useState, useEffect, useReducer } from 'react';

export default function reducer(state = {theCount: 0}, action){
  switch(action.type) {
      case 'INCREMENT':
          return {theCount: state.theCount + 1}
      case 'RESET':
          return {theCount: 0}
      default:
          return state
  }
}

// export default function UpdateCount(count) {
//
//     const [state, dispatch] = useReducer(reducer, {theCount: 0});
//
//     useEffect(() => {
//         dispatch({type: 'UPDATE', payload: count})
//
//     }, count)
//
//     return state;
// }