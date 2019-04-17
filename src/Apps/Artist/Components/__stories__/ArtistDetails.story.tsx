import { color, Flex, Input, Sans, Spacer } from "@artsy/palette"
import React, { useState } from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { ArtistDetails } from "../ArtistDetails"

const ArtistDetailsStory = () => {
  const [artistId, setArtistId] = useState("")

  return (
    <Section title="ArtistDetails">
      <Flex flexDirection="column" width="400px">
        <Input
          title="Artist ID or Slug"
          placeholder="e.g. banksy"
          onChange={ev => setArtistId(ev.currentTarget.value)}
        />
        <Spacer mb={2} />
        <Flex background={color("black5")} p={2}>
          {artistId.trim() ? (
            <ArtistDetails id={artistId.trim()} />
          ) : (
            <Sans size="3" color="black60">
              Please type an artist id
            </Sans>
          )}
        </Flex>
      </Flex>
    </Section>
  )
}

storiesOf("Apps/Artist", module).add("ArtistDetails", () => (
  <ArtistDetailsStory />
))
