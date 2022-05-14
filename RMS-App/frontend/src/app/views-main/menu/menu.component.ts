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
  total = 0;
  loading = false;

  mx = () => Math.min(this.skip + 10, this.total);

  ngOnInit(): void {
    this.updateMenu(0);
  }

  updateMenu(skip: number) {
    if (skip < 0 || skip > this.total)
      return;
    this.skip = skip;
    this.loading = true;
    this.api.getMenu(skip, 10).subscribe(
      (data: any) => {
        this.dishes = data.dishes;
        this.total = data.total;
        this.loading = false;
      }
    );
  }

}
