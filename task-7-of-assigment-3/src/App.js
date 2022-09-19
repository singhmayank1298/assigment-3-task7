import React,{useContext}from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-contex';
//import AuthContext from './components/store/auth-contex';

function App() {
const ctx=useContext(AuthContext)


  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // useEffect(()=>{
  // const storageUser=localStorage.getItem('isLoggedIn')
  // if(storageUser==='1'){
  //   setIsLoggedIn(true)
  // }

  // },[])

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn',"1")
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn')
  //   setIsLoggedIn(false);
  // };

  return (
    <React.Fragment>
     
      <MainHeader /*isAuthenticated={isLoggedIn} onLogout={logoutHandler}*/ />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home  />}
      </main>
      </React.Fragment>
  );
}

export default App;
