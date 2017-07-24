import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ContextGetter } from './contextGetter.directive';
import { BarChartPresenter } from './barchartPresenter.service';

@Component({
	selector: 'bar-chart',
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

				<canvas contextGetter width="400" height="400">
			    </canvas>
			   </div>`,
	styles: [
		`canvas{
			border: solid 2px;
			width: 400px;
			height: 400px;
		}
		`
	],
	providers: [ BarChartPresenter ]
})
export class BarChartView implements AfterViewInit{
	@ViewChild(ContextGetter)
	private cgetter: ContextGetter;

	private ctx:any;
	public status:string;

	constructor(private presenter: BarChartPresenter){}

	setStatus(msg:string){
		this.status = msg
	}

	ngAfterViewInit(){
		this.ctx = this.cgetter.getContext();
		this.presenter.init(this);
	}

}
