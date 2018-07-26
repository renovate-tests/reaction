import { Serif } from "@artsy/palette"
import React, { Component } from "react"
import { BorderBox, Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"

interface ItemSummaryProps {}

export class ItemSummary extends Component<ItemSummaryProps> {
  render() {
    return (
      <BorderBox p={3} flexDirection="row">
        <Box height="auto">
          <Image
            src={
              "https://d32dm0rphc51dk.cloudfront.net/wefz0H1Ewk3KjdwXbyTIbQ/medium.jpg"
            }
            width="55px"
            mr={1}
          />
        </Box>
        <Flex flexDirection="column">
          <Serif size="2" weight="semibold" color="black60">
            Francesca DiMattio
          </Serif>
          <Serif italic size="2" color="black60">
            The Fox and the Hound, 2018
          </Serif>
          <Serif size="2" color="black60">
            Salon 94
          </Serif>
          <Serif size="2" color="black60">
            New York, NY
          </Serif>
        </Flex>
      </BorderBox>
    )
  }
}
