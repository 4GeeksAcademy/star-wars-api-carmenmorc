import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Link } from "react-router-dom";

import { Home } from "./pages/home";
import { Details } from "./pages/details.jsx";
import injectContext from "./store/appContext";

const Layout = () => {
    // the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/details/characters/:uid" element={<Details />} />
                        <Route path="/details/vehicles/:uid" element={<Details />} />
                        <Route path="/details/planets/:uid" element={<Details />} />
                        <Route path="*" element={<h1>May the 404 be with you.</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
