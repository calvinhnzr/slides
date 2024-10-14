// import { styled } from "styled-components"
import styled from "@emotion/styled"

import { useAtom } from "jotai"
import {
  MIN_VALUE,
  MAX_VALUE,
  currentHorizontalAtom,
  currentVerticalAtom,
} from "@/store/atoms"
import { COLOR_BACKGROUND, COLOR_BACKGROUND_DARK } from "@/store/base"
import "@/global/Slide.css"

// Vertical Srcoll
const Main = styled.main`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  transition: 0.5s transform linear;
  will-change: transform;
  transform: translateX(${(props) => props.currentHorizont * -100}%);
`

export const Slideshow = (props) => {
  const [currentHorizont] = useAtom(currentHorizontalAtom)

  return <Main currentHorizont={currentHorizont}>{props.children}</Main>
}

// Horizontal Srcoll
export const Article = styled.article`
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  &.subslide {
    display: flex;
    flex-direction: column;
    transition: 0.5s transform linear;
    will-change: transform;
    transform: translateY(${(props) => props.$currentVertical * -100}%);
  }
  background-color: ${COLOR_BACKGROUND};
  &:first-of-type {
    background-color: ${COLOR_BACKGROUND_DARK};
  }
  .normal {
    /*  */
  }
`

// export const StylesArticle = () => {
//   const [currentVertical] = useAtom(currentVerticalAtom)
//   return <Article currentVertical={currentVertical}>{props.children}</Article>
// }

// layout
export const Grid = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  gap: 1rem;
`
