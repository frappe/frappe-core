<script>
import Base from './Base';
export default {
  extends: Base,
  methods: {
    getInputTag() {
      return 'select';
    },
    getInputAttrs() {
      return {
        id: this.id,
        required: this.docfield.required,
        disabled: this.disabled
      };
    },
    getInputChildren(h) {
      return this.docfield.options.map(option =>
        if (!isObject(option)) {
          return h('option', {
            attrs: {
              key: option,
              value: option,
              disabled: option.indexOf('...') > -1,
              selected: option.indexOf('...') > -1 || option === this.value
            },
            domProps: {
              textContent: option
            }
          });
        } else {
          return h('option', {
            attrs: {
              key: option.value,
              value: option.value,
              disabled: option.value.indexOf('...') > -1 || option.value == '',
              selected: option.value.indexOf('...) > -1 || option.value == this.value
            },
            domProps: {
              textContent: option.label
            }
          })
        }
      );
    }
  }
};
</script>
