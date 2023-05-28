import { Component } from '@angular/core';

@Component({
	selector: 'app-budget-panel',
	templateUrl: './budget-panel.component.html',
	styleUrls: ['./budget-panel.component.scss']
})
export class BudgetPanelComponent {
	operatingBudget = {
		animationEnabled: true,
		backgroundColor: "rgba(64, 51, 182, 0.0)",
		//   width: 300,
		height: 260,
		title: {
			text: "Funcionamiento",

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
				//   agregar tiquietes
			]
		}]
	};

	investmentBudget = {
		animationEnabled: true,
		backgroundColor: "rgba(64, 51, 182, 0.0)",
		//   width: 300,
		height: 260,
		title: {
			text: "Inversión",

		},
		data: [{
			type: "doughnut",
			yValueFormatString: "#,###.##'%'",
			indexLabel: "{name}",
			dataPoints: [
				{ y: 21, name: "Disponible" },
				{ y: 23, name: "Proyecto A" },
				{ y: 19, name: "Proyecto B" },
				{ y: 26, name: "Proyecto C" },
				{ y: 11, name: "Proyecto D" },
				
			]
		}]
	}

}
