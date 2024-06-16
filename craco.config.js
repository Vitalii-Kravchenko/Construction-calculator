const path = require('path');

module.exports = {
    style: {
        sass: {
            loaderOptions: {
                additionalData: `
                    @import "./src/assets/styles/_variables.sass"
                    @import "./src/assets/styles/_mixins.sass"
                    @import "./src/assets/fonts/_fonts.sass"
                `,
            },
        },
    },
};