// 6a6e5e04af5ebe5eaa73237f8cbc79d2
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6a6e5e04af5ebe5eaa73237f8cbc79d2

//Esto va siempre
const formulario = document.querySelector("form");
formulario.addEventListener("submit", (e)=>{
	e.preventDefault();
	//Input = formulario.firstElementChild;
	//Button formulario.lastElementChild;

	const city = formulario.children[0].value;
	const ajax = new XMLHttpRequest (),
		url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=`;		
ajax.open('GET',url);
ajax.send();
//hasta acá
	/*const ajax2 = new XMLHttpRequest (),
		url2 = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAEHOw8BNVryyxamSgZHUecdLwN2X5XlhI&q=${city}`;		
ajax2.open('GET',url2);
ajax2.send();

const map =document.querySelector('.map');*/
//map = `<iframe width="450"  height="250" frameborder="0" style="border:0" src="${url2}" allowfullscreen></iframe>`;
/* ----------Otra forma que reemplaza al LOAD-------------
ajax.addEventListener('readystatechange', () => {
	if(ajax.readyState === 4 && ajax.status === 200){
		const response = ajax.responseText,
		//Pasarlo a JASON
			data = JSON.parse(response);
		console.log(data);
		console.log('Funcionó');
	}
})*/
//Espera hasta que carge todo. Todo lo que quiero manipular va dentro del LOAD.
ajax.addEventListener('load', () =>{
	const response = ajax.responseText,
		//Pasarlo a JASON
			data = JSON.parse(response);
			//accedo a la data puede ser con ['']. Entro a data, luego a Main y después a temp
			//console.log('Soy un console', data.main.temp);
			//getData(data.main.temp);
			
			console.log(data);
			//DESTRUCTURACIÓN DE OBJETOS Y ARRAYS -> puedo crear variables nuevas desde la info que recibo del JASON. Tiene que matchear el nombre y la propiedad
			// Hacer un alias variable:nuevo nombre
			
			const {
				cod, name:nombre, main, wind
			} = data;
			console.log(cod, nombre, main);
			//Esta es la vieja forma
			//var cod = data.cod;
			//Main ya definido en la línea de arriba por eso puedo igualar.
			const{
				temp,feels_like:st, temp_max:max, temp_min:min,humidity,pressure

			} = main;
			const{
				speed, deg, gust

			} = wind;
			const CityName = document.querySelector('.CityName');
			CityName.innerHTML = `El clima en ${nombre}`;
			cambiarImagen(temp,max, min,st, humidity, speed,pressure); //Le paso el parametro real;

	});
	//ERROR
	ajax.addEventListener('error', () =>{
		console.error('%cHubo un error 💥','background:url("https://media.giphy.com/media/xTiQygY6HW1GjoYKFq/giphy.gif"); background-size:cover;padding:100px;');
	});
});



//Hago la función para separar los pedidos y que sea más prolijo. Usar de parametro una palabra mejor
/*function getData(zaraza){
	console.log(zaraza);
}*/

function cambiarImagen(temperatura, max, min, st, h, w,p){
	const grados = (temperatura - 273.15);
	const gradosRedondeo = Math.floor(grados);

	const tmax = (max - 273.15);
	const tmaxRedondeo = Math.floor(tmax);

	const tmin = (min - 273.15);
	const tminRedondeo = Math.floor(tmin);

	const st1 = (st - 273.15);
	const stRedondeo = Math.floor(st1);
			
	const humedad = h;	
	const viento = w;
	const presion = p;
		const newImage = document.querySelector(".background-weather");
		//const newImage = document.getElementsByClassName("background-weather")[0];
	const card = document.querySelector(".card");
	const icon = document.querySelector(".icon");	
	if (gradosRedondeo >= 20) {
		newImage.style.backgroundImage = "url('images/playa.jpg')";
		
		icon.style.backgroundImage ="url('images/day.svg')";
		


	} else{
		newImage.style.backgroundImage = "url('images/iceland.jpg')";
		
		icon.style.backgroundImage ="url('images/cloudy.svg')";
	}
	const datos = document.querySelector(".datos");
	datos.style.display = "block";	
	const tempText = document.querySelector(".tempText");
	tempText.innerHTML = `<p>Temperatura ${gradosRedondeo}°</p><p>Max ${tmaxRedondeo}°</p><p>Min ${tminRedondeo}°</p>`;
	const husen = document.querySelector(".husen");
		husen.innerHTML = `<p>Humedad ${humedad}%</p><p>Sensación térmica ${stRedondeo}°</p>`;
	const previen = document.querySelector(".previen");
	previen.innerHTML = `<p>Viento ${w} km/h</p><p>Presión atmosferica ${presion} hectopascales</p>`;
}


