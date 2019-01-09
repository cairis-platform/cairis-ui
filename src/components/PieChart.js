import {Pie, mixins} from 'vue-chartjs'
const {reactiveProp} = mixins

export default {
  extends: Pie, 
  mixins: [reactiveProp],
  data() {
    return {
      options : {
        responsive: true,
        maintainAspectRatio: false,
        display: false
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}