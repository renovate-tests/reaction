import { space } from "@artsy/palette"
import { fadeIn, fadeOut } from "Assets/Animations"
import Colors from "Assets/Colors"
import { garamond, unica } from "Assets/Fonts"
import React, { useState } from "react"
import styled from "styled-components"
import { borderedInput } from "./Mixins"

import { ExtractProps } from "Utils/ExtractProps"
import { InputError } from "./Input"

export interface QuickInputProps extends ExtractProps<typeof InputComponent> {
  block?: boolean
  error?: string
  label?: string
  note?: string
  rightAddOn?: JSX.Element
  setTouched?: (fields: { [field: string]: boolean }) => void
  touchedOnChange?: boolean
}

export interface QuickInputState {
  focused: boolean
  value: string
}

/**
 * Quick input. Renders the label inside of the textbox.
 *
 */
export function QuickInput(props: QuickInputProps) {
  const [name, setName] = useState(props.name)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState((props.value as string) || "")

  if (props.name !== name) {
    setName(props.name)
    setValue("")
  }

  const onFocus = e => {
    setFocused(true)

    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const onBlur = e => {
    if (props.setTouched) {
      props.setTouched({ [name]: true })
    }
    setFocused(false)

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const onChange = e => {
    if (props.touchedOnChange && props.setTouched) {
      props.setTouched({ [name]: true })
    }
    setValue(e.currentTarget.value)

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const {
    error,
    className,
    label,
    ref: _ref,
    setTouched,
    rightAddOn,
    note,
    ...newProps
  } = props
  const showLabel = (!!focused || !!value) && !!label

  return (
    <Container>
      <InputContainer
        hasLabel={!!label}
        hasError={!!error}
        className={focused ? "focused" : ""}
      >
        <Label out={!showLabel}>{label}</Label>
        <InputComponent
          {...newProps}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          showLabel={showLabel}
        />
        {rightAddOn}
      </InputContainer>
      {note && <InputNote>{note}</InputNote>}
      {error && <InputError>{error}</InputError>}
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: ${space(0.5)}px;
`

const InputComponent = styled.input`
  ${garamond("s17")};
  border: 0;
  outline: none;
  flex: 1;
  transition: all 0.25s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 ${space(1)}px;
  line-height: initial;
  ${(props: { showLabel?: boolean }) =>
    props.showLabel && `padding: ${space(1)}px ${space(1)}px 0 ${space(1)}px`};
`

const InputContainer = styled.div.attrs<{
  hasLabel?: boolean
  hasError: boolean
}>({})`
  ${borderedInput};
  margin-right: 0;
  margin-top: ${space(0.5)}px;
  margin-bottom: ${space(1)}px;
  display: flex;
  position: relative;
  height: ${p => (p.hasLabel ? `${space(4)}px` : `${space(2)}px`)};
  flex-direction: row;
  align-items: center;
  box-sizing: content-box;
`

const Label = styled.label.attrs<{ out: boolean }>({})`
  ${unica("s12", "medium")};
  position: absolute;
  left: ${space(1)}px;
  top: ${space(1)}px;
  visibility: ${p => (p.out ? "hidden" : "visible")};
  animation: ${p => (p.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 0.2s linear;
  z-index: 1;
`

const InputNote = styled.div`
  ${unica("s12")};
  margin-top: ${space(1)}px;
  color: ${Colors.graySemibold};
  height: 16px;
`

export default QuickInput
