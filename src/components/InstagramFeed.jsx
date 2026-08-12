import { InstagramEmbed } from 'react-social-media-embed'
import { instagramPosts } from '../data/mockData'

export default function InstagramFeed() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="fw-bold mb-0">
            <i className="bi bi-instagram text-fans3d-red me-2"></i>
            Seguinos en Instagram
          </h2>
          <a
            href="https://www.instagram.com/fans3d_impresiones/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-dark btn-sm rounded-pill"
          >
            <i className="bi bi-box-arrow-up-right me-1"></i>Ver en Instagram
          </a>
        </div>

        <div className="row g-3 justify-content-center">
          {instagramPosts.map((post) => (
            <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center" key={post.id}>
              <InstagramEmbed url={post.url} width={328} captioned={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
