import { Outlet } from "react-router-dom";
import { Header } from "../Components";
import './appLayout.scss';

export const AppLayout = () => {
    return (
        <>
            <Header />
            <div className="main-container">
                <Outlet />
            </div>

        </>
    )
}

