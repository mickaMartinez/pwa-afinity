<template>
<div>
    <div>
        <b-table striped hover responsive :items="registros" :fields="fields" :busy="cargando">
            <template #cell(accion)="row">
                <b-button size="sm" variant="danger" v-on:click="eliminarMateria(row.item.idInscripcion)"
                    :disabled="envio">
                    <b-icon icon="trash"></b-icon>
                </b-button>
            </template>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Cargando...</strong>
                </div>
            </template>
        </b-table>
    </div>
</div>
</template>

<script>
export default {
    name: "CInscripciones",
    props: {
        detalleData: Object,
        envio: Boolean
    },
    data() {
        return {
            fields: [
                {
                    key: 'idInscripcion',
                    sortable: false
                },
                {
                    key: 'nombre',
                    sortable: true
                },
                {
                    key: 'Accion'
                }
            ],
            registros: [],
            cargando: true
        };
    },
    created() {
        this.traerMaterias();
    },
    methods: {
        traerMaterias() {
            let url = this.$api + "inscripciones/" + this.detalleData.idAlumno;
            this.$http.get(url).then((response) => {
                if (response.data.data) {
                    this.registros = response.data.data;
                }
            }).finally(() => {
                this.cargando = false;
            });
        },
        eliminarMateria(idInscripcion) {
            let url = this.$api + "inscripciones/" + idInscripcion;
            this.$http.delete(url).then((response) => {
                if (response.data.data) {
                    this.$swal({
                        icon: "success",
                        text: "Se elimino correctamente",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#1a4944",
                    });
                }
            }).finally(() => {
                this.traerMaterias();
            });
        }
    },
}
</script>