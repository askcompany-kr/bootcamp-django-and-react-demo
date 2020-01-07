import {useReducer} from 'react';


const reducer = (state, action) => ({
  ...state,
  [action.name]: action.value
});


const useInputs = (initialForm) => {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
};


export default useInputs;
