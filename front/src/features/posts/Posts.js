import React from "react";
import {BsHeart,BsHeartFill} from 'react-icons/bs';
import {Box, Button, Text, TextInput} from "grommet";
import {Refresh} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import {addPost, getPosts,manageLike} from "../../services/postsServices";

import { useSelector, useDispatch } from 'react-redux';
import {
    update, selectPosts
  } from './postsSlice';

const Posts = ({user}) => {

    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    const [content, setcontent] =React.useState();
    const [refresh, setrefresh] = React.useState(true);

    const publish = (e) => {
        e.preventDefault();
        
        if (content){
            addPost({content,user:{email:user.email},like:[],dilike:[]}).then(()=>setrefresh(true) )
            
        }
    }
    const like = (e) => {
        manageLike({id:e.id,user:e.user}).then(()=>setrefresh(true) )
    }

    React.useEffect(() => {

        const fecthPosts = async () => {
            const fetchData = await getPosts();
            dispatch(update(fetchData));
        }
        if (refresh) {
            fecthPosts();
            setrefresh(false);
        }
        
    }, [refresh])


    return(
        <Box align="center">
            <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e)=> setcontent(e.target.value)} />
                <Button label="publier" onClick={(e)=> publish(e)}/>
            </Box>
            <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
            <Card 
            round="medium" 
            padding="medium" 
            justify="center"
            align="center"
            margin="medium"
            width="medium"
            height="medium">
                {posts ? 
                posts.map(post => (
                    <div style={{width:' 80%',
                        background: '#464646',
                        borderRadius: '15px',
                        padding: '5%',
                        marginBottom:10,
                        boxShadow: '1px 2px 20px -2px rgb(0 0 0 / 75%)',
                        height: '100%'}}>
                         <p>{post.user.email}</p>
                        <p>{post.content}</p>
                        <div><p>{post.like.find(x=>x==user.email)?<BsHeartFill onClick={()=>{
                            like(post)
                        }}/>:<BsHeart onClick={()=>{
                            like(post)
                        }}/>}:{post.like.length}</p>
                        </div>
                    </div>
                ))

                 : 
                <Text>Ceci sont les posts</Text>
                }
            </Card>
        </Box>
    )
}

export default Posts;