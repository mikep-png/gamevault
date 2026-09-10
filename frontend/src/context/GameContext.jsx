// ============================================================
// CONTEXTO GLOBAL DE VIDEOJUEGOS
// ============================================================
//
// Este contexto permite compartir la colección de videojuegos
// entre diferentes páginas sin tener que pasar los datos
// mediante props por muchos componentes.
//
// ============================================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    obtenerVideojuegos,
    crearVideojuego,
    actualizarVideojuego,
    eliminarVideojuego
} from "../api";


const GameContext =
    createContext();


export function GameProvider({ children }) {

    const [videojuegos, setVideojuegos] =
        useState([]);


    const [cargando, setCargando] =
        useState(true);


    const [error, setError] =
        useState("");


    // --------------------------------------------------------
    // Obtener datos al cargar la aplicación
    // --------------------------------------------------------

    useEffect(() => {

        cargarVideojuegos();

    }, []);


    async function cargarVideojuegos() {

        try {

            setCargando(true);

            setError("");

            const datos =
                await obtenerVideojuegos();

            setVideojuegos(datos);

        }

        catch (error) {

            console.error(error);

            setError(
                "No se pudieron cargar los videojuegos."
            );

        }

        finally {

            setCargando(false);
        }
    }


    // --------------------------------------------------------
    // Crear
    // --------------------------------------------------------

    async function agregarVideojuego(videojuego) {

        const nuevo =
            await crearVideojuego(videojuego);

        setVideojuegos(
            (actuales) => [
                ...actuales,
                nuevo
            ]
        );

        return nuevo;
    }


    // --------------------------------------------------------
    // Actualizar
    // --------------------------------------------------------

    async function editarVideojuego(
        id,
        videojuego
    ) {

        const actualizado =
            await actualizarVideojuego(
                id,
                videojuego
            );


        setVideojuegos(
            (actuales) =>
                actuales.map((juego) =>
                    Number(juego.id) === Number(id)
                        ? actualizado
                        : juego
                )
        );


        return actualizado;
    }


    // --------------------------------------------------------
    // Eliminar
    // --------------------------------------------------------

    async function borrarVideojuego(id) {

        await eliminarVideojuego(id);


        setVideojuegos(
            (actuales) =>
                actuales.filter(
                    (juego) =>
                        Number(juego.id) !== Number(id)
                )
        );
    }


    return (

        <GameContext.Provider
            value={{
                videojuegos,
                cargando,
                error,
                cargarVideojuegos,
                agregarVideojuego,
                editarVideojuego,
                borrarVideojuego
            }}
        >

            {children}

        </GameContext.Provider>
    );
}


export function useGames() {

    return useContext(GameContext);
}