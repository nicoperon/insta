
import {Box} from "grommet";
import styled from "styled-components";


const CardConcave = styled(Box)`
width: 80%;
background: #464646;
border-radius: 15px;
padding: 5%;
margin-top: 18%;
box-shadow: 1px 2px 20px -2px rgb(0 0 0 / 75%);
    :hover {
        background: rgb(222,105,7);
        background: linear-gradient(90deg, rgba(222,105,7,1) 0%, rgba(204,0,0,1) 62%);
        box-shadow: inset 5px 5px 10px #780000, 
        inset -5px -5px 10px #ff0000;
    }
`;

export default CardConcave;