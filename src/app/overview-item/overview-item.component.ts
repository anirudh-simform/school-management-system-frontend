import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview-item',
  imports: [RouterLink],
  templateUrl: './overview-item.component.html',
  styleUrl: './overview-item.component.css',
})
export class OverviewItemComponent {
  title = input.required<string>();
  description = input.required<string>();
  routerLinkPath = input.required<string>();
}
