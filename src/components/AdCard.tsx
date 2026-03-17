export default function AdCard({ ad }: any) {
  return (
    <a
      href={ad.redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <img
        src={ad.imageUrl}
        alt={ad.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </a>
  )
}