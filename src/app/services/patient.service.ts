import { Injectable } from '@angular/core';
import { PGlite } from '@electric-sql/pglite';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private db: PGlite;

  constructor() {
    this.db = new PGlite();
    this.initialize();
  }

  private async initialize() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT
      )
    `);
  }

  async addPatient(name: string, age: number, gender: string): Promise<void> {
    await this.db.exec(
      `INSERT INTO patients (name, age, gender) VALUES ('${name}', ${age}, '${gender}')`
    );
  }

  async getPatients(): Promise<any[]> {
    const result = await this.db.query('SELECT * FROM patients');
    return result.rows;
  }

  async runQuery(sql: string): Promise<any[]> {
    const result = await this.db.query(sql);
    return result.rows;
  }
}
