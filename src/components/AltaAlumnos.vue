<template>
<div>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-row>
            <b-col sm="12" md="6">
                <b-form-group label="Nombre del alumno:" label-for="input">
                    <b-form-input :state="form.nombre != null && form.nombre != ''" v-model.trim="form.nombre"
                        @copy.prevent @paste.prevent :disabled="cargando" placeholder="Nombre" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.nombre != null">
                        El nombre del alumno es requerido
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
                        @copy.prevent @paste.prevent :disabled="cargando" type="text" pattern="[0-9]+" maxlength="10"
                        placeholder="Telefono" required>
                    </b-form-input>
                    <b-form-invalid-feedback :state="form.telefono != null">
                        El Telefono es requerido
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

        <b-row>
            <b-col sm="12" md="6">
                <b-form-group label="Imagen:" label-for="input"
                    description="Debe escoger una imagen .png, maximo de dimensiones 350px">
                    <b-form-file placeholder="Seleccionar imagen *" accept=".png" browse-text="Abrir"
                        :state="form.imagen != null" :disabled="cargando" required
                        v-on:change="seleccionarArchivo"></b-form-file>
                </b-form-group>
            </b-col>
        </b-row>

        <div v-if="!editar">
            <b-button type="submit" variant="success" :disabled="cargando">enviar</b-button>
            <b-button class="ml-4" type="reset" variant="danger" :disabled="cargando">Reset</b-button>
        </div>
        <div v-else>
            <b-button variant="success" size="md" class="float-right" @click="editarAlumno">
                Editar
            </b-button>
            <b-button variant="danger" size="md" class="float-right ml-2 mr-2" @click="eliminarAlumno">
                Eliminar
            </b-button>
        </div>
    </b-form>
</div>
</template>

<script>
export default {
    name: "CAltaAlumnos",
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
                apellidoPaterno: null,
                apellidoMaterno: null,
                correo: null,
                telefono: null,
                estatus: null,
                imagen: null,
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

                let url = this.$api + "alumnos";
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
        editarAlumno() {
            let url = this.$api + "alumnos/" + this.form.idAlumno;
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
        eliminarAlumno() {
            let url = this.$api + "alumnos/" + this.form.idAlumno;
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
        seleccionarArchivo(e) {
            let files = e.target.files || e.dataTransfer.files;
            const file = new Blob([files[0]], { type: "image/png" });

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (evt) => {
                let img = new Image();
                img.src = evt.target.result;

                img.onload = () => {
                    if (img.width > 350 || img.height > 350) {
                        this.$swal({
                            icon: "error",
                            title: "La imagen excede del tamaño 350px",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#1a4944",
                        });
                    } else {
                        const name = e.target.files[0].name;
                        const lastDot = name.lastIndexOf(".");
                        const fileName = name.substring(0, lastDot);
                        const ext = name.substring(lastDot + 1);

                        const formData = new FormData();
                        formData.append("imagenBase", file, fileName);
                        formData.append("nombre", fileName);
                        formData.append("ext", ext);

                        this.form.imagen = formData;
                    }
                };
            };

            reader.onerror = (evt) => {
                console.error(evt);
            };
        },
        validateFilter() {
            const regex = /['"]/;
            const nom = regex.test(this.form.nombre);
            const pat = regex.test(this.form.apellidoPaterno);
            const mat = regex.test(this.form.apellidoMaterno);
            let validate = true;

            if (nom || pat || mat) {
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