// ============================================================
// CONTEXTO DE AUTENTICACIÓN
// ============================================================
//
// Aquí manejamos el usuario que inició sesión.
//
// También utilizamos localStorage para que el usuario
// permanezca conectado aunque recargue la página.
//
// ============================================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


// Creamos el contexto
const AuthContext =
    createContext();


// Provider del contexto
export function AuthProvider({ children }) {

    // --------------------------------------------------------
    // Recuperar usuario guardado
    // --------------------------------------------------------

    const [usuario, setUsuario] =
        useState(() => {

            const usuarioGuardado =
                localStorage.getItem(
                    "gamevault_usuario"
                );


            return usuarioGuardado
                ? JSON.parse(usuarioGuardado)
                : null;
        });


    // --------------------------------------------------------
    // Guardar usuario cuando cambia
    // --------------------------------------------------------

    useEffect(() => {

        if (usuario) {

            localStorage.setItem(
                "gamevault_usuario",
                JSON.stringify(usuario)
            );

        } else {

            localStorage.removeItem(
                "gamevault_usuario"
            );
        }

    }, [usuario]);


    // --------------------------------------------------------
    // Login
    // --------------------------------------------------------

    function login(nombre, password) {

        if (
            !nombre.trim() ||
            !password.trim()
        ) {

            return {
                correcto: false,
                mensaje:
                    "Completa todos los campos"
            };
        }


        // Para el proyecto académico se utiliza
        // una autenticación simulada.
        const nuevoUsuario = {

            nombre:
                nombre.trim(),

            fechaInicio:
                new Date().toISOString()
        };


        setUsuario(nuevoUsuario);


        return {
            correcto: true
        };
    }


    // --------------------------------------------------------
    // Logout
    // --------------------------------------------------------

    function logout() {

        setUsuario(null);
    }


    return (

        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                autenticado: Boolean(usuario)
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}


// Hook personalizado
export function useAuth() {

    return useContext(AuthContext);
}