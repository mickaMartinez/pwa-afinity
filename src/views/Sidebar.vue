<template>
  <div>
    <navBar />
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template v-slot:default="{ hide }">
        <div class="p-3">
          <b-button class="close-nav" variant="secondary" @click="hide">
            X
          </b-button>
          <br />

          <hr />
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item to="/alumnos" exact exact-active-class="active" active
                @click="hide"><b-icon-info-square></b-icon-info-square> Alumnos
                <b-icon-chevron-compact-right class="close-nav"></b-icon-chevron-compact-right>
              </b-nav-item>
              <b-nav-item to="/cursos" exact exact-active-class="active" active
                @click="hide"><b-icon-info-square></b-icon-info-square> Cursos
                <b-icon-chevron-compact-right class="close-nav"></b-icon-chevron-compact-right>
              </b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
import navBar from "@/views/Nav.vue";
export default {
  name: "VSidebar",
  components: {
    navBar,
  },
  data: () => ({
    listaMenu: null,
  }),
  created() {
    this.listaMenu = this.$session.get("menu");
  },
};
</script>
<style scoped>
.close-nav {
  float: right;
  align-self: flex-end;
}
</style>