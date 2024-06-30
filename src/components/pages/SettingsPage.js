import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import Settings from "../admin/settings/Settings";

const SettingsPage = () => {
    const logged = useSelector(
        state => state.login.logged
    )

    return (
        <>
            {logged ? <Settings/> : <Navigate to='/admin/login'/>}
        </>
    );
};

export default SettingsPage;