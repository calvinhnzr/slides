import React, { useState } from "react"
import { useAtom } from "jotai"
import { styled } from "styled-components"
import { explosionViewAtom } from "@/store/atoms"
import "@/styles/Slide.css"
import { GAP_EXPLOSION } from "@/store/base"
import useKeydown from "@/hooks/useKeydown"
import { Progress } from "@/components/styled/Progress"

// Vertical Scroll
export const Main = styled.main`
  height: 100%;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: row;
  gap: 0 10rem;

  transition: 0.5s transform linear;
  will-change: transform;

  transform: translateX(
    calc(
      ${(props) => props.currentArticle * -100}% -
        ${(props) => props.currentArticle * props.gap}rem
    )
  );

  &.explosion {
    gap: 0 ${GAP_EXPLOSION}rem;
    transition: calc(0.5s / 4) transform linear;
  }
`

export const MainWrapper = React.memo((props) => {
  const [currentArticle, setCurrentArticle] = useState(0)
  // const [currentArticle, setCurrentArticle] = useAtom(currentArticleAtom)
  const [explosionView] = useAtom(explosionViewAtom)

  useKeydown((event) => {
    switch (event.key) {
      case "ArrowRight":
        if (currentArticle < props.max) setCurrentArticle((prev) => prev + 1)
        break
      case "ArrowLeft":
        if (currentArticle > 0) setCurrentArticle((prev) => prev - 1)
        break
    }
  })

  return (
    <>
      {!explosionView ? (
        <Progress max={props.max} value={currentArticle} />
      ) : null}
      <Main
        currentArticle={currentArticle}
        gap={GAP_EXPLOSION}
        className={explosionView ? "explosion" : ""}
      >
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, { currentArticle })
        )}
      </Main>
    </>
  )
})
