import React, { useState } from "react"
import { useAtom } from "jotai"
import { styled } from "styled-components"
import classNames from "classnames"
import { COLOR_OUTRO, COLOR_INTRO, COLOR_SECTION } from "@/store/base"
import { explosionViewAtom } from "@/store/atoms"
import "@/styles/Slide.css"
import { GAP_EXPLOSION } from "@/store/base"
import useKeydown from "@/hooks/useKeydown"

// Horizontal Scroll
export const Article = styled.article`
  width: 100%;
  height: 100%;

  &:first-child > section {
    background-color: ${COLOR_INTRO};
  }
  &:last-child > section {
    background-color: ${COLOR_OUTRO};
  }

  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  gap: ${GAP_EXPLOSION}rem;

  background-color: ${COLOR_SECTION};
  background-color: blue;

  transition: 0.3s transform linear;
  will-change: transform;
  transform: translateY(
    calc(
      ${(props) => props.currentSection * -100}% -
        ${(props) => props.currentSection * props.gap}rem
    )
  );

  &.explosion {
    background: none;
    transition: calc(0.5s / 4) transform linear;
    display: flex;
  }
`

export const ArticleWrapper = React.memo((props) => {
  const [explosionView] = useAtom(explosionViewAtom)
  const [currentSection, setCurrentSection] = useState(0)

  const articleClassNames = classNames({
    explosion: explosionView,
    active: props.currentArticle === props.index,
  })

  useKeydown((event) => {
    if (props.currentArticle === props.index) {
      switch (event.key) {
        case "ArrowDown":
          if (currentSection < props.max) setCurrentSection((prev) => prev + 1)
          break
        case "ArrowUp":
          if (currentSection > 0) setCurrentSection((prev) => prev - 1)
          break
      }
    }
  })

  return (
    <Article
      currentSection={currentSection}
      className={articleClassNames}
      gap={GAP_EXPLOSION}
    >
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, {
          currentSection,
          active: props.currentArticle === props.index,
        })
      )}
    </Article>
  )
})
