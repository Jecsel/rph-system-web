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
  remarksFormGroup: FormGroup;
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

  record_date: any;
  time_of_arrival: any = '';
  time_of_discharge: any = '';
  service_of_treatment: any = '';
  diagnosis: any = '';
  doctor_on_duty: any = '';
  remark: any = '';
  user_role: any;

  remarks: any = [];
  req_body: any = {};

  remark_button: any = 'Create';


  show_remark_modal = false;

  @Input()
  outpatientResult: any = {};

  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('Outpatient : ', this.outpatientResult);
    this.user_role = localStorage.getItem('user_role_id');

    this.outpatientResult.outpatient_record_remarks = [];
    this.declareFormBuilder();
    if(this.outpatientResult.from_user_profile){    //from User Profile
      if(this.outpatientResult.create_new){         //creating new Outpatient Record
        console.log('create new outpatient record');
        this.setDataBuilderOutpatient();
      }else{                                        //update OutPatient Record
        this.outpatient_records = this.outpatientResult;
      this.setDataBuilder();
      }
    }else{                                          //from Outpatient Record List
      this.outpatient_records = this.outpatientResult;
      this.setDataBuilder();
    }
  }

  declareFormBuilder(){
    this.single = false;
    this.married = false;
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

  setDataBuilderOutpatient(){
    console.log('set data')
    let pat = this.outpatientResult;

    this.male = pat.profile.gender_id == 1 ? true : false;
    this.female = pat.profile.gender_id == 2 ? true : false;
    
    if( pat.profile.civil_status_id == 1){
      this.single = true;
      this.married = false;
    }else{
      this.single = false;
      this.married = true;
    }
    
    this.widow = false;
    this.separated = false;

    this.outpatientFormGroup.setValue({
      medical: false,
      eent: false,
      obstetrics: false,
      pediatrics: false,
      urology: false,
      dental: false,
      surgery: false,
      dermatology: false,
      gynecology: false,
      neurology: false,
      charity: false,
      resident: false,
      transient : false,
      government: false,
      private: false,
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
      payees_person_to_notify: '',
      referred_by: '',
      relations_to_patient: '',
      note_to_allergies: '',
      noi: '',
      poi: '',
      doi: '',
      toi: '',
      assailant: '',
      nearest_kin: '',
      patient_brought_victim: '',
      payees_address: '',
    });
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
    this.married = pat.profile.civil_status_id == 2 ? true : false;
    this.widow = false;
    this.separated = false;

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

    if(this.outpatientResult.from_user_profile && this.outpatientResult.create_new){
      this.createNewRecord(this.outpatientFormGroup.value);
    }
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

    
    if(this.outpatientResult.from_user_profile){    //from User Profile
      if(!this.outpatientResult.create_new){         //creating new Outpatient Record
        this.updateRecord(this.req_body)
      }
    }else{                                          //from Outpatient Record List
      this.outpatient_records = this.outpatientResult;
      this.updateRecord(this.req_body)
    }
  }

  createNewRecord(data) {
    if(this.outpatient_records.remarks != undefined){
      data.patient_id = this.outpatientResult.profile.user_id;
      data.clinical_record_id = this.outpatientResult.record.clinical_records[0].id;
      data.physician_id = 1;
      data.outpatient_record_remarks = this.outpatient_records.remarks;
      data.clinics = [
        {"clinic_id":1, "is_true":this.medical},
        {"clinic_id":2, "is_true":this.eent},
        {"clinic_id":3, "is_true":this.obstetrics},
        {"clinic_id":4, "is_true":this.pediatrics},
        {"clinic_id":5, "is_true":this.urology},
        {"clinic_id":6, "is_true":this.dental},
        {"clinic_id":7, "is_true":this.surgery},
        {"clinic_id":8, "is_true":this.dermatology},
        {"clinic_id":9, "is_true":this.gynecology},
        {"clinic_id":10, "is_true":this.neurology}
      ];
      data.clinic_services = [
        {"clinic_service_id":1, "is_true":this.charity},
        {"clinic_service_id":2, "is_true":this.resident},
        {"clinic_service_id":3, "is_true":this.transient},
        {"clinic_service_id":4, "is_true":this.government},
        {"clinic_service_id":5, "is_true":this.private}
    ]
  
      console.log('Req Body: ', data);
  
      this.apiService
        .createOutpatientRecord({'outpatient_record': data})
        .subscribe(
          res => {
            console.log(res);
            alert('Successfully Created!')
          },
          err => {
            alert(err.message);
          }
        )
    }

  }

  updateRemarks(e){
    console.log(e);
    console.log(this.outpatientResult);
    this.remark_button = 'Update';
  }

  removeRemark(mark_id){
    this.outpatientResult.outpatient_record_remarks.splice(mark_id, 1);
    this.outpatient_records.remarks = this.outpatientResult.outpatient_record_remarks;
  }

  updateRecord(req){
    console.log('update Record', req);
    if(req.outpatient_record_remarks.length > 0){
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

  closeRemarkModal(){
    this.show_remark_modal = false;
  }

  showRemarkModal(action_typ, data, remark_id){
    console.log('showRemarkModal: ', data);;

    this.record_date = data.record_date;
    this.time_of_arrival = data.time_of_arrival;
    this.time_of_discharge = data.time_of_discharge;
    this.diagnosis = data.diagnosis;
    this.service_of_treatment = data.service_of_treatment;
    this.doctor_on_duty = data.doctor_on_duty;
    this.remark = data.remark;

    this.remark_button = 'Update'
    this.show_remark_modal = true;
  }

  addDiagnosis(){
    let mark = {
      "record_date": this.record_date,
      "time_of_arrival": this.time_of_arrival,
      "time_of_discharge": this.time_of_discharge,
      "diagnosis": this.diagnosis,
      "service_of_treatment": this.service_of_treatment,
      "doctor_on_duty": this.doctor_on_duty,
      "remarks": this.remark
    }
    this.outpatientResult.outpatient_record_remarks.push(mark);
    this.outpatient_records.remarks =  this.outpatientResult.outpatient_record_remarks;
    console.log(this.outpatient_records);
    this.closeRemarkModal();
  }
}
