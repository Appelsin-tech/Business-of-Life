export default {
  methods: {
    scrollToSection (refName) {
      let element = this.$refs[refName]
      let top = element.offsetTop
      // window.scrollTo(0, top)
      window.scrollTo({
        top: top - 20,
        behavior: 'smooth'
      })
    }
  }
}
