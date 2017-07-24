import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[contextGetter]'
})
export class ContextGetter{
	constructor(private el: ElementRef){
		if (el.nativeElement.nodeName != 'CANVAS'){
			throw new Error("Directive ContextGetter can only be applied on canvas.")
		}
	}
	
	getContext(){
		return this.el.nativeElement.getContext('2d')
	}
}
