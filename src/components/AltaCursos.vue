<template>
<div>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-row>
            <b-col sm="12" md="6">
                <b-form-group label="Nombre del curso:" label-for="input">
                    <b-form-input :state="form.nombre != null && form.nombre != ''" v-model.trim="form.nombre"
                        @copy.prevent @paste.prevent :disabled="cargando" placeholder="Nombre" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.nombre != null">
                        El nombre del curso es requerido
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>

            <b-col sm="12" md="6">
                <b-form-group label="Estatus:" label-for="input">
                    <b-form-select v-model="form.estatus" :options="estatus" :state="form.estatus != null"
                        :disabled="cargando" required></b-form-select>
                    <b-form-invalid-feedback :state="form.estatus != null">
                        El Estatus es requerido
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-row>

        <div v-if="!editar">
            <b-button type="submit" variant="success" :disabled="cargando">enviar</b-button>
            <b-button class="ml-4" type="reset" variant="danger" :disabled="cargando">Reset</b-button>
        </div>
        <div v-else>
            <b-button variant="success" size="md" class="float-right" @click="editarCurso">
                Editar
            </b-button>
            <b-button variant="danger" size="md" class="float-right ml-2 mr-2" @click="elimiarCurso">
                Eliminar
            </b-button>
        </div>
    </b-form>
</div>
</template>

<script>
export default {
    name: "CAltaCursos",
    props: {
        editarData: Object
    },
    data() {
        return {
            estatus: [
                {
                    value: true,
                    text: "Activo"
                },
                {
                    value: false,
                    text: "Inactivo"
                }
            ],
            form: {},
            initial: {
                nombre: null,
                estatus: null,
            },
            validate: false,
            cargando: false,
            editar: false
        };
    },
    created() {
        if (this.editarData != undefined) {
            this.editar = true;
            this.form = this.editarData;
        } else {
            this.form = this.initial;
        }
    },
    methods: {
        onSubmit() {
            if (this.validateFilter()) {
                this.cargando = true;

                let url = this.$api + "cursos";
                this.$http.post(url, this.form).then((response) => {
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
        editarCurso() {
            let url = this.$api + "cursos/" + this.form.idCurso;
            this.$http.put(url, this.form).then((response) => {
                if (response.data.data) {
                    this.$swal({
                        icon: "success",
                        text: "Se edito correctamente",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#1a4944",
                    });
                }
            });
        },
        elimiarCurso() {
            let url = this.$api + "cursos/" + this.form.idCurso;
            this.$http.delete(url).then((response) => {
                if (response.data.data) {
                    this.$swal({
                        icon: "success",
                        text: "Se elimino correctamente",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#1a4944",
                    });
                }
            });
        },
        validateFilter() {
            const regex = /['"]/;
            const nom = regex.test(this.form.nombre);
            let validate = true;

            if (nom) {
                validate = false;
            }

            return validate;
        },
        onReset() {
            this.form = { ...this.initial };
        }
    },
};
</script>