import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import BaseLayout from "./components/BaseLayout";

// ** Import Route Providers
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import Main from "./pages/Main/index";
const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
});

const AppRouter = () => {
    return (
        <Router history={history}>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <BaseLayout>
                        <Route path="/" exact component={Main} />
                    </BaseLayout>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
