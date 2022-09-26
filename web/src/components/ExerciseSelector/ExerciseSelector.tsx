import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { ExercisesType } from 'src/components/ExercisesCell'

/* Functions */
// https://stackoverflow.com/questions/64957735/typeerror-cannot-assign-to-read-only-property-0-of-object-object-array-in
const sortExercises = (exercises: ExercisesType) => {
  return [...exercises].sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

const getNumbersBetween = (start: number, end: number) => {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx)
}

/* Types */
type Props = {
  exercises: ExercisesType
  handleExerciseSelect: (id: number) => void
}

/* Component */
const ExerciseSelector = ({ exercises, handleExerciseSelect }: Props) => {
  const [queriedExercises, updateQueriedExercises] = useState(null)
  const defaultExercises = useMemo(() => sortExercises(exercises), [exercises])
  const exerciseList: ExercisesType =
    queriedExercises === null ? defaultExercises : queriedExercises

  /* Fuse.js */
  const [query, updateQuery] = useState('')
  const [matchedCharacters, updateMatchedCharacters] = useState({})
  const fuse = new Fuse(exercises, {
    keys: ['name'],
    includeMatches: true,
  })

  /* Functions */
  const onExerciseSelect = (item: ExercisesType[0]) => {
    console.log('Selected item', item)
    handleExerciseSelect(item.id)
  }

  /* Effects */
  useEffect(() => {
    if (query === '') {
      updateQueriedExercises(null)
      updateMatchedCharacters({})
      return
    }
    const result = fuse.search(query)
    const newQueriedExercises = result.map((item) => item.item)
    updateQueriedExercises(newQueriedExercises)

    const newMatchedCharacters = {}
    result.forEach((item) => {
      let indices = []
      item.matches.forEach((match) => {
        match.indices.forEach((index) => {
          indices = [...indices, ...getNumbersBetween(index[0], index[1])]
        })
        newMatchedCharacters[match.value] = indices
      })
    })
    updateMatchedCharacters(newMatchedCharacters)
  }, [query])

  /* Render */
  return (
    <div>
      <div className="relative mb-4 text-gray-900 bg-gray-100 border-gray-300 rounded-sm border-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
        </div>
        <input
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          type="search"
          className="w-full p-2 pl-10 text-sm outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="Search for an exercise"
        />
      </div>
      <ul className="flex flex-col border-gray-300 divide-gray-300 rounded-sm divide-y-1 border-1">
        {exerciseList.map((item) => {
          return (
            <li
              key={item.id}
              className="px-2 py-4 transition cursor-pointer odd:bg-gray-100 even:bg-white hover:bg-gray-200"
              onClick={() => onExerciseSelect(item)}
            >
              <p className="tracking-wide">
                {item.name
                  .toString()
                  .split('')
                  .map((char, j) => {
                    if (matchedCharacters[item.name]?.includes(j)) {
                      return (
                        <span key={j} className="font-medium text-gray-900">
                          {char}
                        </span>
                      )
                    }
                    return (
                      <span key={j} className="text-gray-800">
                        {char}
                      </span>
                    )
                  })}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ExerciseSelector
