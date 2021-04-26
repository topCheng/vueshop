import Confirm from "./confirm.vue"
export default{
    install(Vue) {
        /*Vue.component("my-confirm",Confirm);*/
        let ConfirmObj = Vue.extend(Confirm);
        Vue.prototype.$confirm = function(msg,btns) {
            let ConfirmInit = new ConfirmObj().$mount(document.createElement("div"));
            /*console.log(ConfirmInit)*/
            document.body.appendChild(ConfirmInit.$el);
            ConfirmInit.msg = msg;
            if(btns && btns.length > 0) {
                ConfirmInit.btns = btns;
            }
            /*console.log(message, btns);*/
        }
    }
}