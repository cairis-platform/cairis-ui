import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'; 
import {mount, createLocalVue} from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {config} from '@vue/test-utils';
import Asset from '@/components/Asset.vue';
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
describe('Asset.vue', () => {

  it('Render asset', () => {
    const testAsset = testData['asset']; 
    const wrapper = mount(Asset,{localVue, propsData : {object: testAsset, label: 'Update'}});
    expect(wrapper.find('#theAssetInput').element.value).to.equal('Clinical Data');
    expect(wrapper.find('#theTagsInput').element.value).to.equal('');
    expect(wrapper.find('#theShortCodeInput').element.value).to.equal('CD');
    expect(wrapper.find('#theTypeInput').element.value).to.equal('Information');
    expect(wrapper.find('#theDescription').element.value).to.equal('Clinical Data');
    expect(wrapper.find('#theSignificance').element.value).to.equal('Unanonymised and in the wrong hands, this could be very damaging.');

  }); 

  it("Add asset environment property", () => {
    const testAsset = testData['asset']; 
    let wrapper = mount(Asset,{localVue, propsData : {object: testAsset, label: 'Update'}});
    expect(wrapper.vm.objt.theEnvironmentProperties.length).to.equal(2);
    wrapper.vm.addAssetEnvironmentProperty("Default");
    expect(wrapper.vm.objt.theEnvironmentProperties.length).to.equal(3);
    expect(wrapper.vm.objt.theEnvironmentProperties[2].theEnvironmentName).to.equal("Default");
  });

  it("Delete asset environment property", () => {
    const testAsset = testData['asset']; 
    let wrapper = mount(Asset,{localVue, propsData : {object: testAsset, label: 'Update'}});
    expect(wrapper.vm.objt.theEnvironmentProperties.length).to.equal(3);
    wrapper.vm.deleteEnvironment("Default");
    expect(wrapper.vm.objt.theEnvironmentProperties.length).to.equal(2);
  });
})
