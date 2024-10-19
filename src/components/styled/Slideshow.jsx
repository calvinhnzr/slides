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
import { GAP_EXPLOSION } from "../../store/base"

// Explosion
const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${COLOR_BACKGROUND};
  background: #626f82;
  will-change: transform;
  &::before {
  }

  &.explosion {
    transform-origin: center;
    transform: scale(0.15);
    overflow: visible;

    background-color: ${COLOR_BACKGROUND_EXPLOSION};
    background: none;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      /* background-color: ${COLOR_BACKGROUND}; */
      z-index: 10;
      background: none;
      outline: 2rem solid white;
    }
  }
`

// Vertical Scroll
const Main = styled.main`
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

// Horizontal Scroll
const Article = styled.article`
  width: 100%;
  height: 100%;
  &:first-child > section {
    background-color: ${COLOR_BACKGROUND_INTRO};
    background-color: #cd4d4d;
  }
  &:last-child > section {
    background-color: ${COLOR_BACKGROUND_INTRO};
    background-color: #81ad97;
  }

  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  gap: ${GAP_EXPLOSION}rem;

  transition: 0.5s transform linear;
  will-change: transform;
  transform: translateY(
    calc(
      ${(props) => props.currentSection * -100}% -
        ${(props) => props.currentSection * props.gap}rem
    )
  );

  &.explosion {
    transition: calc(0.5s / 4) transform linear;
    display: flex;
  }
`

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

export const Slideshow = React.memo(({ data, max }) => {
  const [currentArticle, setCurrentArticle] = useAtom(currentArticleAtom)
  const [explosionView] = useAtom(explosionViewAtom)
  const mainClassNames = classNames({
    explosion: explosionView,
  })

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight" && currentArticle < max) {
        setCurrentArticle((prev) => prev + 1)
      } else if (event.key === "ArrowLeft" && currentArticle > 0) {
        setCurrentArticle((prev) => prev - 1)
      }
    },
    [currentArticle, max, setCurrentArticle]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <Div className={mainClassNames}>
      <Main
        currentArticle={currentArticle}
        className={explosionView ? "explosion" : ""}
        gap={GAP_EXPLOSION}
      >
        {data.map((article, index) => (
          <ArticleWrapper
            key={index}
            index={index}
            max={article.length - 1}
            currentArticle={currentArticle}
            article={article}
          />
        ))}
      </Main>
    </Div>
  )
})

const ArticleWrapper = React.memo((props) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [explosionView] = useAtom(explosionViewAtom)

  const articleClassNames = classNames({
    explosion: explosionView,
    active: props.currentArticle === props.index,
  })

  const handleKeyDown = useCallback(
    (event) => {
      if (props.currentArticle === props.index) {
        if (event.key === "ArrowDown" && currentSection < props.max) {
          setCurrentSection((prev) => prev + 1)
        } else if (event.key === "ArrowUp" && currentSection > 0) {
          setCurrentSection((prev) => prev - 1)
        }
      }
    },
    [currentSection, props.currentArticle, props.index, props.max]
  )

  useEffect(() => {
    if (props.currentArticle === props.index) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown, props.currentArticle, props.index])

  return (
    <Article
      currentSection={currentSection}
      className={articleClassNames}
      gap={GAP_EXPLOSION}
    >
      {props.article.map((section, index) => {
        const el = section[0]
        return (
          <SectionWrapper
            key={index}
            index={index}
            currentSection={currentSection}
            active={props.currentArticle === props.index}
            el={el}
          >
            {<el.default />}
          </SectionWrapper>
        )
      })}
      {props.children}
    </Article>
  )
})

const SectionWrapper = React.memo((props) => {
  const [explosionView] = useAtom(explosionViewAtom)

  const sectionClassNames = classNames({
    explosion: explosionView,
    [props.el.type || "simple"]: true,
    active: props.currentSection === props.index && props.active,
  })

  return <Section className={sectionClassNames}>{props.children}</Section>
})
