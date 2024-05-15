import './ProductCard.css'

export default function ProductCard({product}){

    return(
        
        
            <div className="card-wrapper">
                    <article className="card">
                        <div className="card-header">
                            {/* <!-- Imagen e iconos --> */}
                            <img className="card-img card-image-1" src={product.image} alt="scratch principal" />
                            <div className="actions">
                                <i className=" fa-regular fa-heart"></i>
                                <i className=" fa-regular fa-eye"></i>
                            </div>
                        </div>
                        <div className="card-main">
                            {/* <!-- Descripcion del producto/servicio --> */}
                            <div className="card-top">
                                <h4 className="card-category">{product.name}</h4>
                                <span className="card-date">01/03/2024</span>
                            </div>
                            <h3 className="card-title">Scratch para Docentes</h3>
                            <p className="card-description">{product.description} </p>
                            <div className="card-price">
                                <span className="price"><small>$</small>17300</span>
                                <span className="normal-price"><small>$</small>21625</span>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="add-to-cart">
                                Añadir <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                            <a href="/pages/product-detail.html">
                                <button className="more-info">
                                    Más info<i className="fa-solid fa-circle-info"></i>
                                </button>
                            </a>
                        </div>
                    </article>
                </div>
        
    )
}