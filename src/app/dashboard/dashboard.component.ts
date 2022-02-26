import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any = {};
  show_patients: any = false;
  show_nurses: any = false;
  show_doctors: any = false;
  show_admins: any = false;
  show_recovereds: any = false;
  show_deaths: any = false;
  show_chart_rec: any = false;
  show_chart_death: any = false;
  constructor(private apiService: ApiServiceService) { }

  //Default Codes
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  
  ngOnInit() {
    this.getDashboardData();

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

  getDashboardData(){
    this.apiService
      .getDashboardData()
      .subscribe(
        res =>{
          this.data = res;
          this.getRecoveredChartData();
          this.getDiedChartData();
          console.log(this.data);
        },
        err => {
          alert(err.message);
        }
      )
  }

  getDiedChartData(){
    let group_month_rec = this.data.group_died;
    const monthNames = ["1", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "11", "12"];

    let rec_month_label = [];
    let rec_month_series = [];

    for (var key in group_month_rec) {
      if (group_month_rec.hasOwnProperty(key)) {
        let get_month = new Date(group_month_rec[key][0].created_at);
        const month = monthNames[get_month.getMonth()];
        const year = get_month.getFullYear().toString().substr(-2);

        rec_month_label.push(month + '/' + year);
        rec_month_series.push(group_month_rec[key].length);
      }
    }
    this.createDiedChart(rec_month_label, rec_month_series)
  }

  createDiedChart(l, s){
    const dataDailySalesChart: any = {
      labels: l,
      series: [s]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#completedTasksChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
  }

  getRecoveredChartData(){
    let group_month_rec = this.data.group_recovered;
    const monthNames = ["1", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "11", "12"];

    let rec_month_label = [];
    let rec_month_series = [];

    for (var key in group_month_rec) {
      if (group_month_rec.hasOwnProperty(key)) {
        let get_month = new Date(group_month_rec[key][0].created_at);
        const month = monthNames[get_month.getMonth()];
        const year = get_month.getFullYear().toString().substr(-2);

        rec_month_label.push(month + '/' + year);
        rec_month_series.push(group_month_rec[key].length);
      }
    }
    this.createRecoveredChart(rec_month_label, rec_month_series)
    console.log(rec_month_label);
    console.log(rec_month_series);
  }

  createRecoveredChart(l, s){
    const dataDailySalesChart: any = {
      labels: l,
      series: [s]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
  }

  showPatientLists(){
    this.show_admins = false;
    this.show_doctors = false;
    this.show_patients = true;
    this.show_nurses = false;
    this.show_recovereds = false;
    this.show_deaths = false;
  }

  showDoctorLists(){
    this.show_admins = false;
    this.show_doctors = true;
    this.show_patients = false;
    this.show_nurses = false;
    this.show_recovereds = false;
    this.show_deaths = false;
  } 

  showNurseLists() {
    this.show_admins = false;
    this.show_doctors = false;
    this.show_patients = false;
    this.show_nurses = true;
    this.show_recovereds = false;
    this.show_deaths = false;
  }

  showAdminLists() {
    this.show_admins = true;
    this.show_doctors = false;
    this.show_patients = false;
    this.show_nurses = false;
    this.show_recovereds = false;
    this.show_deaths = false;
  }

  showRecoveredList() {
    this.show_admins = false;
    this.show_doctors = false;
    this.show_patients = false;
    this.show_nurses = false;
    this.show_recovereds = true;
    this.show_deaths = false;
  }

  showDiedList() {
    this.show_admins = false;
    this.show_doctors = false;
    this.show_patients = false;
    this.show_nurses = false;
    this.show_recovereds = false;
    this.show_deaths = true;
  }
}
