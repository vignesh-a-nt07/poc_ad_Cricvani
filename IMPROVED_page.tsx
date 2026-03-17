// page.tsx - Improved layout with responsive design
import AdSlot from '../components/AdSlot'

export default function Page() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        CricVani Homepage
      </h1>

      {/* HEADER AD - Responsive */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AdSlot
          placement="header_banner"
          mobileWidth="100%"
          tabletWidth="728px"
          desktopWidth="970px"
        />
      </div>

      {/* MAIN LAYOUT - Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '30px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '20px',
          },
        } as any}
      >
        {/* MAIN CONTENT */}
        <div style={{ gridColumn: 'span 3', minWidth: 0 }}>
          <h2 style={{ marginTop: 0 }}>Live Matches</h2>

          <section style={{ marginBottom: '30px' }}>
            <p>Match list UI here...</p>

            {/* INLINE AD */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <AdSlot
                placement="match_inline"
                mobileWidth="100%"
                tabletWidth="468px"
                desktopWidth="728px"
              />
            </div>

            <p>Commentary section...</p>
          </section>
        </div>

        {/* SIDEBAR - Only on larger screens */}
        <aside
          style={{
            display: 'grid',
            gridColumn: 'span 1',
            gridAutoFlow: 'row',
            gap: '20px',
            gridAutoRows: 'max-content',
          } as any}
        >
          <AdSlot
            placement="sidebar_top"
            mobileWidth="100%"
            tabletWidth="300px"
            desktopWidth="300px"
          />

          <AdSlot
            placement="sidebar_middle"
            mobileWidth="100%"
            tabletWidth="300px"
            desktopWidth="300px"
          />
        </aside>
      </div>

      {/* FOOTER AD - Responsive */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px', marginBottom: '20px' }}>
        <AdSlot
          placement="footer_banner"
          mobileWidth="100%"
          tabletWidth="728px"
          desktopWidth="970px"
        />
      </div>

      {/* Responsive CSS Styles */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="gridColumn"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  )
}
