<!-- Home page component !-->

<style>
    #home{
        height: 800px;
        padding: 10%;
        background-image: url('https://static1.squarespace.com/static/557973cee4b0a256bcfea152/55898c97e4b08ed437daffeb/5589b045e4b0ecad10b6bd4e/1435368925877/pizza.jpg?format=1500w');
    }

    h1,h2{
        margin: 6%;
    }

    .background{
        background: #eee;
        opacity: 0.8;
        max-width: 60%;
        margin: 0 auto;
        padding: 1px 0;
    }

    .backgroundTwo{
        background: #eee;
        opacity: 0.8;
        max-width: 60%;
        margin: 0 auto;
        padding: 20px 0;
    }
</style>

<template>
    <div class="row">

        <div id="home" class="col-sm-12 text-center">

            
            <div class="background">
                <h1 style="color:green">
                    Hungry for a pizza?
                </h1>
                <h2>
                    You are at the right place!
                </h2>
                <router-link class="btn btn-danger" :to="{name: 'DisplayMenu'}">Click here to order!</router-link>
                
            </div>
            <div class="backgroundTwo">
                <h2>
                    Admin? Click below to Login!
                </h2>
                <router-link class="btn btn-info" :to="{name: 'Login'}">Login</router-link>
            </div>

        </div>
    </div>
</template>