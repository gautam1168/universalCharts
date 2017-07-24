import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BarChartPresenter } from '../canvasjs/barchartPresenter.service';
import { ElementGetter } from './elemGetter.directive';
@Component({
	selector: 'bar-chart',
	template: `<div style="display:block" id="chart1">
				<ul>
					<button class="button" (click)="presenter.setDefault()">default</button>
					<button class="button" (click)="presenter.setDataTo(10)">10</button>
					<button class="button" (click)="presenter.setDataTo(100)">100</button>
					<button class="button" (click)="presenter.setDataTo(1000)">1000</button>
					<button class="button" (click)="presenter.setDataTo(10000)">10000</button>
					<button class="button" (click)="presenter.setDataTo(100000)">100000</button>
					<div>{{status}}</div>
				</ul>

				<svg elementGetter width="400" height="400">
			    </svg>
			   </div>`,
	styles: [
		`svg{
			border: solid 2px;
			width: 400px;
			height: 400px;
		}
		`
	],
	providers: [ BarChartPresenter ]
})
export class NvD3BarChartView implements AfterViewInit{

	@ViewChild(ElementGetter)
	private sgetter:ElementGetter;

	private chart:any;
	public status:string;
	private svgelem: any;

	constructor(private presenter: BarChartPresenter){}

	setStatus(msg:string){
		this.status = msg
	}

	ngAfterViewInit(){
		this.svgelem = this.sgetter.getElement();
		this.presenter.init(this, "nvd3");
	}

	renderChart(options){
		let nv = (<any>window).nv
		let d3 = (<any>window).d3
		let svgelem = this.svgelem;

		this.chart = nv.addGraph(function(){
			let chart = nv.models.discreteBarChart()
					.x(d=>{ return d.label })
					.y(d=>{ return d.value })
					.staggerLabels(true)
					.duration(250);
			d3.select(svgelem)
				.datum(options)
				.call(chart)
			nv.utils.windowResize(chart.update);
			return chart
		})
	}
}
