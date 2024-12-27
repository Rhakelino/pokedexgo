import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const typeColors = {
    grass: "bg-green-400",
    poison: "bg-purple-400",
    fire: "bg-red-400",
    water: "bg-blue-400",
    bug: "bg-green-300",
    normal: "bg-gray-300",
    electric: "bg-yellow-300",
    ground: "bg-yellow-600",
    fairy: "bg-pink-300",
    fighting: "bg-red-600",
    psychic: "bg-pink-500",
    rock: "bg-gray-500",
    ghost: "bg-indigo-500",
    ice: "bg-blue-200",
    dragon: "bg-indigo-700",
    dark: "bg-gray-700",
    steel: "bg-gray-400",
    flying: "bg-blue-100",
};

function getBackgroundColor(type) {
    return typeColors[type] || "bg-gray-200"; // Default color
}


function App() {

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
                const data = await response.json()
                const detailPokemon = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url)
                        return await res.json()
                    })
                )
                setPokemon(detailPokemon)
                console.log(detailPokemon)
            } catch {
                console.error("Error fecthing")
            }
        }
        fetchApi()
    }, [])

    return (
        <div className="flex flex-col">
            {/* navbar */}
            <div className="flex">
                <div className="flex shadow-md w-full p-5 bg-slate-200">
                    <h1 className='font-pokemon2 text-2xl'>PokeDexGo</h1>
                </div>
            </div>
            {/* end navbar */}

            {/* Search Bar */}
            {/* <div className="flex justify-between  m-5">
        <h1 className='hidden md:block'>AHAHAH</h1>
        <input type="text" className='bg-neutral-200 w-full md:w-1/4 py-2 px-2 rounded-lg' />
      </div> */}
            {/* End Search Bar */}

            {/* card */}
            {pokemon.length === 0 ? (
                <div className="flex justify-center items-center min-h-screen">
                    <img src="./images/loading.gif" alt="" />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 m-5">
                    {pokemon.map((pokemon, i) => (
                        <Link
                            to={`/Pokemon/${pokemon.id}`} // URL untuk halaman detail
                            key={i}
                            className={`flex flex-col ${getBackgroundColor(pokemon.types[0].type.name)} rounded-lg p-5 shadow-md`}
                        >
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                alt={pokemon.name}
                                className="mb-5"
                            />
                            <h1 className="font-bold font-pokemon2 capitalize tracking-super-wide">{pokemon.name}</h1>
                            <span className="opacity-80 text-gray-500">#{String(pokemon.id).padStart(3, "0")}</span>
                            <div className="flex gap-1 md:justify-start md:gap-3 justify-center">
                                <p className="py-1 px-2 rounded-full bg-blue-500 text-white font-medium text-xs">
                                    {pokemon.types[0].type.name}
                                </p>
                                {pokemon.types[1] && (
                                    <p className="py-1 px-2 rounded-full bg-red-500 text-white font-medium text-xs">
                                        {pokemon.types[1].type.name}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))
                    }
                </div>
            )}


            {/* end card */}
        </div>
    )
}

export default App
