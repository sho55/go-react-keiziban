import { memo, FC } from "react";
import {
    Route,
    Switch,
} from "react-router-dom";
import { Home } from "../components/pages/Home";
import CreatePost from "../components/pages/post/CreatePost";
import DetailPost from "../components/pages/post/DetailPost";
import { Page404 } from "../components/pages/Page404";

export const postRoutes =
    [
        {
            path: "/",
            expect: true,
            children: <Home />
        },
        {
            path: "/create",
            expect: false,
            children: <CreatePost />
        },
        {
            path: "/detail/:id",
            expect: false,
            children: <DetailPost />
        },
    ]
// <Switch>
//     <Route path="/post/:id">
//         <Detail />
//     </Route>
//     <Route path="/create">
//         <Create />
//     </Route>
//     <Route exact path="/">
//         <Home />
//     </Route>

//     <Route path="*">
//         <Page404 />
//     </Route>
// </Switch>
