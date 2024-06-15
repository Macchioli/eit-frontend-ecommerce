import './Modal.css'

export default function Modal({title, handleClose, isOpen, children}){


    if(!isOpen) return; /* Si no esta abierto devuelvo null por lo que no pinta el return de abajo*/

    return(
        <div className="modal-overlay" onClick={handleClose}> {/* Tambien aqui puedo poner para que cierre clickeando fuera del modal */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Evito propagación para que no aplique el handleStop de overlay */}
                <div className="modal-header">
                    {title}
                </div>
                <div className="modal-body">
                    {/* <h2>Ejemplo body</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolorem?</p> */}

                    {children}
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={handleClose}>Cerrar</button>
                    <button className="btn">Aceptar</button>
                </div>
            </div>
        </div>
    )
}