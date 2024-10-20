import React from "react"
import { useAtom } from "jotai"
import { styled } from "styled-components"
import classNames from "classnames"
import { COLOR_SECTION, COLOR_CARD } from "@/store/base"
import { explosionViewAtom } from "@/store/atoms"
import "@/styles/Slide.css"

export const Section = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${COLOR_SECTION};

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;

  flex: none;

  &.explosion {
    outline: 0.4rem solid white;
  }

  &:first-of-type {
    background-color: ${COLOR_CARD};
  }
`

export const SectionWrapper = React.memo((props) => {
  const [explosionView] = useAtom(explosionViewAtom)

  const sectionClassNames = classNames({
    explosion: explosionView,
    [props.el.type || "simple"]: true,
    active: props.currentSection === props.index && props.active,
  })

  return <Section className={sectionClassNames}>{props.children}</Section>
})
