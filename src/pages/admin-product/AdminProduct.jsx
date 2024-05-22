// import { Navigate } from "react-router-dom";

import axios from "axios";
import {useForm } from "react-hook-form"

export default function AdminProduct(){

    const{register, handleSubmit, formState: {errors}} = useForm()

    function onSubmit(data){
        data.createdAt = new Date (data.createdAt).getTime();
        data.price = +data.price;

        console.log(data)

        createProduct(data)
    }

    async function createProduct(product){
        try {
            /*  */
            const URL = `https://6622ed703e17a3ac846e40e5.mockapi.io/api/products`
            const newProduct = await axios.post(URL, product)

            console.log(newProduct);
        } catch (error) {
            console.log(error)
        }
    }

    /* Evito lo siguiente porque lo hace el guard: */
    // const isAdmin = false;

    // if(!isAdmin){
    //     return <Navigate to="/" />
    // } /* Agrego un controlador para saber si es admin para no permitir la carga del componente */

    return (
        <div className="admin-container">
            <h1>Admin Product</h1>

            <div className="admin-form-container">
                <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("name", {required:true, minLength:3, maxLength: 100})} />

                    {errors.name?.type === "required" && (
                        <span className="input-error">El campo es requerido</span>
                    )}

                    {(errors.name?.type === "minLength" || errors.name?.type === "maxLength") && (
                        <span className="input-error">
                            La cantidad de caracteres es invalida
                        </span>
                    )}

                    <input type="text" {...register("description")} />
                    <input type="number" {...register("price")} />
                    <input type="url" {...register("image")} />
                    <select {...register("category")}>
                        <option value="sincronico">Sincrónico</option>
                        <option value="asincronico">Asincrónico</option>
                    </select>
                    <input type="date" {...register("createdAt")} />
                    
                    <button type="submit">Añadir producto</button>
                </form>
            </div>
        </div>
    )
}