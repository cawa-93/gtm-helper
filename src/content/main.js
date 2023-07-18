import '@webcomponents/custom-elements';
import {defineCustomElement} from 'vue'
import App from './App.ce.vue'

const ELEMENT_NAME = 'gtm-helper'


const AppElement = defineCustomElement(App);


if (customElements.get(ELEMENT_NAME) === undefined) {
    customElements.define(ELEMENT_NAME, AppElement)
}


