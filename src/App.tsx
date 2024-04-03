import { faker } from '@faker-js/faker';
import GeneratedWords from "./components/GeneratedWords";
import CountdownTimer from './components/CountdownTimer';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTyping from './components/UserTyping';

const words = faker.random.words(10);

function App() {
  return (
    <>
      <CountdownTimer timeLeft={30} />
      <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">
        <GeneratedWords words={words} />
        <UserTyping className="absolute inset-0" userInput={words} />
      </div>
      <RestartButton className={'mx-auto mt-10 text-slate-500'} onRestart={() => null} />
      <Results errors={10} accuracyPercentage={100} total={200} className={'mt-10'} />
    </>
  )
}

export default App;
