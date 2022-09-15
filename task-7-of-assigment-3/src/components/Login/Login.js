import React, { useState ,useEffect,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action)=>{
  console.log(state,action)
  if(action.type==='USER_INPUT'){
 return( {value: action.val,isValid: action.val.includes('@')})
  }
  if(action.type==='INPUT_BLUR'){
    return {value: state.value,isValid: state.value.includes('@')}
     }
  return{value:'',isValid:null}
}

const passwordReducer=(state,action)=>{
  console.log(state,action)
  if(action.type==="pass_word"){
    return {value:action.value,isValid:action.value.trim().length>6}
  }
  if(action.type==="pass_BLUR"){
    return{value:state.value,isValid:state.value.trim().length>6}
  }
 return {value:"",isValid:null}
}

const Login = (props) => {
  const [enteredCollage, setEnteredCollage] = useState('');
  const [collageIsValid, setcollageIsValid] = useState();
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


const[emailState,dispatchEmail]= useReducer(emailReducer,{value:'',isValid:null})
const[password,dispatchPassword]=useReducer(passwordReducer, {value:'',isValid:null})

const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = password;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val: event.target.value})

    // setFormIsValid( //changing state depend on another state this approch is wrong use reducer approch
    //   event.target.value.includes('@') && password.isValid // hear if the state change depend on anothe state always use function
    // );
  };

  const passwordChangeHandler = (event) => {
     dispatchPassword({type:"pass_word", value:event.target.value})

    // setFormIsValid(
    //   event.target.value.trim().length>6 && emailState.isValid
    // );
  };
  const collageChangeHandler = (event) => {
    setEnteredCollage(event.target.value);
 
  }
  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatecollageHandler = () => {
    setcollageIsValid(enteredCollage.trim().length>5);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"pass_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
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
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collageIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">Collage Name</label>
          <input
            type="text"
            id="email"
            value={enteredCollage}
            onChange={collageChangeHandler}
            onBlur={validatecollageHandler}
          />
        </div>
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
