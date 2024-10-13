import { styled } from "styled-components"
import { useAtom } from "jotai"
import { MIN_VALUE, MAX_VALUE, countAtom } from "@/store/atoms"

const Main = styled.main`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  transition: 0.5s transform linear;
  will-change: transform;
  transform: translateX(${(props) => props.current * -100}%);
`

const Slideshow = (props) => {
  const [count] = useAtom(countAtom)

  return <Main current={count}>{props.children}</Main>
}

export default Slideshow
