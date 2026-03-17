"use client"

import { useEffect, useState } from "react"
import AdCard from "./AdCard"

export default function AdSlot({
  placement,
  width,
  height
}: {
  placement: string
  width: number
  height: number
}) {

  const [ads, setAds] = useState<any[]>([])

  useEffect(() => {
    fetch(`/api/ads?placement=${placement}`)
      .then(res => res.json())
      .then(data => setAds(data))
  }, [placement])

  return (
    <div
      style={{
        width: width,
        height: height,
        border: "2px dashed #aaa",
        margin: "20px auto",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {ads.length > 0 ? (
        <AdCard ad={ads[0]} />
      ) : (
        <span>{placement}</span>
      )}
    </div>
  )
}