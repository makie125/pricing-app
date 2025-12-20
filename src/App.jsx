import React, { useState } from 'react';

const FolioLogo = ({ size = 'default' }) => {
  const boxSize = size === 'large' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5';
  const textSize = size === 'large' ? 'text-2xl' : 'text-xl';
  const gap = size === 'large' ? 'gap-1' : 'gap-0.5';
  return (
    <div className="flex items-center gap-3">
      <div className={`grid grid-cols-3 ${gap}`}>
        {[1,1,1,1,1,0,1,0,0].map((f, i) => (
          <div key={i} className={`${boxSize} rounded-sm ${f ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'border-2 border-orange-500/50'}`} />
        ))}
      </div>
      <span className={`${textSize} font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent tracking-wide`}>FOLIO</span>
    </div>
  );
};

const ThemeToggle = ({ dark, setDark }) => (
  <button onClick={() => setDark(!dark)} className={`relative w-14 h-7 rounded-full transition-all duration-300 ${dark ? 'bg-white/10' : 'bg-gray-200'}`}>
    <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${dark ? 'left-8 bg-gray-800' : 'left-1 bg-white shadow-md'}`}>
      {dark ? (
        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
      ) : (
        <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
      )}
    </div>
  </button>
);

const Section = ({ title, children, defaultOpen = true, icon, theme }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4">
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between px-5 py-4 backdrop-blur-xl border rounded-2xl transition-all duration-300 group ${theme.card} ${theme.cardHover}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-sm shadow-lg shadow-orange-500/20">{icon}</div>
          <span className={`font-semibold text-sm uppercase tracking-wider ${theme.textSoft}`}>{title}</span>
        </div>
        <svg className={`w-5 h-5 transition-transform duration-300 ${theme.textMuted} ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-out ${open ? 'max-h-[2000px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <div className={`backdrop-blur-xl border rounded-2xl p-5 ${theme.card}`}>{children}</div>
      </div>
    </div>
  );
};

const TextField = ({ label, value, onChange, placeholder, theme }) => (
  <div className="mb-4 group">
    <label className={`block text-xs font-medium mb-2 uppercase tracking-wider group-focus-within:text-orange-400 transition-colors ${theme.textMuted}`}>{label}</label>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${theme.input} ${theme.inputFocus}`} />
  </div>
);

const DatePicker = ({ label, value, onChange, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => value ? new Date(value + 'T00:00:00').getFullYear() : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => value ? new Date(value + 'T00:00:00').getMonth() : new Date().getMonth());
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const formatDisplay = (d) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const getDays = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirst = (y, m) => new Date(y, m, 1).getDay();
  const dark = theme.dark;
  
  const handleSelect = (day) => {
    onChange(`${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    setIsOpen(false);
  };

  return (
    <div className="mb-4 relative group">
      <label className={`block text-xs font-medium mb-2 uppercase tracking-wider ${theme.textMuted}`}>{label}</label>
      <div className="relative">
        <input type="text" value={formatDisplay(value)} readOnly onClick={() => setIsOpen(!isOpen)} placeholder="Select date"
          className={`w-full px-4 py-3 text-sm border rounded-xl cursor-pointer focus:outline-none transition-all ${theme.input} ${theme.inputFocus}`} />
        <svg className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={`absolute z-50 mt-2 backdrop-blur-xl border rounded-2xl shadow-2xl p-4 w-72 ${dark ? 'bg-gray-900/95 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={(e) => { e.stopPropagation(); setViewMonth(viewMonth === 0 ? 11 : viewMonth - 1); if(viewMonth === 0) setViewYear(viewYear - 1); }} className={`p-2 rounded-lg transition-colors ${dark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{months[viewMonth]} {viewYear}</span>
              <button type="button" onClick={(e) => { e.stopPropagation(); setViewMonth(viewMonth === 11 ? 0 : viewMonth + 1); if(viewMonth === 11) setViewYear(viewYear + 1); }} className={`p-2 rounded-lg transition-colors ${dark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className={`w-8 h-8 text-xs flex items-center justify-center ${dark ? 'text-white/30' : 'text-gray-400'}`}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array(getFirst(viewYear, viewMonth)).fill(null).map((_, i) => <div key={`e-${i}`} className="w-8 h-8" />)}
              {Array(getDays(viewYear, viewMonth)).fill(null).map((_, i) => {
                const day = i + 1;
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isSelected = value === dateStr;
                return (
                  <button key={day} type="button" onClick={() => handleSelect(day)}
                    className={`w-8 h-8 text-sm rounded-lg transition-all ${isSelected ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg' : dark ? 'text-white/70 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const calcDiscounted = (p, d) => p && d ? (parseFloat(p) * (1 - parseFloat(d) / 100)).toFixed(2) : p;
const formatCurrency = (v) => v ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v) : '';

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

const initialFees = [
  { id: 'admin', name: 'Manager Admin Fee', price: '', unit: '/year', discount: '', enabled: false },
  { id: 'setup', name: 'Property Setup Fee', price: '', unit: '/property', discount: '', enabled: false },
];

const initialTiers = [
  { id: 'tier1', startMonth: '1', endMonth: '4', amount: '', note: '' },
  { id: 'tier2', startMonth: '5', endMonth: '9', amount: '', note: '' },
  { id: 'tier3', startMonth: '10', endMonth: '12', amount: '', note: '' },
  { id: 'tier4', startMonth: '13', endMonth: '', amount: '', note: '' },
];

const ProductRow = ({ item, onUpdate, showDelete, onDelete, theme }) => {
  const final = item.price && item.discount ? formatCurrency(calcDiscounted(item.price, item.discount)) : null;
  return (
    <div className={`grid grid-cols-12 gap-3 items-center py-3 border-b transition-all duration-300 ${theme.dark ? 'border-white/5' : 'border-gray-100'} ${item.enabled !== undefined && !item.enabled ? 'opacity-40' : ''}`}>
      {item.enabled !== undefined && (
        <div className="col-span-1">
          <input type="checkbox" checked={item.enabled} onChange={e => onUpdate({ ...item, enabled: e.target.checked })}
            className="w-5 h-5 rounded-md bg-white/10 border-white/20 text-orange-500 focus:ring-orange-500/50 cursor-pointer" />
        </div>
      )}
      <div className={item.enabled !== undefined ? "col-span-3" : "col-span-4"}>
        {item.editable ? (
          <input type="text" value={item.name} placeholder="Name" onChange={e => onUpdate({ ...item, name: e.target.value })}
            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-orange-500/50 ${theme.input}`} />
        ) : (
          <span className={`text-sm font-medium ${theme.textSoft}`}>{item.name}</span>
        )}
      </div>
      <div className="col-span-3">
        <div className="flex items-center gap-1">
          <span className={theme.textMuted}>$</span>
          <input type="text" inputMode="decimal" value={item.price} placeholder="0.00" onChange={e => onUpdate({ ...item, price: e.target.value })}
            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-orange-500/50 ${theme.input}`} />
          <span className={`text-xs whitespace-nowrap ${theme.textMuted}`}>{item.unit}</span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-1">
          <input type="text" inputMode="decimal" value={item.discount} placeholder="0" onChange={e => onUpdate({ ...item, discount: e.target.value })}
            className={`w-16 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-orange-500/50 ${theme.input}`} />
          <span className={`text-xs ${theme.textMuted}`}>%</span>
        </div>
      </div>
      <div className="col-span-2 text-sm font-medium">
        {final ? <span className="text-emerald-500">{final}</span> : <span className={theme.textMuted}>—</span>}
      </div>
      <div className="col-span-1">
        {showDelete && <button type="button" onClick={onDelete} className="text-red-400/60 hover:text-red-400 transition-colors">✕</button>}
      </div>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState('input');
  const [activeTab, setActiveTab] = useState('form');
  const [templates, setTemplates] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerAddressLine2, setCustomerAddressLine2] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [billingSame, setBillingSame] = useState(false);
  const [billingBillTo, setBillingBillTo] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingAddressLine2, setBillingAddressLine2] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [quoteDate, setQuoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [initialTerm, setInitialTerm] = useState('12 months');
  const [renewalTerm, setRenewalTerm] = useState('1 year');
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [billingFrequency, setBillingFrequency] = useState('Monthly');
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [additionalFees, setAdditionalFees] = useState(initialFees);
  const [customIntegrations, setCustomIntegrations] = useState([]);
  const [customFees, setCustomFees] = useState([]);
  const [minimumUsage, setMinimumUsage] = useState(initialTiers);

  const t = darkMode ? {
    dark: true,
    bg: 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950',
    glow: 'from-orange-500/10',
    header: 'bg-gray-950/80 border-white/5',
    text: 'text-white', textMuted: 'text-white/40', textSoft: 'text-white/70',
    card: 'bg-white/5 border-white/10', cardHover: 'hover:bg-white/10',
    input: 'bg-white/5 border-white/10 text-white placeholder-white/20',
    inputFocus: 'focus:border-orange-500/50 focus:ring-orange-500/20',
    select: 'bg-gray-900',
  } : {
    dark: false,
    bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    glow: 'from-orange-500/5',
    header: 'bg-white/80 border-gray-200',
    text: 'text-gray-900', textMuted: 'text-gray-400', textSoft: 'text-gray-600',
    card: 'bg-white border-gray-200 shadow-sm', cardHover: 'hover:shadow-md',
    input: 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400',
    inputFocus: 'focus:border-orange-500 focus:ring-orange-500/20',
    select: 'bg-white',
  };

  const handleBillingSame = (checked) => {
    setBillingSame(checked);
    if (checked) {
      setBillingBillTo(customerContact);
      setBillingAddress(customerAddress);
      setBillingAddressLine2(customerAddressLine2);
      setBillingEmail(customerEmail);
    }
  };

  const clearAll = () => {
    if (window.confirm('Clear all form data?')) {
      setCustomerName(''); setCustomerAddress(''); setCustomerAddressLine2(''); setCustomerContact(''); setCustomerEmail('');
      setBillingSame(false); setBillingBillTo(''); setBillingAddress(''); setBillingAddressLine2(''); setBillingEmail('');
      setQuoteDate(new Date().toISOString().split('T')[0]); setExpiryDate(''); setStartDate('');
      setInitialTerm('12 months'); setRenewalTerm('1 year'); setPaymentTerms('Net 30'); setBillingFrequency('Monthly');
      setPlanName(''); setPlanDescription('');
      setProducts(initialProducts); setIntegrations(initialIntegrations); setAdditionalFees(initialFees);
      setCustomIntegrations([]); setCustomFees([]); setMinimumUsage(initialTiers);
    }
  };

  const saveTemplate = () => {
    if (!newTemplateName.trim()) return;
    setTemplates(prev => [...prev, {
      id: `t-${Date.now()}`, name: newTemplateName.trim(), createdAt: new Date().toISOString(),
      data: { initialTerm, renewalTerm, paymentTerms, billingFrequency, planName, planDescription, products, integrations, additionalFees, customIntegrations, customFees, minimumUsage }
    }]);
    setNewTemplateName(''); setShowTemplateModal(false);
  };

  const loadTemplate = (tmpl) => {
    const d = tmpl.data;
    setInitialTerm(d.initialTerm); setRenewalTerm(d.renewalTerm); setPaymentTerms(d.paymentTerms);
    setBillingFrequency(d.billingFrequency); setPlanName(d.planName); setPlanDescription(d.planDescription);
    setProducts(d.products); setIntegrations(d.integrations); setAdditionalFees(d.additionalFees);
    setCustomIntegrations(d.customIntegrations); setCustomFees(d.customFees); setMinimumUsage(d.minimumUsage);
    setActiveTab('form');
  };

  const formatDate = (d) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  if (view === 'preview') {
    const enabledProducts = products.filter(p => p.enabled);
    const enabledIntegrations = [...integrations.filter(p => p.enabled), ...customIntegrations.filter(p => p.name)];
    const enabledFees = [...additionalFees.filter(p => p.enabled), ...customFees.filter(p => p.name)];

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto p-8">
          <button onClick={() => setView('input')} className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Editor
          </button>
          
          <div className="flex justify-between items-start mb-8 pb-4 border-b-2 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-3 gap-0.5">
                {[1,1,1,1,1,0,1,0,0].map((f, i) => <div key={i} className={`w-2.5 h-2.5 rounded-sm ${f ? 'bg-orange-500' : 'border-2 border-orange-500'}`} />)}
              </div>
              <span className="text-xl font-bold text-orange-500">FOLIO</span>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p className="font-medium">Folio Services, Inc.</p>
              <p>3600 North Duke St, Suite 1 #1197</p>
              <p>Durham, NC 27704</p>
            </div>
          </div>

          <h1 className="text-3xl font-light text-center text-gray-800 mb-2">Folio Order Form</h1>
          <p className="text-center text-sm text-gray-500 mb-8">Quote date: {formatDate(quoteDate)} | Quote expiry: {formatDate(expiryDate)}</p>

          {[
            { title: 'Customer Information', rows: [['Customer:', customerName], ['Address:', `${customerAddress} ${customerAddressLine2}`], ['Contact:', customerContact], ['Email:', customerEmail]] },
            { title: 'Billing Information', rows: [['Bill To:', billingBillTo], ['Address:', `${billingAddress} ${billingAddressLine2}`], ['Email:', billingEmail]] },
            { title: 'Contract Terms', rows: [['Start Date:', formatDate(startDate)], ['Initial Term:', initialTerm], ['Renewal Term:', renewalTerm], ['Payment Terms:', paymentTerms], ['Billing:', billingFrequency]] },
          ].map(section => (
            <div key={section.title} className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">{section.title}</h2>
              <div className="px-4 py-3">
                {section.rows.map(([label, val]) => (
                  <div key={label} className="grid grid-cols-3 text-sm border-b border-gray-100 py-2">
                    <span className="font-medium">{label}</span>
                    <span className="col-span-2">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {enabledProducts.length > 0 && (
            <div className="border-l-4 border-orange-500 mb-6 border border-gray-300 rounded">
              <h2 className="text-sm font-semibold text-orange-600 uppercase px-4 py-2 bg-gray-50">Product Fees</h2>
              <div className="px-4 py-3">
                {enabledProducts.map(p => (
                  <div key={p.id} className="grid grid-cols-3 text-sm py-2 border-b border-gray-100">
                    <span className="font-medium">{p.name}:</span>
                    <span className="col-span-2">
                      {p.discount ? <>{formatCurrency(calcDiscounted(p.price, p.discount))}{p.unit} <span className="line-through text-gray-400">{formatCurrency(p.price)}</span> <span className="text-green-600">{p.discount}% off</span></> : <>{formatCurrency(p.price)}{p.unit}</>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button onClick={() => window.print()} className="px-8 py-3 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${t.bg} transition-colors duration-500`}>
      <div className={`fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${t.glow} via-transparent to-transparent pointer-events-none`} />
      
      <div className={`sticky top-0 z-30 backdrop-blur-xl border-b ${t.header} transition-colors duration-500`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <FolioLogo size="large" />
          <div className="flex items-center gap-4">
            <h1 className={`text-sm font-medium ${t.textMuted} uppercase tracking-widest hidden sm:block`}>Order Form Generator</h1>
            <ThemeToggle dark={darkMode} setDark={setDarkMode} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 relative">
        <div className={`flex gap-2 p-1.5 backdrop-blur rounded-2xl mb-8 w-fit border ${t.card}`}>
          {['form', 'templates'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25' : t.textMuted + ' hover:' + t.textSoft}`}>
              {tab === 'form' ? 'Order Form' : 'Templates'}
              {tab === 'templates' && templates.length > 0 && <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">{templates.length}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'templates' ? (
          <div className="space-y-4">
            {templates.length === 0 ? (
              <div className={`backdrop-blur-xl border rounded-3xl p-12 text-center ${t.card}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className={`text-lg font-semibold ${t.text} mb-2`}>No templates yet</h3>
                <p className={`${t.textMuted} mb-6`}>Save your pricing configurations for quick reuse</p>
                <button onClick={() => setActiveTab('form')} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-medium shadow-lg">
                  Create Your First Template
                </button>
              </div>
            ) : (
              templates.map(tmpl => (
                <div key={tmpl.id} className={`backdrop-blur-xl border rounded-2xl p-6 ${t.card} ${t.cardHover} transition-all`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-semibold ${t.text}`}>{tmpl.name}</h3>
                      <p className={`text-sm ${t.textMuted} mt-1`}>Created {new Date(tmpl.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => loadTemplate(tmpl)} className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-medium text-sm shadow-lg">Use Template</button>
                      <button onClick={() => setTemplates(prev => prev.filter(x => x.id !== tmpl.id))} className={`px-4 py-2.5 ${t.textMuted} hover:text-red-400 rounded-xl transition-all`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-end gap-3 mb-6">
              <button onClick={() => setShowTemplateModal(true)} className={`px-4 py-2.5 text-sm font-medium border rounded-xl ${t.card} ${t.textSoft} ${t.cardHover} transition-all flex items-center gap-2`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                Save as Template
              </button>
              <button onClick={clearAll} className={`px-4 py-2.5 text-sm font-medium border rounded-xl ${t.card} text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Clear All
              </button>
            </div>

            {showTemplateModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className={`border rounded-3xl p-6 w-96 shadow-2xl ${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'}`}>
                  <h2 className={`text-xl font-bold ${t.text} mb-2`}>Save as Template</h2>
                  <p className={`text-sm ${t.textMuted} mb-5`}>Save pricing config for reuse</p>
                  <input type="text" value={newTemplateName} onChange={e => setNewTemplateName(e.target.value)} placeholder="Template name"
                    className={`w-full px-4 py-3 text-sm border rounded-xl mb-5 focus:outline-none ${t.input} ${t.inputFocus}`} />
                  <div className="flex justify-end gap-3">
                    <button onClick={() => { setShowTemplateModal(false); setNewTemplateName(''); }} className={`px-5 py-2.5 text-sm font-medium rounded-xl ${t.card} ${t.textSoft}`}>Cancel</button>
                    <button onClick={saveTemplate} className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg">Save</button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <Section title="Customer Information" icon="👤" theme={t}>
                <TextField label="Customer Name" value={customerName} onChange={setCustomerName} placeholder="Company name" theme={t} />
                <TextField label="Address Line 1" value={customerAddress} onChange={setCustomerAddress} placeholder="Street address" theme={t} />
                <TextField label="Address Line 2" value={customerAddressLine2} onChange={setCustomerAddressLine2} placeholder="City, State ZIP" theme={t} />
                <TextField label="Contact Name" value={customerContact} onChange={setCustomerContact} placeholder="Primary contact" theme={t} />
                <TextField label="Contact Email" value={customerEmail} onChange={setCustomerEmail} placeholder="email@company.com" theme={t} />
              </Section>

              <Section title="Billing Information" icon="💳" theme={t}>
                <label className="flex items-center gap-3 mb-4 cursor-pointer group">
                  <input type="checkbox" checked={billingSame} onChange={e => handleBillingSame(e.target.checked)} className="w-5 h-5 rounded-md text-orange-500" />
                  <span className={`text-sm ${t.textMuted} group-hover:text-orange-400 transition-colors`}>Same as customer</span>
                </label>
                <TextField label="Bill To" value={billingBillTo} onChange={setBillingBillTo} placeholder="Billing contact" theme={t} />
                <TextField label="Billing Address" value={billingAddress} onChange={setBillingAddress} placeholder="Street address" theme={t} />
                <TextField label="Address Line 2" value={billingAddressLine2} onChange={setBillingAddressLine2} placeholder="City, State ZIP" theme={t} />
                <TextField label="Invoice Email" value={billingEmail} onChange={setBillingEmail} placeholder="billing@company.com" theme={t} />
              </Section>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Section title="Quote Details" icon="📅" theme={t}>
                <DatePicker label="Quote Date" value={quoteDate} onChange={setQuoteDate} theme={t} />
                <DatePicker label="Quote Expiry" value={expiryDate} onChange={setExpiryDate} theme={t} />
              </Section>

              <Section title="Contract Terms" icon="📝" theme={t}>
                <DatePicker label="Start Date" value={startDate} onChange={setStartDate} theme={t} />
                <div className="grid grid-cols-2 gap-3">
                  <TextField label="Initial Term" value={initialTerm} onChange={setInitialTerm} placeholder="12 months" theme={t} />
                  <TextField label="Renewal Term" value={renewalTerm} onChange={setRenewalTerm} placeholder="1 year" theme={t} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="mb-4">
                    <label className={`block text-xs font-medium mb-2 uppercase tracking-wider ${t.textMuted}`}>Payment Terms</label>
                    <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none cursor-pointer ${t.input}`}>
                      {['Net 15', 'Net 30', 'Net 45', 'Net 60'].map(o => <option key={o} value={o} className={t.select}>{o}</option>)}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className={`block text-xs font-medium mb-2 uppercase tracking-wider ${t.textMuted}`}>Billing Frequency</label>
                    <select value={billingFrequency} onChange={e => setBillingFrequency(e.target.value)} className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none cursor-pointer ${t.input}`}>
                      {['Monthly', 'Quarterly', 'Annually'].map(o => <option key={o} value={o} className={t.select}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </Section>
            </div>

            <Section title="Package Details" icon="📦" theme={t}>
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Plan Name" value={planName} onChange={setPlanName} placeholder="e.g., F&B Bundle" theme={t} />
                <TextField label="Plan Description" value={planDescription} onChange={setPlanDescription} placeholder="e.g., Full Access" theme={t} />
              </div>
            </Section>

            <Section title="Product Fees" icon="🏷️" theme={t}>
              <div className={`grid grid-cols-12 gap-3 text-xs font-medium uppercase tracking-wider mb-3 pb-3 border-b ${darkMode ? 'text-white/30 border-white/10' : 'text-gray-400 border-gray-200'}`}>
                <div className="col-span-1"></div><div className="col-span-3">Product</div><div className="col-span-3">Price</div><div className="col-span-2">Discount</div><div className="col-span-2">Final</div><div className="col-span-1"></div>
              </div>
              {products.map(item => <ProductRow key={item.id} item={item} theme={t} onUpdate={u => setProducts(prev => prev.map(p => p.id === item.id ? u : p))} />)}
            </Section>

            <Section title="Integrations" icon="🔗" theme={t}>
              <div className={`grid grid-cols-12 gap-3 text-xs font-medium uppercase tracking-wider mb-3 pb-3 border-b ${darkMode ? 'text-white/30 border-white/10' : 'text-gray-400 border-gray-200'}`}>
                <div className="col-span-1"></div><div className="col-span-3">Integration</div><div className="col-span-3">Price</div><div className="col-span-2">Discount</div><div className="col-span-2">Final</div><div className="col-span-1"></div>
              </div>
              {integrations.map(item => <ProductRow key={item.id} item={item} theme={t} onUpdate={u => setIntegrations(prev => prev.map(p => p.id === item.id ? u : p))} />)}
              {customIntegrations.map(item => <ProductRow key={item.id} item={{...item, editable: true}} theme={t} showDelete onUpdate={u => setCustomIntegrations(prev => prev.map(p => p.id === item.id ? u : p))} onDelete={() => setCustomIntegrations(prev => prev.filter(p => p.id !== item.id))} />)}
              <button onClick={() => setCustomIntegrations(prev => [...prev, { id: `ci-${Date.now()}`, name: '', price: '', unit: '/property/mo', discount: '' }])} className="mt-4 text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Custom Integration
              </button>
            </Section>

            <Section title="Additional Fees" icon="💰" theme={t}>
              <div className={`grid grid-cols-12 gap-3 text-xs font-medium uppercase tracking-wider mb-3 pb-3 border-b ${darkMode ? 'text-white/30 border-white/10' : 'text-gray-400 border-gray-200'}`}>
                <div className="col-span-1"></div><div className="col-span-3">Fee</div><div className="col-span-3">Price</div><div className="col-span-2">Discount</div><div className="col-span-2">Final</div><div className="col-span-1"></div>
              </div>
              {additionalFees.map(item => <ProductRow key={item.id} item={item} theme={t} onUpdate={u => setAdditionalFees(prev => prev.map(p => p.id === item.id ? u : p))} />)}
              {customFees.map(item => <ProductRow key={item.id} item={{...item, editable: true}} theme={t} showDelete onUpdate={u => setCustomFees(prev => prev.map(p => p.id === item.id ? u : p))} onDelete={() => setCustomFees(prev => prev.filter(p => p.id !== item.id))} />)}
              <button onClick={() => setCustomFees(prev => [...prev, { id: `cf-${Date.now()}`, name: '', price: '', unit: '/year', discount: '' }])} className="mt-4 text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Custom Fee
              </button>
            </Section>

            <Section title="Minimum Usage Tiers" icon="📊" theme={t}>
              <p className={`text-xs ${t.textMuted} mb-4`}>Define minimum monthly commitments by time period</p>
              <div className={`grid grid-cols-12 gap-3 text-xs font-medium uppercase tracking-wider mb-3 pb-3 border-b ${darkMode ? 'text-white/30 border-white/10' : 'text-gray-400 border-gray-200'}`}>
                <div className="col-span-2">Start</div><div className="col-span-2">End</div><div className="col-span-3">Amount</div><div className="col-span-4">Note</div><div className="col-span-1"></div>
              </div>
              {minimumUsage.map(tier => (
                <div key={tier.id} className={`grid grid-cols-12 gap-3 items-center py-2 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
                  <div className="col-span-2">
                    <input type="text" value={tier.startMonth} placeholder="1" onChange={e => setMinimumUsage(prev => prev.map(x => x.id === tier.id ? {...x, startMonth: e.target.value} : x))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none ${t.input}`} />
                  </div>
                  <div className="col-span-2">
                    <input type="text" value={tier.endMonth} placeholder="∞" onChange={e => setMinimumUsage(prev => prev.map(x => x.id === tier.id ? {...x, endMonth: e.target.value} : x))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none ${t.input}`} />
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <span className={t.textMuted}>$</span>
                    <input type="text" value={tier.amount} placeholder="0.00" onChange={e => setMinimumUsage(prev => prev.map(x => x.id === tier.id ? {...x, amount: e.target.value} : x))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none ${t.input}`} />
                    <span className={`text-xs ${t.textMuted}`}>/mo</span>
                  </div>
                  <div className="col-span-4">
                    <input type="text" value={tier.note} placeholder="e.g., assumes 3 properties" onChange={e => setMinimumUsage(prev => prev.map(x => x.id === tier.id ? {...x, note: e.target.value} : x))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none ${t.input}`} />
                  </div>
                  <div className="col-span-1">
                    <button onClick={() => setMinimumUsage(prev => prev.filter(x => x.id !== tier.id))} className="text-red-400/60 hover:text-red-400">✕</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setMinimumUsage(prev => [...prev, { id: `tier-${Date.now()}`, startMonth: '', endMonth: '', amount: '', note: '' }])} className="mt-4 text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Tier
              </button>
            </Section>

            <div className="flex justify-center mt-10 mb-8">
              <button onClick={() => setView('preview')} className="px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Generate Order Form
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
