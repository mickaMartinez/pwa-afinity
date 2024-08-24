<template>
<div>
    <div>
        <b-table striped hover responsive :items="registros" :fields="fields" :busy="cargando">
            <template #cell(estatus)="row">
                <b-badge variant="primary" v-if="row.item.estatus">{{ row.item.estatus }}</b-badge>
                <b-badge variant="danger" v-else> {{ row.item.estatus }}</b-badge>
            </template>
            <template #cell(accion)="row">
                <b-button size="sm" variant="secondary" class="mb-2" v-on:click="showModal(row.item)">
                    <b-icon icon="pencil-fill"></b-icon>
                </b-button>
            </template>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Cargando...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination v-model="paginaActual" :total-rows="total" :per-page="pagina" @input="traerCursos"></b-pagination>
    </div>

    <div>
        <b-modal ref="modal-editar" size="lg" title="Editar Alumno" hide-footer no-close-on-backdrop>
            <AltaCursos :editarData="filterData" />
        </b-modal>
    </div>
</div>
</template>

<script>
import AltaCursos from './AltaCursos.vue';

export default {
    name: "CConsultaCursos",
    components: {
        AltaCursos
    },
    data() {
        return {
            fields: [
                {
                    key: 'idCurso',
                    sortable: false
                },
                {
                    key: 'nombre',
                    sortable: true
                },
                {
                    key: 'estatus',
                    sortable: false
                },
                {
                    key: 'Accion'
                }
            ],
            registros: [],
            total: null,
            pagina: 10,
            paginaActual: 1,
            filterData: {},
            cargando: true
        };
    },
    created() {
        this.traerCursos();
    },
    methods: {
        traerCursos() {
            const pagina = this.paginaActual - 1;
            let url = this.$api + "cursos?pagina=" + pagina;
            this.$http.get(url).then((response) => {
                if (response.data.data) {
                    this.registros = response.data.data.cursos;
                    this.total = response.data.data.totalRegistros;
                }
            }).finally(() => {
                this.cargando = false;
            });
        },
        showModal(scope) {
            this.$refs['modal-editar'].show();
            this.filterData = scope;
        },
    },
};
</script>