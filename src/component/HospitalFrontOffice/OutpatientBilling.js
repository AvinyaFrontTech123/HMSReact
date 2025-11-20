import React, { useState } from 'react';
import './OutpatientBilling.css';

const OutpatientBilling = ({ patientData }) => {
  const [billingData, setBillingData] = useState({
    patientId: patientData?.patientId || '',
    patientName: patientData ? `${patientData.firstName} ${patientData.lastName}` : '',
    consultationType: '',
    doctorName: '',
    department: '',
    visitDate: new Date().toISOString().split('T')[0],
    services: [],
    discount: 0,
    paymentMethod: '',
    insuranceProvider: '',
    insuranceNumber: '',
    notes: ''
  });

  const [serviceItem, setServiceItem] = useState({
    serviceName: '',
    quantity: 1,
    unitPrice: 0
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Predefined services for quick selection
  const commonServices = [
    { name: 'General Consultation', price: 50 },
    { name: 'Specialist Consultation', price: 100 },
    { name: 'Blood Test', price: 30 },
    { name: 'X-Ray', price: 75 },
    { name: 'ECG', price: 40 },
    { name: 'Ultrasound', price: 120 },
    { name: 'Prescription', price: 15 },
    { name: 'Dressing', price: 25 },
    { name: 'Injection', price: 20 },
    { name: 'IV Drip', price: 60 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceItemChange = (e) => {
    const { name, value } = e.target;
    setServiceItem(prevState => ({
      ...prevState,
      [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) || 0 : value
    }));
  };

  const handleQuickService = (service) => {
    setServiceItem({
      serviceName: service.name,
      quantity: 1,
      unitPrice: service.price
    });
  };

  const addService = () => {
    if (serviceItem.serviceName && serviceItem.unitPrice > 0) {
      const newService = {
        id: Date.now(),
        ...serviceItem,
        total: serviceItem.quantity * serviceItem.unitPrice
      };
      
      setBillingData(prevState => ({
        ...prevState,
        services: [...prevState.services, newService]
      }));

      // Reset service item
      setServiceItem({
        serviceName: '',
        quantity: 1,
        unitPrice: 0
      });
    }
  };

  const removeService = (serviceId) => {
    setBillingData(prevState => ({
      ...prevState,
      services: prevState.services.filter(service => service.id !== serviceId)
    }));
  };

  const calculateSubtotal = () => {
    return billingData.services.reduce((sum, service) => sum + service.total, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * billingData.discount) / 100;
  };

  const calculateTax = () => {
    const subtotalAfterDiscount = calculateSubtotal() - calculateDiscount();
    return subtotalAfterDiscount * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!billingData.patientId.trim()) newErrors.patientId = 'Patient ID is required';
    if (!billingData.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!billingData.consultationType) newErrors.consultationType = 'Consultation type is required';
    if (!billingData.department) newErrors.department = 'Department is required';
    if (billingData.services.length === 0) newErrors.services = 'At least one service is required';
    if (!billingData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const invoice = {
        ...billingData,
        invoiceNumber: `INV${Date.now()}`,
        invoiceDate: new Date().toISOString(),
        subtotal: calculateSubtotal(),
        discountAmount: calculateDiscount(),
        taxAmount: calculateTax(),
        totalAmount: calculateTotal()
      };
      
      console.log('Billing Invoice:', invoice);
      
      setSuccessMessage(`Invoice generated successfully! Invoice #${invoice.invoiceNumber}`);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setBillingData({
          patientId: '',
          patientName: '',
          consultationType: '',
          doctorName: '',
          department: '',
          visitDate: new Date().toISOString().split('T')[0],
          services: [],
          discount: 0,
          paymentMethod: '',
          insuranceProvider: '',
          insuranceNumber: '',
          notes: ''
        });
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="outpatient-billing-container">
      <div className="billing-header">
        <h2>Outpatient Billing</h2>
        <p>Generate bills and invoices for outpatient services</p>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="billing-form">
        {/* Patient Information Section */}
        <div className="form-section">
          <h3>Patient Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientId">Patient ID *</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={billingData.patientId}
                onChange={handleChange}
                className={errors.patientId ? 'error' : ''}
                placeholder="Enter Patient ID"
              />
              {errors.patientId && <span className="error-text">{errors.patientId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="patientName">Patient Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={billingData.patientName}
                onChange={handleChange}
                className={errors.patientName ? 'error' : ''}
                placeholder="Enter Patient Name"
              />
              {errors.patientName && <span className="error-text">{errors.patientName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="visitDate">Visit Date</label>
              <input
                type="date"
                id="visitDate"
                name="visitDate"
                value={billingData.visitDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Visit Details Section */}
        <div className="form-section">
          <h3>Visit Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="consultationType">Consultation Type *</label>
              <select
                id="consultationType"
                name="consultationType"
                value={billingData.consultationType}
                onChange={handleChange}
                className={errors.consultationType ? 'error' : ''}
              >
                <option value="">Select Type</option>
                <option value="general">General Consultation</option>
                <option value="specialist">Specialist Consultation</option>
                <option value="followup">Follow-up Visit</option>
                <option value="emergency">Emergency</option>
              </select>
              {errors.consultationType && <span className="error-text">{errors.consultationType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={billingData.department}
                onChange={handleChange}
                className={errors.department ? 'error' : ''}
              >
                <option value="">Select Department</option>
                <option value="general">General Medicine</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="ent">ENT</option>
                <option value="ophthalmology">Ophthalmology</option>
              </select>
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="doctorName">Doctor Name</label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                value={billingData.doctorName}
                onChange={handleChange}
                placeholder="Attending Physician"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="form-section">
          <h3>Services & Charges</h3>
          
          {/* Quick Service Selection */}
          <div className="quick-services">
            <label>Quick Add Services:</label>
            <div className="service-buttons">
              {commonServices.map((service, index) => (
                <button
                  key={index}
                  type="button"
                  className="quick-service-btn"
                  onClick={() => handleQuickService(service)}
                >
                  {service.name} - ${service.price}
                </button>
              ))}
            </div>
          </div>

          {/* Add Service Form */}
          <div className="add-service-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="serviceName">Service Name</label>
                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  value={serviceItem.serviceName}
                  onChange={handleServiceItemChange}
                  placeholder="Enter service name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={serviceItem.quantity}
                  onChange={handleServiceItemChange}
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="unitPrice">Unit Price ($)</label>
                <input
                  type="number"
                  id="unitPrice"
                  name="unitPrice"
                  value={serviceItem.unitPrice}
                  onChange={handleServiceItemChange}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <button type="button" onClick={addService} className="btn-add-service">
                  Add Service
                </button>
              </div>
            </div>
          </div>

          {/* Services List */}
          {billingData.services.length > 0 && (
            <div className="services-list">
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.services.map((service) => (
                    <tr key={service.id}>
                      <td>{service.serviceName}</td>
                      <td>{service.quantity}</td>
                      <td>${service.unitPrice.toFixed(2)}</td>
                      <td>${service.total.toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="btn-remove"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {errors.services && <span className="error-text">{errors.services}</span>}
        </div>

        {/* Billing Summary */}
        {billingData.services.length > 0 && (
          <div className="form-section billing-summary">
            <h3>Billing Summary</h3>
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span className="amount">${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <div className="discount-input">
                  <label htmlFor="discount">Discount (%):</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={billingData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
                <span className="amount negative">-${calculateDiscount().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax (8%):</span>
                <span className="amount">${calculateTax().toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span className="amount">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Information Section */}
        <div className="form-section">
          <h3>Payment Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method *</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={billingData.paymentMethod}
                onChange={handleChange}
                className={errors.paymentMethod ? 'error' : ''}
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="insurance">Insurance</option>
                <option value="check">Check</option>
                <option value="online">Online Payment</option>
              </select>
              {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="insuranceProvider">Insurance Provider</label>
              <input
                type="text"
                id="insuranceProvider"
                name="insuranceProvider"
                value={billingData.insuranceProvider}
                onChange={handleChange}
                placeholder="Insurance Company Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="insuranceNumber">Insurance Number</label>
              <input
                type="text"
                id="insuranceNumber"
                name="insuranceNumber"
                value={billingData.insuranceNumber}
                onChange={handleChange}
                placeholder="Policy Number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={billingData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Additional notes or comments"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={handlePrintInvoice} className="btn-secondary">
            Print Invoice
          </button>
          <button type="submit" className="btn-primary">
            Generate Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default OutpatientBilling;
