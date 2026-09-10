// ============================================================
// APP PRINCIPAL
// ============================================================
//
// Aquí configuramos React Router.
//
// Vistas:
//
// /                    Inicio
// /login               Login
// /explorar            Enciclopedia
// /coleccion           Colección
// /videojuego/:id      Detalle
// /perfil              Perfil
//
// ============================================================

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Navbar
    from "./components/Navbar";


import Inicio
    from "./pages/Inicio";


import Login
    from "./pages/Login";


import Explorar
    from "./pages/Explorar";


import Dashboard
    from "./pages/Dashboard";


import DetalleVideojuego
    from "./pages/DetalleVideojuego";


import Perfil
    from "./pages/Perfil";


import ProtectedRoute
    from "./routes/ProtectedRoute";


import {
    AuthProvider
} from "./context/AuthContext";


import {
    GameProvider
} from "./context/GameContext";


export default function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <GameProvider>

                    <div className="
                        min-h-screen
                        bg-slate-950
                        text-slate-100
                    ">

                        <Navbar />


                        <Routes>

                            {/* PÁGINA PRINCIPAL */}

                            <Route
                                path="/"
                                element={
                                    <Inicio />
                                }
                            />


                            {/* LOGIN */}

                            <Route
                                path="/login"
                                element={
                                    <Login />
                                }
                            />


                            {/* EXPLORAR */}

                            <Route
                                path="/explorar"
                                element={
                                    <Explorar />
                                }
                            />


                            {/* COLECCIÓN */}

                            <Route
                                path="/coleccion"
                                element={

                                    <ProtectedRoute>

                                        <Dashboard />

                                    </ProtectedRoute>

                                }
                            />


                            {/* DETALLE */}

                            <Route
                                path="/videojuego/:id"
                                element={

                                    <ProtectedRoute>

                                        <DetalleVideojuego />

                                    </ProtectedRoute>

                                }
                            />


                            {/* PERFIL */}

                            <Route
                                path="/perfil"
                                element={

                                    <ProtectedRoute>

                                        <Perfil />

                                    </ProtectedRoute>

                                }
                            />


                            {/* RUTA DESCONOCIDA */}

                            <Route
                                path="*"
                                element={
                                    <Inicio />
                                }
                            />

                        </Routes>


                        {/* FOOTER */}

                        <footer className="
                            border-t
                            border-slate-800
                            px-4
                            py-8
                            text-center
                            text-sm
                            text-slate-500
                        ">
                            GameVault · Proyecto Final
                            Desarrollo Web con ReactJS
                        </footer>

                    </div>

                </GameProvider>

            </AuthProvider>

        </BrowserRouter>
    );
}