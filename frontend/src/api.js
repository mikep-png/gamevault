// ============================================================
// API DE GAMEVAULT
// ============================================================
//
// Este archivo contiene todas las funciones encargadas
// de comunicarse con el backend.
//
// Así evitamos escribir fetch() repetidamente
// dentro de los componentes.
//
// ============================================================

import {
    API_BASE_URL,
    API_SERVER_URL
} from "./config";


// ------------------------------------------------------------
// GET - Obtener todos los videojuegos
// ------------------------------------------------------------

export async function obtenerVideojuegos() {

    const response =
        await fetch(API_BASE_URL);


    if (!response.ok) {

        throw new Error(
            "No se pudieron obtener los videojuegos"
        );
    }


    return await response.json();
}


// ------------------------------------------------------------
// GET - Obtener un videojuego por ID
// ------------------------------------------------------------

export async function obtenerVideojuego(id) {

    const response =
        await fetch(
            `${API_BASE_URL}/${id}`
        );


    if (!response.ok) {

        throw new Error(
            "No se encontró el videojuego"
        );
    }


    return await response.json();
}


// ------------------------------------------------------------
// POST - Crear videojuego
// ------------------------------------------------------------

export async function crearVideojuego(videojuego) {

    const response =
        await fetch(API_BASE_URL, {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(videojuego)
        });


    if (!response.ok) {

        const error =
            await response.json()
                .catch(() => null);


        throw new Error(
            error?.mensaje ||
            "No se pudo crear el videojuego"
        );
    }


    return await response.json();
}


// ------------------------------------------------------------
// PUT - Actualizar videojuego
// ------------------------------------------------------------

export async function actualizarVideojuego(
    id,
    videojuego
) {

    const response =
        await fetch(
            `${API_BASE_URL}/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(videojuego)
            }
        );


    if (!response.ok) {

        const error =
            await response.json()
                .catch(() => null);


        throw new Error(
            error?.mensaje ||
            "No se pudo actualizar el videojuego"
        );
    }


    return await response.json();
}


// ------------------------------------------------------------
// DELETE - Eliminar videojuego
// ------------------------------------------------------------

export async function eliminarVideojuego(id) {

    const response =
        await fetch(
            `${API_BASE_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


    if (!response.ok) {

        const error =
            await response.json()
                .catch(() => null);


        throw new Error(
            error?.mensaje ||
            "No se pudo eliminar el videojuego"
        );
    }


    return await response.json();
}


// ============================================================
// WIKIPEDIA
// ============================================================

export async function buscarVideojuegoWikipedia(
    titulo
) {

    const response =
        await fetch(
            `${API_SERVER_URL}/buscar-videojuego?q=${encodeURIComponent(titulo)}`
        );


    if (!response.ok) {

        const error =
            await response.json()
                .catch(() => null);


        throw new Error(
            error?.mensaje ||
            "No se encontró información"
        );
    }


    return await response.json();
}