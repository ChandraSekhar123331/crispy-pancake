import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  dishes: any = [];
  skip = 0;

  ngOnInit(): void {
    this.updateSkip(0);
  }

  updateSkip(skip: number) {
    if (skip < 0 || skip > 31) return;
    this.skip = skip;
    this.api.loadDishes(this.skip, 10).subscribe((response: any) => {
      this.dishes = response.result;
    });
  }

}
