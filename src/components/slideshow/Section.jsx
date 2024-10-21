import React from "react"
import { useAtom } from "jotai"
import { styled } from "styled-components"
import classNames from "classnames"
import { COLOR_SECTION, COLOR_CARD } from "@/store/base"
import { explosionViewAtom } from "@/store/atoms"

const Section = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${COLOR_SECTION};

  flex: none;

  &.explosion {
    outline: 0.4rem solid white;
  }

  &:first-of-type {
    background-color: ${COLOR_CARD};
  }
`

// layout: center || grid || intro || outro
const FlexSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
const GridSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;

  h1,
  h3 {
    grid-column: 2 / 12;
    grid-row: 6 / 7;
  }
  h2,
  h4 {
    grid-column: 2 / 12;
    grid-row: 7 / 8;
  }

  &.intro {
    h1,
    h3 {
      align-self: end;
      justify-self: start;
    }

    h2,
    h4 {
      align-self: start;
      justify-self: start;
    }
  }
  &.outro {
    h1,
    h3 {
      align-self: end;
      justify-self: end;
    }

    h2,
    h4 {
      align-self: start;
      justify-self: end;
    }
  }
`

export const SectionWrapper = React.memo((props) => {
  const [explosionView] = useAtom(explosionViewAtom)

  // type: normal || scroll || three
  // layout: center || grid || intro || outro
  const sectionClassNames = classNames({
    explosion: explosionView,
    [props.el.type || "simple"]: true,
    active: props.currentSection === props.index && props.active,
  })

  // return <Section className={sectionClassNames}>{props.children}</Section>
  if (props.el.layout === "center")
    return (
      <FlexSection className={sectionClassNames}>{props.children}</FlexSection>
    )

  if (props.el.layout === "grid")
    return (
      <GridSection className={sectionClassNames}>{props.children}</GridSection>
    )

  // Default return if no conditions are met
  return (
    <FlexSection className={sectionClassNames}>{props.children}</FlexSection>
  )
})
