import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome' 
import {mount, createLocalVue} from '@vue/test-utils'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {config} from '@vue/test-utils'
import Attacker from '@/components/Attacker.vue'
import testData from '../testData'

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
describe('Attacker.vue', () => {

  it('Render attacker', () => {
    const testAttacker = testData['attacker']; 
    const wrapper = mount(Attacker,{localVue, propsData : {object: testAttacker, label: 'Update'}});
    expect(wrapper.find('#theAttackerInput').element.value).to.equal('Carol')
    expect(wrapper.find('#theTagsInput').element.value).to.equal('')
    expect(wrapper.find('#theDescriptionInput').element.value).to.equal('Carol is a freelance journalist working in the South East of England.  Having heard stories about data theft, she is currently investigating a number of e-Science projects, including NeuroGrid, to see if she can find a story.')
  });
})
