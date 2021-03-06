import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-despesa-chart',
  templateUrl: './despesa-chart.component.html',
  styleUrls: ['./despesa-chart.component.css']
})
export class DespesaChartComponent implements OnInit {

  data: any;
  
  constructor() { }

  ngOnInit(): void {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  }

}
