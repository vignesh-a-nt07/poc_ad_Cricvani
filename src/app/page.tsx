import AdSlot from "../components/AdSlot"
import DeviceDebugger from "../components/DeviceDebugger"

export default function Page() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        CricVani Homepage
      </h1>

      {/* HEADER AD */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AdSlot placement="header_banner" mobileWidth="100%" tabletWidth="728px" desktopWidth="970px" />
      </div>

      {/* MAIN LAYOUT — content + sidebar side by side, stacks on small screens */}
      <div style={{ display: "flex", gap: "30px", marginTop: "30px", flexWrap: "wrap" }}>

        {/* MAIN CONTENT */}
        <div style={{ flex: "1 1 500px", minWidth: 0 }}>
          <h2 style={{ marginTop: 0 }}>Live Matches</h2>

          <p>Match list UI here...</p>

          {/* INLINE AD */}
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <AdSlot placement="match_inline" mobileWidth="100%" tabletWidth="468px" desktopWidth="728px" />
          </div>

          <p>Commentary section...</p>
        </div>

        {/* SIDEBAR */}
        <aside style={{ flex: "0 0 300px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <AdSlot placement="sidebar_top" mobileWidth="100%" tabletWidth="300px" desktopWidth="300px" />
          <AdSlot placement="sidebar_middle" mobileWidth="100%" tabletWidth="300px" desktopWidth="300px" />
        </aside>

      </div>

      {/* FOOTER AD */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "60px", marginBottom: "20px" }}>
        <AdSlot placement="footer_banner" mobileWidth="100%" tabletWidth="728px" desktopWidth="970px" />
      </div>

      {/* Device Debug Info (remove in production) */}
      <DeviceDebugger />
    </div>
  )
}