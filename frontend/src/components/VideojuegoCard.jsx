// ============================================================
// TARJETA DE VIDEOJUEGO
// ============================================================

import {
    Link
} from "react-router-dom";


export default function VideojuegoCard({
    videojuego,
    onEditar,
    onEliminar
}) {

    return (

        <article className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            shadow-xl
            transition
            hover:-translate-y-1
            hover:border-purple-500/50
        ">

            {/* IMAGEN */}

            <div className="
                aspect-video
                overflow-hidden
                bg-slate-800
            ">

                <img
                    src={
                        videojuego.imagen ||
                        "https://placehold.co/800x450?text=GameVault"
                    }
                    alt={videojuego.titulo}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-300
                        hover:scale-105
                    "
                    onError={(event) => {

                        event.currentTarget.src =
                            "https://placehold.co/800x450?text=Imagen+no+disponible";
                    }}
                />

            </div>


            {/* CONTENIDO */}

            <div className="p-5">

                <h3 className="
                    mb-2
                    text-xl
                    font-bold
                    text-white
                ">
                    {videojuego.titulo}
                </h3>


                <p className="
                    mb-4
                    line-clamp-3
                    text-sm
                    leading-6
                    text-slate-400
                ">
                    {videojuego.descripcion}
                </p>


                {/* INFORMACIÓN */}

                <div className="
                    mb-4
                    flex
                    flex-wrap
                    gap-2
                ">

                    <span className="
                        rounded-full
                        bg-purple-500/10
                        px-3
                        py-1
                        text-xs
                        text-purple-300
                    ">
                        {videojuego.plataforma}
                    </span>


                    <span className="
                        rounded-full
                        bg-blue-500/10
                        px-3
                        py-1
                        text-xs
                        text-blue-300
                    ">
                        {videojuego.genero}
                    </span>


                    <span className="
                        rounded-full
                        bg-green-500/10
                        px-3
                        py-1
                        text-xs
                        text-green-300
                    ">
                        {videojuego.estado}
                    </span>

                </div>


                {/* BOTONES */}

                <div className="
                    flex
                    flex-wrap
                    gap-2
                ">

                    <Link
                        to={`/videojuego/${videojuego.id}`}
                        className="
                            flex-1
                            rounded-lg
                            bg-purple-600
                            px-3
                            py-2
                            text-center
                            text-sm
                            font-semibold
                            text-white
                            hover:bg-purple-500
                        "
                    >
                        Ver detalles
                    </Link>


                    {onEditar && (

                        <button
                            onClick={() =>
                                onEditar(videojuego)
                            }
                            className="
                                rounded-lg
                                bg-slate-800
                                px-3
                                py-2
                                text-sm
                                text-slate-300
                                hover:bg-slate-700
                            "
                        >
                            Editar
                        </button>

                    )}


                    {onEliminar && (

                        <button
                            onClick={() =>
                                onEliminar(videojuego.id)
                            }
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
                            Eliminar
                        </button>

                    )}

                </div>


                {videojuego.wikipedia && (

                    <a
                        href={videojuego.wikipedia}
                        target="_blank"
                        rel="noreferrer"
                        className="
                            mt-4
                            block
                            text-center
                            text-xs
                            text-purple-400
                            hover:underline
                        "
                    >
                        Consultar Wikipedia ↗
                    </a>

                )}

            </div>

        </article>
    );
}