<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Clientes Cobranza
            </div>
            <div class="card-body">
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-10">
                            <label for="">Nombre</label>
                            <input v-on:input="filtrar()" v-model="txtFiltrar"  type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                        </div>
                        <div class="col-md-2 mt-3 mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Mostrar Todos
                            </label>
                        </div>
                        
                        
                    </div>
                </div>
              
                <div class="table-responsive ">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Saldo</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
            
                            
                            <tr v-for="cliente in clientes" :key="cliente.idcliente">
                                <td>{{cliente.cliente}}</td>
                                <td>{{cliente.saldo}}</td>
                      
                                <td>
                                    <div class="btn-group" role="group" aria-label=""> 
                                        <router-link :to="{name:'Cargar',params:{id:cliente.idcliente}}" class="btn btn-info"><img src="../assets/edit.svg" width="15"></router-link>
                                    </div>
                                </td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="">
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

                //propiedad filter de javascript
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

            

            const swalWithBootstrapButtons = this.$swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'ATENCION',
                text: "DESEA REALIZAR PAGO A "+cliente.cliente,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'PAGAR',
                cancelButtonText: 'CANCELAR',
                reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                this.guardarPago(cliente)
                swalWithBootstrapButtons.fire(
                'Pago Confirmado'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === this.$swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Se a cancelado el pago',
                
                )
            }
            })

        },


        guardarPago(cliente){

            axios.post('https://www.svr1.ar/cobranza/', {opcion:1,idcliente: cliente.idcliente,saldo: cliente.saldo })
            .then(response =>{

                console.log(response)
                this.consultarClientes()
            });   

        },
       
        

    }
}
</script>
