import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

const MaterialComponents =[
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule
];

@NgModule({
  exports:[
    MaterialComponents
  ],
  imports: [
    MaterialComponents
  ]
})
export class MaterialModule { }