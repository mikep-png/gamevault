import {
    useAuth
} from "../context/AuthContext";

import {
    useGames
} from "../context/GameContext";


export default function Perfil() {

    const {
        usuario
    } = useAuth();


    const {
        videojuegos
    } = useGames();


    const completados =
        videojuegos.filter(
            (juego) =>
                juego.estado ===
                "Completado"
        ).length;


    const jugando =
        videojuegos.filter(
            (juego) =>
                juego.estado ===
                "Jugando"
        ).length;


    return (

        <main className="
            mx-auto
            max-w-5xl
            px-4
            py-10
        ">

            <header className="mb-10">

                <p className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-widest
                    text-purple-400
                ">
                    Cuenta
                </p>


                <h1 className="
                    mt-2
                    text-4xl
                    font-black
                    text-white
                ">
                    Mi perfil
                </h1>

            </header>


            <section className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-8
            ">

                <div className="
                    flex
                    flex-col
                    items-center
                    gap-5
                    sm:flex-row
                ">

                    <div className="
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        bg-purple-600
                        text-4xl
                        font-black
                        text-white
                    ">
                        {usuario?.nombre
                            ?.charAt(0)
                            ?.toUpperCase()
                        }
                    </div>


                    <div>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-white
                        ">
                            {usuario?.nombre}
                        </h2>


                        <p className="
                            mt-1
                            text-slate-400
                        ">
                            Usuario de GameVault
                        </p>

                    </div>

                </div>


                <div className="
                    mt-10
                    grid
                    gap-4
                    sm:grid-cols-3
                ">

                    <div className="
                        rounded-2xl
                        bg-slate-950
                        p-5
                    ">

                        <p className="
                            text-sm
                            text-slate-400
                        ">
                            Videojuegos
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-black
                            text-white
                        ">
                            {videojuegos.length}
                        </p>

                    </div>


                    <div className="
                        rounded-2xl
                        bg-slate-950
                        p-5
                    ">

                        <p className="
                            text-sm
                            text-slate-400
                        ">
                            Jugando
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-black
                            text-purple-400
                        ">
                            {jugando}
                        </p>

                    </div>


                    <div className="
                        rounded-2xl
                        bg-slate-950
                        p-5
                    ">

                        <p className="
                            text-sm
                            text-slate-400
                        ">
                            Completados
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-black
                            text-green-400
                        ">
                            {completados}
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}