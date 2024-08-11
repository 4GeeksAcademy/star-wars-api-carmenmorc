import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home.jsx";
import { Details } from "./pages/details.jsx";
import { Register } from "./component/Register.jsx";
import { Login } from "./component/Login.jsx";
import { Favorites } from "./component/favorites.jsx";
import injectContext, { Context } from "./store/appContext";
import { Navbar } from "./component/Navbar.jsx"; 

const Layout = () => {
    const { store, actions } = useContext(Context);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={process.env.BASENAME || ""}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/details/characters/:uid" element={<Details />} />
                        <Route path="/details/vehicles/:uid" element={<Details />} />
                        <Route path="/details/planets/:uid" element={<Details />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/favorites" element={<Favorites user={store.user} />} />
                        <Route path="*" element={<h1>May the 404 be with you.</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

