import { styled } from "styled-components"

// Headline
export const h1 = styled.h1`
  font-size: clamp(4.5rem, 5vw, 6rem);
  font-weight: bold;
  text-align: center;
`
export const h2 = styled.h2`
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 300;
  text-align: center;
`
export const h3 = styled.h3`
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: bold;
  line-height: 1.2;
  text-align: center;
`
export const h4 = styled.h4`
  font-size: clamp(2rem, 5vw, 2.7rem);
  font-weight: 300;
  line-height: 1;
  text-align: center;
`

export const Mark = styled.span`
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    display: block;
    background-color: #81ad97;
    width: 105%;
    height: 2.3rem;
    bottom: -0.2rem;
    left: -2.5%;
    left: -2.5%;
  }
`

// Paragraph
export const p = styled.p`
  font-size: clamp(1.2rem, 5vw, 1.5rem);
`

// Link
export const a = styled.a`
  color: white;
  text-decoration: underline 8px #4c5869;
`

// Highlight
export const Em = styled.em`
  &::before {
    content: "»";
    content: "„";
  }

  &::after {
    content: "«";
    content: "“";
  }
`

// Italic
export const i = styled.i`
  font-style: italic;
`
