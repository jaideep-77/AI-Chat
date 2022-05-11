import { useEffect, useState } from "react";

const Results = ({ results, clearAll }) => {

    const [load, setLoad] = useState(false);

    useEffect(() => {
        console.log(results);
        if (results[0]) setLoad(true);
    }, [results]);

    const clearData = () => {
        clearAll();
        setLoad(false);
    }

    return (
        <>
            {!load && <h1 className="text-base md:text-xl font-bold">No Submissions</h1>}
            {load && <div>
                <h1 className="text-base md:text-xl font-bold">Responses</h1>
                <button className="text-sm md:text-base rounded bg-blue-900 px-5 py-1 text-white my-3" onClick={clearData}>Clear all</button>
                {results.map((result, index) => {
                    return (
                        <div key={index}>
                            <div id='header' className='container bg-gray-300 rounded-xl shadow border p-5 my-3'>

                                <div id='prompt' className='flex'>
                                    <p className="text-sm text-gray-700 font-bold mb-3 md:text-base min-w-[20%]">
                                        Prompt:
                                    </p>
                                    <p className="text-sm md:text-base ml-2">{result.prompt}</p>
                                </div>

                                <div id='prompt' className='flex'>
                                    <p className="text-sm text-gray-700 font-bold mb-3 md:text-base min-w-[20%] ">
                                        Response:
                                    </p>
                                    <p className="text-sm md:text-base ml-2">{result.result}</p>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
            }
        </>
    )
}

export default Results;