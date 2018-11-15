import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// TODO: testfile shouldn't be in the same directory as the components.
// Create a seperate test-directory
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
