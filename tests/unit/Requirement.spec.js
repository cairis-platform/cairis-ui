import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'; 
import {mount, createLocalVue} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {config} from '@vue/test-utils';
import Requirement from '@/components/Requirement.vue';
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
    url : 'http://192.168.161.145:7071',
    domain : 'asset',
    domainName : 'Clinical Data'
  }
}
describe('Requirement.vue', () => {
  it('Render requirement', () => {
    const testReq = testData['requirement']; 
    const wrapper = mount(Requirement,{localVue, propsData : {object: testReq, label: 'Update', domain: {domain: 'asset', domainName: 'Clinical Data'}}});
    expect(wrapper.find('#theNameInput').element.value).to.equal('Anonymisation guidelines');
    expect(wrapper.find('#theTypeInput').element.value).to.equal('Functional');
    expect(wrapper.find('#theDescriptionInput').element.value).to.equal('Anonymisation guidelines shall comply with the MRC guidelines for secure data handling and anonymisation');
    expect(wrapper.find('#theFitCriterionInput').element.value).to.equal('None');
    expect(wrapper.find('#theRationaleInput').element.value).to.equal('None');
    expect(wrapper.find('#theOriginatorInput').element.value).to.equal('Interview data');
  }); 
})
