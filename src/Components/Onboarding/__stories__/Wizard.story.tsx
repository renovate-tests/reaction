import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "../../Artsy"
import { Wizard } from "../Wizard"

storiesOf("⚠️Legacy/Onboarding", module).add("Wizard", () => {
  return (
    <div>
      <ContextProvider>
        <Wizard />
      </ContextProvider>
    </div>
  )
})
