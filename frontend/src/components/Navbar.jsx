// ============================================================
// NAVBAR
// ============================================================

import {
    Link,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


export default function Navbar() {

    const {
        usuario,
        autenticado,
        logout
    } = useAuth();


    const navigate =
        useNavigate();


    function cerrarSesion() {

        logout();

        navigate("/login");
    }


    return (

        <nav className="
            sticky top-0 z-50
            border-b border-purple-500/20
            bg-slate-950/95
            backdrop-blur
        ">

            <div className="
                mx-auto
                flex
                max-w-7xl
                items-center
                justify-between
                px-4
                py-4
            ">

                {/* LOGO */}

                <Link
                    to="/"
                    className="
                        text-2xl
                        font-black
                        text-purple-400
                    "
                >
                    🎮 GameVault
                </Link>


                {/* MENÚ */}

                <div className="
                    hidden
                    items-center
                    gap-6
                    md:flex
                ">

                    <Link
                        to="/"
                        className="
                            text-slate-300
                            hover:text-purple-400
                        "
                    >
                        Inicio
                    </Link>


                    <Link
                        to="/explorar"
                        className="
                            text-slate-300
                            hover:text-purple-400
                        "
                    >
                        Explorar
                    </Link>


                    {autenticado && (

                        <>

                            <Link
                                to="/coleccion"
                                className="
                                    text-slate-300
                                    hover:text-purple-400
                                "
                            >
                                Mi colección
                            </Link>


                            <Link
                                to="/perfil"
                                className="
                                    text-slate-300
                                    hover:text-purple-400
                                "
                            >
                                Perfil
                            </Link>

                        </>
                    )}

                </div>


                {/* USUARIO */}

                <div className="flex items-center gap-3">

                    {autenticado ? (

                        <>

                            <span className="
                                hidden
                                text-sm
                                text-slate-400
                                sm:block
                            ">
                                Hola, {usuario.nombre}
                            </span>


                            <button
                                onClick={cerrarSesion}
                                className="
                                    rounded-lg
                                    bg-red-500/10
                                    px-3
                                    py-2
                                    text-sm
                                    text-red-400
                                    hover:bg-red-500/20
                                "
                            >
                                Salir
                            </button>

                        </>

                    ) : (

                        <Link
                            to="/login"
                            className="
                                rounded-lg
                                bg-purple-600
                                px-4
                                py-2
                                font-semibold
                                text-white
                                hover:bg-purple-500
                            "
                        >
                            Iniciar sesión
                        </Link>

                    )}

                </div>

            </div>

        </nav>
    );
}