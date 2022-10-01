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
  show_chart: any = false;
  chartData: any = { };
  options: any = { };
  chart_data: any = [];
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
    this.chartData =  {
      type: 'LineChart',
      data: [
        ["Jan",  0, 0],
        ["Feb",  0, 0],
        ["Mar",  0, 0],
        ["Apr",  0, 0],
        ["May",  0, 0],
        ["Jun",  0, 0],
        ["Jul",  0, 0],
        ["Aug",  0, 0],
        ["Sep",  0, 0],
        ["Oct",  0, 0],
        ["Nov",  0, 0],
        ["Dec",  0, 0]
    ],
    datas: [
      ["Jan",  [], []],
      ["Feb",  [], []],
      ["Mar",  [], []],
      ["Apr",  [], []],
      ["May",  [], []],
      ["Jun",  [], []],
      ["Jul",  [], []],
      ["Aug",  [], []],
      ["Sep",  [], []],
      ["Oct",  [], []],
      ["Nov",  [], []],
      ["Dec",  [], []]
    ],
    columnNames: ["Month", "Active", "InActive"],
    options: {
    hAxis: {
          title: 'Month'
        },
        vAxis:{
          title: 'Number of Reports'
        },
    },
    width: 1000,
    height: 400
    }

    this.options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      headers: ['First Name', 'Middle Name', 'Last Name', 'Birth of Date', 'Age', 'Birth Place',
        'Gender', 'Civil Status', 'Occupation', 'Religion', 'Nationality',
        'Phone Number', 'Employed By', 'Person To Notify', 'Address', 'Phone Number', 'Relationship', 'Patient Address',
        'Prepared By', 'Fiscal Year', 'Hospital No', 'Admitted DateTime',
        'Transferred From', 'Admitting Diagnosis', 'Final Diagnosis', 'Management Operations'],
      showTitle: true,
      title: 'RPH Exported File',
      useBom: false,
      removeNewLines: true,
      keys: ['first_name','middle_name','surname', 'dob', 'age', 'birth_place',
       'gender_id', 'civil_status_id', 'occupation', 'religion', 'nationality',
       'cp_no', 'employed_by', 'person_to_notify', 'person_to_notify_address',
        'person_to_notify_no', 'person_to_notify_cp_relationship', 'address', 
        'prepared_by_id', 'fiscal_year', 'hospital_no', 'admitted_datetime',
        'transferred_from', 'admitting_diagnosis', 'final_diagnosis', 'management_operations']
    };

    this.getDashboardData();

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
          console.log(this.data);
          this.getRecoveredChartData();
          this.getDiedChartData();
          this.show_chart = true;
          this.data.recovered_list = this.data.recovered.list;
          this.data.died_list = this.data.died.list;
        },
        err => {
          alert(err.message);
        }
      )
  }

  formatExportData(c_data){
    let profile_datas = [];

    c_data.forEach(el => {
      var p_data = { ...el.profile, ...el.records };
      profile_datas.push(p_data);
    });
    console.log(profile_datas);
    this.chart_data = profile_datas;
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
        var month = monthNames[get_month.getMonth()];
        var year = get_month.getFullYear().toString().substr(-2);
        var date_now = new Date();
        var year_now = date_now.getFullYear().toString();

        rec_month_label.push(month + '/' + year);
        rec_month_series.push(group_month_rec[key].length);
        console.log(group_month_rec[key]);

        if(year_now == get_month.getFullYear().toString()){
          this.chartData.data[ parseInt(month) - 1][2] = group_month_rec[key].length;
          this.chartData.datas[ parseInt(month) - 1][2] = group_month_rec[key];
        }
      }
    }
    console.log("chartData", this.chartData);
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
    console.log(group_month_rec);
    for (var key in group_month_rec) {
      if (group_month_rec.hasOwnProperty(key)) {
        let get_month = new Date(group_month_rec[key][0].created_at);
        const month = monthNames[get_month.getMonth()];
        const year = get_month.getFullYear().toString().substr(-2);

        rec_month_label.push(month + '/' + year);
        rec_month_series.push(group_month_rec[key].length);

        var date_now = new Date();
        var year_now = date_now.getFullYear().toString();

        if(year_now == get_month.getFullYear().toString()){
          this.chartData.data[parseInt(month) - 1 ][1] = group_month_rec[key].length;
          this.chartData.datas[parseInt(month) - 1 ][1] = group_month_rec[key];
        }
      }
    }
    this.createRecoveredChart(rec_month_label, rec_month_series)
    console.log("chartData", this.chartData);
  }

  onSelectChartData(event){

    var slctd_rep = event.selection[0];
    if(slctd_rep.column == 1){
      this.data.recovered_list = this.chartData.datas[slctd_rep.row][1]
      this.showRecoveredList();
      this.formatExportData(this.data.recovered_list);

      console.log(this.data.recovered_list);
    }
    
    if(slctd_rep.column == 2){
      this.data.died_list = this.chartData.datas[slctd_rep.row][2]
      this.showDiedList();
      this.formatExportData(this.data.recovered_list);
    }

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

  showRecovered() {
    this.data.recovered_list = this.data.recovered.list;
    this.showRecoveredList();
    this.formatExportData(this.data.recovered.list);
  }

  showDied() {
    this.data.died_list = this.data.died.list;
    this.showDiedList();
    this.formatExportData(this.data.died.list);
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
