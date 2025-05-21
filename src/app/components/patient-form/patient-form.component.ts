import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  imports:[FormsModule,CommonModule]
})
export class PatientFormComponent implements OnInit {
  name = '';
  age: number | null = null;
  gender = '';
  patients: any[] = [];

  constructor(private patientService: PatientService) {}

  async addPatient() {
    if (!this.name || this.age == null || !this.gender) return;

    await this.patientService.addPatient(this.name, this.age, this.gender);
    this.name = '';
    this.age = null;
    this.gender = '';
    await this.loadPatients();
  }

  async loadPatients() {
    this.patients = await this.patientService.getPatients();
  }

  ngOnInit() {
    this.loadPatients();
  }
}
