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
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
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
            console.log ("Test:", this.selectedBook);
          if (this.selectedBook) {
              this.postEditBook(evt);
          } else {
              this.postNewBook(evt);
          }
        },
        postEditBook(evt) {
          this.infoForm.id = this.selectedBook.id;    
          
          console.log("Editing!", this.infoForm);
  
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
              this.handleResetEdit();
            });
        },
        postNewBook(evt) {
          this.infoForm.bookId = this.selectedBook.id;        
          
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
              
              // reset the form
              this.handleResetEdit();
            });
        },
        handleEditBook(books) {
            this.selectedBook = books;
            this.infoForm = Object.assign({}, this.selectedBook);
        },
        handleResetEdit() {
            this.selectedBook = null;
            this.infoForm = {};
        }
    },
    created() {
        this.fetchBookInfo();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#bookApp');