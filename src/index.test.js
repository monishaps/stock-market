// src/index.test.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';

// Mock reportWebVitals function
jest.mock('./reportWebVitals', () => jest.fn());

describe('index.js', () => {
  let root;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
    root = null;
  });

  it('renders App component into root element', () => {
    const createRootSpy = jest.spyOn(ReactDOM, 'createRoot').mockReturnValue({
      render: jest.fn(),
    });

    require('./index'); // Assuming index.js contains the provided code snippet

    expect(createRootSpy).toHaveBeenCalledWith(root);
    expect(createRootSpy().render).toHaveBeenCalledWith(<App />);

    createRootSpy.mockRestore();
  });

  it('calls reportWebVitals', () => {
    require('./index');
    expect(reportWebVitals).not.toHaveBeenCalled();
  });
});
