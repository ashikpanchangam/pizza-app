<style>
#displayMenu{
    padding-top: 10%;
}

.cartText{
    color: red;
}
</style>
<template>
    <div id="displayMenu" class="row">
        <div class="col-sm-12 col-md-6">
            <table class="table table-hover">
                <thead class="thead-default">
                    <tr>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Add to Cart</th>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuItems">
                    <tr>
                        <td><strong>{{ item.name }}</strong></td>
                    </tr>
                    <tr v-for="option in item.options">
                        <td>{{ option.size }}"</td>
                        <td>${{ option.price }}</td>
                        <td><button class="btn btn-sm btn-outline-success" 
                            type="button"
                            @click="addToCart( item, option )">+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- The cart -->
        <div class="col-sm-12 col-md-6">
            <div v-if="cart.length > 0">
                <table class="table">
                    <thead class="thead-default">
                        <tr>
                            <th>Quantity</th>
                            <th>Item</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in cart">
                        <tr>
                            <td><button class="btn btn-sm" 
                                    type="button"
                                    @click="decreaseQuantity(item)">-</button>
                                <span>{{ item.quantity }}</span>
                                <button class="btn btn-sm" 
                                    type="button"
                                    @click="increaseQuantity(item)">+</button>
                            </td>
                            <td>{{ item.name }} {{ item.size }}"</td>
                            <td>${{ item.price * item.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
                <p>Order total: ${{ orderTotal }}</p>
                <button class="btn btn-success btn-block">Place Order</button>
            </div>

            <div class="cartText" v-else>
                <p><strong>{{cartText}}</strong></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                cart:[],

                getMenuItems:{},

                cartText: 'Your cart is empty! Add a few items',
            }
        },

        computed:{
            orderTotal(){
                let orderTotal = 0;
                for(let items in this.cart){
                    let individualItem = this.cart[items];
                    orderTotal += individualItem.quantity * individualItem.price;
                }
                return orderTotal;
            }
        },

        created: function(){
            this.fetchItems();
        },

        methods:{
            fetchItems(){
              let url = 'http://localhost:4000/items';
              this.axios.get(url).then((response) => {
                  this.getMenuItems = response.data;
              });
            },

            addToCart(item, option){
                this.cart.push({
                    name: item.name,
                    price: option.price,
                    size: option.size,
                    quantity: 1
                });
            },

            removeFromCart(item){
                this.cart.splice(this.cart.indexOf(item), 1);
            },

            increaseQuantity(item){
                item.quantity++;
            },
            decreaseQuantity(item){
                item.quantity--;
                if(item.quantity === 0){
                    this.removeFromCart(item);
                }
            }
        }
    }
</script>