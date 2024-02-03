// hooks/useDetailPost.ts
import { FC, useEffect, useState } from "react";
import { Post } from "../../types/api/post";
import axios from "axios";

// API側のドメイン
const domain = 'http://localhost:8088';

export const useDetailPost = (id: number) => {
    const [post, setPost] = useState<Post | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [editedBody, setEditedBody] = useState("");

    useEffect(() => {
        // レンダリング時にデータを取得する
        fetchDetailPost();
    }, [id]); // idが変更されたときだけ再実行

    const fetchDetailPost = async () => {
        try {
            const response = await axios.get<Post>(`${domain}/post/detail/${id}`);
            const postData: Post = {
                id: response.data.id,
                username: response.data.username,
                body: response.data.body,
                created_at: response.data.created_at,
                updated_at: response.data.updated_at,
            };
            setPost(postData);
            setEditedBody(postData.body);
        } catch (error) {
            console.error('Error getting post:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () =>{
        setIsEditing(false);
    }

    const handleSaveClick = async () => {
        // サーバーに編集内容を保存する処理（axios.putなどを使用）
        try {
            await axios.put(`${domain}/post/edit/${id}`, { body: editedBody });
            // 編集モードを終了して再取得
            setIsEditing(false);
            fetchDetailPost();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await axios.post(`${domain}/post/delete/${id}`);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return {
        post,
        isEditing,
        editedBody,
        setEditedBody,
        handleEditClick,
        handleCancelEdit,
        handleSaveClick,
        handleDeleteClick,
    };
};
