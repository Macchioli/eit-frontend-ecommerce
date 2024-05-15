// import { NavLink } from "react-router-dom";
import ProductList from "../../components/product-list/ProductList";

export default function Home(){

    return (
        <>
            <h1>Principal</h1>

            {/* <div className="card">
                Producto 1
                <NavLink to="product-detail/1"> Ver más </NavLink> 
            </div>
            <div className="card">
                Producto 2
                <NavLink to="product-detail/2" > Ver más </NavLink>
            </div>
            <div className="card">
                Producto 3
                <NavLink to="product-detail/3" > Ver más </NavLink>
            </div> */}

            <ProductList />
        </>
    )
}