<template>
    <div class="login justify-content-center align-items-center vh-100">
        <div class="wrapper fadeInDown">
            <div id="formContent">
                <div class="fadeIn first">
                    <img alt="Vue logo" src="../assets/logo.png" />
                </div>

                <div id="login col-sm-4">
                    <input type="text" id="user" class="fadeIn second inicioTexto" name="username" v-model="input.usr"
                        placeholder="Username" />
                    <input type="password" id="password" class="fadeIn third inicioPass" name="password"
                        v-model="input.pwd" placeholder="Password" />
                    <input type="button" class="fadeIn fourth" v-on:click="login()" value="Iniciar Sesion"
                        v-if="!cargando" />

                    <b-button class="mb-4" v-else size="lg" disabled>
                        <b-spinner></b-spinner>
                        Cargando...
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "VLogin",
    data() {
        return {
            input: {
                usr: "",
                pwd: "",
            },
            cargando: false,
        };
    },
    methods: {
        login: function () {
            if (this.input.usr == "sysadmin" && this.input.pwd == "masterkey") {
                this.$session.start();
                this.$session.set("usuario", "Admin");
                this.$router.push("/alumnos");
            } else {
                alert("Por favor verifica tus credenciales");
            }
        },
    },
};
</script>