module.exports={
    css:{
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/assets/scss/_colors.scss";
                @import "@/assets/scss/_mixins.scss";
                `
            }
        }
    }
}