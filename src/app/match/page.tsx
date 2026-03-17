import AdSlot from "../../components/AdSlot"

export default function MatchPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>

      <h1>Match Page</h1>

      <p>Live Score Section</p>

      {/* MATCH INLINE AD */}
      <AdSlot
        placement="match_inline"
        width={728}
        height={90}
      />

      <p>Ball by Ball Commentary...</p>

      {/* FOOTER AD */}
      <AdSlot
        placement="footer_banner"
        width={970}
        height={90}
      />

    </div>
  )
}