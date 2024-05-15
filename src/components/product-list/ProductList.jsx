import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import './ProductList.css'

const URL = 'https://663ebeffe3a7c3218a4b47e7.mockapi.io';

export default function ProductList(){

    //Generar un estado para nuestros productos []
    const [products, setProducts] = useState([])
    //Hacer un useEffect hacer una petición controlada

    useEffect(()=>{
        getProducts();
    }, [])
    //Tomar los productos del back

    async function getProducts(){

        try{
            const responseAwait = await axios.get(`${URL}/products`)
            const productsAPI = responseAwait.data;
            
            setProducts(productsAPI);
    
        }catch(error){
            console.log(error)
        }

    }

    return (
        <>
            <h2>Lista de productos</h2>

            <div className="card-container">
                {
                    products.map(prod => <ProductCard product={prod} key={prod.id} /> )/* No pongo llaves porque devuelvo un solo paquete */
                }
            </div>

        </>
    )
}