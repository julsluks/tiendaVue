const { createApp } = Vue
import { getMovies } from "./comunicationManager.js";

createApp({
    data() {
        return {
            movies: [],
            shopping_cart: {
                products: [],
                total: 0
            }
        }
    },
    methods: {
        clickButtonMore() {
            
        }
    },
    created() {
        getMovies().then( movies=> {
            this.movies = movies
            this.movies.forEach(element => {
                element.counter = 0;
            });
        });
    }
}).mount('#app')