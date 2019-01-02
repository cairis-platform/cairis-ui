<template>
  <b-modal ref="dimensionDialog" :title="this.dialogTitle"  @ok="onOk">
    <b-card>
      <dimension-select :dimension=this.dimension :existing=this.existing v-on:dimension-select-change="dimensionSelected" />
    </b-card>
  </b-modal>
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'dimension-modal',
    props : {
      dimension : String,
      existing : {
        type: Array,
        default : []
      }
    },
    data () {
      return {
        selected : ''
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return 'Select ' + this.dimension;
      }
    },
    methods : {
      show() {
        this.$refs.dimensionDialog.show();
      },
      dimensionSelected(item) {
        this.selected = item;
      },
      onOk(evt) {
        evt.preventDefault();
        if (this.selected.length == 0) {
          alert("Please select a value");
        }
        else {
          this.$emit('dimension-modal-update',this.selected);
        }
      }
    }
  }

</script>