import { Directive, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appMathJaxUpdater]',
})
export class MathJaxUpdaterDirective implements OnChanges {
  @Input('appMathJaxUpdater') value?: string;

  ngOnChanges(): void {
    (MathJax as any).typeset();
  }
}
