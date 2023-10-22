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
            user: {
                name: '',
                surnames: '',
                DNI: '',
                residence: '',
                email: ''
            },
            front_page: true,
            shopping: false,
            checkout: false
        }
    },
    methods: {
        //front-page_functions
        clickStartShopping(){
            this.front_page = false;
            this.shopping = true;
            const myElement = document.getElementById('app');
            myElement.classList.remove('bg_front_page'); // Elimina la clase existente
            myElement.classList.add('bg_shopping_page');
        },
        //shopping_functions
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
                alert ('Maximum 10 units');
            }
        },
        clickCheckout() {
            if (this.shopping_cart.totalItems > 0) {
                this.shopping = false;
                this.checkout = true;
                if (localStorage == null) {
                    this.user.name = localStorage.getItem(JSON.parse(user.name));
                    this.user.surnames = localStorage.getItem(JSON.parse(user.surnames));
                    this.user.DNI = localStorage.getItem(JSON.parse(user.DNI));
                    this.user.residence = localStorage.getItem(JSON.parse(user.residence));
                    this.user.email = localStorage.getItem(JSON.parse(user.email));
                }
            } else {
                alert('You cannot check out without choosing first');
            }
        },
        //checkout_functions
        clickBuyForm() {
            this.checkout = false;
            this.front_page = true;
            if (localStorage == null) {
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(this.user));
            }
            //valores iniciales
            this.shopping_cart.products.splice();
            this.shopping_cart.totalAccount = 0;
            this.shopping_cart.totalItems = 0;
            this.movies.forEach(element => {
                element.counter = 0;
            });
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