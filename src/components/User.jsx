import { useEffect, useState } from "react"

const url = "https://api.github.com/users/"

export default function User({ name }) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch(url + name)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setUser(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <a
      href={user.html_url}
      class="flex max-w-lg shadow-lg rounded-lg outline outline-slate-100"
    >
      <div class="flex items-center justify-center gap-x-4 md:gap-x-10 py-4">
        <div class="w-2/12">
          <img src={user.avatar_url} class="rounded-full" />
        </div>
        <div class="flex flex-col gap-y-1">
          <div class="flex items-center gap-x-2">
            <p class="font-bold text-2xl">{user.name}</p>
            <p class="mt-1">•</p>
            <p class="mt-1 font-semibold text-lg">{name}</p>
          </div>
          <p>{user.bio}</p>
        </div>
      </div>
    </a>
  )
}
