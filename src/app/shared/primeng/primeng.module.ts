import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { BadgeModule } from 'primeng/badge';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';


@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    TableModule,
    PaginatorModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    BadgeModule,
    InputTextareaModule,
    CalendarModule,
    RadioButtonModule,
    KeyFilterModule,
    MultiSelectModule,
    InputSwitchModule,
    FileUploadModule,
    ImageModule,
    TabViewModule,
    TagModule,
  ],
  exports: [
    InputTextModule,
    TableModule,
    PaginatorModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    BadgeModule,
    InputTextareaModule,
    CalendarModule,
    RadioButtonModule,
    KeyFilterModule,
    MultiSelectModule,
    InputSwitchModule,
    FileUploadModule,
    ImageModule,
    TabViewModule,
    TagModule,
  ],
})
export class PrimeNgModule {}
