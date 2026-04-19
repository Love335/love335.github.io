import Link from 'next/link';
import Crt from './components/crt';
import CorkboardGallery from './components/corkboard-gallery';

export default function Home() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 56px)',
        background: '#6a381f',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 2fr',
            alignItems: 'center',
            gap: '0',
            width: '100%',
            maxWidth: '1200px',
          }}
          className="home-grid"
        >

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Crt />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '42px',
              gap: '28px',
            }}
            className="home-text"
          >

            <p
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#ebcea9',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Love Skön / 2026
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 3.2vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#ffffb3',
                margin: 0,
              }}
            >
              Welcome to<br />my portfolio.
            </h1>

            <div
              style={{
                width: '48px',
                height: '2px',
                background: '#dcab6b',
                borderRadius: '1px',
              }}
              className="home-divider"
            />

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                fontWeight: 500,
                color: '#dcab6b',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Current project:{' '}
              <Link
                href="/localhero"
                style={{
                  color: '#ffffb3',
                  textDecoration: 'none',
                  borderBottom: '1.5px solid #8f5e32',
                  paddingBottom: '1px',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                className="home-project-link"
              >
                Local Hero
              </Link>
            </p>

            <p
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: '#ebcea9',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              ↑ plug in the wire to explore
            </p>

          </div>
        </div>
      </div>

      <CorkboardGallery />

      <div
        className="text-center text-xs font-mono tracking-widest"
        style={{ color: '#ebcea9', paddingBottom: '32px' }}
      >
        BUILT WITH NEXT.JS • TAILWIND • REACT • TYPESCRIPT
      </div>

      <style>{`
        @media (max-width: 900px) {
          .home-grid {
            grid-template-columns: 1fr !important;
          }
          .home-text {
            padding-left: 0 !important;
            align-items: center !important;
            text-align: center;
          }
          .home-text h1 {
            text-align: center;
          }
          .home-divider {
            margin: 0 auto;
          }
        }

        .home-project-link:hover {
          color: #dcab6b !important;
          border-color: #dcab6b !important;
        }
      `}</style>
    </div>
  );
}