import React, { useState, useEffect } from 'react';

const FolioLogo = () => (
  <div className="flex items-center gap-2">
    <div className="grid grid-cols-3 gap-0.5">
      <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 border-2 border-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 border-2 border-orange-500 rounded-sm"></div>
      <div className="w-2.5 h-2.5 border-2 border-orange-500 rounded-sm"></div>
    </div>
    <span className="text-xl font-bold text-orange-500 tracking-wide" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>FOLIO</span>
  </div>
);

const InputSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-orange-600 mb-3 uppercase tracking-wide">{title}</h3>
    <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">{children}</div>
  </div>
);

const TextField = ({ label, value, onChange, placeholder }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500" 
    />
  </div>
);

const formatDateDisplay = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const DatePicker = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => value ? new Date(value + 'T00:00:00').getFullYear() : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => value ? new Date(value + 'T00:00:00').getMonth() : new Date().getMonth());
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); } 
    else { setViewMonth(viewMonth - 1); }
  };
  
  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); } 
    else { setViewMonth(viewMonth + 1); }
  };
  
  const handleSelectDate = (day) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    onChange(`${viewYear}-${mm}-${dd}`);
    setIsOpen(false);
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = value === dateStr;
      days.push(
        <button key={day} type="button" onClick={() => handleSelectDate(day)}
          className={`w-8 h-8 text-sm rounded hover:bg-orange-100 ${isSelected ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}>
          {day}
        </button>
      );
    }
    return days;
  };
  
  return (
    <div className="mb-3 relative">
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <div className="relative">
        <input type="text" value={value ? formatDateDisplay(value) : ''} readOnly onClick={() => setIsOpen(!isOpen)} placeholder="Select date"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer" />
        {isOpen && (
          <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600">&lt;</button>
              <span className="text-sm font-medium">{months[viewMonth]} {viewYear}</span>
              <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="w-8 h-6 text-xs text-gray-500 flex items-center justify-center">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            <button type="button" onClick={() => setIsOpen(false)} className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700">Close</button>
          </div>
        )}
      </div>
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

const calcDiscounted = (price, discount) => {
  if (!price || !discount) return price;
  return (parseFloat(price) * (1 - parseFloat(discount) / 100)).toFixed(2);
};

const formatCurrency = (val) => {
  if (!val) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
};

const initialProducts = [
  { id: 'buy', name: 'Folio Buy', price: '', unit: '/property/mo', discount: '', enabled: false },
  { id: 'bills', name: 'Folio Bills', price: '', unit: '/property/mo', discount: '', enabled: false },
  { id: 'inventory', name: 'Folio Inventory', price: '', unit: '/property/mo', discount: '', enabled: false },
  { id: 'pay', name: 'Folio Pay', price: '', unit: '/property/mo', discount: '', enabled: false },
];

const initialIntegrations = [
  { id: 'meez', name: 'Meez Recipe Management', price: '', unit: '/property/mo', discount: '', enabled: false },
  { id: 'sage', name: 'Sage Integration', price: '', unit: '/property/mo', discount: '', enabled: false },
];

const initialAdditionalFees = [
  { id: 'admin', name: 'Manager Admin Fee', price: '', unit: '/year', discount: '', enabled: false },
  { id: 'setup', name: 'Property Setup Fee', price: '', unit: '/property', discount: '', enabled: false },
];

const initialMinimumUsage = [
  { id: 'tier1', startMonth: '1', endMonth: '4', amount: '', note: '' },
  { id: 'tier2', startMonth: '5', endMonth: '9', amount: '', note: '' },
  { id: 'tier3', startMonth: '10', endMonth: '12', amount: '', note: '' },
  { id: 'tier4', startMonth: '13', endMonth: '', amount: '', note: '' },
];

export default function App() {
  // Check URL for view state
  const getInitialView = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'preview' ? 'preview' : 'input';
  };

  // Load saved data from localStorage
  const loadSavedData = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(`folio_${key}`);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [view, setView] = useState(getInitialView);
  const [activeTab, setActiveTab] = useState('form');
  const [templates, setTemplates] = useState(() => loadSavedData('templates', []));
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  
  const [customerName, setCustomerName] = useState(() => loadSavedData('customerName', ''));
  const [customerAddress, setCustomerAddress] = useState(() => loadSavedData('customerAddress', ''));
  const [customerAddressLine2, setCustomerAddressLine2] = useState(() => loadSavedData('customerAddressLine2', ''));
  const [customerContact, setCustomerContact] = useState(() => loadSavedData('customerContact', ''));
  const [customerEmail, setCustomerEmail] = useState(() => loadSavedData('customerEmail', ''));
  
  const [billingSame, setBillingSame] = useState(() => loadSavedData('billingSame', false));
  const [billingBillTo, setBillingBillTo] = useState(() => loadSavedData('billingBillTo', ''));
  const [billingAddress, setBillingAddress] = useState(() => loadSavedData('billingAddress', ''));
  const [billingAddressLine2, setBillingAddressLine2] = useState(() => loadSavedData('billingAddressLine2', ''));
  const [billingEmail, setBillingEmail] = useState(() => loadSavedData('billingEmail', ''));
  
  const [quoteDate, setQuoteDate] = useState(() => loadSavedData('quoteDate', new Date().toISOString().split('T')[0]));
  const [expiryDate, setExpiryDate] = useState(() => loadSavedData('expiryDate', ''));
  const [startDate, setStartDate] = useState(() => loadSavedData('startDate', ''));
  const [initialTerm, setInitialTerm] = useState(() => loadSavedData('initialTerm', '12 months'));
  const [renewalTerm, setRenewalTerm] = useState(() => loadSavedData('renewalTerm', '1 year'));
  const [paymentTerms, setPaymentTerms] = useState(() => loadSavedData('paymentTerms', 'Net 30'));
  const [billingFrequency, setBillingFrequency] = useState(() => loadSavedData('billingFrequency', 'Monthly'));
  
  const [planName, setPlanName] = useState(() => loadSavedData('planName', ''));
  const [planDescription, setPlanDescription] = useState(() => loadSavedData('planDescription', ''));
  
  const [products, setProducts] = useState(() => loadSavedData('products', initialProducts));
  const [integrations, setIntegrations] = useState(() => loadSavedData('integrations', initialIntegrations));
  const [additionalFees, setAdditionalFees] = useState(() => loadSavedData('additionalFees', initialAdditionalFees));
  const [customIntegrations, setCustomIntegrations] = useState(() => loadSavedData('customIntegrations', []));
  const [customFees, setCustomFees] = useState(() => loadSavedData('customFees', []));
  const [minimumUsage, setMinimumUsage] = useState(() => loadSavedData('minimumUsage', initialMinimumUsage));

  // Save to localStorage whenever values change
  useEffect(() => {
    const saveData = (key, value) => {
      try {
        localStorage.setItem(`folio_${key}`, JSON.stringify(value));
      } catch (e) {
        console.warn('Could not save to localStorage:', e);
      }
    };

    saveData('customerName', customerName);
    saveData('customerAddress', customerAddress);
    saveData('customerAddressLine2', customerAddressLine2);
    saveData('customerContact', customerContact);
    saveData('customerEmail', customerEmail);
    saveData('billingSame', billingSame);
    saveData('billingBillTo', billingBillTo);
    saveData('billingAddress', billingAddress);
    saveData('billingAddressLine2', billingAddressLine2);
    saveData('billingEmail', billingEmail);
    saveData('quoteDate', quoteDate);
    saveData('expiryDate', expiryDate);
    saveData('startDate', startDate);
    saveData('initialTerm', initialTerm);
    saveData('renewalTerm', renewalTerm);
    saveData('paymentTerms', paymentTerms);
    saveData('billingFrequency', billingFrequency);
    saveData('planName', planName);
    saveData('planDescription', planDescription);
    saveData('products', products);
    saveData('integrations', integrations);
    saveData('additionalFees', additionalFees);
    saveData('customIntegrations', customIntegrations);
    saveData('customFees', customFees);
    saveData('minimumUsage', minimumUsage);
    saveData('templates', templates);
  }, [customerName, customerAddress, customerAddressLine2, customerContact, customerEmail,
      billingSame, billingBillTo, billingAddress, billingAddressLine2, billingEmail,
      quoteDate, expiryDate, startDate, initialTerm, renewalTerm, paymentTerms, billingFrequency,
      planName, planDescription, products, integrations, additionalFees, customIntegrations, customFees, minimumUsage, templates]);

  // Update URL when view changes
  const changeView = (newView) => {
    setView(newView);
    const url = new URL(window.location);
    if (newView === 'preview') {
      url.searchParams.set('view', 'preview');
    } else {
      url.searchParams.delete('view');
    }
    window.history.pushState({}, '', url);
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      // Clear localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('folio_')) {
          localStorage.removeItem(key);
        }
      });
      
      // Reset all state
      setCustomerName('');
      setCustomerAddress('');
      setCustomerAddressLine2('');
      setCustomerContact('');
      setCustomerEmail('');
      setBillingSame(false);
      setBillingBillTo('');
      setBillingAddress('');
      setBillingAddressLine2('');
      setBillingEmail('');
      setQuoteDate(new Date().toISOString().split('T')[0]);
      setExpiryDate('');
      setStartDate('');
      setInitialTerm('12 months');
      setRenewalTerm('1 year');
      setPaymentTerms('Net 30');
      setBillingFrequency('Monthly');
      setPlanName('');
      setPlanDescription('');
      setProducts(initialProducts);
      setIntegrations(initialIntegrations);
      setAdditionalFees(initialAdditionalFees);
      setCustomIntegrations([]);
      setCustomFees([]);
      setMinimumUsage(initialMinimumUsage);
    }
  };

  // Save current form as template (pricing & terms only, not customer info)
  const saveAsTemplate = () => {
    if (!newTemplateName.trim()) return;
    
    const template = {
      id: `template-${Date.now()}`,
      name: newTemplateName.trim(),
      createdAt: new Date().toISOString(),
      data: {
        initialTerm,
        renewalTerm,
        paymentTerms,
        billingFrequency,
        planName,
        planDescription,
        products,
        integrations,
        additionalFees,
        customIntegrations,
        customFees,
        minimumUsage,
      }
    };
    
    setTemplates(prev => [...prev, template]);
    setNewTemplateName('');
    setShowTemplateModal(false);
  };

  // Load a template and switch to form
  const loadTemplate = (template) => {
    const { data } = template;
    setInitialTerm(data.initialTerm);
    setRenewalTerm(data.renewalTerm);
    setPaymentTerms(data.paymentTerms);
    setBillingFrequency(data.billingFrequency);
    setPlanName(data.planName);
    setPlanDescription(data.planDescription);
    setProducts(data.products);
    setIntegrations(data.integrations);
    setAdditionalFees(data.additionalFees);
    setCustomIntegrations(data.customIntegrations);
    setCustomFees(data.customFees);
    setMinimumUsage(data.minimumUsage);
    setActiveTab('form');
  };

  // Delete a template
  const deleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    }
  };

  // Clone/Duplicate - keep pricing, clear customer info
  const cloneAsNewForm = () => {
    // Clear customer info
    setCustomerName('');
    setCustomerAddress('');
    setCustomerAddressLine2('');
    setCustomerContact('');
    setCustomerEmail('');
    setBillingSame(false);
    setBillingBillTo('');
    setBillingAddress('');
    setBillingAddressLine2('');
    setBillingEmail('');
    
    // Reset dates
    setQuoteDate(new Date().toISOString().split('T')[0]);
    setExpiryDate('');
    setStartDate('');
    
    // Keep everything else (pricing, products, terms, etc.)
    // Switch to input view
    changeView('input');
  };

  const handleBillingSameAsCustomer = (checked) => {
    setBillingSame(checked);
    if (checked) {
      setBillingBillTo(customerContact);
      setBillingAddress(customerAddress);
      setBillingAddressLine2(customerAddressLine2);
      setBillingEmail(customerEmail);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getTierLabel = (tier) => {
    if (tier.endMonth) return `Months ${tier.startMonth}-${tier.endMonth}`;
    return `Months ${tier.startMonth}+`;
  };

  const renderInputForm = () => (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <FolioLogo />
        <h1 className="text-xl font-semibold text-gray-800">Order Form Generator</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'form'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Order Form
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'templates'
              ? 'border-orange-500 text-orange-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Template Library {templates.length > 0 && `(${templates.length})`}
        </button>
      </div>

      {activeTab === 'templates' ? (
        // Template Library Tab
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Saved Templates</h2>
          </div>
          
          {templates.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-300 p-8 text-center">
              <p className="text-gray-500 mb-4">No templates saved yet.</p>
              <p className="text-sm text-gray-400">Create a template by filling out the order form and clicking "Save as Template".</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {templates.map(template => (
                <div key={template.id} className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{template.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Created {new Date(template.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {template.data.products.filter(p => p.enabled).map(p => (
                          <span key={p.id} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">{p.name}</span>
                        ))}
                        {template.data.integrations.filter(p => p.enabled).map(p => (
                          <span key={p.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{p.name}</span>
                        ))}
                        {template.data.customIntegrations.filter(p => p.name).map(p => (
                          <span key={p.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{p.name}</span>
                        ))}
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        <span>{template.data.planName || 'No plan name'}</span>
                        {template.data.planDescription && <span> • {template.data.planDescription}</span>}
                        <span> • {template.data.initialTerm} initial</span>
                        <span> • {template.data.paymentTerms}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button type="button" onClick={() => loadTemplate(template)}
                        className="px-3 py-1.5 text-sm text-white bg-orange-500 rounded hover:bg-orange-600">
                        Use Template
                      </button>
                      <button type="button" onClick={() => deleteTemplate(template.id)}
                        className="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Order Form Tab
        <>
          <div className="flex items-center justify-end gap-3 mb-4">
            <button type="button" onClick={() => setShowTemplateModal(true)}
              className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50">
              Save as Template
            </button>
            <button type="button" onClick={clearAllData}
              className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50">
              Clear All
            </button>
          </div>

          {/* Save Template Modal */}
          {showTemplateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">Save as Template</h2>
                <p className="text-sm text-gray-600 mb-4">This will save your current pricing, products, and terms. Customer information will not be saved.</p>
                <input
                  type="text"
                  value={newTemplateName}
                  onChange={e => setNewTemplateName(e.target.value)}
                  placeholder="Template name (e.g., Pilot Package)"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => { setShowTemplateModal(false); setNewTemplateName(''); }}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="button" onClick={saveAsTemplate}
                    className="px-4 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600">
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          )}

      <div className="grid grid-cols-2 gap-6">
        <InputSection title="Customer Information">
          <TextField label="Customer Name" value={customerName} onChange={setCustomerName} placeholder="Company name" />
          <TextField label="Address Line 1" value={customerAddress} onChange={setCustomerAddress} placeholder="Street address" />
          <TextField label="Address Line 2" value={customerAddressLine2} onChange={setCustomerAddressLine2} placeholder="City, State ZIP" />
          <TextField label="Contact Name" value={customerContact} onChange={setCustomerContact} placeholder="Primary contact" />
          <TextField label="Contact Email" value={customerEmail} onChange={setCustomerEmail} placeholder="email@company.com" />
        </InputSection>

        <InputSection title="Billing Information">
          <label className="flex items-center gap-2 mb-3 text-sm">
            <input type="checkbox" checked={billingSame} onChange={e => handleBillingSameAsCustomer(e.target.checked)} className="w-4 h-4 text-orange-500 rounded" />
            Same as customer
          </label>
          <TextField label="Bill To" value={billingBillTo} onChange={setBillingBillTo} placeholder="Billing contact" />
          <TextField label="Billing Address" value={billingAddress} onChange={setBillingAddress} placeholder="Street address" />
          <TextField label="Address Line 2" value={billingAddressLine2} onChange={setBillingAddressLine2} placeholder="City, State ZIP" />
          <TextField label="Invoice Email" value={billingEmail} onChange={setBillingEmail} placeholder="billing@company.com" />
        </InputSection>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InputSection title="Quote Details">
          <DatePicker label="Quote Date" value={quoteDate} onChange={setQuoteDate} />
          <DatePicker label="Quote Expiry" value={expiryDate} onChange={setExpiryDate} />
        </InputSection>

        <InputSection title="Contract Terms">
          <DatePicker label="Start Date" value={startDate} onChange={setStartDate} />
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Initial Term" value={initialTerm} onChange={setInitialTerm} placeholder="12 months" />
            <TextField label="Renewal Term" value={renewalTerm} onChange={setRenewalTerm} placeholder="1 year" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Payment Terms</label>
              <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option>Net 15</option><option>Net 30</option><option>Net 45</option><option>Net 60</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Billing Frequency</label>
              <select value={billingFrequency} onChange={e => setBillingFrequency(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option>Monthly</option><option>Quarterly</option><option>Annually</option>
              </select>
            </div>
          </div>
        </InputSection>
      </div>

      <InputSection title="Package Details">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Plan Name" value={planName} onChange={setPlanName} placeholder="e.g., F&B Bundle, Enterprise Plan" />
          <TextField label="Plan Description" value={planDescription} onChange={setPlanDescription} placeholder="e.g., Pilot Package, Full Access" />
        </div>
      </InputSection>

      <InputSection title="Product Fees">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase mb-2 pb-2 border-b">
          <div className="col-span-1"></div>
          <div className="col-span-3">Product</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-2">Discount</div>
          <div className="col-span-2">Final Price</div>
          <div className="col-span-1"></div>
        </div>
        {products.map(item => (
          <div key={item.id} className={`grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-100 ${!item.enabled ? 'opacity-50' : ''}`}>
            <div className="col-span-1">
              <input type="checkbox" checked={item.enabled} 
                onChange={e => setProducts(prev => prev.map(p => p.id === item.id ? {...p, enabled: e.target.checked} : p))}
                className="w-4 h-4 text-orange-500 rounded" />
            </div>
            <div className="col-span-3"><span className="text-sm font-medium">{item.name}</span></div>
            <div className="col-span-3">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-1">$</span>
                <input type="text" inputMode="decimal" value={item.price} placeholder="0.00"
                  onChange={e => setProducts(prev => prev.map(p => p.id === item.id ? {...p, price: e.target.value} : p))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1 whitespace-nowrap">{item.unit}</span>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input type="text" inputMode="decimal" value={item.discount} placeholder="0"
                  onChange={e => setProducts(prev => prev.map(p => p.id === item.id ? {...p, discount: e.target.value} : p))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1">%</span>
              </div>
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {item.price && item.discount ? formatCurrency(calcDiscounted(item.price, item.discount)) : '—'}
            </div>
            <div className="col-span-1"></div>
          </div>
        ))}
      </InputSection>

      <InputSection title="Integrations">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase mb-2 pb-2 border-b">
          <div className="col-span-1"></div>
          <div className="col-span-3">Integration</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-2">Discount</div>
          <div className="col-span-2">Final Price</div>
          <div className="col-span-1"></div>
        </div>
        {integrations.map(item => (
          <div key={item.id} className={`grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-100 ${!item.enabled ? 'opacity-50' : ''}`}>
            <div className="col-span-1">
              <input type="checkbox" checked={item.enabled}
                onChange={e => setIntegrations(prev => prev.map(p => p.id === item.id ? {...p, enabled: e.target.checked} : p))}
                className="w-4 h-4 text-orange-500 rounded" />
            </div>
            <div className="col-span-3"><span className="text-sm font-medium">{item.name}</span></div>
            <div className="col-span-3">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-1">$</span>
                <input type="text" inputMode="decimal" value={item.price} placeholder="0.00"
                  onChange={e => setIntegrations(prev => prev.map(p => p.id === item.id ? {...p, price: e.target.value} : p))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1 whitespace-nowrap">{item.unit}</span>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input type="text" inputMode="decimal" value={item.discount} placeholder="0"
                  onChange={e => setIntegrations(prev => prev.map(p => p.id === item.id ? {...p, discount: e.target.value} : p))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1">%</span>
              </div>
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {item.price && item.discount ? formatCurrency(calcDiscounted(item.price, item.discount)) : '—'}
            </div>
            <div className="col-span-1">
              <button type="button" onClick={() => setIntegrations(prev => prev.filter(p => p.id !== item.id))} 
                className="text-red-500 hover:text-red-700 text-sm">✕</button>
            </div>
          </div>
        ))}
        {customIntegrations.map(item => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-100">
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <input type="text" value={item.name} placeholder="Name"
                onChange={e => setCustomIntegrations(prev => prev.map(p => p.id === item.id ? {...p, name: e.target.value} : p))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-3">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-1">$</span>
                <input type="text" inputMode="decimal" value={item.price} placeholder="0.00"
                  onChange={e => setCustomIntegrations(prev => prev.map(p => p.id === item.id ? {...p, price: e.target.value} : p))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
                <select value={item.unit} onChange={e => setCustomIntegrations(prev => prev.map(p => p.id === item.id ? {...p, unit: e.target.value} : p))}
                  className="ml-1 px-1 py-1 text-xs border border-gray-300 rounded">
                  <option value="/property/mo">/prop/mo</option>
                  <option value="/year">/year</option>
                  <option value="/property">/property</option>
                  <option value="/mo">/mo</option>
                  <option value=" (one-time)">One-time fee</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input type="text" inputMode="decimal" value={item.discount} placeholder="0"
                  onChange={e => setCustomIntegrations(prev => prev.map(p => p.id === item.id ? {...p, discount: e.target.value} : p))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1">%</span>
              </div>
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {item.price && item.discount ? formatCurrency(calcDiscounted(item.price, item.discount)) : '—'}
            </div>
            <div className="col-span-1">
              <button type="button" onClick={() => setCustomIntegrations(prev => prev.filter(p => p.id !== item.id))}
                className="text-red-500 hover:text-red-700 text-sm">✕</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setCustomIntegrations(prev => [...prev, { id: `custom-${Date.now()}`, name: '', price: '', unit: '/property/mo', discount: '' }])} 
          className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium">+ Add Custom Integration</button>
      </InputSection>

      <InputSection title="Additional Fees">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase mb-2 pb-2 border-b">
          <div className="col-span-1"></div>
          <div className="col-span-3">Fee</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-2">Discount</div>
          <div className="col-span-2">Final Price</div>
          <div className="col-span-1"></div>
        </div>
        {additionalFees.map(item => (
          <div key={item.id} className={`grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-100 ${!item.enabled ? 'opacity-50' : ''}`}>
            <div className="col-span-1">
              <input type="checkbox" checked={item.enabled}
                onChange={e => setAdditionalFees(prev => prev.map(p => p.id === item.id ? {...p, enabled: e.target.checked} : p))}
                className="w-4 h-4 text-orange-500 rounded" />
            </div>
            <div className="col-span-3"><span className="text-sm font-medium">{item.name}</span></div>
            <div className="col-span-3">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-1">$</span>
                <input type="text" inputMode="decimal" value={item.price} placeholder="0.00"
                  onChange={e => setAdditionalFees(prev => prev.map(p => p.id === item.id ? {...p, price: e.target.value} : p))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1 whitespace-nowrap">{item.unit}</span>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input type="text" inputMode="decimal" value={item.discount} placeholder="0"
                  onChange={e => setAdditionalFees(prev => prev.map(p => p.id === item.id ? {...p, discount: e.target.value} : p))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1">%</span>
              </div>
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {item.price && item.discount ? formatCurrency(calcDiscounted(item.price, item.discount)) : '—'}
            </div>
            <div className="col-span-1"></div>
          </div>
        ))}
        {customFees.map(item => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-100">
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <input type="text" value={item.name} placeholder="Name"
                onChange={e => setCustomFees(prev => prev.map(p => p.id === item.id ? {...p, name: e.target.value} : p))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-3">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-1">$</span>
                <input type="text" inputMode="decimal" value={item.price} placeholder="0.00"
                  onChange={e => setCustomFees(prev => prev.map(p => p.id === item.id ? {...p, price: e.target.value} : p))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
                <select value={item.unit} onChange={e => setCustomFees(prev => prev.map(p => p.id === item.id ? {...p, unit: e.target.value} : p))}
                  className="ml-1 px-1 py-1 text-xs border border-gray-300 rounded">
                  <option value="/property/mo">/prop/mo</option>
                  <option value="/year">/year</option>
                  <option value="/property">/property</option>
                  <option value="/mo">/mo</option>
                  <option value=" (one-time)">One-time fee</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input type="text" inputMode="decimal" value={item.discount} placeholder="0"
                  onChange={e => setCustomFees(prev => prev.map(p => p.id === item.id ? {...p, discount: e.target.value} : p))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded" />
                <span className="text-gray-500 text-xs ml-1">%</span>
              </div>
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {item.price && item.discount ? formatCurrency(calcDiscounted(item.price, item.discount)) : '—'}
            </div>
            <div className="col-span-1">
              <button type="button" onClick={() => setCustomFees(prev => prev.filter(p => p.id !== item.id))}
                className="text-red-500 hover:text-red-700 text-sm">✕</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setCustomFees(prev => [...prev, { id: `custom-fee-${Date.now()}`, name: '', price: '', unit: '/year', discount: '' }])}
          className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium">+ Add Custom Fee</button>
      </InputSection>

      <InputSection title="Minimum Usage Tiers">
        <p className="text-xs text-gray-500 mb-3">Define minimum monthly commitments by time period</p>
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase mb-2 pb-2 border-b">
          <div className="col-span-2">Start Month</div>
          <div className="col-span-2">End Month</div>
          <div className="col-span-3">Amount</div>
          <div className="col-span-4">Note</div>
          <div className="col-span-1"></div>
        </div>
        {minimumUsage.map(tier => (
          <div key={tier.id} className="grid grid-cols-12 gap-2 mb-2 items-center">
            <div className="col-span-2">
              <input type="text" inputMode="numeric" value={tier.startMonth} placeholder="1"
                onChange={e => setMinimumUsage(prev => prev.map(t => t.id === tier.id ? {...t, startMonth: e.target.value} : t))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-2">
              <input type="text" inputMode="numeric" value={tier.endMonth} placeholder="∞"
                onChange={e => setMinimumUsage(prev => prev.map(t => t.id === tier.id ? {...t, endMonth: e.target.value} : t))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-3 flex items-center">
              <span className="text-gray-400 text-sm mr-1">$</span>
              <input type="text" inputMode="decimal" value={tier.amount} placeholder="0.00"
                onChange={e => setMinimumUsage(prev => prev.map(t => t.id === tier.id ? {...t, amount: e.target.value} : t))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
              <span className="text-gray-500 text-xs ml-1">/mo</span>
            </div>
            <div className="col-span-4">
              <input type="text" value={tier.note} placeholder="e.g., assumes 3 properties"
                onChange={e => setMinimumUsage(prev => prev.map(t => t.id === tier.id ? {...t, note: e.target.value} : t))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-1">
              <button type="button" onClick={() => setMinimumUsage(prev => prev.filter(t => t.id !== tier.id))}
                className="text-red-500 hover:text-red-700 text-sm">✕</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setMinimumUsage(prev => [...prev, { id: `tier-${Date.now()}`, startMonth: '', endMonth: '', amount: '', note: '' }])}
          className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium">+ Add Tier</button>
      </InputSection>

      <div className="flex justify-center mt-8">
        <button type="button" onClick={() => changeView('preview')}
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
          Generate Order Form
        </button>
      </div>
      </>
      )}
    </div>
  );

  const renderPreview = () => {
    const enabledProducts = products.filter(p => p.enabled);
    const enabledIntegrations = [...integrations.filter(p => p.enabled), ...customIntegrations.filter(p => p.name)];
    const enabledFees = [...additionalFees.filter(p => p.enabled), ...customFees.filter(p => p.name)];
    const activeTiers = minimumUsage.filter(t => t.amount && t.startMonth);

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto p-8">
          <button type="button" onClick={() => changeView('input')} className="mb-4 text-sm text-orange-600 hover:text-orange-700 font-medium print:hidden">
            ← Back to Editor
          </button>
          
          <button type="button" onClick={cloneAsNewForm} className="mb-4 ml-4 text-sm text-blue-600 hover:text-blue-700 font-medium print:hidden">
            Clone for New Customer
          </button>

          <div className="flex justify-between items-start mb-8 pb-4 border-b-2 border-gray-100">
            <FolioLogo />
            <div className="text-right text-sm text-gray-600">
              <p className="font-medium">Folio Services, Inc.</p>
              <p>3600 North Duke St</p>
              <p>Suite 1 #1197</p>
              <p>Durham, NC 27704</p>
              <p>1-855-943-2285</p>
            </div>
          </div>

          <h1 className="text-3xl font-light text-center text-gray-800 mb-2">Folio Order Form</h1>
          <p className="text-center text-sm text-gray-500 mb-8">
            Quote date: {formatDate(quoteDate)} | <span className="underline">Quote expiry:</span> {formatDate(expiryDate)}
          </p>

          <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
            <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Customer Information</h2>
            <div className="px-4 py-3 space-y-2">
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Customer:</span><span className="col-span-2">{customerName}</span></div>
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Address:</span><span className="col-span-2">{customerAddress}<br/>{customerAddressLine2}</span></div>
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Contact name:</span><span className="col-span-2">{customerContact}</span></div>
              <div className="grid grid-cols-3 text-sm py-2"><span className="font-medium">Contact email:</span><span className="col-span-2">{customerEmail}</span></div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
            <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Billing Contact Information</h2>
            <div className="px-4 py-3 space-y-2">
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Bill To:</span><span className="col-span-2">{billingBillTo}</span></div>
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Billing Address:</span><span className="col-span-2">{billingAddress}<br/>{billingAddressLine2}</span></div>
              <div className="grid grid-cols-3 text-sm py-2"><span className="font-medium">Invoice Email:</span><span className="col-span-2">{billingEmail}</span></div>
            </div>
          </div>

          {(planName || planDescription) && (
            <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Package</h2>
              <div className="px-4 py-3 space-y-2">
                <div className="grid grid-cols-3 text-sm py-2"><span className="font-medium">Plan:</span><span className="col-span-2 font-semibold">{planName}<br/><span className="font-normal text-gray-600">{planDescription}</span></span></div>
              </div>
            </div>
          )}

          <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
            <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Contract Terms</h2>
            <div className="px-4 py-3 space-y-2">
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Start Date:</span><span className="col-span-2">{formatDate(startDate)}</span></div>
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Initial Contract Term:</span><span className="col-span-2">{initialTerm}</span></div>
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Renewal Contract Term:</span><span className="col-span-2">{renewalTerm}</span></div>
              <div className="grid grid-cols-3 text-sm border-b border-gray-200 py-2"><span className="font-medium">Payment Terms:</span><span className="col-span-2">{paymentTerms}</span></div>
              <div className="grid grid-cols-3 text-sm py-2"><span className="font-medium">Billing Frequency:</span><span className="col-span-2">{billingFrequency}</span></div>
            </div>
          </div>

          {enabledProducts.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Product Fees</h2>
              <div className="px-4 py-3">
                {enabledProducts.map(p => (
                  <div key={p.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-200">
                    <span className="font-medium">{p.name}:</span>
                    <span className="col-span-2">
                      {p.discount ? (
                        <>{formatCurrency(calcDiscounted(p.price, p.discount))}{p.unit} <span className="line-through text-gray-400">{formatCurrency(p.price)}{p.unit}</span> <span className="text-green-600 font-medium">{p.discount}% discount</span></>
                      ) : (<>{formatCurrency(p.price)}{p.unit}</>)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {enabledIntegrations.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Integrations</h2>
              <div className="px-4 py-3">
                {enabledIntegrations.map(p => (
                  <div key={p.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-200">
                    <span className="font-medium">{p.name}:</span>
                    <span className="col-span-2">
                      {p.discount ? (
                        <>{formatCurrency(calcDiscounted(p.price, p.discount))}{p.unit} <span className="line-through text-gray-400">{formatCurrency(p.price)}{p.unit}</span> <span className="text-green-600 font-medium">{p.discount}% discount</span></>
                      ) : (<>{formatCurrency(p.price)}{p.unit}</>)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {enabledFees.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Additional Fees</h2>
              <div className="px-4 py-3">
                {enabledFees.map(p => (
                  <div key={p.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-200">
                    <span className="font-medium">{p.name}:</span>
                    <span className="col-span-2">
                      {p.discount ? (
                        <>{formatCurrency(calcDiscounted(p.price, p.discount))}{p.unit} <span className="line-through text-gray-400">{formatCurrency(p.price)}{p.unit}</span> <span className="text-green-600 font-medium">{p.discount}% discount</span></>
                      ) : (<>{formatCurrency(p.price)}{p.unit}</>)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTiers.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Minimum Usage</h2>
              <div className="px-4 py-3">
                {activeTiers.map(t => (
                  <div key={t.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-200">
                    <span className="font-medium">{getTierLabel(t)}:</span>
                    <span className="font-semibold">{formatCurrency(t.amount)}/mo</span>
                    <span className="text-gray-500">{t.note && `(${t.note})`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-8">
              This Order Form is entered into by and between Folio Services, Inc. ("Folio") and the Customer identified herein ("Customer") pursuant to, and is governed by the terms of the Master Services Terms and Conditions.
            </p>
            <p className="text-sm text-gray-600 mb-8">
              The above contract terms are accepted and agreed to as of the date of last signature by an authorized signatory of each party:
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <div className="border-b border-gray-400 mb-2 h-12"></div>
                <p className="text-sm"><span className="font-medium">Name:</span> Kate Adamson</p>
                <p className="text-sm"><span className="font-medium">Company:</span> Folio Services, Inc.</p>
                <p className="text-sm"><span className="font-medium">Title:</span> Co-founder & CEO</p>
              </div>
              <div>
                <div className="border-b border-gray-400 mb-2 h-12"></div>
                <p className="text-sm"><span className="font-medium">Name:</span></p>
                <p className="text-sm"><span className="font-medium">Company:</span> {customerName}</p>
                <p className="text-sm"><span className="font-medium">Title:</span></p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4 print:hidden">
            <button type="button" onClick={() => window.print()} className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
              Print / Save as PDF
            </button>
          </div>

          {/* Exhibit 1: Description of Services */}
          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <h1 className="text-2xl font-light text-center text-gray-800 mb-8">Exhibit 1: Description of Services</h1>
            
            {enabledProducts.some(p => p.id === 'buy') && (
              <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
                <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Buy Capabilities</h2>
                <div className="px-4 py-3">
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Shop:</span>
                    <span className="col-span-3">Folio allows users to browse and compare products from a curated set of approved suppliers, and then add to a unified Folio cart.</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Approve:</span>
                    <span className="col-span-3">Folio supports a streamlined approval workflow based on a set of predetermined rules. If applicable to an order, Approvers receive notice by email before orders submitted by Folio.</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Budget:</span>
                    <span className="col-span-3">Folio supports budget import and checkbook visibility at checkout.</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3">
                    <span className="font-medium">Order:</span>
                    <span className="col-span-3">Folio places an order with Supplier or sends PO to supplier for goods purchased on the platform. When available, Buyers can access order status from approval to delivery, and use Folio to record order receipt.</span>
                  </div>
                </div>
              </div>
            )}

            {enabledProducts.some(p => p.id === 'bills') && (
              <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
                <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Bills Capabilities</h2>
                <div className="px-4 py-3">
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Transcribe:</span>
                    <span className="col-span-3">Folio digitizes invoices forwarded to bills@folio.co and maps them to the correct Folio Store</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Match:</span>
                    <span className="col-span-3">Folio compares the invoices to Orders placed on platform, if applicable; Folio assigns status such as Matched if Match is found; Match is considered auto-approved; Folio also assigns status as Approved or Needs Review</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Review:</span>
                    <span className="col-span-3">Payers can expediently process invoices, and triage exceptions using Folio</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3">
                    <span className="font-medium">Transmit:</span>
                    <span className="col-span-3">Payers can expediently process invoices, and triage exceptions using Folio; Folio can transmit the invoices to HIA in real-time</span>
                  </div>
                </div>
              </div>
            )}

            {enabledProducts.some(p => p.id === 'inventory') && (
              <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
                <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Inventory Capabilities</h2>
                <div className="px-4 py-3">
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Count:</span>
                    <span className="col-span-3">Folio enables users to conduct inventory counts with customizable count sheets and mobile-friendly interfaces.</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Track:</span>
                    <span className="col-span-3">Folio tracks inventory levels, usage patterns, and provides visibility into stock across locations.</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3">
                    <span className="font-medium">Report:</span>
                    <span className="col-span-3">Folio generates inventory reports including valuation, variance analysis, and usage trends.</span>
                  </div>
                </div>
              </div>
            )}

            {enabledProducts.some(p => p.id === 'pay') && (
              <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
                <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Pay Capabilities</h2>
                <div className="px-4 py-3">
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Balance:</span>
                    <span className="col-span-3">Payers can fund an account with Patriot Bank, N.A. and access current balances</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3 border-b border-gray-200">
                    <span className="font-medium">Disburse:</span>
                    <span className="col-span-3">Payers can use Folio to issue payment via ACH, check, or Folio Commercial Prepaid Mastercard, depending on the supplier. The Folio Commercial Prepaid Mastercard is issued by Patriot Bank, N.A., Member FDIC, pursuant to a license from Mastercard International.</span>
                  </div>
                  <div className="grid grid-cols-4 text-sm py-3">
                    <span className="font-medium">Earn:</span>
                    <span className="col-span-3">Customer can earn rewards back on select supplier payments; Rewards accrue per Folio Commercial Prepaid Mastercard® payment and, if eligible for rewards, are paid out to funding account monthly</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Exhibit 2: Master Terms */}
          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <h1 className="text-2xl font-light text-center text-gray-800 mb-8">Exhibit 2: Master Terms</h1>
            <p className="text-sm text-gray-600 text-center">
              Folio's Master Terms can be found at <a href="https://folio.co/terms" className="text-orange-600 underline">https://folio.co/terms</a>.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return view === 'input' ? renderInputForm() : renderPreview();
}
