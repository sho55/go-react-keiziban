import { FC, memo } from "react"
import { UserProfile } from "../types/userProfile"

type Props = {
    user: UserProfile
}

export const UserCard:FC<Props>  = memo(props => {
    const {user} = props

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
                <dt>名前</dt>
                <dd>{user.name}</dd>
                <dt>メール</dt>
                <dd>{user.email}</dd>
                <dt>住所</dt>
                <dd>{user.address}</dd>
            </dl>
        </div>
    )
})