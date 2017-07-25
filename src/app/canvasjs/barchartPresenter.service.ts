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
	viewType: string;
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

	init(view: any, viewType: string){
		this.viewType = viewType;
		this.view = view;
		this.requestRender(view);
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
		this.requestRender(this.view)
	}

	setDataTo(numData){

		this.initializeLargeData(numData);
		this.requestRender(this.view);
	}

	initializeLargeData(numData){
		console.log("Creating data")
		this.options.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)'
		this.options.data.datasets[0].borderColor = 'rgba(255,99,132,1)'
		this.options.data.datasets[0].data = Array(numData).fill(0).map(elem=>{return Math.random()*10})
		this.options.data.labels = Array(numData).fill(0).map((elem, i)=>{return i})
		console.log("Data created")
	}

	requestRender(view: any){
		let options;
		if(this.viewType == "nvd3"){
			options = this.setNvd3Options()
		}
		else if (this.viewType == "canvasjs"){
			options = this.setCanvasJSOptions()
		}
		else{
			options = this.options;
		}
		view.renderChart(options)
	}

	setNvd3Options(){
		let config = {
			key: this.options.data.datasets[0].label,
			values: []
		}
		config.values = this.options.data.datasets[0].data.map(datapoint=>{
			return {label: datapoint, value: datapoint}
		})
		return [config]
	}

	setCanvasJSOptions(){
		let config = {
			animationEnabled: true,
			theme: "theme2",
			//exportEnabled: true,
			title:{
				text: this.options.data.datasets[0].label
			},
			data: [
				{
					type: "column", //change type to bar, line, area, pie, etc
					dataPoints: this.options.data.datasets[0].data.map((datapoint, i)=>{
						return {x: i, y: datapoint}
					})
				}
			]
		}
		return config;
	}
}
