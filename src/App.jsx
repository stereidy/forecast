import React from 'react'

const App = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const correctPassword = 'Operation3XRevenue';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-800 max-w-md w-full text-center"
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Enter Password</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-[#0a0a0a] border border-gray-700 text-white focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded text-white font-medium w-full"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }
  // Data from the spreadsheet
  const forecastData = {
    currentARR: 590600,
    previousYearARR: 526100,
    quarters: {
      Q1: {
        deals: [
          { name: 'reMarkable', stage: 'Closed', value: 10000 },
          { name: 'Swan', stage: 'Closed', value: 10000 }
        ],
        totalPipeline: 20000,
        forecast: 20000,
        exitARR: 546100,
        budget: 778160,
        status: 'completed'
      },
      Q2: {
        deals: [
          { name: 'Homa', stage: 'Closed', value: 7000 },
          { name: 'Shalion', stage: 'Closed', value: 7500 },
          { name: 'Personio', stage: 'Closed', value: 30000 },
          { name: 'Kramp', stage: 'POV', value: 50000 },
          { name: 'Intruder', stage: 'Scout POV', value: 5000 },
          { name: 'Tourlane', stage: 'Scout POV', value: 7500 },
          { name: 'Dext', stage: 'Scout POV', value: 5000 },
          { name: 'Ebury', stage: 'Scout POV', value: 12000 }
        ],
        totalPipeline: 124000,
        forecast: 124000,
        exitARR: 670100,
        budget: 935011,
        status: 'current',
        closedToDate: 44500
      },
      Q3: {
        deals: [
          { name: 'iRhythm', stage: 'Contracting', value: 80000 },
          { name: 'HomeToGo', stage: 'POV', value: 35000 },
          { name: 'Cloud Kitchens', stage: 'POV', value: 30000 },
          { name: 'HG', stage: 'POV', value: 30000 },
          { name: 'GoCardless', stage: 'POV', value: 30000 },
          { name: 'Metacore', stage: 'POV', value: 15000 },
          { name: 'Snowflake', stage: 'POV', value: 30000 },
          { name: 'Zopa', stage: 'POV', value: 50000 },
          { name: 'Velux', stage: 'POV', value: 30000 },
          { name: 'Supercell', stage: 'Deep-Dive', value: 50000 },
          { name: 'Expana', stage: 'Deep-Dive', value: 30000 }
        ],
        totalPipeline: 410000,
        forecast: 307500,
        exitARR: 977600,
        budget: 1236084
      },
      Q4: {
        deals: [
          { name: 'Monzo', stage: 'Deep-Dive', value: 80000 },
          { name: 'Relay', stage: 'Deep-Dive', value: 30000 },
          { name: 'Telenor', stage: 'Deep-Dive', value: 30000 },
          { name: 'Youlend', stage: 'Deep-Dive', value: 30000 },
          { name: 'Tenable', stage: 'NBM', value: 30000 },
          { name: 'Varian', stage: 'NBM', value: 30000 },
          { name: 'Asana', stage: 'NBM', value: 50000 }
        ],
        totalPipeline: 280000,
        forecast: 140000,
        exitARR: 1117600,
        budget: 1634104
      }
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get status class
  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase().replace(' ', '-');
    const statusMap = {
      'closed': 'bg-green-500',
      'contracting': 'bg-amber-500',
      'pov': 'bg-purple-400',
      'scout-pov': 'bg-purple-400',
      'deep-dive': 'bg-indigo-500',
      'nbm': 'bg-violet-500'
    };
    return statusMap[statusLower] || '';
  };

  // Calculate metrics
  const targetARR = forecastData.previousYearARR * 3;
  const currentForecast = forecastData.quarters.Q4.exitARR;
  const gapToTarget = currentForecast - targetARR;
  const additionalARRNeeded = Math.max(0, targetARR - currentForecast);
  const pipelineNeeded = additionalARRNeeded / 0.3;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12 animate-[fadeIn_0.5s_ease-out]">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent mb-2">
            SYNQ Revenue Forecast
          </h1>
          <p className="text-gray-400 text-lg">FY25 Pipeline & ARR Tracking Dashboard (Mar '25 - Feb '26)</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            label="Current ARR (Q2)"
            value={formatCurrency(forecastData.currentARR)}
            change="+12.3% from FY24"
            changeType="positive"
            delay="100ms"
          />
          <MetricCard
            label="Open Pipeline"
            value="$789,500"
            change="28 deals across quarters"
            delay="200ms"
          />
          <MetricCard
            label="Weighted Forecast"
            value="$591,500"
            change="Based on pipeline probability"
            delay="300ms"
          />
          <MetricCard
            label="FY25 Exit ARR Target"
            value={formatCurrency(targetARR)}
            change="3X Growth"
            changeType="positive"
            delay="400ms"
          />
        </div>

        {/* Quarters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {Object.entries(forecastData.quarters).map(([quarterName, quarter], index) => (
            <QuarterCard
              key={quarterName}
              quarterName={quarterName}
              quarter={quarter}
              delay={`${500 + index * 100}ms`}
            />
          ))}
        </div>

        {/* Executive Summary */}
        <div className="animate-[fadeIn_0.5s_ease-out] [animation-delay:900ms] [animation-fill-mode:both]">
          <h2 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent">
            Executive Summary & VC Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <SummaryCard
              label="FY25 Growth Target"
              value="3.00x"
              detail={`$526.1K × 3 = $1,578.3K`}
            />
            <SummaryCard
              label="Gap to Target"
              value={formatCurrency(gapToTarget)}
              detail={`Target: ${formatCurrency(targetARR)}`}
              valueClass="text-red-500"
            />
            <SummaryCard
              label="Pipeline Needed @ 30%"
              value={formatCurrency(pipelineNeeded)}
              detail="To reach 3x target"
            />
            <SummaryCard
              label="Current Forecast"
              value="2.12x"
              detail="Tracking to $1,117.6K"
            />
          </div>

          {/* KPI Table */}
          <KPITable />
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ label, value, change, changeType, delay }) => {
  return (
    <div 
      className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-600 relative overflow-hidden group animate-[fadeIn_0.5s_ease-out] [animation-fill-mode:both]"
      style={{ animationDelay: delay }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">{label}</div>
      <div className="text-3xl font-semibold">{value}</div>
      <div className={`text-sm mt-2 ${changeType === 'positive' ? 'text-green-500' : changeType === 'negative' ? 'text-red-500' : 'text-gray-400'}`}>
        {change}
      </div>
    </div>
  );
};

// Quarter Card Component
const QuarterCard = ({ quarterName, quarter, delay }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase().replace(' ', '-');
    const statusMap = {
      'closed': 'bg-green-500',
      'contracting': 'bg-amber-500',
      'pov': 'bg-purple-400',
      'scout-pov': 'bg-purple-400',
      'deep-dive': 'bg-indigo-500',
      'nbm': 'bg-violet-500'
    };
    return statusMap[statusLower] || '';
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 transition-all duration-300 animate-[fadeIn_0.5s_ease-out] [animation-fill-mode:both]" style={{ animationDelay: delay }}>
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
        <h3 className="text-2xl font-semibold flex items-center gap-3">
          {quarterName} FY25
          {quarter.status === 'completed' && <span className="text-green-500 text-sm font-medium">✓ Completed</span>}
          {quarter.status === 'current' && <span className="text-purple-300 text-sm font-medium">● In Progress</span>}
        </h3>
        <div className="text-right">
          <div className="text-xl font-semibold text-purple-300">{formatCurrency(quarter.totalPipeline)}</div>
          <div className="text-sm text-gray-400 mt-1">Open Pipeline</div>
        </div>
      </div>
      
      {quarter.status === 'current' && quarter.closedToDate && (
        <div className="bg-[#252525] px-4 py-2 rounded-lg text-sm text-purple-300 mb-2 text-center">
          Closed to date: {formatCurrency(quarter.closedToDate)}
        </div>
      )}
      
      <div className="text-xs text-gray-400 mb-2 px-3">{quarter.deals.length} deals in pipeline</div>
      
      <div className="max-h-96 overflow-y-auto pr-2 mb-6 [scrollbar-width:thin] [scrollbar-color:#7c3aed_#1a1a1a]">
        {quarter.deals.map((deal, index) => (
          <div key={index} className="flex justify-between items-center p-3 mb-2 bg-[#252525] rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1 cursor-pointer">
            <div className="flex items-center gap-3 flex-1">
              <span className="font-medium">{deal.name}</span>
              <span className={`text-xs px-2 py-1 rounded text-white ${getStatusClass(deal.stage)}`}>
                {deal.stage}
              </span>
            </div>
            <span className="font-semibold text-purple-300">{formatCurrency(deal.value)}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
        <div className="text-center">
          <div className="text-gray-400 text-xs uppercase">Forecast</div>
          <div className="text-xl font-semibold mt-1">{formatCurrency(quarter.forecast)}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-xs uppercase">Exit ARR</div>
          <div className="text-xl font-semibold mt-1">{formatCurrency(quarter.exitARR)}</div>
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ label, value, detail, valueClass = "" }) => {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 text-center transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      <div className="text-gray-400 text-sm uppercase tracking-wider mb-3">{label}</div>
      <div className={`text-4xl font-bold mb-2 ${valueClass}`}>{value}</div>
      <div className="text-sm text-gray-400">{detail}</div>
    </div>
  );
};

// KPI Table Component
const KPITable = () => {
  const kpis = [
    { metric: 'ARR Growth Rate', current: '122%', target: '204%', status: 'warning', statusText: '60% to target' },
    { metric: 'Pipeline Coverage', current: '1.41x', target: '3.0x', status: 'danger', statusText: 'Needs improvement' },
    { metric: 'Average Deal Size', current: '$29.8K', target: '$40K', status: 'warning', statusText: '74% of target' },
    { metric: 'Weighted Win Rate', current: '75%', target: '30%', status: 'success', statusText: 'Exceeding target' },
    { metric: 'Sales Velocity', current: '$155.4K/qtr', target: '$268K/qtr', status: 'warning', statusText: '58% of target' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'danger': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 overflow-x-auto">
      <h3 className="text-xl font-semibold mb-6">Key Performance Indicators</h3>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="text-left p-4 text-gray-400 font-medium uppercase text-xs tracking-wider">Metric</th>
            <th className="text-left p-4 text-gray-400 font-medium uppercase text-xs tracking-wider">Current</th>
            <th className="text-left p-4 text-gray-400 font-medium uppercase text-xs tracking-wider">Target</th>
            <th className="text-left p-4 text-gray-400 font-medium uppercase text-xs tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((kpi, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
              <td className="p-4">{kpi.metric}</td>
              <td className="p-4">{kpi.current}</td>
              <td className="p-4">{kpi.target}</td>
              <td className={`p-4 font-medium ${getStatusColor(kpi.status)}`}>{kpi.statusText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;