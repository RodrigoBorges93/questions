import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { QuestionProvider } from './contexts/questions.contexts';
import { RespostasProvider } from './contexts/respostas.contexts';
import Questions from './pages/questions.component';
import SelectOptions from './components/select-options/select-options.components';
import Header from './components/header/header.component';

function App() {

  return (
      <>
      <Header />
    <div>
        <RespostasProvider>
        <QuestionProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={SelectOptions}/>
                    <Route exact path='/questions' component={Questions}/>
                </Switch>
            </BrowserRouter>
        </QuestionProvider>
        </RespostasProvider>
    </div>
        </>
  );
}

export default App;
