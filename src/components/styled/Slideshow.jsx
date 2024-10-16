import { styled } from "styled-components"
import { COLOR_BACKGROUND, COLOR_BACKGROUND_DARK } from "@/store/base"
import "@/styles/Slide.css"
import { useState } from "react"

// Vertical Srcoll
export const Main = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  transition: 0.5s transform linear;
  will-change: transform;
  transform: translateX(${(props) => props.$currentSlideX * -100}%);
`

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
    /* only trigger animation when scroll down not sideways */
    transform: translateY(${(props) => props.$currentSlideY * -100}%);
  }
  background-color: ${COLOR_BACKGROUND};
  &:first-of-type {
    background-color: ${COLOR_BACKGROUND_DARK};
  }
`

export const Section = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;
`

// Article
const Slideshow = (props) => {
  const [currentPosition, setCurrentPosition] = useState(0)

  return <Article>{props.children}</Article>
}
