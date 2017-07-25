import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ElementGetter } from '../nvd3/elemGetter.directive';
import { BarChartPresenter } from '../canvasjs/barchartPresenter.service';

@Component({
	selector: 'canvasjs-bar-chart',
	template: `<div style="display:block">
				<ul>
					<button class="button" (click)="presenter.setDefault()">default</button>
					<button class="button" (click)="presenter.setDataTo(10)">10</button>
					<button class="button" (click)="presenter.setDataTo(100)">100</button>
					<button class="button" (click)="presenter.setDataTo(1000)">1000</button>
					<button class="button" (click)="presenter.setDataTo(10000)">10000</button>
					<button class="button" (click)="presenter.setDataTo(100000)">100000</button>
					<div>{{status}}</div>
				</ul>

				<div elementGetter id="canvasjschart">
			    </div>
			   </div>`,
	styles: [
		`#canvasjschart{
			border: solid 2px;
			width: 400px;
			height: 400px;
		}
		`
	],
	providers: [ BarChartPresenter ]
})
export class CanvasjsBarChartView implements AfterViewInit{
	@ViewChild(ElementGetter)
	private egetter: ElementGetter;

	private chartDomNode:any;
	private chart:any;
	public status:string;

	constructor(private presenter: BarChartPresenter){}

	setStatus(msg:string){
		this.status = msg
	}

	ngAfterViewInit(){
		this.chartDomNode = this.egetter.getElement();
		this.presenter.init(this, "canvasjs");
	}

	renderChart(options){
		this.chart = new (<any>window).CanvasJS.Chart(this.egetter.getElement(), options)
		this.chart.render()
	}
}
