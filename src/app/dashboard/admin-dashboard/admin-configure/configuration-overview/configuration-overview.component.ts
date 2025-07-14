import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverviewItemComponent } from '../../../../overview-item/overview-item.component';

@Component({
  selector: 'app-configuration-overview',
  imports: [RouterLink, OverviewItemComponent],
  templateUrl: './configuration-overview.component.html',
  styleUrl: './configuration-overview.component.css',
})
export class ConfigurationOverviewComponent {}
