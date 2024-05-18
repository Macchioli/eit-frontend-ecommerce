import { createContext, useContext, useState } from "react";

const OrderContext = createContext() /* Me provee react para crear el contexto */

export const useOrder = () => useContext(OrderContext) /* Hook de react a partir de la variable que le decimos que cree un contexto (OrderContext) */

export const OrderProvider = ({children}) =>{ /* Componente que me brinda ciertos servicios a partir del hijo que recibo */


    //Estado de la orden

    const [order, setOrder] = useState([
        {
            id:100,
            name: 'XBOX',
            price: 1000,
            quantity: 1
        },
        {
            id:200,
            name: 'PS5',
            price: 1500,
            quantity: 2
        },
        {
            id:300,
            name: 'Nintendo Switch',
            price: 1200,
            quantity: 3
        }
    ])

    const [total, setTotal] = useState(0)

    //Estado de desplegar o no el sidebar

    //Estado del total para calcular el precio
    function calculateTotal(){
        
        let totalCount = 0;

        order.forEach(prod =>{
            totalCount += prod.price * prod.quantity
        })

        setTotal(totalCount)
    }

    //Function Agregar producto

    function addOrderItem(producto){

       producto.quantity = 1;

       setOrder([...order, producto]) /* Un array nuevo con todo lo que esta en order mas el producto que recibo */

       calculateTotal();
    }

    //Function remover elemento de la carta

    //CalcularTotal

    //Toggle sidebar

    return(
        <OrderContext.Provider value={{ order, addOrderItem, total }} >

            {children}

        </OrderContext.Provider> /* Componente que devuelvo con el provider que me lo ofrece el context */
    )

}