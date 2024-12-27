import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBackgroundColor } from "./Home"; // Import fungsi warna
import loadingGif from '/images/loading.gif';
import { FaDownload } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

function DetailPokemon() {
    const { id } = useParams(); // Ambil ID dari URL
    const [pokemon, setPokemon] = useState(null);
    const [description, setDescription] = useState(""); // State untuk deskripsi

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                setPokemon(data);

                // Fetch deskripsi dari endpoint species
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
                const speciesData = await speciesResponse.json();

                // Ambil deskripsi dalam bahasa Inggris
                const englishText = speciesData.flavor_text_entries.find(
                    (entry) => entry.language.name === "en"
                );
                setDescription(englishText ? englishText.flavor_text.replace(/\n|\f/g, " ") : "No description available.");
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        fetchPokemon();
    }, [id]);

    const handleDownload = (e) => {
        e.preventDefault();
        const link = document.createElement("a");
        link.href = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
        link.download = `${pokemon?.name}.png`;
        link.click();
    };

    const Loading = () => {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <p className="text-3xl font-bold font-pokemon1">Loading...</p>
                <img src={loadingGif} alt="Loading..." />
            </div>
        );
    };

    if (!pokemon) {
        return Loading();
    }

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
    const backgroundColor = getBackgroundColor(pokemon?.types[0]?.type?.name); // Ambil warna berdasarkan tipe

    return (
        <div className={`flex justify-center items-center min-h-screen ${backgroundColor}`}>
            <div className="flex flex-col items-center bg-white rounded-md m-5 md:mx-40">
                <div className="flex justify-between items-center w-full px-5 pt-2 ">
                    {/* Tombol Download */}
                    <Link to={"/"}>
                        <IoMdArrowRoundBack className="text-4xl" />
                    </Link>

                    <button
                        onClick={handleDownload}
                        className="text-2xl md:text-3xl cursor-pointer hover:text-blue-500"
                    >
                        <FaDownload />
                    </button>
                </div>
                <div className="flex justify-center">
                    <img
                        src={imageUrl}
                        alt={pokemon?.name}
                        className="mx-20 md:w-80 p-10"
                    />
                </div>
                <h1 className="text-2xl font-pokemon2 capitalize tracking-super-wide">{pokemon?.name}</h1>
                <span className="opacity-80 text-gray-500">#{String(pokemon?.id).padStart(3, "0")}</span>
                <div className="flex gap-1 md:justify-start md:gap-3 justify-center mb-5">
                    <p className="py-1 px-2 rounded-full bg-blue-500 text-white font-medium text-xs">
                        {pokemon?.types[0]?.type.name}
                    </p>
                    {pokemon?.types[1] && (
                        <p className="py-1 px-2 rounded-full bg-red-500 text-white font-medium text-xs">
                            {pokemon?.types[1]?.type.name}
                        </p>
                    )}
                </div>

                {/* Deskripsi Pokémon */}

                {!description ? (
                    <img src="/images/notfound.gif" className="w-28" alt="" />
                ) : (
                    <div className="flex bg-gray-100 text-center m-5 p-3 rounded-md">
                        <h1>{description}</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailPokemon;
