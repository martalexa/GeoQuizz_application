<template>

    <h1>Bonjour</h1>

</template>


<script>
//import Toolbar from './Toolbar.vue'
export default {
	name: 'CreationPartie',
	data () {
		return {
			
		}
	},
	components :{
		//Toolbar
	},
	methods:{
	
    },
    mounted(){
        this.$store.commit('setToken', 'bonjour')
    }
}
</script>


<style scoped>

</style>