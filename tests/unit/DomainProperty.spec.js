import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'; 
import {mount, createLocalVue} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {config} from '@vue/test-utils';
import DomainProperty from '@/components/DomainProperty.vue';
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
describe('DomainProperty.vue', () => {
  it('Render domain property', () => {
    const testDp = testData['domainproperty']; 
    const wrapper = mount(DomainProperty,{localVue, propsData : {object: testDp, label: 'Update'}});
    expect(wrapper.find('#theDomainPropertyInput').element.value).to.equal('Secure data analysis');
    expect(wrapper.find('#theTypeInput').element.value).to.equal('Hypothesis');
    expect(wrapper.find('#theOriginatorInput').element.value).to.equal('Shamal Faily');
    expect(wrapper.find('#theDescription').element.value).to.equal('We assume that the process of analysing data once it has been uploaded to NeuroGrid is secure.');
  }); 
})
