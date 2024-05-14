import './Login.css'

// const URL = "https://663ebeffe3a7c3218a4b47e7.mockapi.io/";

export default function Login(){

	function handleLoginSubmit(evt){
		
		evt.preventDefault();
		//Prevenir comportamiento por defecto.

		//Tomar datos del formulario

		//Chequear si existe un usuario con dicho email y si existe chequear el pass del usr coincide con lo que la persona colocó en el login
		try{
			//Cambios en la lógica
		}catch(error){
			console.log(error)
		}
	}

    return (
		<div className="login-container">
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<form className="login-form" onSubmit={handleLoginSubmit}>
				<h1>Ingresar</h1>
				<label>Correo electrónico</label>
				<input
					name="email"
					required
					type="text"
					placeholder="Correo electrónico"
				/>

				<label>Contraseña</label>
				<input
					name="password"
					required
					type="password"
					placeholder="Contraseña"
				/>

				<button type="submit" className="button">
					Ingresar
				</button>
			</form>
		</div>
	);
}