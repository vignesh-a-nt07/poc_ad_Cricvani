import AdSlot from "../components/AdSlot"

export default function Page() {

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

      <h1 style={{ textAlign: "center" }}>
        CricVani Homepage
      </h1>

      {/* HEADER AD */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AdSlot
          placement="header_banner"
          width={970}
          height={90}
        />
      </div>

      <div style={{ display: "flex", gap: "30px", marginTop: "30px" }}>

        {/* MAIN CONTENT */}
        <div style={{ flex: 3 }}>

          <h2>Live Matches</h2>

          <p>Match list UI here...</p>

          {/* INLINE AD */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AdSlot
              placement="match_inline"
              width={728}
              height={90}
            />
          </div>

          <p>Commentary section...</p>

        </div>

        {/* SIDEBAR */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>

          <AdSlot
            placement="sidebar_top"
            width={300}
            height={250}
          />

          <AdSlot
            placement="sidebar_middle"
            width={300}
            height={250}
          />

        </div>

      </div>

      {/* FOOTER AD */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
        <AdSlot
          placement="footer_banner"
          width={970}
          height={90}
        />
      </div>

    </div>
  )
}