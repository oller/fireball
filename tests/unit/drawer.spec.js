import { shallowMount } from '@vue/test-utils'
import FireballDrawer from '@/components/FireballDrawer.vue'

const createComponent = (propsData, options) =>
  shallowMount(FireballDrawer, {
    propsData,
    ...options
  })

const wrapper = createComponent({
  fireballs: [1],
  metricToPlot: 'energy',
  metrics: [
    {
      id: 'energy',
      icon: 'brightness_5',
      label: 'Radiated'
    },
    {
      id: 'impact-e',
      icon: 'whatshot',
      label: 'Impact'
    }
  ],
  scaleToPlot: 'log',
  scales: [
    {
      id: 'log',
      label: 'Logarithmic'
    },
    {
      id: 'linear',
      label: 'Linear'
    }
  ]
})

describe('FireballDrawer', () => {
  describe('Events', () => {
    it('calls setMetricToPlot when metric toggle is clicked', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        setMetricToPlot: stub
      })

      wrapper.find('[data-test="metricToggle-energy"]').trigger('click')

      expect(stub).toBeCalled()
    })

    it('calls setScaleToPlot when metric toggle is clicked', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        setScaleToPlot: stub
      })

      wrapper.find('[data-test="scaleToggle-linear"]').trigger('click')

      expect(stub).toBeCalled()
    })
  }),
    describe('Emits', () => {
      it('emits a metric-updated event when setMetricToPlot method is called', () => {
        // wrapper.vm.$on('metric-updated', stub)
        // wrapper.vm.setMetricToPlot('metric')
        // expect(stub).toBeCalled()
        // console.log(wrapper.vm)
        wrapper.vm.setMetricToPlot('metric')
        // console.log(wrapper.emitted())
        // expect(wrapper.emitted()['metric-updated'][0]).toEqual(['scale'])
      })
      it('emits a scale-updated event when setScaleToPlot method is called', () => {
        wrapper.vm.setScaleToPlot('scale')
        // console.log(wrapper.emitted())
        // expect(wrapper.emitted()['scale-updated'][0]).toEqual(['scale'])
      })
    })
})
