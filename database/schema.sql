-- ============================================================================
-- HOSPITAL MANAGEMENT SYSTEM - DATABASE SCHEMA
-- ============================================================================
-- Created: November 12, 2025
-- Description: Complete database schema with master and transaction tables
-- ============================================================================

-- ============================================================================
-- MASTER DATA TABLES
-- ============================================================================

-- Hospital Information
CREATE TABLE hospitals (
    hospital_id INT PRIMARY KEY AUTO_INCREMENT,
    hospital_name VARCHAR(200) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(100),
    license_number VARCHAR(50),
    established_date DATE,
    total_beds INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Departments/Specialties
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_code VARCHAR(20) UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    department_head_id INT,
    description TEXT,
    floor_number INT,
    building VARCHAR(50),
    phone_extension VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Roles
CREATE TABLE user_roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users (Doctors, Nurses, Staff)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    qualification VARCHAR(200),
    specialization VARCHAR(200),
    license_number VARCHAR(100),
    joining_date DATE,
    password_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES user_roles(role_id)
);

-- User Department Mapping
CREATE TABLE user_departments (
    mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    department_id INT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    assigned_date DATE NOT NULL,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Blood Groups
CREATE TABLE blood_groups (
    blood_group_id INT PRIMARY KEY AUTO_INCREMENT,
    blood_group_name VARCHAR(10) UNIQUE NOT NULL,
    display_order INT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insurance Providers
CREATE TABLE insurance_providers (
    provider_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_name VARCHAR(200) NOT NULL,
    provider_code VARCHAR(50) UNIQUE,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    coverage_details TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Test/Investigation Master
CREATE TABLE test_master (
    test_id INT PRIMARY KEY AUTO_INCREMENT,
    test_code VARCHAR(50) UNIQUE NOT NULL,
    test_name VARCHAR(200) NOT NULL,
    test_category VARCHAR(100),
    department_id INT,
    normal_range TEXT,
    unit_of_measurement VARCHAR(50),
    sample_type VARCHAR(100),
    preparation_instructions TEXT,
    cost DECIMAL(10, 2) DEFAULT 0.00,
    duration_minutes INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Medication Master
CREATE TABLE medications (
    medication_id INT PRIMARY KEY AUTO_INCREMENT,
    medication_code VARCHAR(50) UNIQUE NOT NULL,
    medication_name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    brand_name VARCHAR(200),
    category VARCHAR(100),
    manufacturer VARCHAR(200),
    unit_of_measure VARCHAR(50),
    strength VARCHAR(100),
    form ENUM('Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Drops', 'Other'),
    route ENUM('Oral', 'IV', 'IM', 'SC', 'Topical', 'Inhalation', 'Other'),
    side_effects TEXT,
    contraindications TEXT,
    unit_cost DECIMAL(10, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bed Master
CREATE TABLE beds (
    bed_id INT PRIMARY KEY AUTO_INCREMENT,
    bed_number VARCHAR(20) UNIQUE NOT NULL,
    ward_type VARCHAR(100),
    department_id INT,
    floor_number INT,
    room_number VARCHAR(20),
    bed_type ENUM('General', 'ICU', 'NICU', 'CCU', 'Private', 'Semi-Private', 'Deluxe'),
    charge_per_day DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('Available', 'Occupied', 'Under Maintenance', 'Reserved') DEFAULT 'Available',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Service Master (for billing)
CREATE TABLE services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    service_code VARCHAR(50) UNIQUE NOT NULL,
    service_name VARCHAR(200) NOT NULL,
    service_category VARCHAR(100),
    department_id INT,
    description TEXT,
    unit_price DECIMAL(10, 2) DEFAULT 0.00,
    tax_applicable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- ============================================================================
-- TRANSACTION DATA TABLES
-- ============================================================================

-- Patient Registration
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_uhid VARCHAR(50) UNIQUE NOT NULL, -- Unique Hospital Identification
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    blood_group_id INT,
    phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'India',
    
    -- Emergency Contact
    emergency_contact_name VARCHAR(100),
    emergency_contact_relation VARCHAR(50),
    emergency_contact_phone VARCHAR(20),
    
    -- Medical Information
    allergies TEXT,
    chronic_conditions TEXT,
    current_medications TEXT,
    medical_history TEXT,
    
    -- Insurance Information
    insurance_provider_id INT,
    insurance_number VARCHAR(100),
    insurance_expiry_date DATE,
    
    -- System Fields
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    registered_by INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (blood_group_id) REFERENCES blood_groups(blood_group_id),
    FOREIGN KEY (insurance_provider_id) REFERENCES insurance_providers(provider_id),
    FOREIGN KEY (registered_by) REFERENCES users(user_id)
);

-- Patient Visits/Appointments
CREATE TABLE patient_visits (
    visit_id INT PRIMARY KEY AUTO_INCREMENT,
    visit_number VARCHAR(50) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    visit_type ENUM('OPD', 'IPD', 'Emergency', 'Follow-up') NOT NULL,
    visit_date DATE NOT NULL,
    visit_time TIME,
    department_id INT NOT NULL,
    doctor_id INT NOT NULL,
    chief_complaint TEXT,
    priority ENUM('Routine', 'Urgent', 'Emergency', 'STAT') DEFAULT 'Routine',
    status ENUM('Scheduled', 'Waiting', 'In-Progress', 'Completed', 'Cancelled', 'No-Show') DEFAULT 'Scheduled',
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    notes TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (doctor_id) REFERENCES users(user_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Vital Signs
CREATE TABLE vitals (
    vital_id INT PRIMARY KEY AUTO_INCREMENT,
    visit_id INT NOT NULL,
    patient_id INT NOT NULL,
    recorded_by INT NOT NULL,
    recorded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    blood_pressure_systolic INT,
    blood_pressure_diastolic INT,
    temperature DECIMAL(5, 2),
    temperature_unit ENUM('F', 'C') DEFAULT 'F',
    pulse_rate INT,
    respiratory_rate INT,
    oxygen_saturation DECIMAL(5, 2),
    blood_sugar DECIMAL(6, 2),
    weight DECIMAL(6, 2),
    height DECIMAL(5, 2),
    bmi DECIMAL(5, 2),
    pain_scale INT,
    
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (recorded_by) REFERENCES users(user_id)
);

-- Doctor Consultations
CREATE TABLE consultations (
    consultation_id INT PRIMARY KEY AUTO_INCREMENT,
    visit_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    consultation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    symptoms TEXT,
    diagnosis TEXT,
    differential_diagnosis TEXT,
    treatment_plan TEXT,
    advice TEXT,
    follow_up_date DATE,
    follow_up_instructions TEXT,
    
    clinical_notes TEXT,
    
    status ENUM('In-Progress', 'Completed', 'Referred') DEFAULT 'In-Progress',
    referred_to_doctor_id INT,
    referred_to_department_id INT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES users(user_id),
    FOREIGN KEY (referred_to_doctor_id) REFERENCES users(user_id),
    FOREIGN KEY (referred_to_department_id) REFERENCES departments(department_id)
);

-- Prescriptions
CREATE TABLE prescriptions (
    prescription_id INT PRIMARY KEY AUTO_INCREMENT,
    consultation_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    prescription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Active', 'Completed', 'Discontinued') DEFAULT 'Active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (consultation_id) REFERENCES consultations(consultation_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES users(user_id)
);

-- Prescription Details
CREATE TABLE prescription_details (
    detail_id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id INT NOT NULL,
    medication_id INT NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    duration VARCHAR(100),
    quantity INT,
    route VARCHAR(50),
    instructions TEXT,
    start_date DATE,
    end_date DATE,
    
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id),
    FOREIGN KEY (medication_id) REFERENCES medications(medication_id)
);

-- Laboratory Test Orders
CREATE TABLE lab_orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    visit_id INT,
    consultation_id INT,
    ordered_by INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    priority ENUM('Routine', 'Urgent', 'STAT') DEFAULT 'Routine',
    clinical_notes TEXT,
    status ENUM('Pending', 'Sample Collected', 'In Process', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (consultation_id) REFERENCES consultations(consultation_id),
    FOREIGN KEY (ordered_by) REFERENCES users(user_id)
);

-- Laboratory Test Order Details
CREATE TABLE lab_order_details (
    detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    test_id INT NOT NULL,
    status ENUM('Pending', 'Sample Collected', 'Processing', 'Completed', 'Rejected') DEFAULT 'Pending',
    sample_collected_by INT,
    sample_collected_date TIMESTAMP,
    processed_by INT,
    processed_date TIMESTAMP,
    verified_by INT,
    verified_date TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES lab_orders(order_id),
    FOREIGN KEY (test_id) REFERENCES test_master(test_id),
    FOREIGN KEY (sample_collected_by) REFERENCES users(user_id),
    FOREIGN KEY (processed_by) REFERENCES users(user_id),
    FOREIGN KEY (verified_by) REFERENCES users(user_id)
);

-- Laboratory Test Results
CREATE TABLE lab_results (
    result_id INT PRIMARY KEY AUTO_INCREMENT,
    order_detail_id INT NOT NULL,
    test_id INT NOT NULL,
    patient_id INT NOT NULL,
    result_value TEXT,
    result_unit VARCHAR(50),
    normal_range VARCHAR(100),
    abnormal_flag ENUM('Normal', 'High', 'Low', 'Critical') DEFAULT 'Normal',
    findings TEXT,
    interpretation TEXT,
    recommendations TEXT,
    result_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    technician_id INT,
    pathologist_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_detail_id) REFERENCES lab_order_details(detail_id),
    FOREIGN KEY (test_id) REFERENCES test_master(test_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (technician_id) REFERENCES users(user_id),
    FOREIGN KEY (pathologist_id) REFERENCES users(user_id)
);

-- Nursing Care Plans
CREATE TABLE nursing_care_plans (
    care_plan_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    visit_id INT NOT NULL,
    nurse_id INT NOT NULL,
    care_date DATE NOT NULL,
    assessment TEXT,
    diagnosis TEXT,
    goals TEXT,
    interventions TEXT,
    evaluation TEXT,
    status ENUM('Active', 'Completed', 'Discontinued') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (nurse_id) REFERENCES users(user_id)
);

-- Medication Administration Records
CREATE TABLE medication_administration (
    administration_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    visit_id INT NOT NULL,
    prescription_detail_id INT NOT NULL,
    medication_id INT NOT NULL,
    administered_by INT NOT NULL,
    scheduled_time TIMESTAMP,
    administered_time TIMESTAMP,
    dosage VARCHAR(100),
    route VARCHAR(50),
    site VARCHAR(100),
    status ENUM('Scheduled', 'Administered', 'Missed', 'Refused', 'Held') DEFAULT 'Scheduled',
    reason_if_not_given TEXT,
    patient_response TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (prescription_detail_id) REFERENCES prescription_details(detail_id),
    FOREIGN KEY (medication_id) REFERENCES medications(medication_id),
    FOREIGN KEY (administered_by) REFERENCES users(user_id)
);

-- Nursing Notes
CREATE TABLE nursing_notes (
    note_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    visit_id INT NOT NULL,
    nurse_id INT NOT NULL,
    note_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note_category ENUM('General', 'Assessment', 'Intervention', 'Response', 'Incident', 'Discharge') DEFAULT 'General',
    priority ENUM('Routine', 'Important', 'Urgent') DEFAULT 'Routine',
    note_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (nurse_id) REFERENCES users(user_id)
);

-- Bed Assignments
CREATE TABLE bed_assignments (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    visit_id INT NOT NULL,
    bed_id INT NOT NULL,
    admission_date TIMESTAMP NOT NULL,
    discharge_date TIMESTAMP,
    assigned_by INT NOT NULL,
    status ENUM('Active', 'Discharged', 'Transferred') DEFAULT 'Active',
    transfer_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (bed_id) REFERENCES beds(bed_id),
    FOREIGN KEY (assigned_by) REFERENCES users(user_id)
);

-- Billing/Invoice
CREATE TABLE invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    visit_id INT,
    invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    invoice_type ENUM('OPD', 'IPD', 'Emergency', 'Pharmacy', 'Laboratory', 'Other') NOT NULL,
    
    subtotal DECIMAL(12, 2) DEFAULT 0.00,
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    discount_amount DECIMAL(12, 2) DEFAULT 0.00,
    tax_percentage DECIMAL(5, 2) DEFAULT 0.00,
    tax_amount DECIMAL(12, 2) DEFAULT 0.00,
    total_amount DECIMAL(12, 2) DEFAULT 0.00,
    
    payment_status ENUM('Pending', 'Partial', 'Paid', 'Cancelled', 'Refunded') DEFAULT 'Pending',
    payment_method ENUM('Cash', 'Card', 'UPI', 'Net Banking', 'Insurance', 'Cheque', 'Other'),
    
    insurance_provider_id INT,
    insurance_claim_number VARCHAR(100),
    insurance_amount DECIMAL(12, 2) DEFAULT 0.00,
    
    notes TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (visit_id) REFERENCES patient_visits(visit_id),
    FOREIGN KEY (insurance_provider_id) REFERENCES insurance_providers(provider_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Invoice Line Items
CREATE TABLE invoice_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    item_type ENUM('Service', 'Test', 'Medication', 'Bed Charge', 'Consultation', 'Other') NOT NULL,
    reference_id INT, -- Links to services, tests, medications, etc.
    item_name VARCHAR(200) NOT NULL,
    description TEXT,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10, 2) DEFAULT 0.00,
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    tax_percentage DECIMAL(5, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(12, 2) DEFAULT 0.00,
    
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id)
);

-- Payments
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    invoice_id INT NOT NULL,
    patient_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('Cash', 'Card', 'UPI', 'Net Banking', 'Insurance', 'Cheque', 'Other') NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    transaction_reference VARCHAR(100),
    card_last_four VARCHAR(4),
    bank_name VARCHAR(100),
    notes TEXT,
    received_by INT NOT NULL,
    status ENUM('Success', 'Pending', 'Failed', 'Refunded') DEFAULT 'Success',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (received_by) REFERENCES users(user_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX idx_patient_uhid ON patients(patient_uhid);
CREATE INDEX idx_patient_phone ON patients(phone);
CREATE INDEX idx_patient_name ON patients(first_name, last_name);
CREATE INDEX idx_visit_date ON patient_visits(visit_date);
CREATE INDEX idx_visit_patient ON patient_visits(patient_id);
CREATE INDEX idx_visit_doctor ON patient_visits(doctor_id);
CREATE INDEX idx_lab_order_patient ON lab_orders(patient_id);
CREATE INDEX idx_lab_order_date ON lab_orders(order_date);
CREATE INDEX idx_invoice_patient ON invoices(patient_id);
CREATE INDEX idx_invoice_date ON invoices(invoice_date);
CREATE INDEX idx_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_payment_date ON payments(payment_date);
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_employee_id ON users(employee_id);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
