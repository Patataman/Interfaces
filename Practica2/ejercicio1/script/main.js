
/*Todos los eventos onClick deben realizarse dentro de un EventListener con DOMContentLoaded
ya que si no, se carga el js antes que la página y no se crean los métodos. Asi nos aseguramos 
de que se añaden los métodos una vez se ha cargado la página */

//Colorear enlaces
document.addEventListener("DOMContentLoaded", function() { 
	var enlaces = document.getElementsByClassName('link');
	for (var i=0; i<enlaces.length; i++) {
		enlaces[i].addEventListener('click', function() {
			document.getElementsByClassName('active')[0].classList.remove('active');
			this.classList.add('active');
		});
	}
});

//Desplegar informacion
document.addEventListener("DOMContentLoaded", function() { 

	var more = document.getElementsByClassName('more');
	for (var i=0; i<more.length; i++) {
		more[i].addEventListener('click', function() {
			this.classList.toggle('rotation');
			if (this.nextElementSibling.style.maxHeight == '') {
				this.nextElementSibling.style.maxHeight = '500px';
			} else {
				this.nextElementSibling.style.maxHeight = '';
			}
			
		});
	}
});

//Añadir a la lista de compra
document.addEventListener("DOMContentLoaded", function() {
	var carlds = document.getElementsByClassName('carld');
	var botones = document.getElementsByClassName('buy');

	for (var i=0; i<botones.length; i++) {
		botones[i].addEventListener('click', function() {
			var item = carlds[this.id];

			//Hay 2 posibilidades, que el item ya se encuentre en la lista y querramos añadir elementos
			//o que sea un nuevo item.
			var pos = -1;
			var carro = document.getElementById('carro').getElementsByTagName('li');
			for (var i=0; i<carro.length;i++) {
				if (carro[i].id == this.id) {
					pos = i;
				}
			}
			//si se añade el primer elemento, se agrega al final el botón de compra.
			if (document.getElementById('carro').innerHTML === '') {
				/*var compra = document.createElement('button');
				compra.setAttribute('type', 'button');
				compra.innerHTML = 'Realizar Compra';
				document.getElementById('carro').parentElement.appendChild(compra);*/
				document.getElementById('compra').classList.toggle('hidden');
			}

			//Caso de aumentar la cantidad de elementos.
			if (pos >= 0) {
				//objeto a actualizar
				var itemAct = carro[pos];
				var cantidad = itemAct.getElementsByTagName('p')[0];
				var num = cantidad.innerHTML.split(' ');
				num = +num[1] + +item.getElementsByClassName('cantidad')[0].value;
				cantidad.innerHTML = 'Cantidad: '+ num;
			} 

			else {
				//Caso de crear un nuevo elemento.
				if ( item.getElementsByClassName('cantidad')[0].value != '') {
					//Recuperamos los objetos a introducir
					var img = item.getElementsByTagName('img')[0];
					var text = item.getElementsByTagName('h3')[0];

					//Preparamos el elemento a introducir
					var ul = document.getElementById('carro');
					var li = document.createElement('li');
					li.setAttribute('id',this.id);

					//añadimos todos los atributos necesarios a la imagen
					var imgNew = document.createElement('img');
					imgNew.setAttribute('src', img.src);
					imgNew.setAttribute('alt', img.alt);

					//añadimos atributos al texto.
					var textNew = document.createElement('h4');
					textNew.innerHTML = text.innerHTML;

					//Boton para eliminar del carrito
					var eliminar = document.createElement('span');
					eliminar.setAttribute('class','eliminar typcn typcn-times-outline');
					eliminar.setAttribute('onclick', 'removeItem('+ this.id +');');

					//añadimos cantidad de elementos.
					var pCantidad = document.createElement('p');
					var cantidad = item.getElementsByClassName('cantidad')[0].value;
					pCantidad.innerHTML = 'Cantidad: '+ cantidad;

					//Introducimos los elementos
					textNew.appendChild(eliminar);
					li.appendChild(textNew);
					li.appendChild(imgNew);
					li.appendChild(pCantidad);
					ul.appendChild(li);
				}
			}		
		});
	}
});

//Desplegar carrito
document.addEventListener("DOMContentLoaded", function() {
	//Es necesario ponerlo fuera, ya que document.getElementById('carrito').style devuelve una hoja de estilos vacía
	document.getElementById('carrito').style.right = '-24%';
	document.getElementById('desplegable').addEventListener('click', function() {
		this.classList.toggle('typcn-chevron-left');
		this.classList.toggle('typcn-chevron-right');
		if (document.getElementById('carrito').style.right != "-24%") {
			document.getElementById('carrito').style.right = '-24%';
		} else {
			document.getElementById('carrito').style.right = '-2%';
		}
	});
});

//Vaciar carrito
document.addEventListener("DOMContentLoaded", function() { 
	document.getElementById('vaciar').addEventListener('click', function() {
			//Vaciamos el carrito y quitamos el botón de compra.
			document.getElementById('carro').innerHTML = '';
			document.getElementById('compra').classList.toggle('hidden');
	});
});

//Eliminar elemento del carrito
function removeItem(itemID) {
	var carro = document.getElementById('carro').getElementsByTagName('li');
	var item;

	for (var i = 0; i < carro.length; i++) {
		if (carro[i].id == itemID){
			item = carro[i];
		}
	};

	//Si no encontramos el item, enviamos un mensaje de alerta por la consola.
	if (item == null)
		console.log('Trying: Delete Item. Issue: Item not found')

	//En caso de haber encontrado el item, se borra de la lista.
	else
		item.remove();

	//Si el carro está vacío, quitamos el botón de compra.
	if (carro.length == 0)
		document.getElementById('compra').classList.toggle('hidden');

}	

