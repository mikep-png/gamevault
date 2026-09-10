import {
    Link
} from "react-router-dom";

import { useGames } from "../context/GameContext";


export default function Inicio() {

    const {
        videojuegos
    } = useGames();


    return (

        <div>

            {/* HERO */}

            <section className="
                relative
                overflow-hidden
                border-b
                border-purple-500/10
                bg-gradient-to-br
                from-purple-950
                via-slate-950
                to-slate-950
            ">

                <div className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-24
                    text-center
                ">

                    <div className="
                        mb-5
                        text-6xl
                    ">
                        🎮
                    </div>


                    <h1 className="
                        text-5xl
                        font-black
                        tracking-tight
                        text-white
                        md:text-7xl
                    ">
                        Game<span className="text-purple-500">
                            Vault
                        </span>
                    </h1>


                    <p className="
                        mx-auto
                        mt-6
                        max-w-2xl
                        text-lg
                        leading-8
                        text-slate-400
                    ">
                        Una enciclopedia de videojuegos
                        donde puedes explorar información,
                        imágenes y crear tu propia colección.
                    </p>


                    <div className="
                        mt-8
                        flex
                        flex-col
                        justify-center
                        gap-3
                        sm:flex-row
                    ">

                        <Link
                            to="/explorar"
                            className="
                                rounded-xl
                                bg-purple-600
                                px-6
                                py-3
                                font-bold
                                text-white
                                hover:bg-purple-500
                            "
                        >
                            Explorar videojuegos
                        </Link>


                        <Link
                            to="/coleccion"
                            className="
                                rounded-xl
                                border
                                border-slate-700
                                bg-slate-900
                                px-6
                                py-3
                                font-bold
                                text-slate-200
                                hover:border-purple-500
                            "
                        >
                            Mi colección
                        </Link>

                    </div>

                </div>

            </section>


            {/* ESTADÍSTICAS */}

            <section className="
                mx-auto
                grid
                max-w-7xl
                gap-4
                px-6
                py-12
                sm:grid-cols-3
            ">

                <div className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-6
                    text-center
                ">

                    <p className="
                        text-4xl
                        font-black
                        text-purple-400
                    ">
                        {videojuegos.length}
                    </p>

                    <p className="
                        mt-2
                        text-slate-400
                    ">
                        Videojuegos
                    </p>

                </div>


                <div className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-6
                    text-center
                ">

                    <p className="
                        text-4xl
                        font-black
                        text-blue-400
                    ">
                        API
                    </p>

                    <p className="
                        mt-2
                        text-slate-400
                    ">
                        Node.js + Express
                    </p>

                </div>


                <div className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-6
                    text-center
                ">

                    <p className="
                        text-4xl
                        font-black
                        text-green-400
                    ">
                        Wiki
                    </p>

                    <p className="
                        mt-2
                        text-slate-400
                    ">
                        Información externa
                    </p>

                </div>

            </section>

        </div>
    );
}