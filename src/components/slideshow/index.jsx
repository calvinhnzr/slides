import React from "react"
import { useAtom } from "jotai"
import { styled } from "styled-components"
import { COLOR_SECTION, COLOR_CARD } from "@/store/base"
import { explosionViewAtom } from "@/store/atoms"
import "@/styles/Slide.css"

import { MainWrapper } from "./Main"
import { ArticleWrapper } from "./Article"
import { SectionWrapper } from "./Section"

// Explosion
const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: ${COLOR_CARD};

  will-change: transform;

  &.explosion {
    transform-origin: center;
    transform: scale(0.15);
    overflow: visible;
    background: none;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;

      z-index: 1;
      background: none;
      outline: 2rem solid white;
    }
  }
`

export const Slideshow = React.memo(({ data, max }) => {
  const [explosionView] = useAtom(explosionViewAtom)

  return (
    <Div className={explosionView ? "explosion" : null}>
      {data.map((main, mainIndex) => (
        <MainWrapper key={mainIndex} max={main.length - 1} index={mainIndex}>
          {main.map((article, articleIndex) => (
            <ArticleWrapper
              key={articleIndex}
              max={article.length - 1}
              index={articleIndex}
            >
              {article.map((section, sectionIndex) => {
                const el = section[0]
                return (
                  <SectionWrapper
                    el={el}
                    key={sectionIndex}
                    index={sectionIndex}
                  >
                    <el.default />
                  </SectionWrapper>
                )
              })}
            </ArticleWrapper>
          ))}
        </MainWrapper>
      ))}
    </Div>
  )
})
