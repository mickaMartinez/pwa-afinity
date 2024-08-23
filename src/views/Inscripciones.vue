<template>
<div>
    <div>
        <v-select v-model="materiaSeleccionada" :options="registros" @search="traerMaterias" label="nombre"
            @input="agregarMateria" :disabled="cargando">
            <span slot=" no-options">No hay valores disponibles</span>
        </v-select>

        <b-row class="mt-4">
            <b-col>
                <b-alert show>Materias actuales</b-alert>
                <DetalleInscripciones :detalleData="detalleData" :envio="cargando" />
            </b-col>
            <b-col>
                <b-row>
                    <b-col sm="6" md="6">
                        <b-alert show>Nuevas materias</b-alert>
                    </b-col>
                    <b-col>
                        <b-form @submit.prevent="enviarMaterias">
                            <b-button type="submit" variant="success">enviar</b-button>
                        </b-form>
                    </b-col>
                </b-row>

                <b-table responsive :items="nuevoCurso" :fields="fields" :busy="cargando">
                    <template #cell(accion)="row">
                        <b-button size="sm" variant="danger" v-on:click="eliminarCurso(row.index)">
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                    </template>
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Enviando...</strong>
                        </div>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import DetalleInscripciones from '@/components/DetalleInscripciones.vue';

export default {
    name: "CInscripciones",
    props: {
        detalleData: Object
    },
    components: {
        DetalleInscripciones,
    },
    data() {
        return {
            materiaSeleccionada: null,
            nuevoCurso: [],
            registros: [],
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
                    key: 'Accion'
                }
            ],
            cargando: false,
        }
    },
    methods: {
        traerMaterias(search, loading) {
            loading(true);
            let url = this.$api + "inscripciones?curso=" + search;
            this.$http.get(url).then((response) => {
                if (response.data.data) {
                    this.registros = response.data.data;
                }
            }).finally(() => {
                loading(false);
            });
        },
        agregarMateria() {
            this.nuevoCurso.push(this.materiaSeleccionada);
        },
        eliminarCurso(index) {
            this.nuevoCurso.splice(index, 1);
        },
        enviarMaterias() {
            let payload = {
                idAlumno: this.detalleData.idAlumno,
                cursos: this.nuevoCurso.map(it => it.idCurso)
            }

            this.cargando = true;
            let url = this.$api + "inscripciones";

            this.$http.post(url, payload).then((response) => {
                if (response.data.data) {
                    this.$swal({
                        icon: "success",
                        text: "Se registró correctamente",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#1a4944",
                    });
                }
            }).finally(() => {
                this.cargando = false;
            });
        }

    },
}
</script>