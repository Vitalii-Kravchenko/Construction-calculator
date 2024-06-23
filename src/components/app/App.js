import Header from "../header/Header";
import Calculator from "../calculator/Calculator";
import Login from "../admin/login/Login";
import Settings from "../admin/settings/Settings";

import './app.sass';

function App() {
    return (
        <div className="app">
            <Header/>
            <Calculator/>
            {/*<Login/>*/}
            {/*<Settings/>*/}
        </div>
    );
}

export default App;