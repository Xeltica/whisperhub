<template lang="pug">
component(:is="$store.getters.isSignedIn ? 'home' : 'welcome'")
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import Home from "./Home.vue";
import Welcome from "./Welcome.vue";
@Component({
	components: { Home, Welcome },
})
export default class Index extends Vue {
}
</script>
