import { useOrder } from '../../context/OrderContext';
import './OrderSidebar.css'

export default function OrderSidebar(){

	const { order, total } = useOrder();

    return (
		<div className="order-wrapper active">
			<div className="list-container">
				<h2>Orden actual:</h2>
				
				<ul className="order-list">
					{
						order.map(product => {
							return (
								<li className='order-item' key={product.id}>
									<img className='order-image' src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png" alt="" />

									{product.name}

									<div className="order-price">
										{product.price}
									</div>
								</li>

							)
						})
					}
				</ul>
			</div>

			<div className="order-finish">
				<div className="total">
					<div className="total-count">Items: 20</div>
					<div className="total-price">
						Total $ <span>{total}</span>
					</div>
				</div>
				<div className="order-purchase">
					{/* <a onClick={() => clearCart()}>Limpiar carrito</a>
					<button className="btn" onClick={() => finishOrder()}>
						Comprar
					</button> */}
				</div>
			</div>
		</div>
	);
}