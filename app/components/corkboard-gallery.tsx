'use client';

import { useState } from 'react';

interface Photo {
  src: string;
  label: string;
}

const PHOTOS: Photo[] = [
  { src: '/code/code_semaphore.png',    label: 'my first semaphore <3'  },
  { src: '/code/code_threads.png',      label: 'fighting with TarsosDSP'    },
  { src: '/code/code_slider.png',       label: 'nightmare UI component >:('  },
  { src: '/code/code_api.png',          label: 'gratuitous APIs'  },
  { src: '/code/code_python.png',       label: 'random python code'      },
  { src: '/code/code_api_service.png',  label: 'sophisticated APIs ;)'  },
  { src: '/code/code_tests.png',        label: '2 out of a trillion tests'     },
  { src: '/code/code_ui.png',           label: 'it is hard to make UI code interesting' },
];

const PIN_COLORS = [
  '#e03535', '#3068d6', '#22a559',
  '#e09535', '#9b35d1', '#35b8c8',
];

const ROTATIONS = [-5.2, 3.8, -2.1, 6.4, -4.7, 2.3, -6.9, 4.1];

export default function CorkboardGallery() {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <>
      <div style={styles.cork}>
        <div style={styles.grid}>
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              style={{
                ...styles.polaroidWrap,
                transform: `rotate(${ROTATIONS[i] ?? 0}deg)`,
              }}
              onClick={() => setSelected(photo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(photo)}
              aria-label={`View ${photo.label}`}
            >
              <div style={styles.pin}>
                <div
                  style={{
                    ...styles.pinHead,
                    background: PIN_COLORS[i % PIN_COLORS.length],
                  }}
                />
                <div style={styles.pinNeedle} />
              </div>

              <div style={styles.polaroid}>
                <div style={styles.photoArea}>
                  <img
                    src={photo.src}
                    alt={photo.label}
                    style={styles.photo}
                    draggable={false}
                  />
                </div>
                <div style={styles.captionBar}>
                  <span style={styles.captionText}>{photo.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div
          style={styles.lightboxBackdrop}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Close ${selected.label}`}
        >
          <div
            style={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.lbPolaroid}>
              <div style={styles.lbPhotoArea}>
                <img
                  src={selected.src}
                  alt={selected.label}
                  style={styles.lbPhoto}
                  draggable={false}
                />
              </div>
              <div style={styles.lbCaptionBar}>
                <span style={styles.lbCaptionText}>{selected.label}</span>
              </div>
            </div>

            <button
              style={styles.closeBtn}
              onClick={() => setSelected(null)}
            >
              close ×
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');

        .polaroid-item {
          transition: transform 0.18s ease, filter 0.18s ease;
        }
        .polaroid-item:hover {
          filter: brightness(1.07);
          z-index: 2;
        }

        @media (max-width: 900px) {
          .corkboard-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .corkboard-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  cork: {
    backgroundColor: '#b5813a',
    backgroundImage: [
      'radial-gradient(ellipse 3px 2px at 12px 8px,  rgba(0,0,0,0.12) 100%, transparent 100%)',
      'radial-gradient(ellipse 2px 3px at 28px 22px, rgba(255,255,255,0.07) 100%, transparent 100%)',
      'radial-gradient(ellipse 4px 2px at 5px  30px, rgba(0,0,0,0.09) 100%, transparent 100%)',
      'radial-gradient(ellipse 2px 4px at 38px 5px,  rgba(255,255,255,0.06) 100%, transparent 100%)',
      'radial-gradient(ellipse 3px 2px at 20px 40px, rgba(0,0,0,0.08) 100%, transparent 100%)',
    ].join(', '),
    backgroundSize: '44px 44px',
    padding: 'clamp(40px, 6vw, 100px) clamp(40px, 6vw, 100px) clamp(56px, 8vw, 120px)',
    borderRadius: '4px',
    border: '10px solid #8b5e20',
    boxSizing: 'border-box',
    margin: 'clamp(40px, 6vw, 100px)',
  },

  boardTitle: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: '#3a1f00',
    margin: '0 0 32px 4px',
    opacity: 0.65,
    letterSpacing: '0.04em',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px 28px',
  },

  polaroidWrap: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transformOrigin: 'center center',
    transition: 'transform 0.18s ease, filter 0.18s ease',
  },

  pin: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  pinHead: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    border: '1.5px solid rgba(0,0,0,0.28)',
    boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.2), inset 2px 2px 3px rgba(255,255,255,0.3)',
  },

  pinNeedle: {
    width: '2px',
    height: '9px',
    background: 'rgba(0,0,0,0.38)',
    borderRadius: '0 0 1px 1px',
  },

  polaroid: {
    background: '#faf8f3',
    padding: '8px 8px 0 8px',
    borderRadius: '2px',
    width: '100%',
    boxSizing: 'border-box',
  },

  photoArea: {
    width: '100%',
    aspectRatio: '8 / 7',
    background: '#1e1e2e',
    borderRadius: '1px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    userSelect: 'none',
  },

  captionBar: {
    padding: '10px 4px 16px',
    textAlign: 'center',
  },

  captionText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '16px',
    color: '#2a1800',
    letterSpacing: '0.02em',
  },

  lightboxBackdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.84)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '0',
    padding: '24px',
    boxSizing: 'border-box',
  },

  lightboxInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0',
  },

  lbPolaroid: {
    background: '#faf8f3',
    padding: '14px 14px 0 14px',
    borderRadius: '2px',
    width: 'min(520px, 90vw)',
    boxSizing: 'border-box',
  },

  lbPhotoArea: {
    width: '100%',
    aspectRatio: '8 / 7',
    background: '#1e1e2e',
    borderRadius: '1px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lbPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },

  lbCaptionBar: {
    padding: '16px 8px 24px',
    textAlign: 'center',
  },

  lbCaptionText: {
    fontFamily: "'Caveat', cursive",
    fontSize: '24px',
    color: '#2a1800',
    letterSpacing: '0.02em',
  },

  closeBtn: {
    marginTop: '20px',
    background: 'none',
    border: '1.5px solid rgba(255,255,255,0.35)',
    color: '#fff',
    fontFamily: "'Caveat', cursive",
    fontSize: '17px',
    padding: '6px 24px',
    borderRadius: '20px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },
};