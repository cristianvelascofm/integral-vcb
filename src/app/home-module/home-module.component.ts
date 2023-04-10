import { Component } from '@angular/core';

@Component({
  selector: 'app-home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['./home-module.component.scss']
})
export class HomeModuleComponent {
  chartOptions = {
	  animationEnabled: true,
	  title:{
		text: "Presupuesto"
	  },
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 23, name: "Apoyos" },
		  { y: 17, name: "Transporte" },
		  { y: 8, name: "Sonido" },
		  { y: 14, name: "Proyectos" },
		  { y: 16, name: "Eventos" },
		  { y: 17, name: "Otros" },
		  { y: 43, name: "Disponible" }
		]
	  }]
	}	
}
