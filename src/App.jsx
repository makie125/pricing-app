import React, { useState } from 'react';

const FolioLogo = () => (
  <div className="flex items-center gap-2">
    <div className="grid grid-cols-2 gap-0.5">
      <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
      <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
      <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
      <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
    </div>
    <span className="text-xl font-bold text-orange-500">FOLIO</span>
  </div>
);

const initialProducts = [
  { id: 'buy', name: 'Folio Buy', price: '', unit: '/property/mo', discount: '', enabled: false },
  { id: 'bills', name: 'Folio Bills', price: '', unit: '/property/mo', discount: '', enabled: false },
  { id: 'inventory', name: 'Folio Inventory', price: '', unit: '/property/mo', discount: '', enabled: false },
  { id: 'pay', name: 'Folio Pay', price: '', unit: '/property/mo', discount: '', enabled: false },
];

const initialIntegrations = [
  { id: 'meez', name: 'Meez Recipe Management', price: '', unit: '/property/mo', discount: '', enabled: false, removable: false },
  { id: 'sage', name: 'Sage Integration', price: '', unit: '/property/mo', discount: '', enabled: false, removable: false },
];

const initialAdditionalFees = [
  { id: 'admin', name: 'Manager Admin Fee', price: '', unit: '/year', discount: '', enabled: false },
  { id: 'setup', name: 'Property Setup Fee', price: '', unit: '/property', discount: '', enabled: false, note: '' },
];

const initialMinimumUsage = [
  { id: 'tier1', startMonth: '1', endMonth: '4', amount: '', note: '' },
  { id: 'tier2', startMonth: '5', endMonth: '9', amount: '', note: '' },
  { id: 'tier3', startMonth: '10', endMonth: '12', amount: '', note: '' },
  { id: 'tier4', startMonth: '13', endMonth: '', amount: '', note: '' },
];

export default function App() {
  const [view, setView] = useState('input');
  const [customer, setCustomer] = useState({ name: '', address: '', addressLine2: '', contact: '', email: '' });
  const [billing, setBilling] = useState({ billTo: '', address: '', addressLine2: '', contact: '', email: '', sameAsCustomer: false });
  const [quoteDate, setQuoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState('');
  const [contract, setContract] = useState({ startDate: '', initialTerm: '12 months', renewalTerm: '1 year', paymentTerms: 'Net 30', billingFrequency: 'Monthly' });
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [additionalFees, setAdditionalFees] = useState(initialAdditionalFees);
  const [minimumUsage, setMinimumUsage] = useState(initialMinimumUsage);
  const [customIntegrations, setCustomIntegrations] = useState([]);
  const [customFees, setCustomFees] = useState([]);

  const handleBillingSameAsCustomer = (checked) => {
    setBilling(prev => ({
      ...prev,
      sameAsCustomer: checked,
      billTo: checked ? customer.contact : prev.billTo,
      address: checked ? customer.address : prev.address,
      addressLine2: checked ? customer.addressLine2 : prev.addressLine2,
      contact: checked ? customer.name : prev.contact,
      email: checked ? customer.email : prev.email,
    }));
  };

  const updateProduct = (id, field, value, list, setList) => {
    setList(list.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addCustomIntegration = () => {
    const newId = `custom-${Date.now()}`;
    setCustomIntegrations([...customIntegrations, { id: newId, name: '', price: '', unit: '/property/mo', discount: '', enabled: true }]);
  };

  const removeCustomIntegration = (id) => {
    setCustomIntegrations(customIntegrations.filter(i => i.id !== id));
  };

  const removeIntegration = (id) => {
    setIntegrations(integrations.filter(i => i.id !== id));
  };

  const addCustomFee = () => {
    const newId = `custom-fee-${Date.now()}`;
    setCustomFees([...customFees, { id: newId, name: '', price: '', unit: '/year', discount: '', enabled: true }]);
  };

  const removeCustomFee = (id) => {
    setCustomFees(customFees.filter(i => i.id !== id));
  };

  const updateMinimumUsage = (id, field, value) => {
    setMinimumUsage(prev => prev.map(t => t.id === id ? {...t, [field]: value} : t));
  };

  const addMinimumUsageTier = () => {
    const newId = `tier-${Date.now()}`;
    setMinimumUsage([...minimumUsage, { id: newId, startMonth: '', endMonth: '', amount: '', note: '' }]);
  };

  const removeMinimumUsageTier = (id) => {
    setMinimumUsage(minimumUsage.filter(t => t.id !== id));
  };

  const getTierLabel = (tier) => {
    if (tier.endMonth) return `Months ${tier.startMonth}-${tier.endMonth}`;
    return `Months ${tier.startMonth}+`;
  };

  const calcDiscounted = (price, discount) => {
    if (!price || !discount) return price;
    return (parseFloat(price) * (1 - parseFloat(discount) / 100)).toFixed(2);
  };

  const formatCurrency = (val) => {
    if (!val) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const InputSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-orange-600 mb-3 uppercase tracking-wide">{title}</h3>
      <div className="bg-white rounded-lg border border-gray-200 p-4">{children}</div>
    </div>
  );

  const TextField = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500" />
    </div>
  );

  const DatePicker = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(() => {
      if (value) return new Date(value + 'T00:00:00');
      return new Date();
    });
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    
    const handlePrevMonth = (e) => {
      e.stopPropagation();
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };
    
    const handleNextMonth = (e) => {
      e.stopPropagation();
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };
    
    const handleSelectDate = (day) => {
      const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const yyyy = selected.getFullYear();
      const mm = String(selected.getMonth() + 1).padStart(2, '0');
      const dd = String(selected.getDate()).padStart(2, '0');
      onChange(`${yyyy}-${mm}-${dd}`);
      setIsOpen(false);
    };
    
    const renderCalendar = () => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);
      const days = [];
      
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
    
    const displayValue = value ? formatDate(value) : '';
    
    return (
      <div className="mb-3 relative">
        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
        <div className="relative">
          <input type="text" value={displayValue} readOnly onClick={() => setIsOpen(!isOpen)} placeholder="Select date"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer" />
          {isOpen && (
            <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-2">
                <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600">&lt;</button>
                <span className="text-sm font-medium">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
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

  const ProductRow = ({ item, list, setList, showRemove, onRemove, isCustom }) => (
    <div className={`grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-100 ${!item.enabled && !isCustom ? 'opacity-50' : ''}`}>
      <div className="col-span-1">
        {!isCustom && (
          <input type="checkbox" checked={item.enabled} onChange={e => updateProduct(item.id, 'enabled', e.target.checked, list, setList)}
            className="w-4 h-4 text-orange-500 rounded" />
        )}
      </div>
      <div className="col-span-3">
        {isCustom ? (
          <input type="text" value={item.name} onChange={e => updateProduct(item.id, 'name', e.target.value, list, setList)}
            placeholder="Name" className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
        ) : (
          <span className="text-sm font-medium">{item.name}</span>
        )}
      </div>
      <div className="col-span-3">
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-1">$</span>
          <input type="number" value={item.price} onChange={e => updateProduct(item.id, 'price', e.target.value, list, setList)}
            placeholder="0.00" className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
          {isCustom ? (
            <select value={item.unit} onChange={e => updateProduct(item.id, 'unit', e.target.value, list, setList)}
              className="ml-1 px-1 py-1 text-xs border border-gray-300 rounded">
              <option value="/property/mo">/prop/mo</option>
              <option value="/year">/year</option>
              <option value="/property">/property</option>
              <option value="/mo">/mo</option>
            </select>
          ) : (
            <span className="text-gray-500 text-xs ml-1 whitespace-nowrap">{item.unit}</span>
          )}
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center">
          <input type="number" value={item.discount} onChange={e => updateProduct(item.id, 'discount', e.target.value, list, setList)}
            placeholder="0" className="w-16 px-2 py-1 text-sm border border-gray-300 rounded" />
          <span className="text-gray-500 text-xs ml-1">%</span>
        </div>
      </div>
      <div className="col-span-2 text-sm text-gray-600">
        {item.price && item.discount ? formatCurrency(calcDiscounted(item.price, item.discount)) : '—'}
      </div>
      <div className="col-span-1">
        {(showRemove || item.removable !== false) && onRemove && (
          <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 text-sm">✕</button>
        )}
      </div>
    </div>
  );

  const renderInputForm = () => (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <FolioLogo />
        <h1 className="text-xl font-semibold text-gray-800">Order Form Generator</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InputSection title="Customer Information">
          <TextField label="Customer Name" value={customer.name} onChange={v => setCustomer({...customer, name: v})} placeholder="Company name" />
          <TextField label="Address Line 1" value={customer.address} onChange={v => setCustomer({...customer, address: v})} placeholder="Street address" />
          <TextField label="Address Line 2" value={customer.addressLine2} onChange={v => setCustomer({...customer, addressLine2: v})} placeholder="City, State ZIP" />
          <TextField label="Contact Name" value={customer.contact} onChange={v => setCustomer({...customer, contact: v})} placeholder="Primary contact" />
          <TextField label="Contact Email" value={customer.email} onChange={v => setCustomer({...customer, email: v})} placeholder="email@company.com" />
        </InputSection>

        <InputSection title="Billing Information">
          <label className="flex items-center gap-2 mb-3 text-sm">
            <input type="checkbox" checked={billing.sameAsCustomer} onChange={e => handleBillingSameAsCustomer(e.target.checked)} className="w-4 h-4 text-orange-500 rounded" />
            Same as customer
          </label>
          <TextField label="Bill To" value={billing.billTo} onChange={v => setBilling({...billing, billTo: v})} placeholder="Billing contact" />
          <TextField label="Billing Address" value={billing.address} onChange={v => setBilling({...billing, address: v})} placeholder="Street address" />
          <TextField label="Address Line 2" value={billing.addressLine2} onChange={v => setBilling({...billing, addressLine2: v})} placeholder="City, State ZIP" />
          <TextField label="Invoice Email" value={billing.email} onChange={v => setBilling({...billing, email: v})} placeholder="billing@company.com" />
        </InputSection>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InputSection title="Quote Details">
          <DatePicker label="Quote Date" value={quoteDate} onChange={setQuoteDate} />
          <DatePicker label="Quote Expiry" value={expiryDate} onChange={setExpiryDate} />
        </InputSection>

        <InputSection title="Contract Terms">
          <DatePicker label="Start Date" value={contract.startDate} onChange={v => setContract({...contract, startDate: v})} />
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Initial Term" value={contract.initialTerm} onChange={v => setContract({...contract, initialTerm: v})} placeholder="12 months" />
            <TextField label="Renewal Term" value={contract.renewalTerm} onChange={v => setContract({...contract, renewalTerm: v})} placeholder="1 year" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Payment Terms</label>
              <select value={contract.paymentTerms} onChange={e => setContract({...contract, paymentTerms: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option>Net 15</option><option>Net 30</option><option>Net 45</option><option>Net 60</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Billing Frequency</label>
              <select value={contract.billingFrequency} onChange={e => setContract({...contract, billingFrequency: e.target.value})}
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
        </div>
        {products.map(p => <ProductRow key={p.id} item={p} list={products} setList={setProducts} />)}
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
        {integrations.map(p => <ProductRow key={p.id} item={p} list={integrations} setList={setIntegrations} onRemove={p.removable !== false ? () => removeIntegration(p.id) : null} />)}
        {customIntegrations.map(p => (
          <ProductRow key={p.id} item={p} list={customIntegrations} setList={setCustomIntegrations} isCustom showRemove onRemove={() => removeCustomIntegration(p.id)} />
        ))}
        <button type="button" onClick={addCustomIntegration} className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium">+ Add Custom Integration</button>
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
        {additionalFees.map(p => <ProductRow key={p.id} item={p} list={additionalFees} setList={setAdditionalFees} />)}
        {customFees.map(p => (
          <ProductRow key={p.id} item={p} list={customFees} setList={setCustomFees} isCustom showRemove onRemove={() => removeCustomFee(p.id)} />
        ))}
        <button type="button" onClick={addCustomFee} className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium">+ Add Custom Fee</button>
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
              <input type="text" inputMode="numeric" value={tier.startMonth} onChange={e => updateMinimumUsage(tier.id, 'startMonth', e.target.value)}
                placeholder="1" className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-2">
              <input type="text" inputMode="numeric" value={tier.endMonth} onChange={e => updateMinimumUsage(tier.id, 'endMonth', e.target.value)}
                placeholder="∞" className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-3 flex items-center">
              <span className="text-gray-400 text-sm mr-1">$</span>
              <input type="text" inputMode="decimal" value={tier.amount} onChange={e => updateMinimumUsage(tier.id, 'amount', e.target.value)}
                placeholder="0.00" className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
              <span className="text-gray-500 text-xs ml-1">/mo</span>
            </div>
            <div className="col-span-4">
              <input type="text" value={tier.note} onChange={e => updateMinimumUsage(tier.id, 'note', e.target.value)}
                placeholder="e.g., assumes 3 properties" className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div className="col-span-1">
              <button type="button" onClick={() => removeMinimumUsageTier(tier.id)} className="text-red-500 hover:text-red-700 text-sm">✕</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addMinimumUsageTier} className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium">+ Add Tier</button>
      </InputSection>

      <div className="flex justify-center mt-8">
        <button onClick={() => setView('preview')}
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
          Generate Order Form
        </button>
      </div>
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
          <button onClick={() => setView('input')} className="mb-4 text-sm text-orange-600 hover:text-orange-700 font-medium print:hidden">
            ← Back to Editor
          </button>

          {/* Header */}
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

          {/* Title */}
          <h1 className="text-3xl font-light text-center text-gray-800 mb-2">Folio Order Form</h1>
          <p className="text-center text-sm text-gray-500 mb-8">
            Quote date: {formatDate(quoteDate)} | <span className="underline">Quote expiry:</span> {formatDate(expiryDate)}
          </p>

          {/* Customer Info */}
          <div className="border-l-4 border-orange-500 mb-6">
            <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Customer Information</h2>
            <div className="px-4 py-3 space-y-2">
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Customer:</span><span className="col-span-2">{customer.name}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Address:</span><span className="col-span-2">{customer.address}<br/>{customer.addressLine2}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Contact name:</span><span className="col-span-2">{customer.contact}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Contact email:</span><span className="col-span-2">{customer.email}</span></div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="border-l-4 border-orange-500 mb-6">
            <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Billing Contact Information</h2>
            <div className="px-4 py-3 space-y-2">
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Bill To:</span><span className="col-span-2">{billing.billTo}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Billing Address:</span><span className="col-span-2">{billing.address}<br/>{billing.addressLine2}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Invoice Email:</span><span className="col-span-2">{billing.email}</span></div>
            </div>
          </div>

          {/* Package */}
          {(planName || planDescription) && (
            <div className="border-l-4 border-orange-500 mb-6">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Package</h2>
              <div className="px-4 py-3 space-y-2">
                {planName && <div className="grid grid-cols-3 text-sm"><span className="font-medium">Plan:</span><span className="col-span-2 font-semibold">{planName}<br/><span className="font-normal text-gray-600">{planDescription}</span></span></div>}
              </div>
            </div>
          )}

          {/* Contract Terms */}
          <div className="border-l-4 border-orange-500 mb-6">
            <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Contract Terms</h2>
            <div className="px-4 py-3 space-y-2">
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Start Date:</span><span className="col-span-2">{formatDate(contract.startDate)}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Initial Contract Term:</span><span className="col-span-2">{contract.initialTerm}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Renewal Contract Term:</span><span className="col-span-2">{contract.renewalTerm}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Payment Terms:</span><span className="col-span-2">{contract.paymentTerms}</span></div>
              <div className="grid grid-cols-3 text-sm"><span className="font-medium">Billing Frequency:</span><span className="col-span-2">{contract.billingFrequency}</span></div>
            </div>
          </div>

          {/* Product Fees */}
          {enabledProducts.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Product Fees</h2>
              <div className="px-4 py-3">
                {enabledProducts.map(p => (
                  <div key={p.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
                    <span className="font-medium">{p.name}:</span>
                    <span className="col-span-2">
                      {p.discount ? (
                        <>
                          {formatCurrency(calcDiscounted(p.price, p.discount))}{p.unit}{' '}
                          <span className="line-through text-gray-400">{formatCurrency(p.price)}{p.unit}</span>{' '}
                          <span className="text-green-600 font-medium">{p.discount}% discount</span>
                        </>
                      ) : (
                        <>{formatCurrency(p.price)}{p.unit}</>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {enabledIntegrations.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Integrations</h2>
              <div className="px-4 py-3">
                {enabledIntegrations.map(p => (
                  <div key={p.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
                    <span className="font-medium">{p.name}:</span>
                    <span className="col-span-2">
                      {p.discount ? (
                        <>
                          {formatCurrency(calcDiscounted(p.price, p.discount))}{p.unit}{' '}
                          <span className="line-through text-gray-400">{formatCurrency(p.price)}{p.unit}</span>{' '}
                          <span className="text-green-600 font-medium">{p.discount}% discount</span>
                        </>
                      ) : (
                        <>{formatCurrency(p.price)}{p.unit}</>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Fees */}
          {enabledFees.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Additional Fees</h2>
              <div className="px-4 py-3">
                {enabledFees.map(p => (
                  <div key={p.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
                    <span className="font-medium">{p.name}:</span>
                    <span className="col-span-2">
                      {p.discount ? (
                        <>
                          {formatCurrency(calcDiscounted(p.price, p.discount))}{p.unit}{' '}
                          <span className="line-through text-gray-400">{formatCurrency(p.price)}{p.unit}</span>{' '}
                          <span className="text-green-600 font-medium">{p.discount}% discount</span>
                        </>
                      ) : (
                        <>{formatCurrency(p.price)}{p.unit}</>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Minimum Usage */}
          {activeTiers.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Minimum Usage</h2>
              <div className="px-4 py-3">
                {activeTiers.map(t => (
                  <div key={t.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
                    <span className="font-medium">{getTierLabel(t)}:</span>
                    <span className="font-semibold">{formatCurrency(t.amount)}/mo</span>
                    <span className="text-gray-500">{t.note && `(${t.note})`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signature Block */}
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
                <p className="text-sm"><span className="font-medium">Company:</span> {customer.name}</p>
                <p className="text-sm"><span className="font-medium">Title:</span></p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center print:hidden">
            <button onClick={() => window.print()} className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    );
  };

  return view === 'input' ? renderInputForm() : renderPreview();
}
