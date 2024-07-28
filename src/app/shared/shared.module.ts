import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';
import { GridFilterDirective } from '../core/directives/grid-filter.directive';



@NgModule({
  declarations: [GridFilterDirective],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    PrimeNgModule,
    GridFilterDirective
  ]
})
export class SharedModule { }
