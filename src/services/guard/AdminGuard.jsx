import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function AdminGuard({children}){ /* Desestructurando puedo recibir la prop children */

    const {user} = useUser()

    return user?.role === "ADMIN_ROLE" ? children : <Navigate to="/" replace />; /* replace reemplaza la ruta actual por la del navigate to */
}