import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [content, setContent] = useState('Not fetched');
  const [input, setInput] = useState('');
  const [content2, setContent2] = useState('Not requested');

  console.log(process.env.REACT_APP_API);

  const changeInput = (text) => {
    setInput((oldtext) => (oldtext = text));
  };

  const sendRequest = () => {
    console.log(`${process.env.REACT_APP_API}/controller/${input}`);
    axios.get(`${process.env.REACT_APP_API}/controller/${input}`).then((res) => {
      setContent2(res.data.request);
    });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/controller`).then((res) => {
      setContent(res.data.content);
    });
  }, []);

  return (
    <div className='App'>
      <h1>Elefanti Video - Test Change</h1>
      <p>{content}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input onInput={(e) => changeInput(e.target.value)} type='text' />
        <button onClick={sendRequest} type='submit'>
          Submit
        </button>
      </form>
      <h5>{content2}</h5>
    </div>
  );
}

export default App;
