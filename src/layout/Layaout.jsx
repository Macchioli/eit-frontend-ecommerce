import { Outlet } from "react-router-dom"
import Footer from "./footer/Footer"
import Header from "./header/Header"

export default function Layout(){


    return(
        <>
            <Header/>

            <main className="main-container">

                <Outlet /> {/* Cargo lo que dice la ruta de layout / /contact.. /about-us.. etc.  */}

            </main>

            <Footer/>
        </>
    )
}