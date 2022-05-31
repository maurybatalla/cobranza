<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Clientes
            </div>
            <div class="card-body">
                <div class="form-group">
                <label for="">Nombre</label>
                <input v-on:input="filtrar()" v-model="txtFiltrar"  type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
        
                </div>
                <div class="table-responsive ">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Saldo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
            
                            
                            <tr v-for="cliente in clientes" :key="cliente.idcliente">
                                <td>{{cliente.cliente}}</td>
                                <td>{{cliente.saldo}}</td>
                      
                                <td>
                                    <div class="btn-group" role="group" aria-label="">
                               
                                         
                                                <router-link :to="{name:'Cargar',params:{id:cliente.idcliente}}" class="btn btn-info"><img src="../assets/edit.svg" width="15"></router-link>
                                                <!--<button type="button" v-on:click="confirmarPago()" class="btn btn-info"><img src="../assets/edit.svg" width="15"></button>-->
                                          
                                                <button type="button" v-on:click="confirmarPago(cliente)" class="btn btn-success">  <img src="../assets/dollar-sign.svg" width="15"></button>
                                      
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
            clientes:[],
            txtFiltrar:'',

        }
    },
    created:function(){
        this.consultarClientes();
    },
    methods:{
        filtrar(){
            if (this.txtFiltrar==='') {
                this.consultarClientes();
            }

            this.clientes = this.clientes.filter(e =>{

                if (e.cliente.toLowerCase().search(this.txtFiltrar.toLowerCase()) != -1) {
                   return true
                } else {
                   return false
                }

            })
        },
        consultarClientes(){
            
            axios.get("https://www.svr1.ar/cobranza/").then((result) => {
                console.log(result.data);
                this.clientes = []
                this.clientes = result.data;
  
            })
            
        
        },
        confirmarPago(cliente){
            
            if (confirm("EFECTUAR PAGO TOTAL?") == true) {
                console.log(cliente.idcliente)
                this.guardarPago(cliente)
                //this.guardarPago(cliente)
            } else {
                console.log('no')
            }
        },
        guardarPago(cliente){

            var datosEnviar=cliente

            let formData = new FormData();
            for(let key in cliente) {
                formData.append(key, cliente[key]);
            }
           

             fetch('https://www.svr1.ar/cobranza/?pagar='+cliente.idcliente,{
                 method:"POST",
                 body:JSON.stringify(datosEnviar)
             })
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta=>{
                console.log(datosRespuesta);
                this.consultarClientes()
                //window.location.href='../listar',
            }))
        }
        

    }
}
</script>
