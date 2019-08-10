import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'; 
import {mount, createLocalVue} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {config} from '@vue/test-utils';
import Environment from '@/components/Environment.vue';
import testData from '../testData';

library.add(faPlus)
library.add(faMinus)

const localVue = createLocalVue();

localVue.component('font-awesome-icon',FontAwesomeIcon)
localVue.use(BootstrapVue);


var chai = require('chai');
var expect = chai.expect;

config.mocks['$store'] = {
  state : {
    session: 'test',
    url : 'http://192.168.161.145:7071'
  }
}
describe('Environment.vue', () => {
  it('Render environment', () => {
    const testEnv = testData['environment']; 
    const wrapper = mount(Environment,{localVue, propsData : {object: testEnv, label: 'Update'}});
    expect(wrapper.find('#theEnvironmentInput').element.value).to.equal('Default');
    expect(wrapper.find('#theShortCodeInput').element.value).to.equal('DEF');
    expect(wrapper.find('#theDescription').element.value).to.equal('Default environment');
  }); 
})
