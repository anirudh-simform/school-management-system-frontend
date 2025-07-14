import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverviewItemComponent } from '../../../../overview-item/overview-item.component';

@Component({
  selector: 'app-courses-and-programs-overview',
  imports: [RouterLink, OverviewItemComponent],
  templateUrl: './courses-and-programs-overview.component.html',
  styleUrl: './courses-and-programs-overview.component.css',
})
export class CoursesAndProgramsOverviewComponent {}
