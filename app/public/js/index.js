const SomeApp = {
    data() {
      return {
        books: [],
        infoForm: {},
        selectedBook: null
      }
    },
    computed: {},
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchBookInfo() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        post(evt) {
          if (this.selectedBook === null) {
            this.postNewBook(evt);
        } else {
            this.postEditBook(evt);
        }
      },
        postEditBook(evt) {
          this.infoForm.bookId = this.selectedBook.id;    
          
          console.log("Updating!", this.infoForm);
  
          fetch('api/books/update.php', {
              method:'POST',
              body: JSON.stringify(this.infoForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form
              this.resetInfoForm();
            });
        },
        postNewBook(evt) {      
          console.log("Creating!", this.infoForm);
  
          fetch('api/books/create.php', {
              method:'POST',
              body: JSON.stringify(this.infoForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              this.resetInfoForm();
            });
        },

        postDeleteBook(o) {
          if (!confirm("Are you sure you want to delete this book?")) {
              return;
          }
          
          fetch('api/books/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              this.resetInfoForm();
            });
        },
        selectBook(o) {
          this.selectedBook = o;
          this.infoForm = Object.assign({}, this.selectedBook);
        },
        resetInfoForm() {
            this.selectedBook = null;
            this.infoForm = {};
        }
    },
    created() {
        this.fetchBookInfo();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#bookApp');