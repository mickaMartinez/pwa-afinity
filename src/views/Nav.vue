<template>
<div>
  <b-navbar toggleable="lg" class="colorPrincipal" id="encabezadoPantalla">
    <b-button v-b-toggle.sidebar-no-header variant="secondary"><b-icon-list></b-icon-list></b-button>

    <h4><b-badge variant="secondary"> Modulo - {{ this.$route.name }} </b-badge></h4>
    <b-dropdown right variant="secondary">
      <template #button-content>
        <em><b-icon-gear-wide></b-icon-gear-wide></em>
      </template>

      <b-dropdown-item disabled="disabled">{{ usr_name }}</b-dropdown-item>
      <b-dropdown-item v-on:click="logout()">Cerrar Sesion</b-dropdown-item>
    </b-dropdown>
  </b-navbar>
</div>
</template>
<script>
export default {
  name: "VNav",
  data() {
    return {
      usr_name: "",
    };
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },
  mounted() {
    if (this.$session.exists()) {
      this.usr_name = this.$session.get("usuario");
    }
  },
  methods: {
    logout: function () {
      localStorage.clear();
      this.$session.destroy();
      this.$router.push("/");
    },
  },
};
</script>