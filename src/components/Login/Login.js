import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

//Whenever the actions is triggered react automatically triggers reducer function and pass it the last snapshot of the state and also all the data executed inside the component 

const emailReducer = (state, action) => {

if (action.type === 'USER_INPUT'){
  return {value: action.val, isValid: action.val.includes('@')};
}
if(action.type === 'INPUT_BLUR'){
  
  return {value: state.value, isValid: state.value.includes('@') };
}
  //getting the last state and returning the updated state
  return {value: '', isValid: false};
};

const pswdReducer = (state, action) => {

  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length>6}
  }
  if(action.type=== 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length>6}
  }

  return {value: '', isValid: false}
}
const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

const [formIsValid, setFormIsValid] = useState(false);

const [stateEmail, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});

const [statePswd, dispatchPswd] = useReducer(pswdReducer, {value: '', isValid: false})

const authCtx = useContext(AuthContext);

//Object destructuring when you need a single valur from a object  const {Value you wanna extract : your new const name} = Object name 
const {isValid: emailIsValid} = stateEmail ;
const {isValid: pswdIsValid} = statePswd;

  useEffect(() => {
    const identifier =setTimeout(() => {
      console.log("checking th  e validity")
      setFormIsValid(
        emailIsValid && pswdIsValid
      );
    }, 500);
    return () => {
      console.log("Clean Up");
      clearTimeout(identifier);
    };
  }, [emailIsValid, pswdIsValid]);
  
  
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
    // setFormIsValid(
    //   event.target.value.includes('@') && statePswd.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPswd({type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   statePswd.isValid && stateEmail.isValid
    // ); 
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(stateEmail.isValid);
    dispatchEmail({type: 'INPUT_BLUR' })

  };

  const validatePasswordHandler = () => {
   // setPasswordIsValid(enteredPassword.trim().length > 6);
   dispatchPswd({type: 'INPUT_BLUR'})

  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(stateEmail.value, statePswd.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${stateEmail.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={stateEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input id="email" label="E-Mail" type="email" isValid={emailIsValid} value={stateEmail.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        {/* <div
          className={`${classes.control} ${statePswd.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={statePswd.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
                <Input id="password" label="Password" type="password" isValid={pswdIsValid} value={statePswd.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;