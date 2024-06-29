// import { Navigate } from "react-router-dom";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {useForm } from "react-hook-form"
import { formatTimestampToInputDate } from "../../services/utils/FormatDate";
import { useUser } from "../../context/UserContext";



// const URL = `https://663ebeffe3a7c3218a4b47e7.mockapi.io` //Base de donde esta mi servidor recomendado sin el endpoint
const URL = import.meta.env.VITE_SERVER_URL 

export default function AdminProduct(){
    
    const [products, setProducts] = useState([]);
    const{register, handleSubmit, setValue , reset, formState: {errors}} = useForm()
    
    const[isEditing, setIsEditing] = useState(false);
    const {token} = useUser()
    
    const [categories, setCategories] = useState([])
    
    useEffect(()=>{
        getProducts();
        getCategories()
    }, [])

    async function getProducts(){

        // const URL = `https://6622ed703e17a3ac846e40e5.mockapi.io/api/products`

        try {
            const response = await axios.get(`http://localhost:3000/api/products`);

            const {products} = response.data; /* Destructuro ya que la data viene en la sección productos */
            setProducts(products);

        } catch (error) {
            console.log(error)
        }
    }

    async function getCategories(){
        try {
            
            const response = await axios.get(`http://localhost:3000/api/categories`)

            console.log(response)

            const categoriesDB = response.data.categories;

            setCategories(categoriesDB)

        } catch (error) {
            console.log("Error al obtener categorias:", error)
        }
    }

    function onSubmit(data){

        const formData = new FormData(); /* Para que JS pueda enviar el archivo como tal debo partir desde FormData */

        formData.append("id", data.id)
        formData.append("name", data.name)
        formData.append("price", +data.price)
        formData.append("description", data.description)
        formData.append("image", data.image.length ? data.image[0] : undefined)
        formData.append("createdAt", new Date(data.createdAt).getTime())
        formData.append("category", data.category)  /* Doy el valor correspondiente de forma manual */

        // data.createdAt = new Date (data.createdAt).getTime();
        // data.price = +data.price;
        // data.image = data.image[0] /* Mando la posición que contiene la imagen que adjunté que es la que contiene efectivamente el archivo. */

        if(data.id){
            updateProduct(formData);
        }else{
            createProduct(formData)
        } /* Entro al if si tiene un id ya que estaría editando */

    }

    async function createProduct(product){
        try {
            
            const newProduct = await axios.post(`http://localhost:3000/api/products`, 
                                                product,{
                                                    headers:{
                                                        Authorization: token
                                                    }
                                                })  /* Agrego encabezado con propiedad autorizacion con el token */
            getProducts();
            console.log(newProduct);
            reset();
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteProduct(id){

        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`,{
                headers:{
                    Authorization: token
                }
            })

            getProducts();

            /* Swal. fire ... */
        } catch (error) {
            console.log(error)
        }
    }

    async function updateProduct(productFormData){

        try {
            console.log("HOLA",productFormData)
            const id = productFormData.get("id")
            await axios.put(`${URL}/products/${id}`, productFormData, {
                headers: {
                    Authorization: token
                }
            })

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
        setValue("id", producto._id);
        setValue("name", producto.name)
        setValue("price", producto.price)
        // setValue("image", producto.image) /* Saco la imagen ya que no se va setear una nueva imagen(no se puede setear input file) si no se adjunta archivo */
        setValue("category", producto.category._id)
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
                        <input type="file" accept="image/*" {...register("image")} /> {/* accept para que solo muestre imagenes el navegador de archivos */}
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Categoria</label>
                        <select {...register("category")} className="select-input">
                        {/* Obtenidas las categorias pinto con un map las diferentes opciones */}
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>{category.viewValue}</option>
                            ))
                        }
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
                                    <img src={`http://localhost:3000/images/products/${product.image}`} alt="" />
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
                                    <button className="action-btn btn-danger" onClick={() => deleteProduct(product._id)}>
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