import React, { useState, useEffect, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'User_Input') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'Input_Blur') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
  //  it return new state as an object
}
const passwordReducer = (state, action) => {
  if(action.type === 'User_password'){
    return {value: action.val, isValid: action.val.length > 6}  // entered input takinng
  }
  if(action.type === 'Input_Blur'){
    return {value: state.val, isValid: true}   // checkinng input is valid or not
  }
  return { value: '', isValid: false }
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollegeName, setCollegename] = useState('');
  const [collegeIsValid, collegeNameIsValid] = useState();

  const authCtx = useContext(AuthContext)


  {/* useReducer => its used to manage complex state */ }
  const [emailState, dispatchEmail] = useReducer(emailReducer,
    {
      value: '',
      isValid: false
    });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,
    {
      value: '', isValid: false
    })

    
    {/*UseEffect used here */}
  //   useEffect(() => {
  //     const identifier = setTimeout(() => {
  //       console.log('chaking validaion')
  //       setFormIsValid(
  //         enteredEmail.includes('@') && enteredPassword.trim().length > 6 &&
  //         enteredCollegeName.length !== 0
  //       );
  //       console.log('after run set time out')
  //     }, 500)
  // {/*The arrow function passed as an argument to useEffect is executed after
  //  every render. This function can return another function, which will be used as a 
  //  cleanup function to be executed before the component is removed from the DOM. */}
  //     return () => {
  //       console.log('CLEANUP FUNCTION')
  //       clearTimeout(identifier);
  //     }
  //   }, [enteredEmail, enteredPassword, enteredCollegeName])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'User_Input', val: event.target.value })

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid.trim().length > 6 &&
      enteredCollegeName.length !== 0
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'User_password', val: event.target.value })

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 &&
      enteredCollegeName.length !== 0
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);  {/*.includes('@')*/}
    dispatchEmail({ type: 'Input_Blur' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'Input_Blur' })
  };

  const collgeNameChangeHandler = (event) => {
    setCollegename(event.target.value)
  }
  const collgeNameHandler = () => {
    collegeNameIsValid(enteredCollegeName.trim().length === 0)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('I am in Login')
    authCtx.onLogin(emailState.value, passwordState.value, enteredCollegeName);
  };


  return (
    <React.Fragment>
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={`${classes.control}
         ${!collegeIsValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="college-name">College Name</label>
          <input
            type="text"
            id="college-name"
            value={enteredCollegeName}
            onChange={collgeNameChangeHandler}
            onBlur={collgeNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
    </React.Fragment>
  );
};

export default Login;
