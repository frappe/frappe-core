module.exports = {
    format(value, field) {
        if (field.fieldtype==='Currency') {
            return frappe.format_number(value);
        } else {
            if (value===null || value===undefined) {
                return '';
            } else {
                return value + '';
            }
        }
    },

    slug(text) {
        return this.camelify(text)
    },

    getRandomName() {
        return Math.random().toString(36).substr(3);
    },

    camelify(str) {
      return str.replace(/\W+(.)/g, function(match, chr)
       {
            return chr.toUpperCase();
        });
    },


    async sleep(seconds) {
        return new Promise(resolve => {
            setTimeout(resolve, seconds * 1000);
        });
    },

    _(text, args) {
        // should return translated text
        return this.string_replace(text, args);
    },

    string_replace(str, args) {
        if (!Array.isArray(args)) {
            args = [args];
        }

        if(str==undefined) return str;

        let unkeyed_index = 0;
        return str.replace(/\{(\w*)\}/g, (match, key) => {
            if (key === '') {
                key = unkeyed_index;
                unkeyed_index++
            }
            if (key == +key) {
                return args[key] !== undefined
                    ? args[key]
                    : match;
            }
        });
    }

};
