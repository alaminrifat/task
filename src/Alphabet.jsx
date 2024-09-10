import { useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const replaceConsecutiveLetters = (str) => {
    return str.replace(/(.)\1{2,}/g, (match) => "_".repeat(match.length));
};

const AlphabetGrid = () => {
    const [outputString, setOutputString] = useState("");

    const handleTileClick = (letter) => {
        const newString = outputString + letter;
        const updatedString = replaceConsecutiveLetters(newString);
        setOutputString(updatedString);
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">
                Alphabet Tile Interaction
            </h1>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Output String:</h3>
                <div
                    id="outputString"
                    className="text-xl font-mono bg-gray-100 p-2 rounded-md min-w-[200px] text-center"
                >
                    {outputString || "-"}
                </div>
            </div>

            <div className="grid grid-cols-6 gap-4">
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
                        onClick={() => handleTileClick(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <div className="flex flex-col items-center p-6">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 mt-4"
                    onClick={() => setOutputString("")}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default AlphabetGrid;
