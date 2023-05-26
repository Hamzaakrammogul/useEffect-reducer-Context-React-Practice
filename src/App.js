import React, { useState, useEffect, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  useEffect(()=>{
  //   const isUserLoggedIn = localStorage.getItem('isLoggedIn');
  //   if(isUserLoggedIn === '1'){
  //     setIsLoggedIn(true);
  //   }
  //  }, []);

  //   const loginHandler = (email, password) => {
  //     // We should of course check email and password
  //     // But it's just a dummy/ demo anyways 
  //     setIsLoggedIn(true);
  //     //key and value pair
  //     localStorage.setItem('isLoggedIn', '1');
  //   };

  //   const logoutHandler = () => {
  //     localStorage.removeItem('isLoggedIn')
  //     setIsLoggedIn(false);
  //   };

  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Home/>}
      </main>
    </React.Fragment>

  );
}

export default App;
