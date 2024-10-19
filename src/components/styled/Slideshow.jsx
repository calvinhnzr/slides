import { useEffect, useState, useCallback, memo } from "react"
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

  &::before {
  }

  &.explosion {
    transform-origin: center;
    transform: scale(0.15);
    overflow: visible;

    background-color: ${COLOR_BACKGROUND_EXPLOSION};
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
  }
  &:last-child > section {
    background-color: ${COLOR_BACKGROUND_INTRO};
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

export const Slideshow = memo(({ data, max }) => {
  const [currentArticle, setCurrentArticle] = useAtom(currentArticleAtom)
  const [explosionView] = useAtom(explosionViewAtom)
  const [currentSection, setCurrentSection] = useState(0)
  const mainClassNames = classNames({
    explosion: explosionView,
  })

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "ArrowRight":
          if (currentArticle < max) {
            setCurrentArticle((prev) => prev + 1)
          }
          break
        case "ArrowLeft":
          if (currentArticle > 0) {
            setCurrentArticle((prev) => prev - 1)
          }
          break
        case "ArrowDown":
          if (currentSection < data[currentArticle].length - 1) {
            setCurrentSection((prev) => prev + 1)
          }
          break
        case "ArrowUp":
          if (currentSection > 0) {
            setCurrentSection((prev) => prev - 1)
          }
          break
      }
    },
    [currentArticle, currentSection, data, max, setCurrentArticle]
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
        className={mainClassNames}
        gap={GAP_EXPLOSION}
      >
        {data.map((article, articleIndex) => (
          <Article
            key={articleIndex}
            currentSection={currentSection}
            className={mainClassNames}
            gap={GAP_EXPLOSION}
          >
            {article.map((section, sectionIndex) => {
              const el = section[0]
              return (
                <SectionWrapper
                  key={sectionIndex}
                  el={el}
                  currentSection={currentSection}
                  currentArticle={currentArticle}
                  articleIndex={articleIndex}
                  sectionIndex={sectionIndex}
                >
                  {<el.default />}
                </SectionWrapper>
              )
            })}
          </Article>
        ))}
      </Main>
    </Div>
  )
})

const SectionWrapper = memo((props) => {
  const [explosionView] = useAtom(explosionViewAtom)

  const sectionClassNames = classNames({
    explosion: explosionView,
    [props.el.type || "simple"]: true,
    currentSlide: props.isCurrentSlide,
    active:
      props.currentSection === props.sectionIndex &&
      props.currentArticle === props.articleIndex,
  })

  return <Section className={sectionClassNames}>{props.children}</Section>
})
