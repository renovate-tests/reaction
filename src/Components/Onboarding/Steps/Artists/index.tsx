import { throttle } from "lodash"
import React, { useCallback, useState } from "react"
import styled from "styled-components"

import Colors from "../../../../Assets/Colors"
import Input from "../../../Input"

import { MultiButtonState } from "../../../Buttons/MultiStateButton"
import { media } from "../../../Helpers"
import { StepProps } from "../../Types"
import { Layout } from "../Layout"
import ArtistList from "./ArtistList"

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid ${Colors.grayRegular};
  ${media.sm`
    width: 100%;
    margin-bottom: 20px;
  `};
`

export default function Artists(props: StepProps) {
  const [inputTextQuery, setInputTextQuery] = useState("")
  const [followCount, setFollowCount] = useState(0)

  const updateFollowCount = useCallback(
    (count: number) => setFollowCount(followCount + count),
    [followCount, setFollowCount]
  )

  const throttledTextChange = useCallback(
    throttle(e => setInputTextQuery(e.target.value)),
    [setInputTextQuery]
  )

  const submit = useCallback(() => {
    const increaseBy = followCount >= 4 ? 2 : 1
    props.onNextButtonPressed(increaseBy)
  }, [followCount])

  return (
    <Layout
      title="Who are your favorite artists?"
      subtitle="Follow one or more"
      onNextButtonPressed={submit}
      buttonState={
        followCount > 0
          ? MultiButtonState.Highlighted
          : MultiButtonState.Default
      }
    >
      <OnboardingSearchBox>
        <Input
          placeholder={"Search artists..."}
          block
          onInput={throttledTextChange}
          onPaste={throttledTextChange}
          onCut={throttledTextChange}
          autoFocus
        />
        <div style={{ marginBottom: "35px" }} />
        <ArtistList
          searchQuery={inputTextQuery}
          updateFollowCount={updateFollowCount}
        />
      </OnboardingSearchBox>
    </Layout>
  )
}

Artists.slug = "artists"
