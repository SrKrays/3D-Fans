import { Link } from 'react-router-dom'
import { events } from '../data/mockData'
import Reveal from './Reveal'

export default function Events() {
  return (
    <section id="expos" className="py-4 py-lg-5 bg-light">
      <div className="container">
        <h2 className="fw-bold mb-4">
          <i className="bi bi-calendar-event-fill text-fans3d-blue me-2"></i>
          Próximas Expos
        </h2>

        <div className="row g-3">
          {events.map((ev, i) => (
            <div className="col-12 col-sm-6 col-md-4" key={ev.id}>
              <Reveal delay={i * 0.08} className="d-block h-100">
                <div className="event-card bg-white p-3 h-100 d-flex gap-3">
                  <div className="event-date-badge" style={{ backgroundColor: ev.color }}>
                    <div className="fs-5">{ev.day}</div>
                    <div className="small">{ev.month}</div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{ev.name}</h6>
                    <p className="small text-secondary mb-1">
                      <i className="bi bi-geo-alt-fill me-1"></i>{ev.place}
                    </p>
                    <p className="small text-secondary mb-2">{ev.stand}</p>
                    <a href="#contacto" className="btn btn-sm btn-outline-dark rounded-pill">
                      Ver más
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/expos" className="btn btn-outline-dark rounded-pill px-4">
            Ver todas las Expos
          </Link>
        </div>
      </div>
    </section>
  )
}
