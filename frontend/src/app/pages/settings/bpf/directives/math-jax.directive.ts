import { Directive, Input, SimpleChanges } from '@angular/core';
import { MathjaxDirective } from 'mathjax-angular';
import { MathjaxContent } from 'mathjax-angular/models';

@Directive({
  selector: '[appMathJax]',
})
export class MathJaxDirective extends MathjaxDirective {
  @Input('appMathJax') value!: MathjaxContent | string;

  override ngOnChanges(changes: SimpleChanges): void {
    // Solves that formula does not update properly

    this.mathjax = this.value;
    changes['mathjax'] = changes['value'];
    super.ngOnChanges(changes);

    try {
      (MathJax as any).typeset();
    } finally {
      return;
    }
  }
}
