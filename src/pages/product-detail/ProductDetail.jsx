import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductDetail(){

    /* const params = useParams(); */ /* Defino una variable params y le asigno el Hook que ofrece la libreria router-dom */
    const [product, setProduct] = useState()
    const {id} = useParams(); /* Desestructuro el useParams y guardo id */

    useEffect(() => {
        getProductById(id);
    }, []);

    async function getProductById(id){
        
        try {
            const response = await axios.get(`${URL}/products/${id}`);
            console.log(response.data)
            const {product} = response.data
            setProduct(product)

        } catch (error) {
            console.log(error)
        } 
    }




    return (
       /*  {!product ? <spinner /> : "Existe"} */
        <>
            <h1>{product?.name}</h1>
        </>
    )
}