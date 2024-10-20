import React, { useEffect, useState, useCallback } from "react"
import { useAtom } from "jotai"
import { styled } from "styled-components"
import classNames from "classnames"
import {
  COLOR_BACKGROUND_EXPLOSION,
  COLOR_BACKGROUND,
  COLOR_BACKGROUND_INTRO,
} from "@/store/base"
import { currentArticleAtom, explosionViewAtom } from "@/store/atoms"
import "@/styles/Slide.css"

export const Section = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${COLOR_BACKGROUND};
  background-color: #626f82;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;

  flex: none;

  &.explosion {
    outline: 0.4rem solid white;
  }

  > * {
    height: 100%;
    width: 100%;
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
