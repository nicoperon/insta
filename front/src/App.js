import React from "react";
import { Grommet, Box, Button,  } from "grommet";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from "./features/session/Login";
import Register from "./features/session/register";
import Posts from "./features/posts/Posts";
import store from "./app/store";


import fire from "./fire";

import connect from './socket-api';

connect("http://localhost:3001", store);

const theme = {
  global: {
    colors: {
      brand: '#cc0000',
      back: "#292929",
      card: "#bfdbf7",
      accent: "#994650",
      ok: '#00C781',
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {


  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    fire.auth().onAuthStateChanged((user) => {

      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  
  console.log('connecté', isLoggedIn);
  return (
    <Grommet theme={theme} full>
    
      <Router>
        
        {!isLoggedIn
          ? (   
<>
              <Route path="/" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
</>
          ) 
          : (
            <Box fill align="center" justify="center" background="back">
              <Posts user={fire.auth().currentUser} />
              <Button label="deconnexion" onClick={()=> fire.auth().signOut()} />
            </Box>
          )}
      </Router>
 
    </Grommet>
  );
}

export default App;
