import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { styled } from "styled-components"
import classNames from "classnames"
import {
  COLOR_BACKGROUND,
  COLOR_BACKGROUND_DARK,
  GAP_EXPLOSION,
} from "@/store/base"
import { currentArticleAtom, explosionViewAtom } from "@/store/atoms"
import "@/styles/Slide.css"

// Vertical Srcoll
const Main = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  will-change: transform;
  transition: 0.5s transform linear;

  transform: translateX(${(props) => props.currentArticle * -100}%);
  &.explosion {
    /* transition: none; */
    gap: 0 ${GAP_EXPLOSION}rem;
    transition: calc(0.5s / 4) transform linear;
    transform: translateX(
      calc(
        ${(props) => props.currentArticle * -100}% -
          ${(props) => props.currentArticle * props.gap}rem
      )
    );
  }
`

// Horizontal Srcoll
const Article = styled.article`
  width: 100%;
  height: 100%;
  flex: 0 0 auto;

  flex-direction: column;
  will-change: transform;
  transition: 0.5s transform linear;

  transform: translateY(${(props) => props.currentSection * -100}%);

  background-color: ${COLOR_BACKGROUND};
  &:first-of-type {
    background-color: ${COLOR_BACKGROUND_DARK};
  }
  &.explosion {
    /* outline: 0.5rem solid blue; */
    /* transition: none; */
    transition: calc(0.5s / 4) transform linear;
    display: flex;
    gap: ${GAP_EXPLOSION}rem 0;
    transform: translateY(
      calc(
        ${(props) => props.currentSection * -100}% -
          ${(props) => props.currentSection * props.gap}rem
      )
    );
  }
`

export const Section = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;
  z-index: 70;
  &.explosion {
    outline: 0.4rem solid white;
  }
`

export const Slideshow = ({ data, max }) => {
  const [currentArticle, setCurrentArticle] = useAtom(currentArticleAtom)
  const [explosionView] = useAtom(explosionViewAtom)
  const mainClassNames = classNames({
    explosion: explosionView,
  })

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight":
        if (currentArticle < max) {
          setCurrentArticle(currentArticle + 1)
        }
        break
      case "ArrowLeft":
        if (currentArticle > 0) {
          setCurrentArticle(currentArticle - 1)
        }
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <Main
      currentArticle={currentArticle}
      className={mainClassNames}
      gap={GAP_EXPLOSION}
    >
      {data.map((article, index) => (
        <ArticleWrapper
          key={index}
          index={index}
          max={article.length - 1}
          currentArticle={currentArticle}
        >
          {article.map((section, index) => {
            const el = section[0]
            return (
              <SectionWrapper key={index} el={el}>
                {<el.default />}
              </SectionWrapper>
            )
          })}
        </ArticleWrapper>
      ))}
    </Main>
  )
}

const ArticleWrapper = (props) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [explosionView] = useAtom(explosionViewAtom)
  const articleClassNames = classNames({
    explosion: explosionView,
  })

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        if (currentSection < props.max) {
          setCurrentSection(currentSection + 1)
        }
        break
      case "ArrowUp":
        if (currentSection > 0) {
          setCurrentSection(currentSection - 1)
        }
        break
    }
  }

  useEffect(() => {
    if (props.currentArticle === props.index)
      window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <Article
      currentSection={currentSection}
      className={articleClassNames}
      gap={GAP_EXPLOSION}
    >
      {props.children}
    </Article>
  )
}

const SectionWrapper = (props) => {
  const [explosionView] = useAtom(explosionViewAtom)

  const sectionClassNames = classNames({
    explosion: explosionView,
    [props.el.type || "simple"]: true,
  })

  return <Section className={sectionClassNames}>{props.children}</Section>
}
