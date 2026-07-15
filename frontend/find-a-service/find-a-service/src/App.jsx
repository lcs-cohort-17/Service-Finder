/** @addsuggestions-005-author Onke Mbingeleli */
import './App.css'
import heroImg from './assets/hero.png'

const services = [
  {
    name: 'Maitland Clinic',
    category: 'Clinic',
    area: 'Cape Town CBD',
    distance: '1.2 km',
    hours: 'Open until 18:00',
  },
  {
    name: 'City Library',
    category: 'Library',
    area: 'Salt River',
    distance: '2.8 km',
    hours: 'Open until 20:00',
  },
  {
    name: 'Hope Shelter',
    category: 'Shelter',
    area: 'Woodstock',
    distance: '3.4 km',
    hours: 'Open 24/7',
  },
]

const filters = ['Clinics', 'Libraries', 'Shelters', 'Food support']

function App() {
  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Service Finder</p>
          <h1>Find public services near you, fast.</h1>
          <p className="lede">
            Search clinics, libraries, shelters, and more on a map-first
            experience built to help people discover support in their area.
          </p>

          <div className="cta-row">
            <button type="button" className="primary-action">
              Open map
            </button>
            <button type="button" className="secondary-action">
              Suggest a place
            </button>
          </div>

          <div className="stats-grid" aria-label="Project highlights">
            <article>
              <strong>120+</strong>
              <span>service listings</span>
            </article>
            <article>
              <strong>4</strong>
              <span>service categories</span>
            </article>
            <article>
              <strong>Mobile</strong>
              <span>responsive by design</span>
            </article>
          </div>
        </div>

        <div className="hero-visual">
          <img src={heroImg} alt="Service Finder preview graphic" />
          <div className="floating-chip chip-top">Nearby services</div>
          <div className="floating-chip chip-bottom">Live directions</div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-heading">
            <h2>Quick filters</h2>
            <p>Jump into the most common service types.</p>
          </div>
          <div className="filter-list">
            {filters.map((filter) => (
              <button key={filter} type="button" className="filter-pill">
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <h2>Featured services</h2>
            <p>Sample results ready to connect to your map and backend.</p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <article key={service.name} className="service-card">
                <div>
                  <span className="service-category">{service.category}</span>
                  <h3>{service.name}</h3>
                  <p>{service.area}</p>
                </div>
                <div className="service-meta">
                  <span>{service.distance}</span>
                  <span>{service.hours}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
