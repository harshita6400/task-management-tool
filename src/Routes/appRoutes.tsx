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
                        <Route path={Path.HOME} element={<Screens.HomePage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
} 