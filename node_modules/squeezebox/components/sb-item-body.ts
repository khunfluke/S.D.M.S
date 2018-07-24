import {Component, ElementRef, Renderer, ViewChild} from '@angular/core';

@Component({
    exportAs: 'sbItemBody',
    selector: 'sb-item-body',
    template: `
        <div #body class="sb-item-body" [style.height]="height">
            <div class="inner"><ng-content></ng-content></div>
        </div>
    `
})
export class SBItemBody {

    public height: String = '0';

    @ViewChild('body') bodyEl: ElementRef;

    constructor(private renderer: Renderer) {}
    
    toggle(collapsed: boolean) {
        var height: String = '0';
        if (!collapsed) {
            this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', 'auto');
            height = this.bodyEl.nativeElement.offsetHeight + 'px';
            this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', '0');
        }
        setTimeout(() => this.height = height, 50);
    }
}
