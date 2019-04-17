import { Flex, Sans, Spinner } from "@artsy/palette"
import React from "react"

export function ArtistDetails({ id }: { id: string }) {
  const [artist, { loading, error }] = useJson(
    `https://stagingapi.artsy.net/api/v1/artist/${id}`
  )

  if (loading) {
    return (
      <Flex position="relative" id="banana" flexGrow="1">
        <Spinner />
        &nbsp;
      </Flex>
    )
  }

  if (error) {
    return (
      <Sans size="3" color="black60">
        {error.message}
      </Sans>
    )
  }

  return artist.hometown ? (
    <Sans size="3" color="black60">
      {artist.name} is from {artist.hometown}
    </Sans>
  ) : (
    <Sans size="3" color="black60">
      {artist.name} is of unknown origin.
    </Sans>
  )
}

function useJson(
  url: string
): [any, { loading: boolean; error: Error | null }] {
  // TODO: implement me
  return [
    { name: "David", hometown: "Brighton, United Kingdom" },
    { loading: false, error: null },
  ]
}
