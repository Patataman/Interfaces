// Colorear enlaces del nav
$(document).ready(function () {
	$(function() {

		var enlaces = document.getElementsByClassName('link');
		for (var i=0; i<enlaces.length; i++) {
			enlaces[i].addEventListener('click', function() {
				document.getElementsByClassName('active')[0].classList.remove('active');
				this.classList.add('active');
			});
		}
/* ------------------------ */

// Abrir/Cerrar menú para la tarjeta de crédito
		$('#in_tarjeta').click(function(){
			//Hacemos visible el menú con una transición
			$('#menu_tarjeta').show(300);
			//Hacemos obligatorios todos sus inputs excepto el campo Otro
			$('#menu_tarjeta :input').attr('required', 'true');
			$('#in_other').removeAttr('required');
		});

		$('#in_paypal').click(function() {
			//Volvemos a esconder el menú
			$('#menu_tarjeta').hide(300);
			//Hacemos opcionales todos sus inputs
			$('#menu_tarjeta :input').removeAttr('required');
		});
/* -------------------------------------------- */

// Hacer obligatorios los campos de usuario cuando se introduzca algo en el campo nombre_usuario
		$('#user').blur(function () {
			if($('#user').val() != ''){
				$('#user').attr('required', 'true');
				$('#user_lab').text('Usuario(*):');

				$('#contrasena').attr('required', 'true');
				$('#contr_lab').text('Contraseña(*):');

				$('#conf_contrasena').attr('required', 'true');
				$('#conf_contr_lab').text('Confirmar Contraseña(*):')
			}
			else{
				$('#info_user :input').removeAttr('required');
				$('#user_lab').text('Usuario:');
				$('#contr_lab').text('Contraseña:');
				$('#conf_contr_lab').text('Confirmar Contraseña:')
			}
		});
/* --------------------------------------------------------------------------------------------- */

// Añadir campo de texto #in_other si la tarjeta no coincide con los tipos prefijados.
		$('#tipo_tarjeta').change(function () {
			if($('#tipo_tarjeta option:selected').text().trim(' ') == 'Otro'){
				$('#otra_tarj').removeClass('hidden');
				$('#otra_tarj').addClass('show');
				$('#in_other').attr('required', 'true');
			}
			else{
				$('#otra_tarj').removeClass('show');
				$('#otra_tarj').addClass('hidden');	
				$('#in_other').removeAttr('required', 'true');
			}
		});
/* ------------------------------------------------------------------------------------ */

// Validacion de los campos del formulario
		$('form').submit(function () {

			var todoOK = true;
			// Todas las letras del abecedario español, la çÇ y espacios.
			var solo_letras = /^[a-zñçA-ZÑÇáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ\s]+$/;

			if(!$('#nombre').val().match(solo_letras)){
				todoOK = false;
				errorAlert('#nombre');
			}

			console.log('Nombre OK');

			if(!$('#apellidos').val().match(solo_letras)){
				todoOK = false;
				errorAlert('#apellidos');
			}

			console.log('Apellidos OK');

			/* 9 dígitos cualesquiera. Solo soporte a España */
			if(!$('#telefono').val().match(/^[0-9]{9}\s*$/)){
				todoOK = false;
				errorAlert('#telefono');
			}

			console.log('Telefono OK');

			/* (Av/ ó c/)<nombre avenida/calle>, n<número>, <piso>, <puerta> */
		/*	if(!$('#direccion').val().match(/^[(c\/)(C\/)(Av\/)]\s?[a-zñçA-ZÑÇáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ\s]+,?\sn[0-9]+(bis)?,?\s[0-9]+º?,?\s([A-Z]|[0-9]+)\s*$/)){
				todoOK = false;				
				errorAlert();
			}
		*/	
			//console.log('Direccion OK');

			/* El rango válido de códigos postales españoles es de 1001 hasta 52999*/
			if ($('#cod_post').val().match(/^[0-9]+$/)){
				if(parseInt($('#cod_post').val()) < 1001 || parseInt($('#cod_post').val()) > 52999){
					todoOK = false;
					errorAlert('#cod_post');
				}
			}
			else{
				t
				errorAlert();
			}odoOK = false;
			
			console.log('Codigo Postal OK');

			if(!$('#poblacion').val().match(solo_letras)){
				todoOK = false;
				errorAlert('#poblacion');
			}

			console.log('Poblacion OK');

			if(!$('#provincia').val().match(solo_letras)){
				todoOK = false;
				errorAlert('#provincia');
			}

			console.log('Provincia OK');

			if(!$('#pais').val().match(solo_letras)){
				todoOK = false;
				errorAlert('#pais');
			}

			console.log('Pais OK');

			// INFO DE USUARIO

			if(!$('#contrasena').val().match(/[0-9a-zA-ZñÑ]{1,8}/) /* && $('#contrasena').val().length > 8 */){
				todoOK = false;
				errorAlert('#contrasena');
			}

			console.log('Contraseña OK');
			
			//Comprobación de contraseña
			if($('#conf_contrasena').val() != $('#contrasena').val()){
				todoOK = false;
				errorAlert('#conf_contrasena');
			}

			console.log('Confirmación de Contraseña OK');

			//INFO PAGO

			if($('#in_tarjeta').is(':checked')){

				if(!$('#num_tarjeta').val().match(/[0-9\s]+$/)){
					todoOK = false;
					errorAlert('#num_tarjeta');
				}

				console.log('Número Tarjeta OK');

				if(!$('#cod_seguridad').val().match(/[a-zA-Z0-9\s]+$/){
					todoOK = false;
					errorAlert('#cod_seguridad');
				}

				console.log('Número Tarjeta OK');
				
				if(!$('#titular_tarj').val().match(solo_letras){
					todoOK = false
					errorAlert('#titular_tarj');
				}

				console.log('Titular OK');

				// Mes y año: MM/AAAA
				if(!$('#f_caducidad').val().match(/^([0-9]{2}\/[0-9]{4})$/)){
					todoOK = false;
					errorAlert('#f_caducidad');
				}

				console.log('Fecha Caducidad OK')
			}

			


		});






	});
});

function errorAlert (idCampo) {

	$(idCampo).css({
		'border-color': 'red',
	});

});
