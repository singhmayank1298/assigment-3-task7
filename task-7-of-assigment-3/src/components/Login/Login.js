import React, { useState ,useEffect,useReducer,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-contex';
import Input from '../UI/Input/Input';

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
  const autCtx=useContext(AuthContext)

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
    },500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  },[emailIsValid, passwordIsValid]);

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
    autCtx.onLogin(emailState.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input  isValid={emailIsValid} id={'email'} label={'E-Mail'} type={'email'} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}></Input>
        <Input  isValid={passwordIsValid} id={'password'} label={'Password'} type={'password'} value={password.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}></Input>
        <Input isValid={collageIsValid} id={'email'} label={'Collage Name'} type={'email'} value={enteredCollage} onChange={collageChangeHandler} onBlur={validatecollageHandler}></Input>
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
