<template>
    <nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
        <i class="fas fa-map-marker-alt fa-2x"></i>
        <p>Geoquizz</p>
    </a>
    <div class="navbar-burger burger" data-target="navMenuColordark-example">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navMenuColordark-example" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              <span>Connexion</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>


<script>
export default {
	name: 'navbar',
	data () {
        return {

        }
	},
	mounted(){
        document.addEventListener('DOMContentLoaded', function () {

            // Get all "navbar-burger" elements
            var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {

                // Add a click event on each of them
                $navbarBurgers.forEach(function ($el) {
                $el.addEventListener('click', function () {

                    // Get the target from the "data-target" attribute
                    var target = $el.dataset.target;
                    var $target = document.getElementById(target);

                    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                    $el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
                });
            }

        });
    }
}
</script>


<style scoped>
</style>