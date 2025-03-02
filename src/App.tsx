import React, { useState } from 'react';
import './App.css';
import generateResponse from './geminiRequest';

const getPDFURL = (latex: string): string => 'https://latexonline.cc/compile?text=' + encodeURIComponent(latex);

function App(): React.JSX.Element {
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState(10);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [codeVisible, setCodeVisible] = useState(false);

  const prompt = `
    Write ${questions} ${multipleChoice ? 'multiple choice' : ''} homework question${questions === 1 ? '' : 's'} in LaTeX about the following: ${input}.
    Respond solely with the raw LaTeX code and do not make any other comments.
    Ensure that you are including the packages for the control sequences you are using.
    Include a nicely formatted heading.
    Set up maketitle properly, but make the author field blank.
    Ensure that every single special character, particularly percentages and number signs, is always escaped properly and does not cause bugs.
    Do not specify programming language in code blocks.
    Ensure that programming languages are handled properly in code blocks.
    Add a page for the answer key at the end of the document.
    Ensure that the answer key has answers for all questions that can be checked with by the professor.
    Use the exam document class.
    Do NOT use "\\answer".
    If multiple choice, ensure that not all answers are the same letter, and never list "all of the above" as an option.
  `;
  
  const handleSubmission = async () => {
    setLoading(true);
    setResponse('');
    
    console.log(`PROMPT: ${prompt}`);
    
    const rawResult = await generateResponse(prompt);
    const result = rawResult.replace('```latex', '').replace('```', '').trim();
    console.log(`RESPONSE: ${result}`);
    
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="left-panel">
        <div className="header">
          <a href="."><h1>ProbleMatic</h1></a>
          <p>Homework Problem & Answer Key <br/> Generator</p> 
        </div>
        
        <div className="input-section">
          <div className="input-container">
            <input
              placeholder='Input topic'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field"
            />

            <button onClick={handleSubmission} disabled={loading} className="submit-button">
              Generate
            </button>
          </div>

          <div className="input-specs">
            <label htmlFor="qnumber">Questions </label>
            <select
              name="qnumber"
              id="qnumber"
              className="qnumber"
              defaultValue={questions}
              onChange={(e) => setQuestions(parseInt(e.target.value))}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>

            <label htmlFor="multipleChoice">All Multiple Choice</label>
            <input
              type="checkbox"
              className="multipleChoice"
              onChange={() => setMultipleChoice(!multipleChoice)} />
          </div>

          <div className="toggle-latex">
            <button onClick={() => setCodeVisible(!codeVisible)} className="toggle-button">
              {codeVisible ? 'Hide' : 'Show'} LaTeX
            </button>
          </div>

          <div className="latex-code">
            {codeVisible && (
              <textarea
                rows={20}
                cols={50}
                value={response}
                readOnly
                className="latex-textarea"
              />
            )}
          </div>
        </div>
      </div>

      <div className="right-panel">
        {loading && (
          <div className="loading-wheel">
            <div className="spinner"></div>
          </div>
        )}
        <div className="PDFView">
          {response && !loading && (
            <embed src={getPDFURL(response)} width="100%" height="100%" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

