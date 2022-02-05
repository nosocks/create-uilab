import React from 'react'
import ReactDOM from 'react-dom'
import { AppComponent } from '@nosocks/uilab/react'
import pkg from '../package.json'

import '@nosocks/uilab/react/style.css'

const components = import.meta.glob('./<%= componentsPath %>/**/*.jsx')

ReactDOM.render(
  <React.StrictMode>
    <AppComponent
      componentsGlob={components}
      sidebarTitle={pkg.name}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
