import React from "react";

import { Box, Text, TextInput, Button } from "grommet";

import fire from "../../fire"
import {useHistory} from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [alert, setalert] =React.useState();
    const history=useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        // fire.auth().createUserWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        //   // Signed in 
        //   var user = userCredential.user;
        //   console.log(user,"user")
        //   // ...
        // })
        // .catch((error) => {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // ..
        // })
        fire.auth().signInWithEmailAndPassword(email, password)
          .catch((error) => {
           setalert('identifiant ou mot de passe incorrect');
          });
         
    }
        

    return(
        <Box fill align="center" justify="center" background="back" gap="medium">
            Login
            <Box width="small" gap="small">
                <TextInput type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <TextInput type="password" placeholder="mot de passe" onChange={(e) => setPassword(e.target.value)} />
            </Box>
            

            {alert && (
                <Text color="red">{alert}</Text>
            )}

            <Button margin="small" label="ok" onClick={(e)=> handleSubmit(e)} />
            <Text>Or</Text>
            <Button margin="small" label="S'enregistrer" onClick={()=>history.push('/register')} />
        </Box>
    )
}

export default Login