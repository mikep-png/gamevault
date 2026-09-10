import {
    Link,
    useParams
} from "react-router-dom";

import {
    useGames
} from "../context/GameContext";


export default function DetalleVideojuego() {

    const {
        id
    } = useParams();


    const {
        videojuegos,
        cargando
    } = useGames();


    const videojuego =
        videojuegos.find(
            (juego) =>
                Number(juego.id) === Number(id)
        );


    if (cargando) {

        return (

            <div className="
                py-20
                text-center
                text-slate-400
            ">
                Cargando videojuego...
            </div>
        );
    }


    if (!videojuego) {

        return (

            <div className="
                mx-auto
                max-w-2xl
                px-4
                py-20
                text-center
            ">

                <div className="text-6xl">
                    😕
                </div>

                <h1 className="
                    mt-5
                    text-3xl
                    font-black
                    text-white
                ">
                    Videojuego no encontrado
                </h1>


                <Link
                    to="/coleccion"
                    className="
                        mt-6
                        inline-block
                        rounded-xl
                        bg-purple-600
                        px-5
                        py-3
                        font-bold
                        text-white
                    "
                >
                    Volver a mi colección
                </Link>

            </div>
        );
    }


    return (

        <main className="
            mx-auto
            max-w-6xl
            px-4
            py-10
        ">

            <Link
                to="/coleccion"
                className="
                    text-sm
                    text-purple-400
                    hover:underline
                "
            >
                ← Volver
            </Link>


            <article className="
                mt-6
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
            ">

                <div className="
                    grid
                    lg:grid-cols-2
                ">

                    <div>

                        <img
                            src={videojuego.imagen}
                            alt={videojuego.titulo}
                            className="
                                h-full
                                min-h-[400px]
                                w-full
                                object-cover
                            "
                        />

                    </div>


                    <div className="p-8 md:p-10">

                        <p className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-widest
                            text-purple-400
                        ">
                            Videojuego
                        </p>


                        <h1 className="
                            mt-3
                            text-4xl
                            font-black
                            text-white
                            md:text-5xl
                        ">
                            {videojuego.titulo}
                        </h1>


                        <div className="
                            mt-6
                            flex
                            flex-wrap
                            gap-2
                        ">

                            <span className="
                                rounded-full
                                bg-purple-500/10
                                px-3
                                py-1
                                text-sm
                                text-purple-300
                            ">
                                {videojuego.plataforma}
                            </span>


                            <span className="
                                rounded-full
                                bg-blue-500/10
                                px-3
                                py-1
                                text-sm
                                text-blue-300
                            ">
                                {videojuego.genero}
                            </span>


                            <span className="
                                rounded-full
                                bg-green-500/10
                                px-3
                                py-1
                                text-sm
                                text-green-300
                            ">
                                {videojuego.estado}
                            </span>

                        </div>


                        <p className="
                            mt-8
                            leading-8
                            text-slate-400
                        ">
                            {videojuego.descripcion}
                        </p>


                        {videojuego.wikipedia && (

                            <a
                                href={
                                    videojuego.wikipedia
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    mt-8
                                    inline-block
                                    rounded-xl
                                    bg-purple-600
                                    px-5
                                    py-3
                                    font-bold
                                    text-white
                                    hover:bg-purple-500
                                "
                            >
                                Leer más en Wikipedia ↗
                            </a>

                        )}

                    </div>

                </div>

            </article>

        </main>
    );
}