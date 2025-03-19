import { ElementRef, Renderer2 } from '@angular/core';
import { BackgroundcolorDirective } from './backgroundcolor.directive';

describe('BackgroundcolorDirective', () => {
  let directive: BackgroundcolorDirective;
  let el: ElementRef;
  let renderer: Renderer2;
  
  beforeEach(() => {
    console.log("BeforeEach called in BackgroundcolorDirective");
    el = new ElementRef(document.createElement('div'));
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

    directive = new BackgroundcolorDirective(el, renderer);
  })

  beforeAll(() => {
    console.log('BeforeAll called in BackgroundcolorDirective');
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize bgColor input as an empty string', () => {
    // Check the default value of bgColor
    expect(directive.bgColor).toBe('');
  });
});
