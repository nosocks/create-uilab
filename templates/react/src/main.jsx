import React from 'react'
import ReactDOM from 'react-dom'
import { AppComponent } from '@nosocks/uilab/react'
import pkg from '../package.json'

import '@nosocks/uilab/react/style.css'

ReactDOM.render(
  <React.StrictMode>
    <AppComponent
      componentsGlob={import.meta.glob('./components/**/*.jsx')}
      sidebarTitle={pkg.name}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
