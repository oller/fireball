import { shallowMount } from '@vue/test-utils'
import BaseModal from '@/components/BaseModal.vue'

const createComponent = (propsData, options) =>
  shallowMount(BaseModal, {
    propsData,
    ...options
  })

describe('BaseModal', () => {
  describe('Renders', () => {
    it('does not render when show false is passed', () => {
      const wrapper = createComponent({
        show: false
      })

      expect(wrapper.isEmpty()).toBe(true)
    })

    it('renders when show true is passed', () => {
      const wrapper = createComponent({
        show: true
      })

      expect(wrapper.isEmpty()).toBe(false)
    })
  })
  describe('Events', () => {
    // Events require a visible modal
    const wrapper = createComponent(
      {
        show: true
      },
      {
        attachToDocument: true // Needed to listen to window and DOM events
      }
    )
    it('calls onClose when ESC key is pressed', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        onClose: stub
      })

      wrapper.trigger('keydown.esc')

      expect(stub).toBeCalled()
    })

    it('calls onClose when close button is clicked', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        onClose: stub
      })

      wrapper.find('button').trigger('click')

      expect(stub).toBeCalled()
    })
  })
  describe('Emits', () => {
    it('emits a close event when onClose method is called', () => {
      const wrapper = createComponent({
        show: true
      })
      const stub = jest.fn()

      wrapper.vm.$on('close', stub)
      wrapper.vm.onClose()

      expect(stub).toBeCalled()
    })
  })
})
