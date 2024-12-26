import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loadingGif from '/images/loading.gif';

function DetailPokemon() {
    const { id } = useParams(); // Ambil ID dari URL
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
            console.log(data)
        };

        fetchPokemon();
    }, [id]);

    const Loading = () => {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <p className="text-2xl font-bold">Loading</p>
                <img src={loadingGif} alt="" />
            </div>
        )
    }

    if (!pokemon) {
        return Loading()
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-yellow-300">
            <div className="flex flex-col items-center bg-white rounded-md m-5 md:mx-40" >
                <div className="flex justify-center">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="mx-20 md:w-80 p-10"
                    />
                </div>
                <h1 className="text-2xl font-pokemon2 capitalize">{pokemon.name}</h1>
                <span className="opacity-80 text-gray-500">#{String(pokemon.id).padStart(3, "0")}</span>
                <div className="flex gap-1 md:justify-start md:gap-3 justify-center mb-5">
                    <p className="py-1 px-2 rounded-full bg-blue-500 text-white font-medium text-xs">
                        {pokemon.types[0].type.name}
                    </p>
                    {pokemon.types[1] && (
                        <p className="py-1 px-2 rounded-full bg-red-500 text-white font-medium text-xs">
                            {pokemon.types[1].type.name}
                        </p>
                    )}
                </div>

                <div className="flex bg-gray-100 text-center m-5 p-3 rounded-md">
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam officiis a fuga quae assumenda alias culpa eaque tempora earum sapiente.</h1>
                </div>
            </div>
        </div>
    );
}

export default DetailPokemon;