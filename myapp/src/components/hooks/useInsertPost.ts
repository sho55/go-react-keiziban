import { FC, useEffect, useState } from "react";
import { Post } from "../../types/api/post";
import axios from "axios";

// API側のドメイン
const domain = 'http://localhost:8088'

type Props={
    username: string
    body:string
}

export const useInsertPost = (props:Props) => {
    const { username, body } = props;
    // const [username, setName] = useState('');
    // const [body, setBody] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);

    const insertPost = async () => {
        try {
            const newPost: Post = { id: 0, username, body, created_at:'',updated_at:'' };  
            await axios.post(`${domain}/post/create`, newPost);
            // setName('');
            // setBody('');

        } catch (error) {
            console.error('Error inserting post:', error);
        }
    };

    return {
        username,
        body,
        posts,
        insertPost,
    };
};