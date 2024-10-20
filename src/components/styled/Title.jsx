import { styled } from "styled-components"

// Intro, Outro
export const Title = styled.h1`
  font-size: 4.5rem;
  font-size: clamp(4.5rem, 5vw, 6rem);
  font-weight: bold;
`

export const SubTitle = styled.h2`
  font-size: 2.25rem;
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 100;
  font-style: italic;
  line-height: 1.1;
`

// Sections
export const Headline = styled.h3`
  font-size: 3rem;
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: bold;
  line-height: 1.2;
`

export const SubHeadline = styled.h4`
  font-size: 2.5rem;
  font-size: clamp(2rem, 5vw, 2.7rem);
  font-weight: 300;
  line-height: 1;
`
