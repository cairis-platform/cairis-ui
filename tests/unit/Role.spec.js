import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'; 
import {mount, createLocalVue} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {config} from '@vue/test-utils';
import Role from '@/components/Role.vue';
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
describe('Role.vue', () => {
  it('Render role', () => {
    const testRole = testData['role']; 
    const wrapper = mount(Role,{localVue, propsData : {object: testRole, label: 'Update'}});
    expect(wrapper.find('#theRoleInput').element.value).to.equal('Data Consumer');
    expect(wrapper.find('#theShortCodeInput').element.value).to.equal('DCON');
    expect(wrapper.find('#theDescriptionInput').element.value).to.equal('Uses NeuroGrid data');
  }); 
})
