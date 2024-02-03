import { FC, memo } from "react"
import { postData } from "../types/postData"


type Props = {
    post: postData
}

export const PostCard:FC<Props>  = memo(props => {
    const { post } = props

    const style = {
        backgroundColor:"#f0f0f0",
        border: "solid 2px teal",
        borderRadius: "5px",
        padding:"10px 8px",
        margin: "10px 8px",
    }

    return(
        <div style={style}>
            <dl>
                <dt>ユーザー名</dt>
                <dd>{post.name}</dd>
                <dt>内容</dt>
                <dd>{post.body}</dd>
                <dt>投稿日</dt>
                <dd>{post.created}</dd>
            </dl>
        </div>
    )
})