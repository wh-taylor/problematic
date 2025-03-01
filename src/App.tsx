import React, { useState, useEffect } from 'react';
import './App.css';
import generateResponse from './geminiRequest'
import 'katex/dist/katex.min.css';  // Required for proper styling

const latexCode = `
\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
\\textbf{Problem 1:} Consider the quadratic equation $ax^2 + bx + c = 0$, where $a$, $b$, and $c$ are real numbers and $a \\neq 0$.
\\begin{enumerate}
    \\item Derive the quadratic formula for solving for $x$ in terms of $a$, $b$, and $c$. Show all steps of your derivation.
    \\item Given the equation $2x^2 - 5x - 3 = 0$, use the quadratic formula to find the solutions for $x$. Show your work.
    \\item Verify your solutions from part (b) by substituting them back into the original equation.
    \\item For what values of $a$, $b$, and $c$ does the quadratic equation have:\\
        \\begin{itemize}
            \\item Two distinct real solutions?
            \\item One real solution (repeated root)?
            \\item No real solutions (complex conjugate roots)?
        \\end{itemize}
    Explain your reasoning in terms of the discriminant ($b^2 - 4ac$).
\\end{enumerate}
\\end{document}
`;


function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');

  const handleButtonClick = async () => {
    const result = await generateResponse(`Write a homework problem in LaTeX about the following: ${input}`);
    setData(result);
  };

  return (
    <div className="App">
      <input
        placeholder='Input prompt'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {/* <button onClick={generatePDF}>Download PDF</button> */}
      
      <p>{data}</p>

      
    </div>
  );
}

export default App;
