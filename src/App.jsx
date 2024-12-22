import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bungalows } from "./pages/Bungalows";
import { Bookings } from "./pages/Bookings";
import { NewUsers } from "./pages/Users";
import { Settings } from "./pages/Settings";
import { Account } from "./pages/Account";
import { Login } from "./pages/Login";
import { PageNotFound } from "./pages/PageNotFound";

export function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Navigate replace to="dashboard" />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="bungalows" element={<Bungalows />} />
                    <Route path="users" element={<NewUsers />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="account" element={<Account />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
