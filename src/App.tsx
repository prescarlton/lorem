import React, { useState } from 'react';
import './App.css';

function App() {
  const [loremText, setloremText] = useState(['Click the button above to generate lorem text.']);
  const [numParagraphs, setnumParagraphs] = useState(2);
  const [contentType, setcontentType] = useState('paras');
  const fetchData = () => {
    fetch(`http://hipsum.co/api/?type=hipster-centric&${contentType}=${numParagraphs}`)
      .then(resp => resp.json())
      .then(data => setloremText(data));
  }
  const handleInputChange = (e: any) => {
    setnumParagraphs(e.target.value);
  }
  const handleSelectChange = (e: any) => {
    setcontentType(e.target.value);
  }
  const copyText = () => {
    navigator.clipboard.writeText(loremText.join('\n'));
  }
  return (
    <div className="App">
      <header className="headerGroup">
        <h1 className='siteHead'>lorem</h1>
        <h2 className='siteSubhead'>generate filler text using <a href='http://www.hipsum.co' target='_blank'>hipsum.co</a> api</h2>
      </header>
      
      <div className='generator card'>
        <div className='toolbar'>
          <div>
            <input type='text' value={numParagraphs} onChange={(e) => handleInputChange(e)} />
            <select value={contentType} onChange={handleSelectChange}>
              <option value='paras'>paragraphs</option>
              <option value='sentences'>sentences</option>
            </select>
            <button onClick={fetchData}>go</button>
          </div>
          <div>
            <button onClick={copyText}>copy</button>
          </div>
        </div>
        <div className='loremContent'>
          {loremText.map(para => {
            return <p>{para}</p>
          })}
        </div>
      </div>
      <div className='card'>
        <p>made by <a href='https://www.pcarlton.co' target='_blank'>presto the wizard.</a></p>
      </div>
    </div>
  );
}

export default App;
