const { createApp } = Vue
import { getMovies } from "./comunicationManager.js";

createApp({
    data() {
        return {
            movies: [],
            shopping_cart: {
                products: [],
                totalPrice: 0,
                totalItems: 0
            },
            titleAccount: false,
            totalAccount: false
        }
    },
    methods: {
        showTotals() {
            if (this.shopping_cart.products.length == 0) {
                this.titleAccount = false;
                this.totalAccount = false;
            } else {
                this.titleAccount = true;
                this.totalAccount = true;
            }
        },
        searchMoviePos(movie) {
            for (let i = 0; i < this.movies.length; i++) {
                if(movie.imdbID == this.movies[i].imdbID){
                    return i;
                }
            }
        },
        searchProductPos(movie) {
            for (let i = 0; i < this.shopping_cart.products.length; i++) {
                if(movie.imdbID == this.shopping_cart.products[i].imdbID){
                    return i;
                }
            }
        },
        countPriceAccount() {
            let priceSCart = 0;
            this.shopping_cart.products.forEach( element => {
                priceSCart += element.price * element.counter;
            });
            this.shopping_cart.totalPrice = priceSCart;
        },
        countItemsAccount() {
            let itemsSCart = 0;
            this.shopping_cart.products.forEach( element => {
                itemsSCart += element.counter;
            });
            this.shopping_cart.totalItems = itemsSCart;
        },
        clickButtonLess(movie) {
            let position = this.searchMoviePos(movie);
            if (this.movies[position].counter > 0) {
                this.movies[position].counter--;
                if (this.movies[position].counter == 0) {
                    let index = this.searchProductPos(movie);
                    this.shopping_cart.products.splice(index,1);
                }
                //shopping_cart
                this.countPriceAccount();
                this.countItemsAccount();
                //views
                this.showTotals();
            }
        },
        clickButtonMore(movie) {
            let position = this.searchMoviePos(movie);
            if (this.movies[position].counter < 10) {
                this.movies[position].counter++;
                if (!this.shopping_cart.products.includes(this.movies[position])) {
                    this.shopping_cart.products.push(this.movies[position]);
                }
                //shopping_cart
                this.countPriceAccount();
                this.countItemsAccount();
                //views
                this.showTotals();
            } else {
                alert ('Máxim 10 unitats per producte');
            }
        }
    },
    created() {
        getMovies().then( movies=> {
            this.movies = movies
            this.movies.forEach(element => {
                element.counter = 0;
                element.price = 7;
            });
        });
    }
}).mount('#app')