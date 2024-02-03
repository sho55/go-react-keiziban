import { FC, useEffect, useState } from "react";
import { Post } from "../../types/api/post";
import axios from "axios";
import { postData } from "../../types/postData";

// 全てのユーザーを取得する
export const useAllPosts = () => {

    const [postData, setPostData] = useState<Array<postData>>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const  getPosts = () => 
    {
        setLoading(true);
        setError(false);

         axios
             .get<Array<Post>>("http://localhost:8088/post/list").then((res) => {
                const data = res.data.map((post) => ({
                    id: post.id,
                    name: `${post.username}`,
                    body: post.body,
                    created: post.created_at,
                    updated: post.updated_at,

                }));
                // console.log("ここデータを更新します");
                 setPostData(data);
            })
            .catch(
                (err) => {
                    setError(true);

                }
            ).finally( () => {
                setLoading(false);
            }
            )  
    };
    return {
        getPosts, postData, loading, error
    }
};