import { FC, useEffect, useState } from "react";
import { User } from "../../types/api/user";
import axios from "axios";
import { UserProfile } from "../../types/userProfile";

// 全てのユーザーを取得する
export const useAllUsers= () => {

    const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const  getUsers = () => 
    {
        setLoading(true);
        setError(false);

         axios
            .get<Array<User>>("https://jsonplaceholder.typicode.com/users").then((res) => {
                const data = res.data.map((user) => ({
                    id: user.id,
                    name: `${user.name}(${user.username})`,
                    email: user.email,
                    address: `${user.address.city}${user.address.suite}${user.address.street}`

                }));
                // console.log("ここデータを更新します");
                setUserProfiles(data);
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
    getUsers, userProfiles, loading, error
    }
};