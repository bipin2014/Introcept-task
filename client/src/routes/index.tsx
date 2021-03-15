import React from 'react';
import { Switch, Route } from 'react-router-dom'
import routeList from "./routeList";

const MainRoute: React.FC = () => {
    return (
        <Switch>
            {
                routeList.map((route, key) =>
                    <Route
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        key={key}
                    />
                )
            }
        </Switch>
    );
};

export default MainRoute;
