<template>
    <div>
        <h1>
            Update Item
        </h1>
        <div class="row">
          <div class="col-md-10">
          </div>
          <div class="col-md-2">
            <router-link :to="{ name: 'DisplayItem' }" class="btn btn-success">
                Return to Items
            </router-link>
            </div>
        </div>
        <form v-on:submit.prevent="updateItem">
            <div class="form-group">
                <label>Item Name</label>
                <input type="text" class="form-control" v-model="item.name">
            </div>
            <div class="form-group">
                <label name="product_price">Item Price</label>
                <input type="text" class="form-control" v-model="item.options[0].price">
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                item:{}
            }
        },
        created: function(){
            
            this.getItem();
            
        },
        methods: {
            getItem(){
                
                let url = 'http://localhost:4000/items/edit/'+this.$route.params.id;

                this.axios.get(url).then((response) => {
                
                    // for(let i=0;i<response.data.options.length;i++){
                       
                    //     if(response.data.options[i].size!==this.$route.params.size){
                    //         response.data.options.splice(i,1);
                    //         i--;
                    //     }
                    // }

                    this.item = response.data;
                    
                });
            },
            updateItem(){

                let url = 'http://localhost:4000/items/update/'+this.$route.params.id+'/'+this.$route.params.size+'/'+this.$route.params.price;

                this.axios.post(url, this.item).then((response) => {
                  this.$router.push({name: 'DisplayItem'});
                });
            }
        }
    }
</script>