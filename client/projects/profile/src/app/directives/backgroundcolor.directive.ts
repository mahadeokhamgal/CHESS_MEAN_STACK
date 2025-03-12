import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackgroundcolor]'
})
export class BackgroundcolorDirective {

  @Input('appBgColor') bgColor: string;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {
      this.bgColor = '';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor('transparent');
  }

  changeBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

}
