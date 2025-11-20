-- ============================================================================
-- HOSPITAL MANAGEMENT SYSTEM - MASTER DATA
-- ============================================================================
-- Sample master data insert statements
-- ============================================================================

-- Hospital Information
INSERT INTO hospitals (hospital_name, address, city, state, zip_code, phone, email, license_number, established_date, total_beds) VALUES
('City General Hospital', '123 Healthcare Street', 'Mumbai', 'Maharashtra', '400001', '+91-22-12345678', 'info@cityhospital.com', 'LIC-MH-2020-001', '2020-01-15', 500);

-- Departments
INSERT INTO departments (department_code, department_name, description, floor_number, building, phone_extension) VALUES
('GEN', 'General Medicine', 'General medical consultations and treatments', 1, 'Main Building', '101'),
('CARD', 'Cardiology', 'Heart and cardiovascular system treatment', 2, 'Main Building', '201'),
('ORTH', 'Orthopedics', 'Bone, joint, and muscle treatment', 3, 'Main Building', '301'),
('PED', 'Pediatrics', 'Child healthcare and treatment', 1, 'East Wing', '102'),
('NEUR', 'Neurology', 'Brain and nervous system treatment', 4, 'Main Building', '401'),
('DERM', 'Dermatology', 'Skin conditions and treatment', 2, 'East Wing', '202'),
('OPH', 'Ophthalmology', 'Eye care and vision treatment', 3, 'East Wing', '302'),
('ENT', 'ENT (Ear, Nose & Throat)', 'ENT treatment and surgery', 3, 'East Wing', '303'),
('RAD', 'Radiology', 'Medical imaging and diagnostics', 'Basement', 'Main Building', '001'),
('LAB', 'Laboratory', 'Clinical laboratory services', 'Basement', 'Main Building', '002'),
('EMRG', 'Emergency', '24/7 emergency services', 'Ground', 'Main Building', '000'),
('ICU', 'Intensive Care Unit', 'Critical care unit', 5, 'Main Building', '501'),
('NURS', 'Nursing', 'Nursing services and patient care', 'All', 'All Buildings', '999'),
('PHARM', 'Pharmacy', 'Medication dispensing', 'Ground', 'Main Building', '010');

-- User Roles
INSERT INTO user_roles (role_name, role_description) VALUES
('Administrator', 'System administrator with full access'),
('Doctor', 'Medical doctor/physician'),
('Nurse', 'Registered nurse'),
('Lab Technician', 'Laboratory technician'),
('Pharmacist', 'Pharmacy staff'),
('Radiologist', 'Radiology specialist'),
('Front Desk', 'Front office staff'),
('Billing Staff', 'Billing and accounts staff'),
('Medical Records', 'Medical records management'),
('Housekeeping', 'Housekeeping and maintenance');

-- Sample Users (Doctors, Nurses, Staff)
INSERT INTO users (employee_id, role_id, first_name, last_name, email, phone, gender, qualification, specialization, license_number, joining_date, password_hash) VALUES
-- Doctors
('DOC001', 2, 'Rajesh', 'Kumar', 'dr.rajesh@hospital.com', '+91-9876543210', 'Male', 'MBBS, MD', 'Cardiology', 'MED-2015-001', '2015-03-01', '$2y$10$hashedpassword1'),
('DOC002', 2, 'Priya', 'Sharma', 'dr.priya@hospital.com', '+91-9876543211', 'Female', 'MBBS, MS', 'Orthopedics', 'MED-2016-002', '2016-06-15', '$2y$10$hashedpassword2'),
('DOC003', 2, 'Amit', 'Patel', 'dr.amit@hospital.com', '+91-9876543212', 'Male', 'MBBS, DCH', 'Pediatrics', 'MED-2017-003', '2017-01-20', '$2y$10$hashedpassword3'),
('DOC004', 2, 'Sneha', 'Desai', 'dr.sneha@hospital.com', '+91-9876543213', 'Female', 'MBBS, DM', 'Neurology', 'MED-2018-004', '2018-08-10', '$2y$10$hashedpassword4'),
('DOC005', 2, 'Vikram', 'Singh', 'dr.vikram@hospital.com', '+91-9876543214', 'Male', 'MBBS, MD', 'General Medicine', 'MED-2014-005', '2014-04-05', '$2y$10$hashedpassword5'),

-- Nurses
('NUR001', 3, 'Anjali', 'Reddy', 'anjali.n@hospital.com', '+91-9876543220', 'Female', 'BSc Nursing', 'General Nursing', 'NUR-2018-001', '2018-01-15', '$2y$10$hashedpassword6'),
('NUR002', 3, 'Sanjay', 'Mehta', 'sanjay.n@hospital.com', '+91-9876543221', 'Male', 'BSc Nursing', 'ICU Nursing', 'NUR-2019-002', '2019-03-20', '$2y$10$hashedpassword7'),
('NUR003', 3, 'Kavita', 'Nair', 'kavita.n@hospital.com', '+91-9876543222', 'Female', 'GNM', 'Pediatric Nursing', 'NUR-2020-003', '2020-06-10', '$2y$10$hashedpassword8'),

-- Lab Technicians
('LAB001', 4, 'Ramesh', 'Iyer', 'ramesh.lab@hospital.com', '+91-9876543230', 'Male', 'BSc MLT', 'Clinical Laboratory', 'LAB-2017-001', '2017-05-12', '$2y$10$hashedpassword9'),
('LAB002', 4, 'Geeta', 'Pillai', 'geeta.lab@hospital.com', '+91-9876543231', 'Female', 'BSc MLT', 'Pathology', 'LAB-2018-002', '2018-09-15', '$2y$10$hashedpassword10'),

-- Front Desk Staff
('FD001', 7, 'Sunita', 'Joshi', 'sunita.fd@hospital.com', '+91-9876543240', 'Female', 'BBA', 'Hospital Administration', NULL, '2019-02-01', '$2y$10$hashedpassword11'),
('FD002', 7, 'Rahul', 'Verma', 'rahul.fd@hospital.com', '+91-9876543241', 'Male', 'B.Com', 'Front Office', NULL, '2020-07-15', '$2y$10$hashedpassword12');

-- Blood Groups
INSERT INTO blood_groups (blood_group_name, display_order) VALUES
('A+', 1), ('A-', 2), ('B+', 3), ('B-', 4),
('O+', 5), ('O-', 6), ('AB+', 7), ('AB-', 8);

-- Insurance Providers
INSERT INTO insurance_providers (provider_name, provider_code, contact_person, phone, email, address) VALUES
('Star Health Insurance', 'STAR001', 'Mr. Suresh Kumar', '+91-22-12345601', 'claims@starhealth.com', 'Star Building, Andheri, Mumbai'),
('HDFC ERGO', 'HDFC001', 'Ms. Meera Shah', '+91-22-12345602', 'health@hdfcergo.com', 'HDFC House, BKC, Mumbai'),
('ICICI Lombard', 'ICICI001', 'Mr. Prakash Rao', '+91-22-12345603', 'claims@icicilombard.com', 'ICICI Tower, Lower Parel, Mumbai'),
('Max Bupa', 'MAX001', 'Ms. Priyanka Singh', '+91-22-12345604', 'support@maxbupa.com', 'Max House, Worli, Mumbai'),
('Religare Health', 'RELI001', 'Mr. Anil Gupta', '+91-22-12345605', 'claims@religare.com', 'Religare Building, Fort, Mumbai');

-- Test Master
INSERT INTO test_master (test_code, test_name, test_category, department_id, normal_range, unit_of_measurement, sample_type, cost, duration_minutes) VALUES
-- Blood Tests
('CBC001', 'Complete Blood Count (CBC)', 'Hematology', 10, 'WBC: 4000-11000, RBC: 4.5-5.5', 'cells/mcL', 'Blood', 500.00, 60),
('BS001', 'Blood Sugar (Fasting)', 'Biochemistry', 10, '70-100', 'mg/dL', 'Blood', 150.00, 30),
('BS002', 'Blood Sugar (Random)', 'Biochemistry', 10, '80-140', 'mg/dL', 'Blood', 150.00, 30),
('HBA1C', 'HbA1c (Glycated Hemoglobin)', 'Biochemistry', 10, '4.0-5.6', '%', 'Blood', 800.00, 90),
('LIPID', 'Lipid Profile', 'Biochemistry', 10, 'Total Cholesterol: <200', 'mg/dL', 'Blood', 900.00, 120),
('LFT001', 'Liver Function Test', 'Biochemistry', 10, 'Varies', 'Various', 'Blood', 1200.00, 120),
('KFT001', 'Kidney Function Test', 'Biochemistry', 10, 'Creatinine: 0.7-1.3', 'mg/dL', 'Blood', 1000.00, 120),
('THYROID', 'Thyroid Profile (T3, T4, TSH)', 'Endocrinology', 10, 'TSH: 0.5-5.0', 'mIU/L', 'Blood', 1500.00, 180),

-- Urine Tests
('URINE001', 'Urine Analysis (Complete)', 'Pathology', 10, 'Normal', 'Various', 'Urine', 300.00, 45),
('URINE002', 'Urine Culture', 'Microbiology', 10, 'No Growth', 'CFU/mL', 'Urine', 800.00, 2880),

-- Imaging
('XRAY001', 'X-Ray Chest', 'Radiology', 9, 'Normal', 'N/A', 'N/A', 800.00, 15),
('XRAY002', 'X-Ray Bone', 'Radiology', 9, 'Normal', 'N/A', 'N/A', 700.00, 15),
('CT001', 'CT Scan Brain', 'Radiology', 9, 'Normal', 'N/A', 'N/A', 5000.00, 45),
('MRI001', 'MRI Brain', 'Radiology', 9, 'Normal', 'N/A', 'N/A', 8000.00, 60),
('USG001', 'Ultrasound Abdomen', 'Radiology', 9, 'Normal', 'N/A', 'N/A', 1500.00, 30),

-- Cardiology
('ECG001', 'ECG (Electrocardiogram)', 'Cardiology', 2, 'Normal Sinus Rhythm', 'N/A', 'N/A', 500.00, 15),
('ECHO001', '2D Echo', 'Cardiology', 2, 'Normal', 'N/A', 'N/A', 3000.00, 45);

-- Medication Master
INSERT INTO medications (medication_code, medication_name, generic_name, category, manufacturer, unit_of_measure, strength, form, route, unit_cost) VALUES
-- Analgesics
('MED001', 'Paracetamol', 'Paracetamol', 'Analgesic', 'ABC Pharma', 'Tablet', '500mg', 'Tablet', 'Oral', 2.00),
('MED002', 'Ibuprofen', 'Ibuprofen', 'NSAID', 'XYZ Pharma', 'Tablet', '400mg', 'Tablet', 'Oral', 5.00),

-- Antibiotics
('MED003', 'Amoxicillin', 'Amoxicillin', 'Antibiotic', 'MediLife', 'Capsule', '500mg', 'Capsule', 'Oral', 15.00),
('MED004', 'Azithromycin', 'Azithromycin', 'Antibiotic', 'PharmaCo', 'Tablet', '500mg', 'Tablet', 'Oral', 25.00),
('MED005', 'Ciprofloxacin', 'Ciprofloxacin', 'Antibiotic', 'HealthCare Inc', 'Tablet', '500mg', 'Tablet', 'Oral', 20.00),

-- Cardiac
('MED006', 'Aspirin', 'Aspirin', 'Antiplatelet', 'CardioMed', 'Tablet', '75mg', 'Tablet', 'Oral', 3.00),
('MED007', 'Atorvastatin', 'Atorvastatin', 'Statin', 'HeartCare', 'Tablet', '10mg', 'Tablet', 'Oral', 12.00),
('MED008', 'Metoprolol', 'Metoprolol', 'Beta Blocker', 'CardioMed', 'Tablet', '50mg', 'Tablet', 'Oral', 8.00),

-- Diabetes
('MED009', 'Metformin', 'Metformin', 'Antidiabetic', 'DiabetCare', 'Tablet', '500mg', 'Tablet', 'Oral', 6.00),
('MED010', 'Glimepiride', 'Glimepiride', 'Antidiabetic', 'SugarControl', 'Tablet', '2mg', 'Tablet', 'Oral', 10.00),

-- Gastric
('MED011', 'Omeprazole', 'Omeprazole', 'PPI', 'GastroCare', 'Capsule', '20mg', 'Capsule', 'Oral', 7.00),
('MED012', 'Ranitidine', 'Ranitidine', 'H2 Blocker', 'DigestWell', 'Tablet', '150mg', 'Tablet', 'Oral', 4.00),

-- Antihistamine
('MED013', 'Cetirizine', 'Cetirizine', 'Antihistamine', 'AllerCure', 'Tablet', '10mg', 'Tablet', 'Oral', 3.50),
('MED014', 'Montelukast', 'Montelukast', 'Antihistamine', 'BreathEasy', 'Tablet', '10mg', 'Tablet', 'Oral', 15.00),

-- Injections
('MED015', 'Ceftriaxone Injection', 'Ceftriaxone', 'Antibiotic', 'InjectMed', 'Vial', '1g', 'Injection', 'IV', 80.00),
('MED016', 'Diclofenac Injection', 'Diclofenac', 'NSAID', 'PainRelief', 'Ampoule', '75mg', 'Injection', 'IM', 25.00);

-- Beds
INSERT INTO beds (bed_number, ward_type, department_id, floor_number, room_number, bed_type, charge_per_day, status) VALUES
-- ICU Beds
('ICU-101', 'ICU', 12, 5, '501', 'ICU', 5000.00, 'Available'),
('ICU-102', 'ICU', 12, 5, '501', 'ICU', 5000.00, 'Available'),
('ICU-103', 'ICU', 12, 5, '502', 'ICU', 5000.00, 'Occupied'),
('ICU-104', 'ICU', 12, 5, '502', 'ICU', 5000.00, 'Available'),

-- General Ward
('GEN-201', 'General Ward', 1, 1, '101', 'General', 1000.00, 'Available'),
('GEN-202', 'General Ward', 1, 1, '101', 'General', 1000.00, 'Available'),
('GEN-203', 'General Ward', 1, 1, '102', 'General', 1000.00, 'Occupied'),
('GEN-204', 'General Ward', 1, 1, '102', 'General', 1000.00, 'Available'),

-- Private Rooms
('PVT-301', 'Private', 1, 2, '201', 'Private', 3000.00, 'Available'),
('PVT-302', 'Private', 1, 2, '202', 'Private', 3000.00, 'Available'),
('PVT-303', 'Private', 2, 2, '203', 'Private', 3500.00, 'Occupied'),

-- Semi-Private
('SEMI-401', 'Semi-Private', 1, 3, '301', 'Semi-Private', 2000.00, 'Available'),
('SEMI-402', 'Semi-Private', 1, 3, '301', 'Semi-Private', 2000.00, 'Available');

-- Services Master
INSERT INTO services (service_code, service_name, service_category, department_id, description, unit_price, tax_applicable) VALUES
('CONS001', 'General Consultation', 'Consultation', 1, 'General physician consultation', 500.00, TRUE),
('CONS002', 'Specialist Consultation', 'Consultation', NULL, 'Specialist doctor consultation', 1000.00, TRUE),
('CONS003', 'Follow-up Consultation', 'Consultation', NULL, 'Follow-up visit', 300.00, TRUE),
('PROC001', 'Dressing (Small)', 'Procedure', NULL, 'Small wound dressing', 200.00, TRUE),
('PROC002', 'Dressing (Large)', 'Procedure', NULL, 'Large wound dressing', 500.00, TRUE),
('PROC003', 'Injection Administration', 'Procedure', NULL, 'Injection/IV administration', 100.00, TRUE),
('PROC004', 'IV Cannulation', 'Procedure', NULL, 'IV line insertion', 300.00, TRUE),
('PROC005', 'Nebulization', 'Procedure', NULL, 'Nebulizer treatment', 150.00, TRUE),
('EMR001', 'Emergency Consultation', 'Emergency', 11, '24/7 Emergency consultation', 1500.00, TRUE),
('NURS001', 'Nursing Care (Per Day)', 'Nursing', 13, 'Daily nursing care charges', 800.00, TRUE);

-- ============================================================================
-- SAMPLE TRANSACTION DATA
-- ============================================================================

-- Sample Patients
INSERT INTO patients (patient_uhid, first_name, last_name, date_of_birth, age, gender, blood_group_id, phone, email, address, city, state, zip_code, emergency_contact_name, emergency_contact_relation, emergency_contact_phone, allergies, registered_by) VALUES
('PAT000001', 'Rajiv', 'Malhotra', '1980-05-15', 44, 'Male', 1, '+91-9876501001', 'rajiv.m@email.com', '45 Marine Drive', 'Mumbai', 'Maharashtra', '400020', 'Sunita Malhotra', 'Wife', '+91-9876501002', 'Penicillin', 11),
('PAT000002', 'Anita', 'Deshmukh', '1992-08-22', 32, 'Female', 5, '+91-9876502001', 'anita.d@email.com', '78 Linking Road', 'Mumbai', 'Maharashtra', '400050', 'Ramesh Deshmukh', 'Husband', '+91-9876502002', 'None', 11),
('PAT000003', 'Karan', 'Singh', '2015-03-10', 9, 'Male', 3, '+91-9876503001', 'karan.parent@email.com', '120 Hill Road', 'Mumbai', 'Maharashtra', '400052', 'Meera Singh', 'Mother', '+91-9876503002', 'None', 12),
('PAT000004', 'Priya', 'Nambiar', '1975-11-30', 49, 'Female', 2, '+91-9876504001', 'priya.n@email.com', '33 Juhu Lane', 'Mumbai', 'Maharashtra', '400049', 'Suresh Nambiar', 'Husband', '+91-9876504002', 'Sulfa drugs', 11),
('PAT000005', 'Arjun', 'Kapoor', '1988-01-20', 36, 'Male', 7, '+91-9876505001', 'arjun.k@email.com', '90 Versova Road', 'Mumbai', 'Maharashtra', '400061', 'Neha Kapoor', 'Wife', '+91-9876505002', 'None', 12);

-- ============================================================================
-- END OF MASTER DATA
-- ============================================================================
