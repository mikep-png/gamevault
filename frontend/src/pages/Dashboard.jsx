import {
    useMemo,
    useState
} from "react";

import VideojuegoCard
    from "../components/VideojuegoCard";

import FormularioVideojuego
    from "../components/FormularioVideojuego";

import { useGames } from "../context/GameContext";


export default function Dashboard() {

    const {
        videojuegos,
        cargando,
        error,
        borrarVideojuego
    } = useGames();


    const [
        videojuegoEnEdicion,
        setVideojuegoEnEdicion
    ] = useState(null);


    const [busqueda, setBusqueda] =
        useState("");


    const [orden, setOrden] =
        useState("az");


    // --------------------------------------------------------
    // Buscar y ordenar
    // --------------------------------------------------------

    const videojuegosFiltrados =
        useMemo(() => {

            let resultado =
                videojuegos.filter(
                    (videojuego) =>
                        videojuego.titulo
                            .toLowerCase()
                            .includes(
                                busqueda.toLowerCase()
                            )
                );


            resultado.sort(
                (a, b) => {

                    const comparacion =
                        a.titulo.localeCompare(
                            b.titulo
                        );


                    return orden === "az"
                        ? comparacion
                        : -comparacion;
                }
            );


            return resultado;

        }, [
            videojuegos,
            busqueda,
            orden
        ]);


    // --------------------------------------------------------
    // Eliminar
    // --------------------------------------------------------

    async function eliminar(id) {

        const confirmar =
            window.confirm(
                "¿Seguro que quieres eliminar este videojuego?"
            );


        if (!confirmar) {
            return;
        }


        try {

            await borrarVideojuego(id);

        }

        catch (error) {

            alert(
                error.message
            );
        }
    }


    return (

        <main className="
            mx-auto
            max-w-7xl
            px-4
            py-10
        ">

            {/* ENCABEZADO */}

            <header className="mb-10">

                <p className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-widest
                    text-purple-400
                ">
                    GameVault
                </p>


                <h1 className="
                    mt-2
                    text-4xl
                    font-black
                    text-white
                ">
                    Mi colección
                </h1>


                <p className="
                    mt-3
                    text-slate-400
                ">
                    Administra tus videojuegos.
                </p>

            </header>


            {/* ESTADÍSTICAS */}

            <div className="
                mb-8
                grid
                gap-4
                sm:grid-cols-3
            ">

                <div className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-5
                ">

                    <p className="
                        text-sm
                        text-slate-400
                    ">
                        Total
                    </p>

                    <p className="
                        mt-1
                        text-3xl
                        font-black
                        text-white
                    ">
                        {videojuegos.length}
                    </p>

                </div>


                <div className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-5
                ">

                    <p className="
                        text-sm
                        text-slate-400
                    ">
                        Jugando
                    </p>

                    <p className="
                        mt-1
                        text-3xl
                        font-black
                        text-purple-400
                    ">
                        {
                            videojuegos.filter(
                                (juego) =>
                                    juego.estado ===
                                    "Jugando"
                            ).length
                        }
                    </p>

                </div>


                <div className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-5
                ">

                    <p className="
                        text-sm
                        text-slate-400
                    ">
                        Completados
                    </p>

                    <p className="
                        mt-1
                        text-3xl
                        font-black
                        text-green-400
                    ">
                        {
                            videojuegos.filter(
                                (juego) =>
                                    juego.estado ===
                                    "Completado"
                            ).length
                        }
                    </p>

                </div>

            </div>


            {/* FORMULARIO */}

            <div className="mb-10">

                <FormularioVideojuego
                    videojuegoEnEdicion={
                        videojuegoEnEdicion
                    }
                    cancelarEdicion={() =>
                        setVideojuegoEnEdicion(null)
                    }
                />

            </div>


            {/* BUSCADOR */}

            <div className="
                mb-8
                flex
                flex-col
                gap-3
                md:flex-row
            ">

                <input
                    value={busqueda}
                    onChange={(event) =>
                        setBusqueda(
                            event.target.value
                        )
                    }
                    placeholder="Buscar en mi colección..."
                    className="
                        flex-1
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-900
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-purple-500
                    "
                />


                <select
                    value={orden}
                    onChange={(event) =>
                        setOrden(
                            event.target.value
                        )
                    }
                    className="
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-900
                        px-4
                        py-3
                        text-white
                    "
                >

                    <option value="az">
                        A → Z
                    </option>

                    <option value="za">
                        Z → A
                    </option>

                </select>

            </div>


            {/* ESTADOS */}

            {cargando && (

                <div className="
                    py-20
                    text-center
                    text-slate-400
                ">
                    Cargando videojuegos...
                </div>

            )}


            {error && (

                <div className="
                    mb-6
                    rounded-xl
                    bg-red-500/10
                    p-4
                    text-red-300
                ">
                    {error}
                </div>

            )}


            {!cargando &&
                videojuegosFiltrados.length === 0 && (

                    <div className="
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-800
                        p-12
                        text-center
                    ">

                        <div className="text-5xl">
                            🎮
                        </div>

                        <p className="
                            mt-4
                            text-slate-400
                        ">
                            No hay videojuegos que
                            coincidan con la búsqueda.
                        </p>

                    </div>
                )
            }


            {/* TARJETAS */}

            {!cargando &&
                videojuegosFiltrados.length > 0 && (

                    <div className="
                        grid
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-3
                    ">

                        {videojuegosFiltrados.map(
                            (videojuego) => (

                                <VideojuegoCard
                                    key={videojuego.id}
                                    videojuego={
                                        videojuego
                                    }
                                    onEditar={
                                        setVideojuegoEnEdicion
                                    }
                                    onEliminar={
                                        eliminar
                                    }
                                />

                            )
                        )}

                    </div>
                )
            }

        </main>
    );
}