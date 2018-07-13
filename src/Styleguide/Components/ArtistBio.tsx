import { ArtistBio_bio } from "__generated__/ArtistBio_bio.graphql"
import { track } from "Analytics"
import * as Schema from "Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { ReadMore } from "./ReadMore"

interface Props {
  bio: ArtistBio_bio
}

@track({ context_module: "Artist bio" })
export class ArtistBio extends React.Component<Props> {
  @track({
    action_type: Schema.ActionTypes.Click,
    action_name: Schema.ActionNames.ReadMoreExpanded,
  })
  handleExpand() {
    // no-op
  }

  render() {
    const blurb = (
      <div
        dangerouslySetInnerHTML={{
          __html: this.props.bio.biography_blurb.text,
        }}
      />
    )

    return (
      <Responsive>
        {({ xs }) => {
          if (xs) {
            return (
              <ReadMore onExpand={this.handleExpand.bind(this)}>
                {blurb}
              </ReadMore>
            )
          } else {
            return (
              <ReadMore
                onExpand={this.handleExpand.bind(this)}
                maxLineCount={7}
              >
                {blurb}
              </ReadMore>
            )
          }
        }}
      </Responsive>
    )
  }
}

export const ArtistBioFragmentContainer = createFragmentContainer(
  ArtistBio,
  graphql`
    fragment ArtistBio_bio on Artist {
      biography_blurb(format: HTML, partner_bio: true) {
        text
        credit
      }
    }
  `
)
