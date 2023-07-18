import '@webcomponents/custom-elements';
import { defineCustomElement } from 'vue'
import App from './App.ce.vue'

const ELEMENT_NAME = 'gtm-helper'

const AppElement = defineCustomElement(App)
customElements.define(ELEMENT_NAME, AppElement)


document.documentElement.style.position = 'relative'
document.documentElement.appendChild( new AppElement() )