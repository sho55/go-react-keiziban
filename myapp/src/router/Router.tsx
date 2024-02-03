import { memo, FC } from "react";
import {
    Route,
    Switch,
} from "react-router-dom";
import { Home } from "../components/pages/Home";
import DetailPost from "../components/pages/post/DetailPost";
import { Page404 } from "../components/pages/Page404";
import { postRoutes } from "./PostRoutes";
import { HeaderLayout } from "../components/templates/HeaderLayout"
import CreatePost from "../components/pages/post/CreatePost";

export const Router: FC = memo(() => {
    return (
        <Switch>
            <Route path="/post"
                render={({ match: { url } }) => (
                    <Switch>
                        {postRoutes.map((route) => (
                            <Route key={route.path} exact={route.expect} path={`${url}${route.path}`}>

                                <HeaderLayout>{route.children}</HeaderLayout>
                            </Route>
                        ))}
                    </Switch>
                )}>
            </Route>

            <Route exact path="/post/create">
                <HeaderLayout>
                    <CreatePost />
                </HeaderLayout>
            </Route>
            
            <Route exact path="/post/detail/:id">
                <HeaderLayout>
                    <DetailPost />
                </HeaderLayout>
            </Route>

            <Route exact path="/">
                <HeaderLayout>
                    <Home />
                </HeaderLayout>
            </Route>

            <Route path="*">
                <Page404 />
            </Route>
        </Switch>

    )
})