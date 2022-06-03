<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Cargar pago detallado
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarRegistro">
                    <div class="form-group">
                      <label for="">Nombre: </label>
                      <input type="text"
                        class="form-control" disabled name="cliente" required v-model="txtCliente" id="cliente" aria-describedby="helpId" placeholder="">
                    </div>

                    <div class="form-group">
                      <label for="">Direccion: </label>
                      <input type="text"
                        class="form-control" disabled name="direccion" required v-model="txtDireccion" id="direccion" aria-describedby="helpId" placeholder="">
                    </div>

                    <div class="form-group">
                      <label for="">Importe: </label>
                      <input type="numeric"
                        class="form-control"  name="importe" required v-model="txtImporte" id="importe" aria-describedby="helpId" placeholder="">
                    </div>
                    
                    <div class="form-group">
                        <label for="">Observacion</label>
                        <textarea v-model ="txtObserva" class="form-control" name="" id="" rows="2"></textarea>
                    </div>
                      

                    <div class="mt-2 btn-group" role="group" aria-label="">
                        <button v-on:click="agregarRegistro()" type="submit" class="btn btn-success">Cargar Pago </button>
                        <router-link :to="{name:'Listar'}" class="btn btn-warning">Cancelar</router-link>
                       
                    </div>

                </form>
            </div>
            <div class="card-footer text-muted">
                Estudio Software
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            //empleado:{},
            txtIdCliente : '',
            txtCliente :'',
            txtDireccion:'',
            txtImporte:'',
            txtObserva:'',
            cliente:[],
        }
    },
     created:function(){
        this.consultarCliente();
    },
    methods:{
        consultarCliente(){
            axios.get("https://www.svr1.ar/cobranza/?consultaCliente="+this.$route.params.id).then((result) => {
                console.log(result.data);
                this.cliente = []
                this.cliente = result.data;
                this.txtIdCliente  = this.cliente[0].idcliente
                this.txtCliente = this.cliente[0].cliente
                this.txtDireccion = this.cliente[0].direccion
                this.txtImporte = this.cliente[0].importe 
                this.txtObserva = this.cliente[0].observa

                console.log(this.txtCliente)
  
            })
        },
        agregarRegistro(){

             axios.post('https://www.svr1.ar/cobranza/', {opcion:2,idcliente: this.txtIdCliente,importe: this.txtImporte,observa : this.txtObserva })
            .then(response =>{

                console.log(response)
                window.location.href='../listar'
            });

        }
        
    }
}
</script>
