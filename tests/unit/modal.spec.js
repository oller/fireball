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

      expect(wrapper.contains('.modal')).toBe(false)
    })

    it('renders when show true is passed', () => {
      const wrapper = createComponent({
        show: true
      })

      expect(wrapper.contains('.modal')).toBe(true)
    })
  })
  describe('Events', () => {
    // Events require a visible modal
    let wrapper
    let stub
    const factory = () => {
      return createComponent(
        {
          show: true
        },
        {
          attachToDocument: true // Needed to listen to window and DOM events
        }
      )
    }

    beforeEach(() => {
      wrapper = factory()
      stub = jest.spyOn(BaseModal.methods, 'onClose')
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('calls onClose when ESC key is pressed', async () => {
      wrapper.setMethods({
        onClose: stub
      })
      await wrapper.trigger('keydown.esc')
      expect(stub).toBeCalled()
    })

    it('calls onClose when background is clicked', () => {
      wrapper.find('.modal-background').trigger('click')
      expect(stub).toBeCalled()
    })

    it('calls onClose when close button is clicked', () => {
      wrapper.find('.modal-close').trigger('click')
      expect(stub).toBeCalled()
    })
  })

  describe('Emits', () => {
    it('emits a close event when onClose method is called', () => {
      const wrapper = createComponent({
        show: true
      })
      wrapper.vm.onClose()
      expect(wrapper.emitted().close[0]).toEqual([])
    })
  })
})
