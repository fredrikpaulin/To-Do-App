import {FC} from 'react';
import styled from 'styled-components'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    header {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: #2196F3;
      align-items: center;
      border-bottom: 4px solid #1976D2;

      h1 {
        color: white;
        font-size: 5rem;
        color: #212121;
      }
    }
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  `

const App : FC = () => {
  return (
    <AppContainer>
      <header className="App-header">
        <TaskInput />
      </header>
      <main>
        <TaskList />
      </main>
    </AppContainer>
  );
}

export default App