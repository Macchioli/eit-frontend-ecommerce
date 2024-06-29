import { useState } from "react";
import './Pagination.css'
import { render } from "react-dom";

export default function Pagination({totalItems, loadPage, pageItems = 5}) { /* Si se manda propiedad pageItems tendra ese valor sino por defecto =5 */

    const [page, setPage] = useState(1)

    const totalButtons = Math.ceil(totalItems / pageItems)  /* ceil : redondeo hacia arriba */


    function handlePageChange(value){
        setPage(value);
        loadPage(value);
    }

    function renderButtons(){
        const buttons = [];

        for(let i = 0 ; i <= totalButtons ; i++){
            buttons.push(
                <button key={i} 
                        className={`pagination-item ${ page === i ? 'active' : ''}`}
                        onClick={() => handlePageChange(i)}>
                            
                            {i+1}
                </button>
            )
        }

        return buttons;
    }

    return (
        <div className="pagination-list">
            {renderButtons()}
        </div>
    )

}