import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom' /* Importo la librería para usar las rutas y le doy un alias "as..."*/
import { OrderProvider } from './context/OrderContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Encierro el componente App en Router */}
      <UserProvider>{/* Encierro app para que sea el children y acceda así al contexto */}
        <OrderProvider>{/* Encierro app para que sea el children y acceda así al contexto */}
          <App />
        </OrderProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
)
