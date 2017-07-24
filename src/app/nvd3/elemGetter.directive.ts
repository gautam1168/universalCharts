import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[elementGetter]'
})
export class ElementGetter{
	constructor(private el: ElementRef){
		if (el.nativeElement.nodeName != 'svg'){
			throw new Error("Directive ContextGetter can only be applied on svg.")
		}
	}

	getElement(){
		return this.el.nativeElement
	}
}
