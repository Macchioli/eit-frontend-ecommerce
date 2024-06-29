import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import './ProductList.css'
import Pagination from "../pagination/Pagination";

const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductList(){

    //Generar un estado para nuestros productos []
    const [products, setProducts] = useState([])
    //Hacer un useEffect hacer una petición controlada

    useEffect(()=>{
        getProducts();
    }, [])
    //Tomar los productos del back

    async function getProducts(page = 0){ /* Por defecto 0 pero si recibe la propiedad sera el valor recibido */

        try{
            const responseAwait = await axios.get(`${URL}/products?page=${page}`)
            const {products} = responseAwait.data;
            
            setProducts(products);
    
        }catch(error){
            console.log(error)
        }

    }

    return (
        <>
            <h2>Lista de productos</h2>

            <div className="card-container">
                {
                    products.map(prod => <ProductCard product={prod} key={prod._id} /> )/* No pongo llaves porque devuelvo un solo paquete */
                }
            </div>

            <Pagination totalItems={50} loadPage={getProducts}/>

        </>
    )
}