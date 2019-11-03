import React from 'react';

import HeaderTodoComponent from "./header/HeaderTodoComponent";
import MainComponent from "./todos/MainComponent";

import '../css/styles.css';

// ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
function App() {
  return (
    <div>
        <HeaderTodoComponent />
        <MainComponent />
    </div>
  );
}

export default App;
