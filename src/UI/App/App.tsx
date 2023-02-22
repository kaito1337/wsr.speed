import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ContextWrapper } from '../../Context/ContextWrapper';
import { Layout } from '../Components/HOCS/Layout';
import { Routes } from '../../Constants/Routes';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ContextWrapper>
          <Layout>
            {Routes?.map((el, idx) => (
              <Route path={el.path} key={idx} exact>
                {<el.page/>}
              </Route>
            ))
            }
          </Layout>
        </ContextWrapper>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
