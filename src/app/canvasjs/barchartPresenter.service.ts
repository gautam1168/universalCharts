class Series {
	label: string;
	data: Array<number>;
	constructor(label, data){
		this.label = label
		this.data = data
	}
}

export class BarChartPresenter {
	view: any;
	chart: any;
	options: any = {
		type: 'bar',
		data: {
			labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	};

	init(view: any){
		this.render(view);
		this.view = view;
	}

	setDefault(){
		this.initializeLargeData(6)
		this.options.data.datasets[0].backgroundColor = [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)'
		]
		this.options.data.datasets[0].borderColor = [
			'rgba(255,99,132,1)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)'
		]
		this.render(this.view)
	}

	setDataTo(numData){
		this.initializeLargeData(numData);
		this.render(this.view);
	}

	initializeLargeData(numData){
		console.log("Creating data")
		this.options.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)'
		this.options.data.datasets[0].borderColor = 'rgba(255,99,132,1)'
		this.options.data.datasets[0].data = Array(numData).fill(0).map(elem=>{return Math.random()*10})
		this.options.data.labels = Array(numData).fill(0).map((elem, i)=>{return i})
		console.log("Data created")
	}

	render(view: any){
		let ctx = view.ctx;
		if (this.chart != undefined){
			this.chart.destroy()
			view.removeChartCanvas = true;
		}

		this.chart = new (<any>window).Chart(ctx, this.options);
	}
}
