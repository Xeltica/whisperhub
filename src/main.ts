import Vue from "vue";
import App from "@/client/App.vue";
import router from "@/client/router";
import store from "@/client/store";
import "@/client/registerServiceWorker";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PrettyCheckbox from "pretty-checkbox-vue";

Vue.use(PrettyCheckbox);

library.add(fas);
library.add(far);
library.add(fab);

Vue.component("fa", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
