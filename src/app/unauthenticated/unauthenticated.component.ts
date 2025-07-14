import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthenticated',
  imports: [RouterLink],
  templateUrl: './unauthenticated.component.html',
  styleUrl: './unauthenticated.component.css',
})
export class UnauthenticatedComponent {}
