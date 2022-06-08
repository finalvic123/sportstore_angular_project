import {Directive, ViewContainerRef, TemplateRef, Inject, Attribute, SimpleChanges, Input} from "@angular/core";

@Directive({
  selector: "[counterOf]"
})
export class CounterDirective {
  constructor(private container: ViewContainerRef,
              private template: TemplateRef<Object>) {
  }

  @Input("counterOf") //de input heeft nu de naam counterOf ipv counter als default
  counter: number;

  ngOnChanges(changes: SimpleChanges) {
    this.container.clear();
    for (let index = 0; index < this.counter; index++) {
      this.container.createEmbeddedView(this.template, new CounterDirectiveContext(index + 1))
    }
  }
}

class CounterDirectiveContext {
  constructor(public $implicit: any) {
  }
}
