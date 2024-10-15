import { useCallback } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { decrement, increment, selectCount } from 'src/redux/slices/counterSlice';

function App() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const decrementCounter = useCallback(() => {
    dispatch(decrement());
  }, []);

  const incrementCounter = useCallback(() => {
    dispatch(increment());
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={decrementCounter}>-</button>
        &nbsp;
        <span> Current count is {count} </span>
        &nbsp;
        <button onClick={incrementCounter}>+</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
