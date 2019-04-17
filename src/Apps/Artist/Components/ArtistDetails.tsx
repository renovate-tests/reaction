import { Flex, Sans, Spinner } from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"

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

function useJson(url: string): [any, { loading: boolean; error: Error }] {
  const [data, setData] = useState(undefined)
  const [error, setError] = useState<Error | null>(null)
  const abortController = useRef<AbortController>(null)

  useEffect(() => {
    // reset data+error to 'undefined' to show the loading spinner
    setData(undefined)
    setError(null)
    // If there is an in-flight request already, abort it.
    if (abortController.current) {
      abortController.current.abort()
    }

    const controller = new AbortController()

    // make a new abortable request
    abortController.current = controller
    fetch(url, {
      signal: controller.signal,
      headers: {
        // make sure to replace <YOUR_ACCESS_TOKEN> by logging in to staging,
        // then running `copy(sd.CURRENT_USER.accessToken)` in the dev tools
        // console, and then pasting it in here.
        "X-Xapp-Token": "<YOUR_ACCESS_TOKEN>",
      },
    })
      .then(response => {
        if (response.status >= 300) {
          throw new Error("Got HTTP " + response.status)
        }
        return response.json()
      })
      .then(setData)
      .then(() => setError(null))
      .catch(e => {
        // note that aborted requests manifest as errors here, so we need to
        // check that this request was not aborted
        if (abortController.current !== controller) {
          return
        }
        setError(e)
      })
  }, [url])

  return [data, { loading: data === undefined && !error, error }]
}
