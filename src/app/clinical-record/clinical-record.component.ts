import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-clinical-record',
  templateUrl: './clinical-record.component.html',
  styleUrls: ['./clinical-record.component.scss']
})
export class ClinicalRecordComponent implements OnInit {
  clinicalFormGroup: FormGroup;
  panelOpenState = false;
  selected_data_record: any;

  @Input()
  clinicalResultId: any;
  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.declareFormBuilder();
    this.getRecord();
  }

  getRecord() {
    this.apiService
      .getOneClinicalRecords(1)
      .subscribe(
        res => {
          console.log(res)
          this.selected_data_record = res;
          this.setData();
        },
        err => {
          alert(err.message);
        }
      )
  }

  setData() {
    
    this.clinicalFormGroup.setValue({
      surname: this.selected_data_record.profile.surname,
      first_name: this.selected_data_record.profile.first_name,
      middle_name: this.selected_data_record.profile.middle_name,
      age: this.selected_data_record.profile.age,
      gender_id: this.selected_data_record.profile.gender_id,
      address: "",
      civil_status_id: this.selected_data_record.profile.civil_status_id,
      religion: this.selected_data_record.profile.religion,
      dob: this.selected_data_record.profile.dob,
      nationality: this.selected_data_record.profile.nationality,
      cp_no: this.selected_data_record.profile.cp_no,
      person_to_notify: this.selected_data_record.profile.person_to_notify,
      person_to_notify_address: this.selected_data_record.profile.person_to_notify_address,
      person_to_notify_no: this.selected_data_record.profile.person_to_notify_no,
      person_to_notify_cp_relationship: this.selected_data_record.profile.person_to_notify_cp_relationship,
      attending_physician_id: this.selected_data_record.clinical_record.attending_physician_id,
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

  }

  declareFormBuilder(): void{
    this.clinicalFormGroup = this.formBuilder.group({
      surname:[ '', Validators.required ],
      first_name:[ '', Validators.required ],
      middle_name:[ '', Validators.required ],
      age:[ '', Validators.required ],
      gender_id:[ '', Validators.required ],
      address:[ '', Validators.required ],
      civil_status_id:[ '', Validators.required ],
      religion:[ '', Validators.required ],
      dob:[ '', Validators.required ],
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
      final_diagnosis:[ '', Validators.required ],
      management_operations:[ '', Validators.required ],
      c1:[ '', Validators.required ],
      c2:[ '', Validators.required ],
      c3:[ '', Validators.required ],
      c1_desc:[ '', Validators.required ],
      c2_desc:[ '', Validators.required ],
      c3_desc:[ '', Validators.required ],
      d_medical:[ '', Validators.required ],
      d_surgical:[ '', Validators.required ],
      d_obstetrics:[ '', Validators.required ],
      d_pediatrics:[ '', Validators.required ],
      d_nicu:[ '', Validators.required ],
      d_gyne:[ '', Validators.required ],
      d_optha:[ '', Validators.required ],
      d_ent:[ '', Validators.required ],
      c_private:[ '', Validators.required ],
      c_charity:[ '', Validators.required ],
      c_life_senior:[ '', Validators.required ],
      c_non_philhealth:[ '', Validators.required ],
      c_philhealth:[ '', Validators.required ],
      c_ofw:[ '', Validators.required ],
      c_gm:[ '', Validators.required ],
      c_gd:[ '', Validators.required ],
      c_sem:[ '', Validators.required ],
      c_pem:[ '', Validators.required ],
      c_im:[ '', Validators.required ],
      c_id:[ '', Validators.required ],
      c_sed:[ '', Validators.required ],
      c_ped:[ '', Validators.required ],
      r_recovered:[ '', Validators.required ],
      r_improved:[ '', Validators.required ],
      r_unimproved:[ '', Validators.required ],
      r_died:[ '', Validators.required ],
      d_discharged:[ '', Validators.required ],
      d_length:[ '', Validators.required ],
      d_absonded:[ '', Validators.required ],
      d_dismissed:[ '', Validators.required ],
      d_transferred:[ '', Validators.required ],
      d_discharged_desc:[ '', Validators.required ],
      d_length_desc:[ '', Validators.required ],
      d_absonded_desc:[ '', Validators.required ],
      d_dismissed_desc:[ '', Validators.required ],
      d_transferred_desc:[ '', Validators.required ]
    });
  }

}
