<template>
  <b-modal ref="propertyDialog" :title="securityProperty.name" @ok="onOk">
    <b-card>
      <b-form-group label="Value" label-class="text-sm-left" label-cols="3" horizontal label-for="theValueInput" >
        <b-form-select id="theValueInput" v-model="securityProperty.value" :options="propertyValues" required>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Rationale" label-class="text-sm-left" label-cols="3" horizontal label-for="theRationaleInput" v-if="valueNotNone" >
        <b-form-textarea id="theRationaleInput" v-model="securityProperty.rationale" type="text" :rows=2 :max-rows=4 required>
        </b-form-textarea>
      </b-form-group>
    </b-card>
  </b-modal>
</template>

<script>
  export default {
    name: 'property-modal',
    props : {
      securityProperty : Object
    },
    computed : {
      valueNotNone() {
        return this.securityProperty.value != 'None';
      }
    },
    data() {
      return {
        propertyValues : ['None','Low','Medium','High'],
        updateProperty : {'name' : 'Undefined', 'value' : 'Undefined', 'rationale' : 'Undefined'}
      }
    },
    methods : {
      show() {
        this.$refs.propertyDialog.show();
      },
      onOk(evt) {
        evt.preventDefault();
        if (!this.securityProperty.rationale.length && this.securityProperty.name != 'None') {
          alert('Please enter rationale');
        }
        else {
          this.updateProperty.name = this.securityProperty.name;
          this.updateProperty.value = this.securityProperty.value;
          if (this.securityProperty.value == 'None') {
            this.updateProperty.rationale = 'None';
          }
          else {
            this.updateProperty.rationale = this.securityProperty.rationale;
          }
          this.$emit('property-update',this.updateProperty);
          this.$refs.propertyDialog.hide(); 
        }
      }
    }
  };
</script>