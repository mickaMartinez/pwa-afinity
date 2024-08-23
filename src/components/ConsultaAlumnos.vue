<template>
<div>
    <!-- <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-row>
            <b-col sm="12" md="6">
                <b-form-group label="Nombre:" label-for="input">
                    <b-form-input :state="form.nombre != null && form.nombre != ''" v-model.trim="form.nombre"
                        @copy.prevent @paste.prevent :disabled="cargando" placeholder="Nombre" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.nombre != null">
                        El nombre es requerido
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col sm="12" md="6">
                <b-form-group label="Apellido Paterno:" label-for="input">
                    <b-form-input :state="form.apellidoPaterno != null && form.apellidoPaterno != ''"
                        v-model.trim="form.apellidoPaterno" @copy.prevent @paste.prevent :disabled="cargando"
                        placeholder="Apellido Paterno" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.apellidoPaterno != null">
                        El apellido paterno es requerido
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="12" md="6">
                <b-form-group label="Apellido Materno:" label-for="input">
                    <b-form-input :state="form.apellidoMaterno != null && form.apellidoMaterno != ''"
                        v-model.trim="form.apellidoMaterno" @copy.prevent @paste.prevent :disabled="cargando"
                        placeholder="Apellido Materno" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.apellidoMaterno != null">
                        El apellido materno es requerido
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>

            <b-col sm="12" md="6">
                <b-form-group label="Correo:" label-for="input">
                    <b-form-input :state="form.correo != null && form.correo != ''" v-model.trim="form.correo"
                        @copy.prevent @paste.prevent :disabled="cargando" type="email" placeholder="Correo" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.correo != null">
                        El apellido Correo es requerido
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="12" md="6">
                <b-form-group label="Telefono:" label-for="input">
                    <b-form-input :state="form.telefono != null && form.telefono != ''" v-model="form.telefono"
                        @copy.prevent @paste.prevent :disabled="cargando" type="text" pattern="[0-9]+"
                        placeholder="Telefono" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.telefono != null">
                        El Telefono es requerido
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-row>

        <b-button type="submit" variant="success" :disabled="cargando">enviar</b-button>
        <b-button class="ml-4" type="reset" variant="danger" :disabled="cargando">Reset</b-button>
    </b-form> -->

    <div>
        <b-table striped hover responsive :items="registros" :fields="fields" :busy="cargando">
            <template #cell(estatus)="row">
                <b-badge variant="primary" v-if="row.item.estatus">{{ row.item.estatus }}</b-badge>
                <b-badge variant="danger" v-else> {{ row.item.estatus }}</b-badge>
            </template>
            <template #cell(accion)="row">
                <b-button size="sm" variant="secondary" v-on:click="showModalEditar(row.item)">
                    <b-icon icon="pencil-fill"></b-icon>
                </b-button>
                <b-button size="sm" variant="primary" class="ml-2" v-on:click="showModalDetalle(row.item)">
                    <b-icon icon="clipboard"></b-icon>
                </b-button>
            </template>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Cargando...</strong>
                </div>
            </template>
        </b-table>
        <b-pagination v-model="paginaActual" :total-rows="total" :per-page="pagina"
            @input="traerAlumnos"></b-pagination>
    </div>

    <div>
        <b-modal ref="modal-editar" size="lg" title="Editar Alumno" hide-footer no-close-on-backdrop>
            <AltaAlumnos :editarData="filterData" />
        </b-modal>

        <b-modal ref="modal-detalle" size="xl" :title="'Alumno ' + detalle.nombre" hide-footer no-close-on-backdrop>
            <Inscripciones :detalleData="detalle" />
        </b-modal>
    </div>
</div>
</template>

<script>
import AltaAlumnos from './AltaAlumnos.vue';
import Inscripciones from '../views/Inscripciones.vue';

export default {
    name: "CConsultaAlumnos",
    components: {
        AltaAlumnos,
        Inscripciones
    },
    data() {
        return {
            fields: [
                {
                    key: 'idAlumno',
                    sortable: false
                },
                {
                    key: 'nombre',
                    sortable: true
                },
                {
                    key: 'apellidoPaterno',
                    sortable: false
                },
                {
                    key: 'apellidoMaterno',
                    sortable: false
                },
                {
                    key: 'correo',
                    sortable: false
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
            detalle: {},
            cargando: true
        };
    },
    created() {
        this.traerAlumnos();
    },
    methods: {
        traerAlumnos() {
            const pagina = this.paginaActual - 1;
            let url = this.$api + "alumnos?pagina=" + pagina;
            this.$http.get(url).then((response) => {
                if (response.data.data) {
                    this.registros = response.data.data.alumnos;
                    this.total = response.data.data.totalRegistros;
                }
            }).finally(() => {
                this.cargando = false;
            });
        },
        showModalEditar(scope) {
            this.$refs['modal-editar'].show();
            this.filterData = scope;
        },
        showModalDetalle(scope) {
            this.$refs['modal-detalle'].show();
            this.detalle = scope;
        },
    },
};
</script>