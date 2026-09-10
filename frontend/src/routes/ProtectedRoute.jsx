// ============================================================
// RUTA PROTEGIDA
// ============================================================
//
// Solo permite acceder a determinadas páginas si el usuario
// inició sesión.
//
// ============================================================

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute({
    children
}) {

    const { autenticado } =
        useAuth();


    if (!autenticado) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    return children;
}