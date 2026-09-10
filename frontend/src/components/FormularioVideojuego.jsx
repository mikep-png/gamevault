// ============================================================
// FORMULARIO DE VIDEOJUEGO
// ============================================================
//
// Permite:
//
// - Buscar un videojuego en Wikipedia
// - Cargar automáticamente título
// - Cargar descripción
// - Cargar imagen
// - Guardar videojuego
// - Editar videojuego
// - Validar campos
//
// ============================================================

import {
    useEffect,
    useState
} from "react";

import {
    buscarVideojuegoWikipedia
} from "../api";

import { useGames } from "../context/GameContext";


const formularioInicial = {

    titulo: "",

    descripcion: "",

    imagen: "",

    plataforma: "",

    genero: "",

    estado: "Pendiente",

    wikipedia: ""
};


export default function FormularioVideojuego({
    videojuegoEnEdicion,
    cancelarEdicion
}) {

    const {
        agregarVideojuego,
        editarVideojuego
    } = useGames();


    const [formulario, setFormulario] =
        useState(formularioInicial);


    const [busqueda, setBusqueda] =
        useState("");


    const [buscando, setBuscando] =
        useState(false);


    const [guardando, setGuardando] =
        useState(false);


    const [error, setError] =
        useState("");


    const [mensaje, setMensaje] =
        useState("");


    // --------------------------------------------------------
    // Cargar datos cuando se edita
    // --------------------------------------------------------

    useEffect(() => {

        if (videojuegoEnEdicion) {

            setFormulario({
                titulo:
                    videojuegoEnEdicion.titulo || "",

                descripcion:
                    videojuegoEnEdicion.descripcion || "",

                imagen:
                    videojuegoEnEdicion.imagen || "",

                plataforma:
                    videojuegoEnEdicion.plataforma || "",

                genero:
                    videojuegoEnEdicion.genero || "",

                estado:
                    videojuegoEnEdicion.estado ||
                    "Pendiente",

                wikipedia:
                    videojuegoEnEdicion.wikipedia ||
                    ""
            });

            setBusqueda(
                videojuegoEnEdicion.titulo || ""
            );

        } else {

            setFormulario(formularioInicial);

            setBusqueda("");
        }

        setError("");
        setMensaje("");

    }, [videojuegoEnEdicion]);


    // --------------------------------------------------------
    // Actualizar campos
    // --------------------------------------------------------

    function cambiarCampo(event) {

        const {
            name,
            value
        } = event.target;


        setFormulario(
            (actual) => ({
                ...actual,
                [name]: value
            })
        );


        setError("");
    }


    // --------------------------------------------------------
    // Buscar Wikipedia
    // --------------------------------------------------------

    async function buscarWikipedia() {

        if (!busqueda.trim()) {

            setError(
                "Escribe el nombre de un videojuego."
            );

            return;
        }


        try {

            setBuscando(true);

            setError("");

            setMensaje("");


            const resultado =
                await buscarVideojuegoWikipedia(
                    busqueda
                );


            setFormulario(
                (actual) => ({

                    ...actual,

                    titulo:
                        resultado.titulo,

                    descripcion:
                        resultado.descripcion,

                    imagen:
                        resultado.imagen,

                    wikipedia:
                        resultado.wikipedia
                })
            );


            setMensaje(
                "Información encontrada en Wikipedia."
            );

        }

        catch (error) {

            setError(
                error.message
            );

        }

        finally {

            setBuscando(false);
        }
    }


    // --------------------------------------------------------
    // Validar formulario
    // --------------------------------------------------------

    function validarFormulario() {

        if (!formulario.titulo.trim()) {

            return "El título es obligatorio.";
        }


        if (
            formulario.titulo.trim().length < 2
        ) {

            return "El título debe tener mínimo 2 caracteres.";
        }


        if (!formulario.descripcion.trim()) {

            return "La descripción es obligatoria.";
        }


        if (!formulario.plataforma.trim()) {

            return "La plataforma es obligatoria.";
        }


        if (!formulario.genero.trim()) {

            return "El género es obligatorio.";
        }


        return "";
    }


    // --------------------------------------------------------
    // Guardar
    // --------------------------------------------------------

    async function enviarFormulario(event) {

        event.preventDefault();


        const errorValidacion =
            validarFormulario();


        if (errorValidacion) {

            setError(
                errorValidacion
            );

            return;
        }


        try {

            setGuardando(true);

            setError("");

            setMensaje("");


            if (videojuegoEnEdicion) {

                await editarVideojuego(
                    videojuegoEnEdicion.id,
                    formulario
                );


                setMensaje(
                    "Videojuego actualizado correctamente."
                );


                if (cancelarEdicion) {
                    cancelarEdicion();
                }

            } else {

                await agregarVideojuego(
                    formulario
                );


                setFormulario(
                    formularioInicial
                );

                setBusqueda("");


                setMensaje(
                    "Videojuego agregado correctamente."
                );
            }

        }

        catch (error) {

            setError(
                error.message
            );

        }

        finally {

            setGuardando(false);
        }
    }


    return (

        <section className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-6
        ">

            <div className="mb-6">

                <h2 className="
                    text-2xl
                    font-bold
                    text-white
                ">
                    {videojuegoEnEdicion
                        ? "Editar videojuego"
                        : "Agregar videojuego"
                    }
                </h2>


                <p className="
                    mt-1
                    text-sm
                    text-slate-400
                ">
                    Busca un videojuego para obtener
                    información automáticamente.
                </p>

            </div>


            {/* BUSCADOR WIKIPEDIA */}

            <div className="
                mb-6
                rounded-xl
                border
                border-purple-500/20
                bg-purple-500/5
                p-4
            ">

                <label className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-purple-300
                ">
                    Buscar en Wikipedia
                </label>


                <div className="
                    flex
                    flex-col
                    gap-2
                    sm:flex-row
                ">

                    <input
                        value={busqueda}
                        onChange={(event) =>
                            setBusqueda(
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => {

                            if (
                                event.key === "Enter"
                            ) {

                                event.preventDefault();

                                buscarWikipedia();
                            }
                        }}
                        placeholder="Ejemplo: Minecraft"
                        className="
                            flex-1
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


                    <button
                        type="button"
                        onClick={buscarWikipedia}
                        disabled={buscando}
                        className="
                            rounded-lg
                            bg-purple-600
                            px-5
                            py-3
                            font-semibold
                            text-white
                            hover:bg-purple-500
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {buscando
                            ? "Buscando..."
                            : "Buscar"
                        }
                    </button>

                </div>

            </div>


            {/* MENSAJES */}

            {error && (

                <div className="
                    mb-4
                    rounded-lg
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-3
                    text-sm
                    text-red-300
                ">
                    {error}
                </div>

            )}


            {mensaje && (

                <div className="
                    mb-4
                    rounded-lg
                    border
                    border-green-500/20
                    bg-green-500/10
                    p-3
                    text-sm
                    text-green-300
                ">
                    {mensaje}
                </div>

            )}


            {/* FORMULARIO */}

            <form
                onSubmit={enviarFormulario}
                className="space-y-5"
            >

                {/* TÍTULO */}

                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-300
                    ">
                        Título *
                    </label>

                    <input
                        name="titulo"
                        value={formulario.titulo}
                        onChange={cambiarCampo}
                        placeholder="Nombre del videojuego"
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


                {/* DESCRIPCIÓN */}

                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-300
                    ">
                        Descripción *
                    </label>

                    <textarea
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={cambiarCampo}
                        rows="5"
                        placeholder="Descripción del videojuego"
                        className="
                            w-full
                            resize-none
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


                {/* IMAGEN */}

                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-300
                    ">
                        URL de imagen
                    </label>

                    <input
                        name="imagen"
                        value={formulario.imagen}
                        onChange={cambiarCampo}
                        placeholder="https://..."
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


                {/* PLATAFORMA Y GÉNERO */}

                <div className="
                    grid
                    gap-4
                    md:grid-cols-2
                ">

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-300
                        ">
                            Plataforma *
                        </label>

                        <input
                            name="plataforma"
                            value={
                                formulario.plataforma
                            }
                            onChange={cambiarCampo}
                            placeholder="PC, PS5, Xbox..."
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
                            font-medium
                            text-slate-300
                        ">
                            Género *
                        </label>

                        <input
                            name="genero"
                            value={
                                formulario.genero
                            }
                            onChange={cambiarCampo}
                            placeholder="Acción, RPG..."
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

                </div>


                {/* ESTADO */}

                <div>

                    <label className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-300
                    ">
                        Estado
                    </label>

                    <select
                        name="estado"
                        value={
                            formulario.estado
                        }
                        onChange={cambiarCampo}
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
                    >

                        <option>
                            Pendiente
                        </option>

                        <option>
                            Jugando
                        </option>

                        <option>
                            Completado
                        </option>

                    </select>

                </div>


                {/* BOTONES */}

                <div className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                ">

                    <button
                        type="submit"
                        disabled={guardando}
                        className="
                            flex-1
                            rounded-lg
                            bg-purple-600
                            px-5
                            py-3
                            font-bold
                            text-white
                            hover:bg-purple-500
                            disabled:opacity-50
                        "
                    >
                        {guardando
                            ? "Guardando..."
                            : videojuegoEnEdicion
                                ? "Guardar cambios"
                                : "Agregar videojuego"
                        }
                    </button>


                    {videojuegoEnEdicion && (

                        <button
                            type="button"
                            onClick={
                                cancelarEdicion
                            }
                            className="
                                rounded-lg
                                bg-slate-800
                                px-5
                                py-3
                                font-semibold
                                text-slate-300
                                hover:bg-slate-700
                            "
                        >
                            Cancelar
                        </button>

                    )}

                </div>

            </form>


            {/* PREVISUALIZACIÓN */}

            {formulario.imagen && (

                <div className="mt-6">

                    <p className="
                        mb-2
                        text-sm
                        font-semibold
                        text-slate-300
                    ">
                        Vista previa
                    </p>

                    <img
                        src={formulario.imagen}
                        alt="Vista previa"
                        className="
                            max-h-64
                            w-full
                            rounded-xl
                            object-cover
                        "
                    />

                </div>

            )}

        </section>
    );
}