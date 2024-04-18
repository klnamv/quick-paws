import React from 'react';
import useEngine from "./hooks/useEngine";
import GeneratedWords from "./components/GeneratedWords";
import CountdownTimer from './components/CountdownTimer';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTyping from './components/UserTyping';
import WordsContainer from './components/WordsContainer';
import { calculateAccuracyPercentage } from './utils/helpers';

const App = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped } = useEngine();

  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer >
        <GeneratedWords words={words} />
        <UserTyping 
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton 
        className={'mx-auto mt-10 text-slate-200'} 
        onRestart={restart} 
      />
      <Results 
        state={state}
        errors={errors} 
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)} 
        total={totalTyped} 
        className={'mt-10'} 
      />
    </>
  )
}

export default App;
