import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


export default function Login() {

    const {
        login
    } = useAuth();


    const navigate =
        useNavigate();


    const [nombre, setNombre] =
        useState("");


    const [password, setPassword] =
        useState("");


    const [error, setError] =
        useState("");


    function iniciarSesion(event) {

        event.preventDefault();


        const resultado =
            login(
                nombre,
                password
            );


        if (!resultado.correcto) {

            setError(
                resultado.mensaje
            );

            return;
        }


        navigate("/coleccion");
    }


    return (

        <div className="
            flex
            min-h-[calc(100vh-73px)]
            items-center
            justify-center
            px-4
        ">

            <div className="
                w-full
                max-w-md
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-8
                shadow-2xl
            ">

                <div className="
                    mb-8
                    text-center
                ">

                    <div className="text-5xl">
                        🎮
                    </div>


                    <h1 className="
                        mt-4
                        text-3xl
                        font-black
                        text-white
                    ">
                        Iniciar sesión
                    </h1>


                    <p className="
                        mt-2
                        text-sm
                        text-slate-400
                    ">
                        Accede a tu colección de GameVault
                    </p>

                </div>


                {error && (

                    <div className="
                        mb-5
                        rounded-lg
                        bg-red-500/10
                        p-3
                        text-sm
                        text-red-300
                    ">
                        {error}
                    </div>

                )}


                <form
                    onSubmit={iniciarSesion}
                    className="space-y-5"
                >

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            text-slate-300
                        ">
                            Usuario
                        </label>

                        <input
                            value={nombre}
                            onChange={(event) =>
                                setNombre(
                                    event.target.value
                                )
                            }
                            placeholder="Escribe tu nombre"
                            className="
                                w-full
                                rounded-lg
                                border
                                border-slate-700
                                bg-slate-950
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-purple-500
                            "
                        />

                    </div>


                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            text-slate-300
                        ">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Escribe una contraseña"
                            className="
                                w-full
                                rounded-lg
                                border
                                border-slate-700
                                bg-slate-950
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-purple-500
                            "
                        />

                    </div>


                    <button
                        type="submit"
                        className="
                            w-full
                            rounded-lg
                            bg-purple-600
                            px-5
                            py-3
                            font-bold
                            text-white
                            hover:bg-purple-500
                        "
                    >
                        Entrar a GameVault
                    </button>

                </form>


                <p className="
                    mt-6
                    text-center
                    text-xs
                    text-slate-500
                ">
                    Proyecto académico — autenticación
                    simulada con localStorage.
                </p>

            </div>

        </div>
    );
}