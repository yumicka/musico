import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNewspaper, 
  faClock, 
  faCalendarAlt,
  faChevronRight,
  faExclamationCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import '../../../../css/news.scss'

import { usePage } from '@inertiajs/react'

export default function NewsFeed() {
  const search = usePage().props.filters?.search || '';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr(null);

        const url = route('news.index', { search });

        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
          credentials: 'same-origin',
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 120)}`);
        }

        const data = await res.json();
        if (!alive) return;

        setItems(data.data ?? []);
      } catch (e) {
        if (!alive) return;
        setErr(e.message || 'Error');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [search]); // ← ВОТ ЭТО ГЛАВНОЕ

  
  
  const displayItems = items

  if (loading) return (
    <div className="news-feed">
      <div className="news-feed-header">
        <div className="news-feed-title">
          <FontAwesomeIcon icon={faNewspaper} className="title-icon" />
          <h2>Jaunumi un Atjauninājumi</h2>
        </div>
      </div>
      <div className="loading-state">
        <FontAwesomeIcon icon={faSpinner} className="spinner-icon" />
        <p>Ielādē jaunumus...</p>
      </div>
    </div>
  );

  if (err) return (
    <div className="news-feed">
      <div className="news-feed-header">
        <div className="news-feed-title">
          <FontAwesomeIcon icon={faNewspaper} className="title-icon" />
          <h2>Jaunumi un Atjauninājumi</h2>
        </div>
      </div>
      <div className="error-state">
        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
        <div className="error-content">
          <h3>Kļūda ielādējot jaunumus</h3>
          <p>{err}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="news-feed">
      <div className="news-feed-header">
        <div className="news-feed-title">
          <FontAwesomeIcon icon={faNewspaper} className="title-icon" />
          <h2>Jaunumi un Atjauninājumi</h2>
        </div>
        <button className="view-all-btn">
          Skatīt visus
          <FontAwesomeIcon icon={faChevronRight} className="btn-icon" />
        </button>
      </div>

      {displayItems.length === 0 ? (
        <div className="empty-state">
          <FontAwesomeIcon icon={faNewspaper} className="empty-icon" />
          <div className="empty-content">
            <h3>Pagaidām nav jaunumu</h3>
            <p>Atgriezieties vēlāk, lai redzētu jaunākos atjauninājumus!</p>
          </div>
        </div>
      ) : (
        <div className="news-grid">
          {displayItems.map((n) => (
            <div key={n.id} className="news-card">
              <div className="news-card-header">
                <span className="news-category">{n.category || "Jaunumi"}</span>
                <div className="news-date">
                  <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
                  <span>{n.published_at ? new Date(n.published_at).toLocaleDateString('lv-LV') : 'Nesen'}</span>
                </div>
              </div>
              
              <div className="news-card-content">
                <h3 className="news-title">{n.title}</h3>
                <p className="news-excerpt">{n.body}</p>
              </div>
              
              <div className="news-card-footer">
                <button className="read-more-btn">
                  Lasīt vairāk
                  <FontAwesomeIcon icon={faChevronRight} className="btn-icon" />
                </button>
                <div className="news-read-time">
                  <FontAwesomeIcon icon={faClock} className="time-icon" />
                  <span>2 min</span>
                </div>
              </div>
              
              {/* Декоративный акцент */}
              <div className="news-card-accent"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}