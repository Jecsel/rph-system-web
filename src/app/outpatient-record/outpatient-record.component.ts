import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-outpatient-record',
  templateUrl: './outpatient-record.component.html',
  styleUrls: ['./outpatient-record.component.scss']
})
export class OutpatientRecordComponent implements OnInit {
  outpatientFormGroup: FormGroup;
  outpatient_records: any = { };
  male: any = false;
  female: any = false;
  single: any = false;
  married: any = false;
  widow: any = false;
  separated: any = false;
  
  medical: any = false;
  eent: any = false;
  obstetrics: any = false;
  pediatrics: any = false;
  urology: any = false;
  dental: any = false;
  surgery: any = false;
  dermatology: any = false;
  gynecology: any = false;
  neurology: any = false;
  charity: any = false;
  resident: any = false;
  transient: any = false;
  government: any = false;
  private: any = false;

  remarks: any = [];

  req_body: any = {};

  @Input()
  outpatientResult: any;

  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('Outpatient : ', this.outpatientResult);
    this.declareFormBuilder();
    if(this.outpatientResult != undefined && this.outpatientResult != {}){
      this.outpatient_records = this.outpatientResult;
      this.setDataBuilder();
    }
  }

  declareFormBuilder(){
    this.outpatientFormGroup = this.formBuilder.group({
      medical: [''],
      eent: [''],
      obstetrics: [''],
      pediatrics: [''],
      urology: [''],
      dental: [''],
      surgery: [''],
      dermatology: [''],
      gynecology: [''],
      neurology: [''],
      charity: [''],
      resident: [''],
      transient : [''],
      government: [''],
      private: [''],
      surname: [''],
      first_name: [''],
      middle_name: [''],
      age: [''],
      nationality: [''],
      male: [''],
      female: [''],
      single: [''],
      married: [''],
      widow: [''],
      separated: [''],
      address: [''],
      religion: [''],
      birth_place: [''],
      employed_by: [''],
      dob: [''],
      payees_person_to_notify: [''],
      referred_by: [''],
      relations_to_patient: [''],
      note_to_allergies: [''],
      noi: [''],
      poi: [''],
      doi: [''],
      toi: [''],
      assailant: [''],
      nearest_kin: [''],
      patient_brought_victim: [''],
      payees_address: ['']
    })
  }

  setDataBuilder(){
    console.log('set data')
    let pat = this.outpatientResult;

    this.medical =  pat.clinics[0].is_true;
    this.eent =  pat.clinics[1].is_true;
    this.obstetrics =  pat.clinics[2].is_true;
    this.pediatrics =  pat.clinics[3].is_true;
    this.urology =  pat.clinics[4].is_true;
    this.dental =  pat.clinics[5].is_true;
    this.surgery =  pat.clinics[6].is_true;
    this.dermatology =  pat.clinics[7].is_true;
    this.gynecology =  pat.clinics[8].is_true;
    this.neurology =  pat.clinics[9].is_true;

    this.charity = pat.clinic_service[0].is_true;
    this.resident = pat.clinic_service[1].is_true;
    this.transient = pat.clinic_service[2].is_true;
    this.government = pat.clinic_service[3].is_true;
    this.private = pat.clinic_service[4].is_true;

    this.male = pat.profile.gender_id == 1 ? true : false;
    this.female = pat.profile.gender_id == 2 ? true : false;
    this.single = pat.profile.civil_status_id == 1 ? true : false;
    this.married = pat.profile.civil_status_id == 1 ? true : false;
    this.widow = pat.profile.civil_status_id == 1 ? true : false;
    this.separated = pat.profile.civil_status_id == 1 ? true : false;

    this.outpatientFormGroup.setValue({
      medical: pat.clinics[0].is_true,
      eent: pat.clinics[1].is_true,
      obstetrics: pat.clinics[2].is_true,
      pediatrics: pat.clinics[3].is_true,
      urology: pat.clinics[4].is_true,
      dental: pat.clinics[5].is_true,
      surgery: pat.clinics[6].is_true,
      dermatology: pat.clinics[7].is_true,
      gynecology: pat.clinics[8].is_true,
      neurology: pat.clinics[9].is_true,
      charity: pat.clinic_service[0].is_true,
      resident: pat.clinic_service[1].is_true,
      transient : pat.clinic_service[2].is_true,
      government: pat.clinic_service[3].is_true,
      private: pat.clinic_service[4].is_true,
      surname: pat.profile.surname,
      first_name: pat.profile.first_name,
      middle_name: pat.profile.middle_name,
      age: pat.profile.age,
      nationality: pat.profile.nationality,
      male: pat.profile.gender_id == 1 ? true : false,
      female: pat.profile.gender_id == 2 ? true : false,
      single: pat.profile.civil_status_id == 1 ? true : false,
      married: pat.profile.civil_status_id == 2 ? true : false,
      widow: false,
      separated: false,
      address: pat.profile.address,
      religion: pat.profile.religion,
      birth_place: pat.profile.birth_place,
      employed_by: pat.profile.employed_by,
      dob: pat.profile.dob,
      payees_person_to_notify: pat.record.payees_person_to_notify,
      referred_by: pat.record.referred_by,
      relations_to_patient: pat.record.relations_to_patient,
      note_to_allergies: pat.record.note_to_allergies,
      noi: pat.record.noi,
      poi: pat.record.poi,
      doi: pat.record.doi,
      toi: pat.record.toi,
      assailant: pat.record.assailant,
      nearest_kin: pat.record.nearest_kin,
      patient_brought_victim: pat.record.patient_brought_victim,
      payees_address: pat.record.address,
    });
  }

  onSubmit(){
    this.outpatientResult.clinics[0].is_true = this.medical;
    this.outpatientResult.clinics[1].is_true = this.eent;
    this.outpatientResult.clinics[2].is_true = this.obstetrics;
    this.outpatientResult.clinics[3].is_true = this.pediatrics;
    this.outpatientResult.clinics[4].is_true = this.urology;
    this.outpatientResult.clinics[5].is_true = this.dental;
    this.outpatientResult.clinics[6].is_true = this.surgery;
    this.outpatientResult.clinics[7].is_true = this.dermatology;
    this.outpatientResult.clinics[8].is_true = this.gynecology;
    this.outpatientResult.clinics[9].is_true = this.neurology;

    this.outpatientResult.clinic_service[0].is_true = this.charity;
    this.outpatientResult.clinic_service[1].is_true = this.resident;
    this.outpatientResult.clinic_service[2].is_true = this.transient;
    this.outpatientResult.clinic_service[3].is_true = this.government;
    this.outpatientResult.clinic_service[4].is_true = this.private;

    this.req_body = this.outpatientFormGroup.value;
    this.req_body.outpatient_record_id = this.outpatientResult.record.id;
    this.req_body.clinics = this.outpatientResult.clinics;
    this.req_body.clinic_services = this.outpatientResult.clinic_service;
    this.req_body.outpatient_record_remarks = this.outpatientResult.remarks;
    // this.req_body.clinincs = [
    //   {"clinic_id":1, "is_true":this.medical},
    //   {"clinic_id":2, "is_true":this.eent},
    //   {"clinic_id":3, "is_true":this.obstetrics},
    //   {"clinic_id":4, "is_true":this.pediatrics},
    //   {"clinic_id":5, "is_true":this.urology},
    //   {"clinic_id":6, "is_true":this.dental},
    //   {"clinic_id":7, "is_true":this.surgery},
    //   {"clinic_id":8, "is_true":this.dermatology},
    //   {"clinic_id":9, "is_true":this.gynecology},
    //   {"clinic_id":10, "is_true":this.neurology}
    // ];
    // this.req_body.clinic_services = [
    //   {"clinic_service_id":1, "is_true":this.charity},
    //   {"clinic_service_id":2, "is_true":this.resident},
    //   {"clinic_service_id":3, "is_true":this.transient},
    //   {"clinic_service_id":4, "is_true":this.government},
    //   {"clinic_service_id":5, "is_true":this.private}
    // ];
    this.updateRecord(this.req_body)
  }

  updateRecord(req){
    this.apiService
      .updateOutpatientRecord({"outpatient_record": req})
      .subscribe(
        res => {
          console.log(res);
          alert('Successfully Updated');
        },
        err => {
          alert(err.message)
        }
      )
  }
}
