import { useState } from 'react'
import './App.css'

const navigation = [
  {
    title: 'WORKSPACE',
    items: [
      { label: 'Dashboard', icon: 'dashboard' },
      { label: 'Subscriptions', icon: 'subscriptions', badge: '128' },
      { label: 'Quotations', icon: 'quotations' },
      { label: 'Customers', icon: 'customers' },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { label: 'Products', icon: 'products' },
      { label: 'Plans', icon: 'plans' },
      { label: 'Invoices', icon: 'invoices', badge: '6' },
      { label: 'Payments', icon: 'payments' },
    ],
  },
  {
    title: 'INSIGHTS',
    items: [
      { label: 'Analytics', icon: 'analytics' },
      { label: 'Settings', icon: 'settings' },
    ],
  },
]

const metrics = [
  {
    label: 'Active subscriptions',
    value: '1,284',
    change: '+12.8%',
    direction: 'up',
    description: 'vs. last month',
    icon: 'subscriptions',
    color: 'purple',
    bars: [35, 48, 40, 65, 52, 78, 60, 88, 72, 100],
  },
  {
    label: 'Monthly recurring revenue',
    value: '₹8,42,500',
    change: '+8.2%',
    direction: 'up',
    description: 'vs. last month',
    icon: 'revenue',
    color: 'green',
    bars: [42, 35, 55, 48, 72, 60, 80, 70, 88, 100],
  },
  {
    label: 'Outstanding payments',
    value: '₹1,24,800',
    change: '4.3%',
    direction: 'down',
    description: 'of total revenue',
    icon: 'payments',
    color: 'orange',
    bars: [85, 70, 78, 60, 72, 55, 64, 45, 55, 35],
  },
  {
    label: 'Overdue invoices',
    value: '06',
    change: '2 need attention',
    direction: 'warning',
    description: 'requires follow-up',
    icon: 'invoices',
    color: 'red',
    bars: [35, 50, 42, 65, 55, 75, 58, 85, 72, 90],
  },
]

const activities = [
  {
    initials: 'AK',
    name: 'Arjun Kumar',
    detail: 'Pro Annual Plan',
    action: 'Subscription renewed',
    date: '31 Oct, 10:42 AM',
    amount: '₹24,999',
    status: 'Completed',
    tone: 'green',
  },
  {
    initials: 'PM',
    name: 'Priya Menon',
    detail: 'Business Monthly',
    action: 'New subscription',
    date: '31 Oct, 09:18 AM',
    amount: '₹4,999',
    status: 'Active',
    tone: 'blue',
  },
  {
    initials: 'RV',
    name: 'Rahul Varma',
    detail: 'Enterprise Plan',
    action: 'Invoice generated',
    date: '30 Oct, 04:35 PM',
    amount: '₹49,999',
    status: 'Pending',
    tone: 'orange',
  },
  {
    initials: 'NS',
    name: 'Neha Shah',
    detail: 'Starter Monthly',
    action: 'Payment received',
    date: '30 Oct, 02:12 PM',
    amount: '₹1,499',
    status: 'Completed',
    tone: 'green',
  },
  {
    initials: 'AS',
    name: 'Amit Singh',
    detail: 'Pro Monthly',
    action: 'Payment overdue',
    date: '29 Oct, 11:06 AM',
    amount: '₹2,999',
    status: 'Overdue',
    tone: 'red',
  },
]

const revenueData = [
  { month: 'May', revenue: 42, previous: 34 },
  { month: 'Jun', revenue: 55, previous: 42 },
  { month: 'Jul', revenue: 47, previous: 39 },
  { month: 'Aug', revenue: 68, previous: 51 },
  { month: 'Sep', revenue: 61, previous: 46 },
  { month: 'Oct', revenue: 84, previous: 57 },
]

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const paths = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    subscriptions: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18M8 14h3" />
      </>
    ),
    quotations: (
      <>
        <path d="M7 3h8l5 5v13H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z" />
        <path d="M15 3v5h5M8 13h8M8 17h6" />
      </>
    ),
    customers: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    products: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5M12 13v8" />
      </>
    ),
    plans: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M15.5 9.5c0-1.4-1.5-2-3.5-2s-3.5.8-3.5 2.2S10 12 12 12s3.5.8 3.5 2.3S14 17 12 17s-3.5-.7-3.5-2" />
      </>
    ),
    invoices: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
    payments: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M2.5 10h19M7 15h3" />
      </>
    ),
    analytics: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 3 6-7" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.8-.6a8 8 0 0 1-1.6.9l-.4 1.9h-2.8l-.4-1.9a8 8 0 0 1-1.6-.9l-1.8.6-1.4-2.4L5.1 15a8 8 0 0 1 0-1.9l-1.4-1.2 1.4-2.4 1.8.6a8 8 0 0 1 1.6-.9L9 7.3h2.8l.4 1.9a8 8 0 0 1 1.6.9l1.8-.6 1.4 2.4-1.4 1.2a8 8 0 0 1-.2 1.9Z" transform="translate(1 -1) scale(.92)" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <path d="M7 17 17 7M7 7h10v10" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5M12 15V3" />
      </>
    ),
    dots: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
  }

  return <svg {...common}>{paths[name] || paths.dashboard}</svg>
}

function Sidebar({ activePage, setActivePage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <a
          href="#dashboard"
          className="brand"
          onClick={(event) => event.preventDefault()}
          aria-label="Brightloop home"
        >
          <span className="brand-mark">
            <span />
            <span />
            <span />
            <span />
          </span>

          <span className="brand-copy">
            <strong>brightloop</strong>
            <small>SUBSCRIPTION CLOUD</small>
          </span>

          <button
            className="mobile-close"
            aria-label="Close menu"
            onClick={(event) => {
              event.preventDefault()
              setMobileOpen(false)
            }}
          >
            <Icon name="close" />
          </button>
        </a>

        <div className="workspace-switcher">
          <div className="workspace-avatar">B</div>
          <div className="workspace-copy">
            <strong>Brightloop Software</strong>
            <span>Business workspace</span>
          </div>
          <span className="workspace-chevron">⌄</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigation.map((group) => (
            <div className="nav-group" key={group.title}>
              <p className="nav-heading">{group.title}</p>

              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`nav-item ${
                    activePage === item.label ? 'nav-item-active' : ''
                  }`}
                  onClick={() => {
                    setActivePage(item.label)
                    setMobileOpen(false)
                  }}
                >
                  <Icon name={item.icon} size={19} />
                  <span className="nav-label">{item.label}</span>

                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <div>
              <strong>Need a hand?</strong>
              <p>Visit our help centre</p>
            </div>
            <Icon name="chevron" size={16} />
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">SN</div>
            <div className="sidebar-user-copy">
              <strong>Saran Nath</strong>
              <span>Administrator</span>
            </div>
            <button
              className="icon-button sidebar-user-menu"
              aria-label="Account options"
              title="Account options"
              onClick={() => setActivePage('Settings')}
            >
              <Icon name="dots" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function Topbar({ activePage, setMobileOpen, search, setSearch }) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu-button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Icon name="menu" />
        </button>

        <div className="breadcrumb">
          <span>Workspace</span>
          <Icon name="chevron" size={14} />
          <strong>{activePage}</strong>
        </div>
      </div>

      <div className="topbar-right">
        <label className="global-search">
          <Icon name="search" size={18} />
          <input
            type="search"
            placeholder="Search anything..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search dashboard activities"
          />
          <kbd>⌘ K</kbd>
        </label>

        <div className="notification-wrap">
          <button
            className="icon-button notification-button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications((current) => !current)}
          >
            <Icon name="bell" />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="notification-popover">
              <strong>Notifications</strong>
              <p>6 invoices need your attention.</p>
              <p>2 payments are overdue.</p>
              <button
                onClick={() => {
                  setShowNotifications(false)
                }}
              >
                Got it
              </button>
            </div>
          )}
        </div>

        <div className="topbar-divider" />

        <button className="topbar-profile" onClick={() => {}}>
          <div className="user-avatar">SN</div>
          <div className="topbar-profile-copy">
            <strong>Saran Nath</strong>
            <span>Admin</span>
          </div>
          <span className="profile-chevron">⌄</span>
        </button>
      </div>
    </header>
  )
}

function MetricCard({ metric }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className="metric-label">{metric.label}</span>

        <span className={`metric-icon metric-icon-${metric.color}`}>
          <Icon name={metric.icon} size={20} />
        </span>
      </div>

      <div className="metric-value">{metric.value}</div>

      <div className="metric-bottom">
        <span className={`metric-change metric-change-${metric.direction}`}>
          {metric.direction === 'up' && <Icon name="arrow" size={13} />}
          {metric.direction === 'warning' ? '!' : metric.change}
        </span>

        <span className="metric-description">
          {metric.direction === 'warning'
            ? metric.change
            : metric.description}
        </span>

        <div className="metric-sparkline" aria-hidden="true">
          {metric.bars.map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </article>
  )
}

function RevenueChart() {
  const [period, setPeriod] = useState('Last 6 months')

  const points = revenueData
    .map((item, index) => ({
      x: 42 + index * 78,
      y: 206 - item.revenue * 1.7,
      previousY: 206 - item.previous * 1.7,
    }))

  const revenuePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const previousPath = points
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.previousY}`,
    )
    .join(' ')

  const areaPath = `${revenuePath} L ${points[points.length - 1].x} 220 L ${points[0].x} 220 Z`

  return (
    <section className="panel revenue-panel">
      <div className="panel-heading">
        <div>
          <h2>Revenue overview</h2>
          <p>Track how your business is performing</p>
        </div>

        <select
          className="period-select"
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          aria-label="Revenue chart period"
        >
          <option>Last 6 months</option>
          <option>Last 3 months</option>
          <option>Last 12 months</option>
        </select>
      </div>

      <div className="revenue-summary">
        <div>
          <strong>₹8,42,500</strong>
          <span className="summary-positive">
            <Icon name="arrow" size={13} /> 8.2%
          </span>
        </div>
        <span className="summary-caption">Revenue for October</span>
      </div>

      <div className="chart-legend">
        <span><i className="legend-current" /> This period</span>
        <span><i className="legend-previous" /> Previous period</span>
      </div>

      <div className="revenue-chart">
        <svg
          viewBox="0 0 440 250"
          role="img"
          aria-label="Illustrative revenue trend from May to October"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6657e8" stopOpacity=".18" />
              <stop offset="100%" stopColor="#6657e8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[40, 85, 130, 175, 220].map((y) => (
            <line
              key={y}
              x1="24"
              y1={y}
              x2="430"
              y2={y}
              stroke="#edf0f5"
              strokeDasharray="4 5"
            />
          ))}

          <path d={areaPath} fill="url(#revenue-fill)" />

          <path
            d={previousPath}
            fill="none"
            stroke="#b9bfce"
            strokeWidth="2"
            strokeDasharray="5 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={revenuePath}
            fill="none"
            stroke="#6657e8"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#ffffff"
              stroke="#6657e8"
              strokeWidth="2.5"
            />
          ))}
        </svg>

        <div className="chart-months">
          {revenueData.map((item) => (
            <span key={item.month}>{item.month}</span>
          ))}
        </div>
      </div>

      <p className="chart-note">
        <span className="note-dot" />
        Illustrative sample data · Backend integration pending
      </p>
    </section>
  )
}

function SubscriptionChart() {
  const statuses = [
    { label: 'Active', count: '1,284', percent: '68%', color: 'active' },
    { label: 'Trial', count: '246', percent: '13%', color: 'trial' },
    { label: 'Paused', count: '189', percent: '10%', color: 'paused' },
    { label: 'Cancelled', count: '170', percent: '9%', color: 'cancelled' },
  ]

  return (
    <section className="panel subscription-panel">
      <div className="panel-heading">
        <div>
          <h2>Subscriptions</h2>
          <p>Current subscription breakdown</p>
        </div>

        <button
          className="icon-button panel-more"
          aria-label="Subscription chart options"
          title="Subscription chart options"
        >
          <Icon name="dots" />
        </button>
      </div>

      <div className="donut-area">
        <div
          className="donut-chart"
          role="img"
          aria-label="68 percent active, 13 percent trial, 10 percent paused, 9 percent cancelled"
        >
          <div className="donut-center">
            <strong>1,889</strong>
            <span>Total</span>
          </div>
        </div>
      </div>

      <div className="status-list">
        {statuses.map((status) => (
          <div className="status-row" key={status.label}>
            <span className="status-name">
              <i className={`status-dot status-dot-${status.color}`} />
              {status.label}
            </span>
            <strong>{status.count}</strong>
            <span className="status-percent">{status.percent}</span>
          </div>
        ))}
      </div>

      <p className="chart-note">
        <span className="note-dot" />
        Illustrative sample data · Backend integration pending
      </p>
    </section>
  )
}

function ActivityTable({ search, onViewAll }) {
  const filteredActivities = activities.filter((activity) => {
    const query = search.trim().toLowerCase()

    if (!query) return true

    return [
      activity.name,
      activity.detail,
      activity.action,
      activity.date,
      activity.status,
    ].some((value) => value.toLowerCase().includes(query))
  })

  return (
    <section className="panel activity-panel">
      <div className="panel-heading activity-heading">
        <div>
          <h2>Recent activity</h2>
          <p>Keep track of what's happening across your business</p>
        </div>

        <button className="text-button" onClick={onViewAll}>
          View all <Icon name="chevron" size={15} />
        </button>
      </div>

      <div className="table-scroll">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Activity</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th><span className="visually-hidden">Options</span></th>
            </tr>
          </thead>

          <tbody>
            {filteredActivities.map((activity) => (
              <tr key={`${activity.name}-${activity.action}`}>
                <td>
                  <div className="customer-cell">
                    <span className={`customer-avatar avatar-${activity.tone}`}>
                      {activity.initials}
                    </span>
                    <span className="customer-copy">
                      <strong>{activity.name}</strong>
                      <small>{activity.detail}</small>
                    </span>
                  </div>
                </td>

                <td className="activity-description">{activity.action}</td>
                <td className="activity-date">{activity.date}</td>
                <td className="activity-amount">{activity.amount}</td>

                <td>
                  <span className={`status-pill pill-${activity.tone}`}>
                    <i />
                    {activity.status}
                  </span>
                </td>

                <td>
                  <button
                    className="icon-button row-more"
                    aria-label={`Options for ${activity.name}`}
                    title={`Options for ${activity.name}`}
                  >
                    <Icon name="dots" size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredActivities.length === 0 && (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <Icon name="search" size={24} />
                    <strong>No matching activity</strong>
                    <span>Try another search term.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {filteredActivities.length} of {activities.length} sample records
      </div>
    </section>
  )
}

function Dashboard({ search, setActivePage }) {
  const today = new Date()
  const dateLabel = today.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const greeting =
    today.getHours() < 12
      ? 'Good morning'
      : today.getHours() < 17
        ? 'Good afternoon'
        : 'Good evening'

  return (
    <>
      <div className="welcome-row">
        <div>
          <div className="eyebrow">OVERVIEW</div>
          <h1>{greeting}, Saran <span className="greeting-wave">✦</span></h1>
          <p>Here's what's happening with your subscriptions today.</p>
        </div>

        <div className="welcome-actions">
          <span className="date-label">
            <Icon name="calendar" size={17} />
            {dateLabel}
          </span>

          <button
            className="primary-button"
            onClick={() => setActivePage('Quotations')}
          >
            <Icon name="plus" size={18} />
            New quotation
          </button>
        </div>
      </div>

      <div className="metric-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="charts-grid">
        <RevenueChart />
        <SubscriptionChart />
      </div>

      <ActivityTable
        search={search}
        onViewAll={() => setActivePage('Subscriptions')}
      />

      <footer className="dashboard-footer">
        <span>© 2026 Brightloop Software</span>
        <span>Subscription Cloud <i /> Development preview</span>
      </footer>
    </>
  )
}

function PlaceholderPage({ title, setActivePage }) {
  return (
    <section className="panel placeholder-page">
      <div className="placeholder-icon">
        <Icon name="dashboard" size={28} />
      </div>
      <h2>{title}</h2>
      <p>
        The {title.toLowerCase()} module will be built in an upcoming
        development phase.
      </p>
      <button
        className="primary-button"
        onClick={() => setActivePage('Dashboard')}
      >
        Return to dashboard
      </button>
      <span className="placeholder-note">
        This screen is a navigation placeholder, not a completed module.
      </span>
    </section>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="main-area">
        <Topbar
          activePage={activePage}
          setMobileOpen={setMobileOpen}
          search={search}
          setSearch={setSearch}
        />

        <main className="page-content">
          {activePage === 'Dashboard' ? (
            <Dashboard search={search} setActivePage={setActivePage} />
          ) : (
            <PlaceholderPage
              title={activePage}
              setActivePage={setActivePage}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
