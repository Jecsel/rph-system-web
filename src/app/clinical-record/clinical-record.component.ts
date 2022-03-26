import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'app/services/api-service.service';
import { parse } from 'path/posix';

@Component({
  selector: 'app-clinical-record',
  templateUrl: './clinical-record.component.html',
  styleUrls: ['./clinical-record.component.scss']
})
export class ClinicalRecordComponent implements OnInit {
  clinicalFormGroup: FormGroup;
  panelOpenState = false;
  selected_data_record: any;
  req: any;
  selected_user_profile_id: any;
  doctors: any = {doctors:[]};
  user_role: any;
  physician_id: any = 0;

  @Input()
  clinicalResultId: any;
  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.user_role = localStorage.getItem('user_role_id');
    this.selected_user_profile_id = localStorage.getItem('selected_user_profile_id');
    this.getAllDoctors();
    this.declareFormBuilder();
    if(this.clinicalResultId > 0){
      this.getRecord();
    }else{
      this.getProfile(this.selected_user_profile_id)
    }
  }

  getAllDoctors(){
    this.apiService
    .getAllDoctors()
    .subscribe(
      res => {
        this.doctors = res.patients;
        this.setData();
      },
      err => {
        alert(err.message);
      }
    )
  }

  getRecord() {
    this.apiService
      .getOneClinicalRecords(this.clinicalResultId)
      .subscribe(
        res => {
          this.selected_data_record = res;
          this.setData();
        },
        err => {
          alert(err.message);
        }
      )
  }

   updateRecord(){
    this.req = this.clinicalFormGroup.value;
    let s = this.selected_data_record;
    this.req.departments = [
      {"id": s.departments[0].id, "department_id":1, "is_selected":this.req.d_medical},
      {"id": s.departments[1].id, "department_id":2, "is_selected":this.req.d_surgical},
      {"id": s.departments[2].id, "department_id":3, "is_selected":this.req.d_obstetrics},
      {"id": s.departments[3].id, "department_id":4, "is_selected":this.req.d_pediatrics},
      {"id": s.departments[4].id, "department_id":5, "is_selected":this.req.d_nicu},
      {"id": s.departments[5].id, "department_id":6, "is_selected":this.req.d_gyne},
      {"id": s.departments[6].id, "department_id":7, "is_selected":this.req.d_optha},
      {"id": s.departments[7].id, "department_id":8, "is_selected":this.req.d_ent}
    ]
    this.req.society_classes = [
      {"id": s.society_classes[0].id, "society_class_id":1, "is_selected":this.req.c_private},
      {"id": s.society_classes[1].id, "society_class_id":2, "is_selected":this.req.c_charity},
      {"id": s.society_classes[2].id, "society_class_id":3, "is_selected":this.req.c_life_senior},
      {"id": s.society_classes[3].id, "society_class_id":4, "is_selected":this.req.c_non_philhealth},
      {"id": s.society_classes[4].id, "society_class_id":5, "is_selected":this.req.c_philhealth},
      {"id": s.society_classes[5].id, "society_class_id":6, "is_selected":this.req.c_ofw},
      {"id": s.society_classes[6].id, "society_class_id":7, "is_selected":this.req.c_gm},
      {"id": s.society_classes[7].id, "society_class_id":8, "is_selected":this.req.c_gd},
      {"id": s.society_classes[8].id, "society_class_id":9, "is_selected":this.req.c_sem},
      {"id": s.society_classes[9].id, "society_class_id":10, "is_selected":this.req.c_pem},
      {"id": s.society_classes[10].id, "society_class_id":11, "is_selected":this.req.c_im},
      {"id": s.society_classes[11].id, "society_class_id":12, "is_selected":this.req.c_id},
      {"id": s.society_classes[12].id, "society_class_id":13, "is_selected":this.req.c_sed},
      {"id": s.society_classes[13].id, "society_class_id":14, "is_selected":this.req.c_ped}
    ]
    this.req.local_services = [
      {"id": s.local_services[0].id, "local_service_id":1, "is_selected":this.req.c1, "desc":this.req.c1_desc},
      {"id": s.local_services[1].id, "local_service_id":2, "is_selected":this.req.c2, "desc":this.req.c2_desc},
      {"id": s.local_services[2].id, "local_service_id":3, "is_selected":this.req.c3_desc, "desc":this.req.c3_desc}
    ]
    this.req.results = [
      {"id": s.results[0].id, "result_id":1, "is_selected":this.req.r_recovered},
      {"id": s.results[1].id, "result_id":2, "is_selected":this.req.r_improved},
      {"id": s.results[2].id, "result_id":3, "is_selected":this.req.r_unimproved},
      {"id": s.results[3].id, "result_id":4, "is_selected":this.req.r_died}
    ]
    this.req.dispositions = [
      {"id": s.dispositions[0].id, "disposition_id":1, "is_selected":this.req.d_discharged, "desc": this.req.d_discharged_desc},
      {"id": s.dispositions[1].id, "disposition_id":2, "is_selected":this.req.d_length, "desc": this.req.d_length_desc},
      {"id": s.dispositions[2].id, "disposition_id":3, "is_selected":this.req.d_absonded, "desc": this.req.d_absonded_desc},
      {"id": s.dispositions[3].id, "disposition_id":4, "is_selected":this.req.d_dismissed, "desc": this.req.d_dismissed_desc},
      {"id": s.dispositions[4].id, "disposition_id":5, "is_selected":this.req.d_transferred, "desc": this.req.d_transferred_desc}
    ]

    this.apiService
    .updateClinicalRecord({clinical_record: this.req})
    .subscribe(
      res => {
        this.selected_data_record = res;
        this.setData();
        alert("Successully updated.");
        this.router.navigate(['dashboard']);
      },
      err => {
        alert(err.message);
      }
    )
   }

  setData() {
    let attending_physician_id = this.selected_data_record.clinical_record.attending_physician_id;
    for(var i = 0; i < this.doctors.length; i++){
      if(this.doctors[i].id == attending_physician_id){
        this.physician_id = i;
      }
    }
    let doctor = this.doctors[this.physician_id];
    
    this.clinicalFormGroup.setValue({
      clinical_record_id: this.selected_data_record.clinical_record.id,
      surname: this.selected_data_record.profile.surname,
      first_name: this.selected_data_record.profile.first_name,
      middle_name: this.selected_data_record.profile.middle_name,
      age: this.selected_data_record.profile.age,
      gender_id: this.selected_data_record.profile.gender_id,
      address: this.selected_data_record.profile.address,
      civil_status_id: this.selected_data_record.profile.civil_status_id,
      religion: this.selected_data_record.profile.religion,
      dob: this.selected_data_record.profile.dob,
      nationality: this.selected_data_record.profile.nationality,
      cp_no: this.selected_data_record.profile.cp_no,
      person_to_notify: this.selected_data_record.profile.person_to_notify,
      person_to_notify_address: this.selected_data_record.profile.person_to_notify_address,
      person_to_notify_no: this.selected_data_record.profile.person_to_notify_no,
      person_to_notify_cp_relationship: this.selected_data_record.profile.person_to_notify_cp_relationship,
      attending_physician_id: doctor,
      prepared_by_id: this.selected_data_record.clinical_record.prepared_by_id,
      fiscal_year: this.selected_data_record.clinical_record.fiscal_year,
      hospital_no: this.selected_data_record.clinical_record.hospital_no,
      building_id: this.selected_data_record.clinical_record.building_id,
      admitted_datetime: this.selected_data_record.clinical_record.admitted_datetime,
      transferred_from: this.selected_data_record.clinical_record.transferred_from,
      admitting_diagnosis: this.selected_data_record.clinical_record.admitting_diagnosis,
      final_diagnosis: this.selected_data_record.clinical_record.final_diagnosis,
      management_operations: this.selected_data_record.clinical_record.management_operations,
      c1: this.selected_data_record.local_services[0].is_selected,
      c2: this.selected_data_record.local_services[1].is_selected,
      c3: this.selected_data_record.local_services[2].is_selected,
      c1_desc: this.selected_data_record.local_services[0].desc,
      c2_desc: this.selected_data_record.local_services[1].desc,
      c3_desc: this.selected_data_record.local_services[2].desc,
      d_medical: this.selected_data_record.departments[0].is_selected,
      d_surgical: this.selected_data_record.departments[1].is_selected,
      d_obstetrics: this.selected_data_record.departments[2].is_selected,
      d_pediatrics: this.selected_data_record.departments[3].is_selected,
      d_nicu: this.selected_data_record.departments[4].is_selected,
      d_gyne: this.selected_data_record.departments[5].is_selected,
      d_optha: this.selected_data_record.departments[6].is_selected,
      d_ent: this.selected_data_record.departments[7].is_selected,
      c_private: this.selected_data_record.society_classes[0].is_selected,
      c_charity: this.selected_data_record.society_classes[1].is_selected,
      c_life_senior: this.selected_data_record.society_classes[2].is_selected,
      c_non_philhealth: this.selected_data_record.society_classes[3].is_selected,
      c_philhealth: this.selected_data_record.society_classes[4].is_selected,
      c_ofw: this.selected_data_record.society_classes[5].is_selected,
      c_gm: this.selected_data_record.society_classes[6].is_selected,
      c_gd: this.selected_data_record.society_classes[7].is_selected,
      c_sem: this.selected_data_record.society_classes[8].is_selected,
      c_pem: this.selected_data_record.society_classes[9].is_selected,
      c_im: this.selected_data_record.society_classes[10].is_selected,
      c_id: this.selected_data_record.society_classes[11].is_selected,
      c_sed: this.selected_data_record.society_classes[12].is_selected,
      c_ped: this.selected_data_record.society_classes[13].is_selected,
      r_recovered: this.selected_data_record.results[0].is_selected,
      r_improved: this.selected_data_record.results[1].is_selected,
      r_unimproved: this.selected_data_record.results[2].is_selected,
      r_died: this.selected_data_record.results[3].is_selected,
      d_discharged: this.selected_data_record.dispositions[0].is_selected,
      d_length: this.selected_data_record.dispositions[1].is_selected,
      d_absonded: this.selected_data_record.dispositions[2].is_selected,
      d_dismissed:this.selected_data_record.dispositions[3].is_selected,
      d_transferred:this.selected_data_record.dispositions[4].is_selected,
      d_discharged_desc: this.selected_data_record.dispositions[0].desc,
      d_length_desc: this.selected_data_record.dispositions[1].desc,
      d_absonded_desc: this.selected_data_record.dispositions[2].desc,
      d_dismissed_desc:this.selected_data_record.dispositions[3].desc,
      d_transferred_desc:this.selected_data_record.dispositions[4].desc,
    })
  }

  onSubmit() {
    if(this.clinicalResultId > 0){
      this.updateRecord();
    }else{
      this.createNewClinical();
    }
  }

  declareFormBuilder(): void{
    this.clinicalFormGroup = this.formBuilder.group({
      clinical_record_id:[''],
      surname:[ '', Validators.required ],
      first_name:[ '', Validators.required ],
      middle_name:[ '', Validators.required ],
      age:[ '', Validators.required ],
      gender_id:[ '', Validators.required ],
      address:[ '', Validators.required ],
      civil_status_id:[ '', Validators.required ],
      religion:[ '', Validators.required ],
      dob:[ '' , Validators.required],
      nationality:[ '', Validators.required ],
      cp_no:[ '', Validators.required ],
      person_to_notify:[ '', Validators.required ],
      person_to_notify_address:[ '', Validators.required ],
      person_to_notify_no:[ '', Validators.required ],
      person_to_notify_cp_relationship:[ '', Validators.required ],
      attending_physician_id:[ '', Validators.required ],
      prepared_by_id:[ '', Validators.required ],
      fiscal_year:[ '', Validators.required ],
      hospital_no:[ '', Validators.required ],
      building_id:[ '', Validators.required ],
      admitted_datetime:[ '', Validators.required ],
      transferred_from:[ '', Validators.required ],
      admitting_diagnosis:[ '', Validators.required ],
      final_diagnosis:[ ''],
      management_operations:[ ''],
      c1:[ ''],
      c2:[ ''],
      c3:[ ''],
      c1_desc:[ ''],
      c2_desc:[ ''],
      c3_desc:[ ''],
      d_medical:[ ''],
      d_surgical:[ ''],
      d_obstetrics:[ ''],
      d_pediatrics:[ ''],
      d_nicu:[ ''],
      d_gyne:[ ''],
      d_optha:[ ''],
      d_ent:[ ''],
      c_private:[ ''],
      c_charity:[ ''],
      c_life_senior:[ ''],
      c_non_philhealth:[ ''],
      c_philhealth:[ ''],
      c_ofw:[ ''],
      c_gm:[ ''],
      c_gd:[ ''],
      c_sem:[ ''],
      c_pem:[ ''],
      c_im:[ ''],
      c_id:[ ''],
      c_sed:[ ''],
      c_ped:[ ''],
      r_recovered:[ ''],
      r_improved:[ ''],
      r_unimproved:[ ''],
      r_died:[ ''],
      d_discharged:[ ''],
      d_length:[ ''],
      d_absonded:[ ''],
      d_dismissed:[ ''],
      d_transferred:[ ''],
      d_discharged_desc:[ ''],
      d_length_desc:[ ''],
      d_absonded_desc:[ ''],
      d_dismissed_desc:[ ''],
      d_transferred_desc:[ '']
    });
  }

  getProfile(id): void{
    this.apiService
      .showProfile(id)
      .subscribe(
        res => {
          this.selected_data_record = res;
          this.setProfileData();
        },
        err => {
          alert(err.message);
        }
      )
  }

  setProfileData() {
    let cStatus = 'Male';
    switch (this.selected_data_record.profile.civil_status_id) {
      case 1:
        cStatus = 'Male';
      break;
      case 2:
        cStatus = 'Female';
      break;
      case 3:
        cStatus = 'Separated';
      break;
      case 4:
        cStatus = 'Widowed';
      break;
      case 5:
        cStatus = 'Divorce';
      break;
    
      default:
        cStatus = 'Male';
        break;
    }
    this.clinicalFormGroup.setValue({
      clinical_record_id: "",
      surname: this.selected_data_record.profile.surname,
      first_name: this.selected_data_record.profile.first_name,
      middle_name: this.selected_data_record.profile.middle_name,
      age: this.selected_data_record.profile.age,
      gender_id: this.selected_data_record.profile.gender_id == 1 ? 'Male' : 'Female',
      address: this.selected_data_record.profile.address,
      civil_status_id: this.selected_data_record.profile.civil_status_id == 1 ? 'Single' : 'Married',
      religion: this.selected_data_record.profile.religion,
      dob: this.selected_data_record.profile.dob,
      nationality: this.selected_data_record.profile.nationality,
      cp_no: this.selected_data_record.profile.cp_no,
      person_to_notify: this.selected_data_record.profile.person_to_notify,
      person_to_notify_address: this.selected_data_record.profile.person_to_notify_address,
      person_to_notify_no: this.selected_data_record.profile.person_to_notify_no,
      person_to_notify_cp_relationship: this.selected_data_record.profile.person_to_notify_cp_relationship,
      attending_physician_id: "",
      prepared_by_id: "",
      fiscal_year: "",
      hospital_no: "",
      building_id: "",
      admitted_datetime: "",
      transferred_from: "",
      admitting_diagnosis: "",
      final_diagnosis: "",
      management_operations: "",
      c1: "",
      c2: "",
      c3: "",
      c1_desc: "",
      c2_desc: "",
      c3_desc: "",
      d_medical: "",
      d_surgical: "",
      d_obstetrics: "",
      d_pediatrics: "",
      d_nicu: "",
      d_gyne: "",
      d_optha: "",
      d_ent: "",
      c_private: "",
      c_charity: "",
      c_life_senior: "",
      c_non_philhealth: "",
      c_philhealth: "",
      c_ofw: "",
      c_gm: "",
      c_gd: "",
      c_sem: "",
      c_pem: "",
      c_im: "",
      c_id: "",
      c_sed: "",
      c_ped: "",
      r_recovered: "",
      r_improved: "",
      r_unimproved: "",
      r_died: "",
      d_discharged: "",
      d_length: "",
      d_absonded: "",
      d_dismissed: "",
      d_transferred: "",
      d_discharged_desc: "",
      d_length_desc: "",
      d_absonded_desc: "",
      d_dismissed_desc: "",
      d_transferred_desc: ""
    })
  }

  changePhysician(physician) {
    this.physician_id = physician.id;
  }

  createNewClinical() {
    let c = this.clinicalFormGroup.value;
    c.attending_physician_id = this.physician_id;
    c.patient_id = this.selected_data_record.user_id;
    c.profile_id = this.selected_user_profile_id;
    c.departments = [
      {"department_id":1, "is_selected": c.d_medical},
      {"department_id":2, "is_selected": c.d_surgical},
      {"department_id":3, "is_selected": c.d_obstetrics},
      {"department_id":4, "is_selected": c.d_pediatrics},
      {"department_id":5, "is_selected": c.d_nicu},
      {"department_id":6, "is_selected": c.d_gyne},
      {"department_id":7, "is_selected": c.d_optha},
      {"department_id":8, "is_selected": c.d_ent}
    ]
    c.society_classes = [
      {"society_class_id":1, "is_selected": c.c_private},
      {"society_class_id":2, "is_selected": c.c_charity},
      {"society_class_id":3, "is_selected":c.c_life_senior},
      {"society_class_id":4, "is_selected":c.c_non_philhealth},
      {"society_class_id":5, "is_selected":c.c_philhealth},
      {"society_class_id":6, "is_selected":c.c_ofw},
      {"society_class_id":7, "is_selected":c.c_gm},
      {"society_class_id":8, "is_selected":c.c_gd},
      {"society_class_id":9, "is_selected":c.c_sem},
      {"society_class_id":10, "is_selected":c.c_pem},
      {"society_class_id":11, "is_selected":c.c_im},
      {"society_class_id":12, "is_selected":c.c_id},
      {"society_class_id":13, "is_selected":c.c_sed},
      {"society_class_id":14, "is_selected":c.c_ped}
    ]
    c.local_services = [
      {"local_service_id":1, "is_selected":c.c1, "desc":c.c1_desc},
      {"local_service_id":2, "is_selected":c.c2, "desc":c.c2_desc},
      {"local_service_id":3, "is_selected":c.c3, "desc":c.c3_desc}
    ]
    c.results = [
      {"result_id":1, "is_selected":c.r_recovered},
      {"result_id":2, "is_selected":c.r_improved},
      {"result_id":3, "is_selected":c.r_unimproved},
      {"result_id":4, "is_selected":c.r_died}
    ]
    c.dispositions = [
      {"disposition_id":1, "is_selected":c.d_discharged, "desc": c.d_discharged_desc},
      {"disposition_id":2, "is_selected":c.d_length, "desc": c.d_length_desc},
      {"disposition_id":3, "is_selected":c.d_absonded, "desc": c.d_absonded_desc},
      {"disposition_id":4, "is_selected":c.d_dismissed, "desc": c.d_dismissed_desc},
      {"disposition_id":5, "is_selected":c.d_transferred, "desc": c.d_transferred_desc}
    ]

    console.log(c);

    this.apiService
      .createClinicalRecord({clinical_record: c})
      .subscribe(
        res => {
          this.selected_data_record = res;
          this.clinicalResultId = this.selected_data_record.clinical_record.id;
          this.getRecord();
          alert("Successully updated.");
          this.router.navigate(['dashboard']);
        },
        err => {
          alert(err.message);
        }
      )
  }

}
