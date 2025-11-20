# Hospital Management System - Database Documentation

## Overview
This document provides comprehensive information about the database structure for the Hospital Management System.

## Database Design Principles
- **Normalization**: Tables are normalized to 3NF to minimize redundancy
- **Referential Integrity**: Foreign key constraints ensure data consistency
- **Scalability**: Designed to handle large volumes of data
- **Performance**: Indexes created on frequently queried columns
- **Audit Trail**: Created_at and updated_at timestamps for tracking

---

## Entity Relationship Diagram (ERD)

### High-Level Module Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                    HOSPITAL MANAGEMENT SYSTEM                    │
└─────────────────────────────────────────────────────────────────┘

┌───────────────┐         ┌─────────────┐         ┌──────────────┐
│   HOSPITAL    │────────→│ DEPARTMENTS │←────────│    USERS     │
│               │         │             │         │ (Staff/Docs) │
└───────────────┘         └─────────────┘         └──────────────┘
                                 │                        │
                                 │                        │
                                 ↓                        ↓
                          ┌─────────────┐         ┌─────────────┐
                          │  SERVICES   │         │  PATIENTS   │
                          │   & TESTS   │         │             │
                          └─────────────┘         └─────────────┘
                                 │                        │
                                 │                        │
                                 ↓                        ↓
                          ┌──────────────────────────────────┐
                          │      PATIENT VISITS/OPD/IPD      │
                          └──────────────────────────────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ↓               ↓               ↓
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │CONSULTATIONS │ │  LAB ORDERS  │ │   NURSING    │
        │              │ │              │ │     CARE     │
        └──────────────┘ └──────────────┘ └──────────────┘
                 │               │               │
                 ↓               ↓               ↓
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │PRESCRIPTIONS │ │ LAB RESULTS  │ │  MEDICATION  │
        │              │ │              │ │     ADMIN    │
        └──────────────┘ └──────────────┘ └──────────────┘
                 │
                 └───────────────┐
                                 ↓
                          ┌─────────────┐
                          │   BILLING   │
                          │  & INVOICES │
                          └─────────────┘
                                 │
                                 ↓
                          ┌─────────────┐
                          │  PAYMENTS   │
                          └─────────────┘
```

---

## Table Categories

### 1. MASTER DATA TABLES (Reference/Lookup Tables)

#### 1.1 hospitals
**Purpose**: Store hospital information
- **Primary Key**: hospital_id
- **Key Fields**: hospital_name, address, license_number, total_beds

#### 1.2 departments
**Purpose**: Hospital departments/specialties
- **Primary Key**: department_id
- **Unique**: department_code
- **Relationships**: Links to users, services, tests

#### 1.3 user_roles
**Purpose**: Define system roles (Doctor, Nurse, Admin, etc.)
- **Primary Key**: role_id
- **Unique**: role_name

#### 1.4 users
**Purpose**: All system users (doctors, nurses, staff)
- **Primary Key**: user_id
- **Unique**: employee_id, email
- **Foreign Keys**: role_id → user_roles
- **Important Fields**: qualification, specialization, license_number

#### 1.5 user_departments
**Purpose**: Map users to departments (many-to-many)
- **Primary Key**: mapping_id
- **Foreign Keys**: user_id → users, department_id → departments

#### 1.6 blood_groups
**Purpose**: Blood group master data
- **Primary Key**: blood_group_id
- **Values**: A+, A-, B+, B-, O+, O-, AB+, AB-

#### 1.7 insurance_providers
**Purpose**: Insurance company information
- **Primary Key**: provider_id
- **Unique**: provider_code

#### 1.8 test_master
**Purpose**: All laboratory tests and investigations
- **Primary Key**: test_id
- **Unique**: test_code
- **Foreign Keys**: department_id → departments
- **Important Fields**: normal_range, cost, sample_type

#### 1.9 medications
**Purpose**: Medication/drug master
- **Primary Key**: medication_id
- **Unique**: medication_code
- **Important Fields**: generic_name, strength, form, route, unit_cost

#### 1.10 beds
**Purpose**: Hospital bed inventory
- **Primary Key**: bed_id
- **Unique**: bed_number
- **Foreign Keys**: department_id → departments
- **Status**: Available, Occupied, Under Maintenance, Reserved

#### 1.11 services
**Purpose**: Billable services (consultations, procedures)
- **Primary Key**: service_id
- **Unique**: service_code
- **Foreign Keys**: department_id → departments

---

### 2. TRANSACTION DATA TABLES

#### 2.1 patients
**Purpose**: Patient registration and demographics
- **Primary Key**: patient_id
- **Unique**: patient_uhid (Unique Hospital ID)
- **Foreign Keys**: 
  - blood_group_id → blood_groups
  - insurance_provider_id → insurance_providers
  - registered_by → users
- **Sections**:
  - Personal Information
  - Contact Details
  - Emergency Contact
  - Medical Information
  - Insurance Information

#### 2.2 patient_visits
**Purpose**: Track all patient visits (OPD/IPD/Emergency)
- **Primary Key**: visit_id
- **Unique**: visit_number
- **Foreign Keys**: 
  - patient_id → patients
  - department_id → departments
  - doctor_id → users
- **Visit Types**: OPD, IPD, Emergency, Follow-up
- **Status**: Scheduled, Waiting, In-Progress, Completed, Cancelled

#### 2.3 vitals
**Purpose**: Patient vital signs recording
- **Primary Key**: vital_id
- **Foreign Keys**: 
  - visit_id → patient_visits
  - patient_id → patients
  - recorded_by → users (nurse)
- **Measurements**: BP, Temperature, Pulse, RR, SpO2, Blood Sugar, Weight, Height, BMI

#### 2.4 consultations
**Purpose**: Doctor consultation records
- **Primary Key**: consultation_id
- **Foreign Keys**: 
  - visit_id → patient_visits
  - patient_id → patients
  - doctor_id → users
- **Key Fields**: symptoms, diagnosis, treatment_plan, follow_up_date

#### 2.5 prescriptions & prescription_details
**Purpose**: Medication prescriptions
- **Primary Keys**: prescription_id, detail_id
- **Foreign Keys**: 
  - consultation_id → consultations
  - medication_id → medications
- **Details**: dosage, frequency, duration, instructions

#### 2.6 lab_orders & lab_order_details
**Purpose**: Laboratory test orders
- **Primary Keys**: order_id, detail_id
- **Foreign Keys**: 
  - patient_id → patients
  - visit_id → patient_visits
  - test_id → test_master
- **Status Tracking**: Pending → Sample Collected → Processing → Completed

#### 2.7 lab_results
**Purpose**: Laboratory test results
- **Primary Key**: result_id
- **Foreign Keys**: 
  - order_detail_id → lab_order_details
  - test_id → test_master
  - patient_id → patients
  - technician_id → users
  - pathologist_id → users
- **Key Fields**: result_value, abnormal_flag, findings, interpretation

#### 2.8 nursing_care_plans
**Purpose**: Nursing care documentation
- **Primary Key**: care_plan_id
- **Foreign Keys**: 
  - patient_id → patients
  - visit_id → patient_visits
  - nurse_id → users
- **Sections**: assessment, diagnosis, goals, interventions, evaluation

#### 2.9 medication_administration
**Purpose**: Medication administration records (MAR)
- **Primary Key**: administration_id
- **Foreign Keys**: 
  - patient_id → patients
  - prescription_detail_id → prescription_details
  - medication_id → medications
  - administered_by → users (nurse)
- **Status**: Scheduled, Administered, Missed, Refused, Held

#### 2.10 nursing_notes
**Purpose**: Nursing observations and notes
- **Primary Key**: note_id
- **Foreign Keys**: 
  - patient_id → patients
  - visit_id → patient_visits
  - nurse_id → users
- **Categories**: General, Assessment, Intervention, Response, Incident, Discharge

#### 2.11 bed_assignments
**Purpose**: Patient bed allocation
- **Primary Key**: assignment_id
- **Foreign Keys**: 
  - patient_id → patients
  - visit_id → patient_visits
  - bed_id → beds
  - assigned_by → users
- **Status**: Active, Discharged, Transferred

#### 2.12 invoices & invoice_items
**Purpose**: Billing and invoicing
- **Primary Keys**: invoice_id, item_id
- **Foreign Keys**: 
  - patient_id → patients
  - visit_id → patient_visits
  - insurance_provider_id → insurance_providers
- **Calculations**: subtotal, discount, tax, total
- **Payment Status**: Pending, Partial, Paid, Cancelled, Refunded

#### 2.13 payments
**Purpose**: Payment transactions
- **Primary Key**: payment_id
- **Unique**: receipt_number
- **Foreign Keys**: 
  - invoice_id → invoices
  - patient_id → patients
  - received_by → users
- **Payment Methods**: Cash, Card, UPI, Net Banking, Insurance, Cheque

---

## Key Relationships

### 1. Patient Journey Flow
```
Patient Registration (patients)
    ↓
Patient Visit (patient_visits)
    ↓
Vitals Recording (vitals) - by Nurse
    ↓
Doctor Consultation (consultations)
    ↓
    ├─→ Prescription (prescriptions, prescription_details)
    ├─→ Lab Orders (lab_orders, lab_order_details)
    └─→ Imaging/Services
    ↓
Lab Results (lab_results)
    ↓
Medication Administration (medication_administration) - by Nurse
    ↓
Nursing Notes (nursing_notes)
    ↓
Billing (invoices, invoice_items)
    ↓
Payment (payments)
```

### 2. User-Department Relationship
- **Type**: Many-to-Many
- **Mapping Table**: user_departments
- Users can belong to multiple departments
- Each department can have multiple users

### 3. Visit-Based Relationships
All clinical activities are linked to a patient_visit:
- Vitals
- Consultations
- Lab Orders
- Nursing Care
- Bed Assignments
- Billing

---

## Indexes and Performance

### Primary Indexes
- All primary keys have automatic indexes

### Additional Indexes
```sql
-- Patient search optimization
idx_patient_uhid (patient_uhid)
idx_patient_phone (phone)
idx_patient_name (first_name, last_name)

-- Visit search optimization
idx_visit_date (visit_date)
idx_visit_patient (patient_id)
idx_visit_doctor (doctor_id)

-- Lab optimization
idx_lab_order_patient (patient_id)
idx_lab_order_date (order_date)

-- Billing optimization
idx_invoice_patient (patient_id)
idx_invoice_date (invoice_date)
idx_invoice_number (invoice_number)
idx_payment_date (payment_date)

-- User optimization
idx_user_email (email)
idx_user_employee_id (employee_id)
```

---

## Data Types Used

### Common Data Types
- **INT**: Primary keys, foreign keys, numeric IDs
- **VARCHAR**: Text fields with length limits
- **TEXT**: Long text fields (notes, descriptions)
- **DECIMAL(10,2)**: Currency values
- **DATE**: Date-only fields
- **TIME**: Time-only fields
- **TIMESTAMP**: Date and time with automatic updates
- **BOOLEAN**: True/false flags
- **ENUM**: Predefined list of values

---

## Business Rules Implemented

### 1. Patient Management
- Every patient must have a unique UHID
- Emergency contact is mandatory
- Age is calculated from date of birth

### 2. Visit Management
- Visit number must be unique
- Visit must be linked to a patient and doctor
- Status transitions: Scheduled → Waiting → In-Progress → Completed

### 3. Laboratory
- Lab orders must have at least one test
- Status progression: Pending → Collected → Processing → Completed
- Results must be verified by a pathologist

### 4. Medication
- Prescriptions linked to consultations
- Administration records track actual medication given
- Status tracking for compliance

### 5. Billing
- Invoice calculated from line items
- Tax and discount applied at line and invoice level
- Payment status tracked separately
- Insurance claims tracked with claim numbers

---

## Security Considerations

### 1. Password Storage
- Passwords stored as hashed values (password_hash)
- Never store plain text passwords

### 2. Audit Trail
- created_at, updated_at timestamps on all tables
- created_by, updated_by fields track user actions

### 3. Data Privacy
- Patient data encrypted at rest (implementation specific)
- Access control through user_roles
- Audit logs for sensitive operations

---

## Sample Queries

### Get Patient Complete Information
```sql
SELECT p.*, bg.blood_group_name, ip.provider_name
FROM patients p
LEFT JOIN blood_groups bg ON p.blood_group_id = bg.blood_group_id
LEFT JOIN insurance_providers ip ON p.insurance_provider_id = ip.provider_id
WHERE p.patient_uhid = 'PAT000001';
```

### Get Today's Appointments
```sql
SELECT pv.*, p.first_name, p.last_name, u.first_name as doctor_name, d.department_name
FROM patient_visits pv
JOIN patients p ON pv.patient_id = p.patient_id
JOIN users u ON pv.doctor_id = u.user_id
JOIN departments d ON pv.department_id = d.department_id
WHERE pv.visit_date = CURDATE()
ORDER BY pv.visit_time;
```

### Get Pending Lab Orders
```sql
SELECT lo.*, p.first_name, p.last_name, t.test_name
FROM lab_orders lo
JOIN patients p ON lo.patient_id = p.patient_id
JOIN lab_order_details lod ON lo.order_id = lod.order_id
JOIN test_master t ON lod.test_id = t.test_id
WHERE lo.status IN ('Pending', 'Sample Collected')
ORDER BY lo.order_date;
```

### Get Outstanding Invoices
```sql
SELECT i.*, p.first_name, p.last_name, i.total_amount,
       COALESCE(SUM(pay.amount), 0) as paid_amount,
       (i.total_amount - COALESCE(SUM(pay.amount), 0)) as balance
FROM invoices i
JOIN patients p ON i.patient_id = p.patient_id
LEFT JOIN payments pay ON i.invoice_id = pay.invoice_id
WHERE i.payment_status IN ('Pending', 'Partial')
GROUP BY i.invoice_id;
```

---

## Maintenance Recommendations

### Regular Tasks
1. **Daily Backups**: Full database backup
2. **Weekly Analysis**: Update statistics for query optimization
3. **Monthly Cleanup**: Archive old records
4. **Quarterly Review**: Index performance analysis

### Data Retention
- Active patient records: Keep indefinitely
- Completed visits: Keep for 7 years (legal requirement)
- Lab results: Keep for 5 years
- Billing records: Keep for 7 years
- Audit logs: Keep for 3 years

---

## Database Size Estimates

### Estimated Storage (1 year, medium hospital)
- Patients: ~50,000 records × 2KB = 100 MB
- Visits: ~200,000 records × 1KB = 200 MB
- Lab Orders: ~150,000 records × 2KB = 300 MB
- Invoices: ~200,000 records × 2KB = 400 MB
- Total Estimated: ~2-3 GB/year

---

## Version History
- **v1.0** - November 12, 2025 - Initial schema design
- Complete implementation with all modules
- Master and transaction tables
- Indexes and relationships

---

## Contact & Support
For database-related queries, contact the development team or DBA.
