import _ from 'lodash'
export default {
  name: 'textareaResize',
  data() {
    return {
      windowWidth: window.innerWidth,
      width: 0
    }
  },
  methods: {
    resizeTextarea(event) {
      event.target.style.height = 'auto'
      event.target.style.height = (event.target.scrollHeight) + 'px'
    },
    resizeText(el) {
      el.style.height = 'auto'
      el.style.height = (el.scrollHeight) + 'px'
    },
    resizeWidth() {
      this.resizeText(this.$el)
      this.windowWidth = window.innerWidth
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.setAttribute('style', 'height:' + (this.$el.scrollHeight) + 'px;overflow-y:hidden;')
    })
    this.$el.addEventListener('input', this.resizeTextarea)
  },
  beforeDestroy() {
    this.$el.removeEventListener('input', this.resizeTextarea)
  },
  render() {
    return this.$slots.default[0]
  },
  created() {
    window.addEventListener('resize', this.resizeWidth)
    this.debouncedGetAnswer = _.debounce(this.resizeWidth, 500)
  },
  watch: {
    windowWidth(newVal) {
      this.debouncedGetAnswer()
    }
  }
}
