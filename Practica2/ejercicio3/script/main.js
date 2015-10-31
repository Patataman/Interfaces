//Colorear enlaces
$(document).ready(function () {
	$(function() {

		$($('a.activeDot').attr('name')).css('left','0%');
		//Método para el slider. Se esconde al cargar y aparece al poco.
		$('#container').hide().delay(150).show('slide', 1200);
		
		//método para los enlaces de navegacion. Como es igual, no varía.
		var enlaces = document.getElementsByClassName('link');
		for (var i=0; i<enlaces.length; i++) {
			enlaces[i].addEventListener('click', function() {
				document.getElementsByClassName('active')[0].classList.remove('active');
				this.classList.add('active');
			});
		}

		//Colorear el elemento actual del menú.
		$('#menu a').click(function() {
			var actual = $('a.activeDot').attr('id');
			var Hactual = $($('a.activeDot').attr('name'));
			var destino = $(this).attr('id');
			var Hdestino = $($(this).attr('name'));
			$('a.activeDot').removeClass('activeDot');
			$(this).addClass('activeDot');
			if (actual - destino > 0 ) {
				//MOVER hacia la derecha la imagen actual
				Hdestino.css('left','0%');
				Hdestino.css('opacity','1');
				Hactual.css('left','100%');
				Hactual.css('opacity','0');
			} else if (actual - destino < 0) {
				//MOVER hacia la izquierda la imagen actual
				Hdestino.css('left','0%');
				Hdestino.css('opacity','1');
				Hactual.css('left','-200%');
				Hactual.css('opacity','0');
			}
		});
	});
});

