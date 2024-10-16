import { atom } from "jotai"

const slidesModule = [
  (p) => import("@/slides/slide-000.mdx"),
  (p) => import("@/slides/slide-010.mdx"),
  (p) => import("@/slides/slide-020.mdx"),
  (p) => import("@/slides/slide-030.mdx"),
  (p) => import("@/slides/slide-040.mdx"),
  (p) => import("@/slides/slide-050.mdx"),
  (p) => import("@/slides/slide-060.mdx"),
  (p) => import("@/slides/slide-070.mdx"),
  (p) => import("@/slides/slide-080.mdx"),
]

const initialY = new Array(slidesModule.length).fill(0)

export const currentSlideAtom = atom({
  x: 0, // start at zero
  y: initialY, // fill with an array of 0s based on the number of slideModules
})

export const slidesAtom = atom(async (get) => {
  const loadedSlides = await Promise.all(slidesModule.map((load) => load()))

  return loadedSlides
})

// example
// const currentSlideAtom = {
//   x: 1, // value = current position of horizontal slide
//   y: [0, 0, 1, 2, 0, 1, 0, 0], // length = num of Slides; value = current position of vertical slide
// }

export const MIN_VALUE = 0
export const MAX_VALUE = slidesModule.length //- 1

// currentXCountAtom
export const currentHorizontalAtom = atom(0, (get, set, update) => {
  const newValue =
    typeof update === "function" ? update(get(currentHorizontalAtom)) : update
  set(currentHorizontalAtom, Math.min(Math.max(newValue, MIN_VALUE), MAX_VALUE))
})

export const currentVerticalAtom = atom(0, (get, set, update) => {
  const newValue1 =
    typeof update === "function" ? update(get(currentVerticalAtom)) : update
  set(currentVerticalAtom, Math.min(Math.max(newValue1, 0), 10 - 1))
})
