import { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input/Input';
import Results from './components/Results/Results';

function App() {

  const [prompt, setPrompt] = useState('');
  const [texts, setTexts] = useState([]);

  const sessionStorageKey = 'OpenAIresponses'

  useEffect(() => {
    console.log('loading messages from local storage')
    setTexts(window.sessionStorage.getItem(sessionStorageKey) ? JSON.parse(window.sessionStorage.getItem(sessionStorageKey)) : []);
  }, [])

  const submit = () => {
    console.log(prompt);
    getResult();
  }

  const clearAll = () => {
    window.sessionStorage.clear();
    setTexts([]);
    console.log('Removed all responses');
  }

  const getResult = () => {
    if (prompt === '') return;

    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((res) => {

        var str = res.choices[0].text;
        var index = str.indexOf('\n\n');
        var [remainingPrompt, result] = [str.slice(0, index), str.slice(index + 1)];

        const obj = { prompt: prompt + remainingPrompt, result: result };
        setTexts((prev) => {
          window.sessionStorage.setItem(sessionStorageKey, JSON.stringify([...prev, obj]));
          return [...prev, obj]
        });

        setPrompt('');
      })
      .catch(err => {
        console.log('Error occured');
        console.log(err);
      })

  };

  return (<div className='bg-violet-300 min-h-screen'>
    < div id='main-container' className='flex flex-col pt-16 space-y-10 py-5 md:mx-72'>
      <div id='header' className='container bg-blue-900 rounded-xl shadow border p-8'>
        <p className="text-3xl text-white font-bold mb-5">
          Fun with AI
        </p>
        <p className="text-gray-200 text-lg">
          Generate AI responses to your provided text
        </p>
      </div>

      <Input setPrompt={setPrompt} submit={submit} />
      <Results results={texts} clearAll={clearAll} />
    </div>
  </div>
  );
}
export default App;
