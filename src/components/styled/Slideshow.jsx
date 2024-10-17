import { useEffect, useState } from "react"
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
import { GAP_EXPLOSION } from "../../store/base"

// Vertical Srcoll
const Main = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  will-change: transform;
  transition: 0.5s transform linear;
  gap: 0 10rem;
  transform: translateX(
    calc(
      ${(props) => props.currentArticle * -100}% -
        ${(props) => props.currentArticle * props.gap}rem
    )
  );
  &.explosion {
    /* transition: none; */
    gap: 0 ${GAP_EXPLOSION}rem;
    transition: calc(0.5s / 4) transform linear;
  }
`

// Horizontal Srcoll
const Article = styled.article`
  width: 100%;
  height: 100%;
  /* flex: 0 0 auto; */
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;

  z-index: 10;
  flex-direction: column;
  will-change: transform;
  transition: 0.5s transform linear;
  gap: ${GAP_EXPLOSION}rem;
  transform: translateY(
    calc(
      ${(props) => props.currentSection * -100}% -
        ${(props) => props.currentSection * props.gap}rem
    )
  );

  &:first-child > section {
    background-color: ${COLOR_BACKGROUND_INTRO};
  }

  &.explosion {
    transition: calc(0.5s / 4) transform linear;
    display: flex;
  }
`

export const Section = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1rem;
  z-index: 1;
  background-color: ${COLOR_BACKGROUND};

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
