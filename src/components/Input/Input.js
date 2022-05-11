import { useState } from "react";

const Input = ({ setPrompt, submit }) => {

    const [input, setInput] = useState('');

    const getInput = (e) => {
        setInput(e.target.value);
        setPrompt(e.target.value);
    }

    const onSubmit = () => {
        // call submit method in App.js
        setInput('');
        submit();
    }

    return (
        <div id='prompt-input'>
            <p className='font-bold'>Enter prompt</p>
            <textarea type="text" className='border rounded border-black resize-y w-full h-32 min-h-[3rem] pl-5 pt-3 mt-2 items-start bg-gray-300' value={input} onChange={getInput}></textarea>

            <div className="flex flex-row justify-end">
                <button className='text-white border border-black rounded w-fit text-sm px-5 py-2 bg-blue-900 md:text-base md:px-10' onClick={onSubmit} disabled={!input.length > 0}>Submit</button>
            </div>
        </div>
    )
}

export default Input;