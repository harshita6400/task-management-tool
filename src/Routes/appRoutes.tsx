import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Screens from '../Container';
import * as Path from './routeConstents';
import { AppLayout } from './appLayout';


export const AppRoutes: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path={Path.HOME} element={<h4>Home Page</h4>} />
                        <Route path={Path.AddEVENT} element={<Screens.Event />} />
                        <Route path={Path.EDITEVENT} element={<Screens.Event />} />
                        <Route path={Path.EVENTSLIST} element={<Screens.EventsList />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
} 