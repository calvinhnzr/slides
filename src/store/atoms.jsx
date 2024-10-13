import { atom } from "jotai"

const slidesModule = [
  (p) => import("@/slides/slide-000.mdx"),
  (p) => import("@/slides/slide-010.mdx"),
  (p) => import("@/slides/slide-020.mdx"),
  (p) => import("@/slides/slide-030.mdx"),
]

export const slidesAtom = atom(async (get) => {
  const loadedSlides = await Promise.all(slidesModule.map((load) => load()))
  return loadedSlides
})

export const MIN_VALUE = 0
export const MAX_VALUE = slidesModule.length - 1

export const countAtom = atom(0, (get, set, update) => {
  const newValue =
    typeof update === "function" ? update(get(countAtom)) : update
  set(countAtom, Math.min(Math.max(newValue, MIN_VALUE), MAX_VALUE))
})
