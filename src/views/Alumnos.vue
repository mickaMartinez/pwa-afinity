<template>
<div>
  <side />

  <b-container class="mt-4">
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="Consulta" active>
          <consulta />
        </b-tab>
        <b-tab title="Alta">
          <alta />
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</div>
</template>

<script>
import side from "@/views/Sidebar.vue";
import alta from "@/components/AltaAlumnos.vue"
import consulta from "@/components/ConsultaAlumnos.vue"

export default {
  name: "VAlumnos",
  components: {
    side,
    alta,
    consulta
  },
  data() {
    return {};
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy();
      this.$router.push("/");
    },
  },
};
</script>