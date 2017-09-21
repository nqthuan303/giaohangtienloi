import {injectGlobal} from 'styled-components'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  #app {
    width: 100%;
    height: 100%;
  }
  .my-autocomplete-container {
    position: absolute;
    z-index: 100;
    width: 100%;
  }
`
