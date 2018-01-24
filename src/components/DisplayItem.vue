<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <h3>Menu:</h3>

                    <table class="table table-hover">
                        <thead class="thead-default">
                            <tr>
                                <th>Item</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Change price</th>
                            </tr>
                        </thead>
                        
                        <tbody v-for="item in items">
                            <tr>
                                <td><strong>{{ item.name }}</strong></td>
                            </tr>
                            <tr v-for="option in item.options">
                                <td></td>
                                <td>{{ option.size }}"</td>
                                <td>${{ option.price }}</td>
                                <td>
                                    <router-link :to="{name: 'EditItem', params: { id: item._id, price: option.price, size: option.size }}" 
                                    class="btn btn-primary btn-xs">
                                    Edit
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
        <div class="row">
                <div class="col-sm-12 col-md-6">
                <form action="http://localhost:4000/items/logout" method="post">
                <div class="row">    
                    <div class="col-xs-4">
                        <input type="submit" name="logout" value="Logout" id="logout" class="btn btn-primary btn-block btn-flat">
                    </div>
                </div>
            </form>
            </div>
            </div>
    </div>
</template>


<script>
export default {
        data(){
            return{
                items: []
            }
        },
        created: function(){
            this.fetchItems();
        },
        methods: {
            fetchItems(){
              let url = 'http://localhost:4000/items';
              this.axios.get(url).then((response) => {
                  this.items = response.data;
              });
            }
        }
    }
</script>