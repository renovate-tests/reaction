import { Box, Sans, space, Spacer } from "@artsy/palette"
import { RelatedCollectionsRail_collections } from "__generated__/RelatedCollectionsRail_collections.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import { once, take } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import { data as sd } from "sharify"
import styled from "styled-components"
import Events from "Utils/Events"
import { RelatedCollectionEntityFragmentContainer as RelatedCollectionEntity } from "./RelatedCollectionEntity"

interface RelatedCollectionsRailProps {
  collections: RelatedCollectionsRail_collections
}

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class RelatedCollectionsRail extends React.Component<
  RelatedCollectionsRailProps
> {
  @track({
    action_type: Schema.ActionType.Impression,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Collection,
  })
  trackImpression() {
    // noop
  }

  @track({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Collection,
    type: Schema.Type.Button,
    subject: Schema.Subject.ClickedNextButton,
  })
  trackCarouselNav() {
    // noop
  }

  render() {
    const { collections } = this.props
    if (collections.length > 3) {
      return (
        <Box>
          <Waypoint onEnter={once(this.trackImpression.bind(this))} />
          <Sans size="3" weight="medium">
            Browse by iconic collections
          </Sans>
          <Spacer pb={1} />

          <Carousel
            height="200px"
            options={{
              groupCells: sd.IS_MOBILE ? 1 : 4,

              cellAlign: "left",
              wrapAround: sd.IS_MOBILE ? true : false,
              pageDots: false,
              draggable: sd.IS_MOBILE ? true : false,
            }}
            onArrowClick={this.trackCarouselNav.bind(this)}
            data={take(collections, 8)}
            render={slide => {
              return <RelatedCollectionEntity collection={slide} />
            }}
            renderLeftArrow={({ Arrow }) => {
              return (
                <ArrowContainer>
                  <Arrow />
                </ArrowContainer>
              )
            }}
            renderRightArrow={({ Arrow }) => {
              return (
                <ArrowContainer>
                  {collections.length > 4 && <Arrow />}
                </ArrowContainer>
              )
            }}
          />
        </Box>
      )
    } else {
      return null
    }
  }
}

const ArrowContainer = styled(Box)`
  position: relative;

  ${ArrowButton} {
    top: -${space(3)}px;
  }
`

export const RelatedCollectionsRailFragmentContainer = createFragmentContainer(
  RelatedCollectionsRail,
  {
    collections: graphql`
      fragment RelatedCollectionsRail_collections on MarketingCollection
        @relay(plural: true) {
        ...RelatedCollectionEntity_collection
      }
    `,
  }
)
