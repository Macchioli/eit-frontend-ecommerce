// import { Navigate } from "react-router-dom";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {useForm } from "react-hook-form"
import { formatTimestampToInputDate } from "../../services/utils/FormatDate";

const URL = `https://663ebeffe3a7c3218a4b47e7.mockapi.io` //Base de donde esta mi servidor recomendado sin el endpoint


export default function AdminProduct(){

    const [products, setProducts] = useState([]);
    const{register, handleSubmit, setValue , reset, formState: {errors}} = useForm()

    const[isEditing, setIsEditing] = useState(false);

    useEffect(()=>{
        getProducts();
    }, [])

    async function getProducts(){

        // const URL = `https://6622ed703e17a3ac846e40e5.mockapi.io/api/products`

        try {
            const response = await axios.get(`${URL}/products`);

            const productos = response.data;
            setProducts(productos);

        } catch (error) {
            console.log(error)
        }
    }



    function onSubmit(data){
        data.createdAt = new Date (data.createdAt).getTime();
        data.price = +data.price;

        if(data.id){
            updateProduct(data);
        }else{
            createProduct(data)
        } /* Entro al if si tiene un id ya que estaría editando */

    }

    async function createProduct(product){
        try {
            
            const newProduct = await axios.post(`${URL}/products`, product)
            getProducts();
            console.log(newProduct);
            reset();
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteProduct(id){

        try {
            await axios.delete(`${URL}/products/${id}`)

            getProducts();

            /* Swal. fire ... */
        } catch (error) {
            console.log(error)
        }
    }

    async function updateProduct(product){

        try {
            await axios.put(`${URL}/products/${product.id}`, product)

            // Swal.fire de exito
            getProducts();
            setIsEditing(false);
            reset();
        } catch (error) {
            console.log(error);
        }

    }

    function handleEditProduct(producto){
        
        setIsEditing(true)

        // Setear formulario con los datos de mi producto
        setValue("id", producto.id);
        setValue("name", producto.name)
        setValue("price", producto.price)
        setValue("image", producto.image)
        setValue("category", producto.category)
        setValue("description", producto.description)
        setValue("createdAt", formatTimestampToInputDate(producto.createdAt))
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
                    <input type="hidden" {...register("id")} /> {/* Input escondido que al que le seteo un id solo cuando edito, no cuando creo un elemento nuevo ya que no puedo setearlo manualmente. */}
                    <div className="input-group">
                        <label htmlFor="">Producto</label>
                        <input
                        type="text"
                        {...register("name", {
                            required: true,
                            minLength: 3,
                            maxLength: 100,
                        })}
                        />

                        {errors.name?.type === "required" && (
                        <span className="input-error">El campo es requerido</span>
                        )}

                        {(errors.name?.type === "minLength" ||
                        errors.name?.type === "maxLength") && (
                        <span className="input-error">
                            La cantidad de caracteres es invalida
                        </span>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Precio</label>
                        <input type="number" {...register("price")} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Imagen</label>
                        <input type="url" {...register("image")} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Categoria</label>
                        <select {...register("category")}>
                        <option value="running">Running</option>
                        <option value="moda">Moda</option>
                        <option value="sports">Deportes</option>
                        <option value="mountain">Montaña</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Descripcion</label>
                        <textarea type="text" {...register("description")}>
                        </textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Fecha ingreso</label>
                        <input type="date" {...register("createdAt")} />
                    </div>
                    <button className={isEditing? 'btn-success' : ''} type="submit">
                        {isEditing ? 'Actualizar' : 'Crear'}
                    </button>
                </form>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr className="admin-table-head">
                            <th className="image">Imagen</th>
                            <th className="name">Producto</th>
                            <th className="description">Descripción</th>
                            <th className="price">Precio</th>
                            <th className="actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            <tr key={product.id}>
                                <td className="image">
                                    <img src={product.image} alt="" />
                                </td>
                                <td className="name">
                                    <p>{product.name}</p>
                                </td>
                                <td className="description">
                                    <p>{product.description}</p>
                                </td>
                                <td className="price">
                                    <p>{product.price}</p>
                                </td>
                                <td className="actions">
                                    <button className="action-btn" onClick={() => handleEditProduct(product)}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button className="action-btn btn-danger" onClick={() => deleteProduct(product.id)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}