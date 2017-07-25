import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[elementGetter]'
})
export class ElementGetter{
	constructor(private el: ElementRef){}

	getElement(){
		return this.el.nativeElement
	}
}
