import { NavigationTabs_artist } from "__generated__/NavigationTabs_artist.graphql"
import { Track, track as _track } from "Analytics"
import * as Schema from "Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "Styleguide/Components/RouteTabs"

interface Props {
  artist: NavigationTabs_artist
}

const track: Track<Props> = _track

@track()
export class NavigationTabs extends React.Component<Props> {
  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionTypes.Click,
    action_name: Schema.ActionNames.ArtistTab,
    context_module: "NavigationTabs",
    type: "Link",
    destination_path,
    tab,
  }))
  handleClick(tab: string, destination_path: string) {
    // no-op
  }

  renderTab(text: string, to: string, exact: boolean = false) {
    return (
      <RouteTab
        to={to}
        exact={exact}
        onClick={() => this.handleClick(text, to)}
      >
        {text}
      </RouteTab>
    )
  }

  render() {
    const { id, statuses } = this.props.artist
    const route = path => `/artist2/${id}${path}`

    return (
      <RouteTabs>
        {this.renderTab("Overview", route(""), true)}
        {statuses.cv && this.renderTab("CV", route("/cv"))}
        {statuses.articles && this.renderTab("Articles", route("/articles"))}
        {statuses.shows && this.renderTab("Shows", route("/shows"))}
        {statuses.auction_lots &&
          this.renderTab("Auction results", route("/auction-results"))}
        {(statuses.artists || statuses.contemporary) &&
          this.renderTab("Related artists", route("/related-artists"))}
      </RouteTabs>
    )
  }
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  graphql`
    fragment NavigationTabs_artist on Artist {
      id
      statuses {
        shows
        artists
        contemporary
        articles
        cv
        auction_lots
      }
    }
  `
)
