import { Outlet } from "react-router-dom";
import './appLayout.scss';

export const AppLayout = () => {
    return (
        <>
            <div className="main-container">
                <Outlet />
            </div>

        </>
    )
}

