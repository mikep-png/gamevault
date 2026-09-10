const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

// ==========================================
// FUNCIONES PARA LEER Y GUARDAR VIDEOJUEGOS
// ==========================================

function leerVideojuegos() {
    try {
        const data = fs.readFileSync(dbPath, "utf-8");
        const json = JSON.parse(data);

        return json.videojuegos || [];
    } catch (error) {
        console.error("Error leyendo db.json:", error);
        return [];
    }
}

function guardarVideojuegos(videojuegos) {
    try {
        fs.writeFileSync(
            dbPath,
            JSON.stringify({ videojuegos }, null, 2),
            "utf-8"
        );

        return true;
    } catch (error) {
        console.error("Error guardando db.json:", error);
        return false;
    }
}

// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de GameVault funcionando correctamente"
    });
});

// ==========================================
// GET - OBTENER TODOS LOS VIDEOJUEGOS
// ==========================================

app.get("/videojuegos", (req, res) => {
    const videojuegos = leerVideojuegos();

    res.json(videojuegos);
});

// ==========================================
// GET - OBTENER UN VIDEOJUEGO POR ID
// ==========================================

app.get("/videojuegos/:id", (req, res) => {
    const videojuegos = leerVideojuegos();

    const id = Number(req.params.id);

    const videojuego = videojuegos.find(
        (juego) => juego.id === id
    );

    if (!videojuego) {
        return res.status(404).json({
            mensaje: "Videojuego no encontrado"
        });
    }

    res.json(videojuego);
});

// ==========================================
// POST - CREAR VIDEOJUEGO
// ==========================================

app.post("/videojuegos", (req, res) => {
    const videojuegos = leerVideojuegos();

    const {
        titulo,
        descripcion,
        imagen,
        plataforma,
        genero,
        estado,
        wikipedia
    } = req.body;

    if (!titulo || !descripcion || !plataforma || !genero) {
        return res.status(400).json({
            mensaje: "Faltan datos obligatorios"
        });
    }

    const nuevoVideojuego = {
        id:
            videojuegos.length > 0
                ? Math.max(...videojuegos.map((juego) => juego.id)) + 1
                : 1,

        titulo,
        descripcion,
        imagen: imagen || "",
        plataforma,
        genero,
        estado: estado || "Pendiente",
        wikipedia: wikipedia || ""
    };

    videojuegos.push(nuevoVideojuego);

    const guardado = guardarVideojuegos(videojuegos);

    if (!guardado) {
        return res.status(500).json({
            mensaje: "No se pudo guardar el videojuego"
        });
    }

    res.status(201).json(nuevoVideojuego);
});

// ==========================================
// PUT - ACTUALIZAR VIDEOJUEGO
// ==========================================

app.put("/videojuegos/:id", (req, res) => {
    const videojuegos = leerVideojuegos();

    const id = Number(req.params.id);

    const indice = videojuegos.findIndex(
        (juego) => juego.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Videojuego no encontrado"
        });
    }

    const videojuegoActualizado = {
        ...videojuegos[indice],
        ...req.body,
        id
    };

    videojuegos[indice] = videojuegoActualizado;

    const guardado = guardarVideojuegos(videojuegos);

    if (!guardado) {
        return res.status(500).json({
            mensaje: "No se pudo actualizar el videojuego"
        });
    }

    res.json(videojuegoActualizado);
});

// ==========================================
// DELETE - ELIMINAR VIDEOJUEGO
// ==========================================

app.delete("/videojuegos/:id", (req, res) => {
    const videojuegos = leerVideojuegos();

    const id = Number(req.params.id);

    const indice = videojuegos.findIndex(
        (juego) => juego.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Videojuego no encontrado"
        });
    }

    const videojuegoEliminado = videojuegos[indice];

    videojuegos.splice(indice, 1);

    const guardado = guardarVideojuegos(videojuegos);

    if (!guardado) {
        return res.status(500).json({
            mensaje: "No se pudo eliminar el videojuego"
        });
    }

    res.json({
        mensaje: "Videojuego eliminado correctamente",
        videojuego: videojuegoEliminado
    });
});

// ==========================================
// BUSCAR VIDEOJUEGO EN WIKIPEDIA
// ==========================================

async function buscarWikipedia(titulo) {

    const idiomas = ["es", "en"];

    for (const idioma of idiomas) {

        try {

            // ==========================================
            // PASO 1: BUSCAR EL VIDEOJUEGO
            // ==========================================

            const searchUrl =
                `https://${idioma}.wikipedia.org/w/api.php` +
                `?action=query` +
                `&list=search` +
                `&srsearch=${encodeURIComponent(titulo)}` +
                `&srlimit=5` +
                `&format=json` +
                `&origin=*`;

            console.log(
                `Buscando "${titulo}" en Wikipedia ${idioma}...`
            );

            const searchResponse = await fetch(searchUrl);

            if (!searchResponse.ok) {
                console.log(
                    `Wikipedia ${idioma} respondió con error:`,
                    searchResponse.status
                );

                continue;
            }

            const searchData = await searchResponse.json();

            if (
                !searchData.query ||
                !searchData.query.search ||
                searchData.query.search.length === 0
            ) {
                console.log(
                    `No se encontraron resultados en Wikipedia ${idioma}`
                );

                continue;
            }

            // Tomamos el primer resultado
            const pagina = searchData.query.search[0];

            const tituloPagina = pagina.title;

            console.log(
                `Resultado encontrado: ${tituloPagina}`
            );

            // ==========================================
            // PASO 2: OBTENER RESUMEN
            // ==========================================

            const summaryUrl =
                `https://${idioma}.wikipedia.org/api/rest_v1/page/summary/` +
                encodeURIComponent(tituloPagina);

            const summaryResponse = await fetch(summaryUrl);

            if (!summaryResponse.ok) {
                console.log(
                    `No se pudo obtener el resumen de ${tituloPagina}`
                );

                // Aunque falle el resumen, todavía podemos
                // devolver el resultado de búsqueda.
                return {
                    titulo: tituloPagina,
                    descripcion:
                        pagina.snippet
                            ? pagina.snippet.replace(/<[^>]*>/g, "")
                            : "No hay descripción disponible.",
                    imagen: "",
                    wikipedia:
                        `https://${idioma}.wikipedia.org/wiki/` +
                        encodeURIComponent(
                            tituloPagina.replace(/ /g, "_")
                        ),
                    idioma
                };
            }

            const summaryData = await summaryResponse.json();

            // ==========================================
            // PASO 3: OBTENER IMAGEN
            // ==========================================

            let imagen = "";

            if (summaryData.thumbnail) {
                imagen = summaryData.thumbnail.source;
            } else if (summaryData.originalimage) {
                imagen = summaryData.originalimage.source;
            }

            // ==========================================
            // PASO 4: DEVOLVER INFORMACIÓN
            // ==========================================

            return {
                titulo:
                    summaryData.title || tituloPagina,

                descripcion:
                    summaryData.extract ||
                    pagina.snippet?.replace(/<[^>]*>/g, "") ||
                    "No hay descripción disponible.",

                imagen,

                wikipedia:
                    summaryData.content_urls?.desktop?.page ||
                    `https://${idioma}.wikipedia.org/wiki/` +
                    encodeURIComponent(
                        tituloPagina.replace(/ /g, "_")
                    ),

                idioma
            };

        } catch (error) {

            console.error(
                `Error buscando en Wikipedia ${idioma}:`,
                error.message
            );

        }
    }

    return null;
}

// ==========================================
// GET - BUSCAR EN WIKIPEDIA
// ==========================================

app.get("/buscar-videojuego", async (req, res) => {

    const { q } = req.query;

    if (!q || q.trim() === "") {
        return res.status(400).json({
            mensaje: "Debes escribir el nombre de un videojuego"
        });
    }

    console.log(
        `\n🔎 Buscando videojuego: ${q}`
    );

    try {

        const resultado = await buscarWikipedia(q.trim());

        if (!resultado) {

            console.log(
                `❌ No se encontró información para: ${q}`
            );

            return res.status(404).json({
                mensaje: "No se encontró información en Wikipedia"
            });
        }

        console.log(
            `✅ Información encontrada: ${resultado.titulo}`
        );

        res.json(resultado);

    } catch (error) {

        console.error(
            "Error general buscando en Wikipedia:",
            error
        );

        res.status(500).json({
            mensaje: "Error al consultar Wikipedia"
        });
    }
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log("       GAMEVAULT API");
    console.log("======================================");
    console.log(`Servidor ejecutándose en:`);
    console.log(`http://localhost:${PORT}`);
    console.log("");
});