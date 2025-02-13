import { OtherWorks_artwork } from "__generated__/OtherWorks_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkContextArtistFragmentContainer as ArtworkContextArtist } from "./ArtworkContexts/ArtworkContextArtist"
import { ArtworkContextAuctionQueryRenderer as ArtworkContextAuction } from "./ArtworkContexts/ArtworkContextAuction"
import { ArtworkContextFairFragmentContainer as ArtworkContextFair } from "./ArtworkContexts/ArtworkContextFair"
import { ArtworkContextPartnerShowFragmentContainer as ArtworkContextPartnerShow } from "./ArtworkContexts/ArtworkContextPartnerShow"

export interface OtherWorksContextProps {
  /** The artworkSlug to query */
  artworkSlug: string
  /** Used to exclude the current work from the currently-shown work from grid */
  artworkID: string
}

export const OtherWorksFragmentContainer = createFragmentContainer<{
  artwork: OtherWorks_artwork
}>(
  props => {
    const contextType =
      props.artwork.context && props.artwork.context.__typename
    const artworkSlug = props.artwork.id

    switch (contextType) {
      case "ArtworkContextAuction": {
        return (
          <ArtworkContextAuction
            artworkSlug={artworkSlug}
            artworkID={props.artwork._id}
            isClosed={props.artwork.sale.is_closed}
          />
        )
      }
      case "ArtworkContextFair": {
        return <ArtworkContextFair artwork={props.artwork} />
      }
      case "ArtworkContextPartnerShow": {
        return <ArtworkContextPartnerShow artwork={props.artwork} />
      }
      default: {
        return <ArtworkContextArtist artwork={props.artwork} />
      }
    }
  },
  {
    artwork: graphql`
      fragment OtherWorks_artwork on Artwork {
        ...ArtworkContextArtist_artwork
        ...ArtworkContextFair_artwork
        ...ArtworkContextPartnerShow_artwork

        id
        _id
        sale {
          is_closed
        }
        context {
          __typename
        }
      }
    `,
  }
)
