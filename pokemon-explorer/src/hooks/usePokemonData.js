import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePokemonList = (limit = 150) => {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        const detailed = await Promise.all(
          res.data.results.map((p) => axios.get(p.url))
        )
        const parsed = detailed.map((d) => ({
          id: d.data.id,
          name: d.data.name,
          types: d.data.types.map((t) => t.type.name),
          sprite: d.data.sprites.front_default,
          fullData: d.data,
        }))
        setPokemonList(parsed)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [limit])

  return { pokemonList, loading, error }
}
