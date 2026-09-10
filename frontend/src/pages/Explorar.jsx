import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { buscarVideojuegoWikipedia } from "../api";
import { useAuth } from "../context/AuthContext";
import { useGames } from "../context/GameContext";

function Explorar() {
    const navigate = useNavigate();

    const { usuario } = useAuth();
    const { agregarVideojuego } = useGames();

    const [busqueda, setBusqueda] = useState("");
    const [resultado, setResultado] = useState(null);

    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // BUSCAR VIDEOJUEGO
    // ==========================================

    const buscar = async (e) => {
        e.preventDefault();

        if (!busqueda.trim()) {
            setError("Escribe el nombre de un videojuego.");
            return;
        }

        setCargando(true);
        setError("");
        setMensaje("");
        setResultado(null);

        try {
            const data = await buscarVideojuegoWikipedia(busqueda);

            setResultado(data);
        } catch (error) {
            setError(
                error.message ||
                "No se encontró información en Wikipedia."
            );
        } finally {
            setCargando(false);
        }
    };

    // ==========================================
    // AGREGAR A LA COLECCIÓN
    // ==========================================

    const agregarALaColeccion = async () => {

        // Si NO ha iniciado sesión,
        // lo enviamos directamente al login.
        if (!usuario) {
            navigate("/login");
            return;
        }

        try {

            const nuevoVideojuego = {
                titulo: resultado.titulo,
                descripcion: resultado.descripcion,
                imagen: resultado.imagen,
                plataforma: "PC",
                genero: "Videojuego",
                estado: "Pendiente",
                wikipedia: resultado.wikipedia
            };

            await agregarVideojuego(nuevoVideojuego);

            setMensaje(
                "Videojuego agregado correctamente a tu colección."
            );

        } catch (error) {

            setError(
                error.message ||
                "No se pudo agregar el videojuego."
            );
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">

            <div className="mx-auto max-w-6xl">

                {/* ENCABEZADO */}

                <div className="mb-10 text-center">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
                        GameVault
                    </p>

                    <h1 className="text-4xl font-bold md:text-5xl">
                        Explorar videojuegos
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                        Busca videojuegos en Wikipedia y descubre
                        información, imágenes y descripciones.
                    </p>

                </div>

                {/* BUSCADOR */}

                <form
                    onSubmit={buscar}
                    className="mx-auto mb-10 flex max-w-3xl flex-col gap-3 sm:flex-row"
                >

                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Ej: Minecraft, GTA V, The Witcher 3..."
                        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-purple-500"
                    />

                    <button
                        type="submit"
                        disabled={cargando}
                        className="rounded-xl bg-purple-600 px-7 py-4 font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cargando ? "Buscando..." : "Buscar"}
                    </button>

                </form>

                {/* ERROR */}

                {error && (
                    <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
                        {error}
                    </div>
                )}

                {/* MENSAJE */}

                {mensaje && (
                    <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-green-300">
                        {mensaje}
                    </div>
                )}

                {/* RESULTADO */}

                {resultado && (
                    <section className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

                        <div className="grid md:grid-cols-2">

                            {/* IMAGEN */}

                            <div className="min-h-[300px] bg-slate-800">

                                {resultado.imagen ? (
                                    <img
                                        src={resultado.imagen}
                                        alt={resultado.titulo}
                                        className="h-full min-h-[300px] w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full min-h-[300px] items-center justify-center text-slate-500">
                                        Sin imagen disponible
                                    </div>
                                )}

                            </div>

                            {/* INFORMACIÓN */}

                            <div className="flex flex-col justify-center p-7 md:p-10">

                                <span className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-400">
                                    Resultado de Wikipedia
                                </span>

                                <h2 className="mb-5 text-3xl font-bold">
                                    {resultado.titulo}
                                </h2>

                                <p className="mb-7 leading-relaxed text-slate-300">
                                    {resultado.descripcion}
                                </p>

                                <div className="flex flex-col gap-3 sm:flex-row">

                                    <button
                                        onClick={agregarALaColeccion}
                                        className="rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-500"
                                    >
                                        + Agregar a mi colección
                                    </button>

                                    {resultado.wikipedia && (
                                        <a
                                            href={resultado.wikipedia}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold transition hover:bg-slate-800"
                                        >
                                            Ver en Wikipedia
                                        </a>
                                    )}

                                </div>

                            </div>

                        </div>

                    </section>
                )}

                {/* SI NO HAY RESULTADO */}

                {!resultado && !cargando && !error && (
                    <div className="py-20 text-center">

                        <div className="mb-4 text-6xl">
                            🎮
                        </div>

                        <h2 className="text-2xl font-bold">
                            Busca tu próximo videojuego
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Escribe un título para comenzar a explorar.
                        </p>

                    </div>
                )}

                {/* ENLACE A COLECCIÓN */}

                {usuario && (
                    <div className="mt-10 text-center">

                        <Link
                            to="/coleccion"
                            className="text-purple-400 transition hover:text-purple-300"
                        >
                            ← Ver mi colección
                        </Link>

                    </div>
                )}

            </div>

        </main>
    );
}

export default Explorar;