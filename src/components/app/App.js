import {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Header from "../header/Header";
import Login from "../admin/login/Login";
import Settings from "../admin/settings/Settings";

import {MainPage} from "../pages";
import RoomArea from "../calculator/roomArea/RoomArea";
import RoomWorks from "../calculator/roomWorks/RoomWorks";

import Spinner from "../spinner/Spinner";

import './app.sass';

function App() {
    return (
        <Router>
            <div className="app">
                <Header/>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}>
                            <Route index element={<RoomArea/>}/>
                            <Route path='room-works' element={<RoomWorks/>}/>
                        </Route>
                        <Route path="/admin/login" element={<Login/>}/>
                        <Route path="/admin/settings" element={<Settings/>}/>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;