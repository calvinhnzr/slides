import { atom } from "jotai"

const modules = import.meta.glob("@/pages/*/*.mdx")

export const currentSlideAtom = atom({
  x: 0,
  y: [],
})

export const slidesAtom = atom(async (get) => {
  const nestedSlides = {}

  for (const path in modules) {
    const module = await modules[path]()
    const parts = path.split("/").slice(2) // Adjust this based on your path structure

    let current = nestedSlides
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]

      if (i === parts.length - 1) {
        // Last part, assign the module

        if (!current[part]) {
          current[part] = []
        }
        current[part].push(module)
      } else {
        // Intermediate part, create nested object if not exists
        if (!current[part]) {
          current[part] = {}
        }
        current = current[part]
      }
    }
  }

  // Convert nested object structure to nested array structure
  const convertToArray = (obj) => {
    if (Array.isArray(obj)) {
      return obj
    }
    return Object.values(obj).map(convertToArray)
  }
  const nestedArray = convertToArray(nestedSlides)
  return nestedArray
})
