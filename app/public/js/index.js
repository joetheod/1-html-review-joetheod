const SomeApp = {
    data() {
      return {
        books: [],
        selectedBook: null,
        info: [],
        infoForm: {},
        selectedInfo: null
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
        selectBook(s) {
            if (s == this.selectedBook) {
                return;
            }
            this.selectedBook = s;
            this.info = [];
            this.fetchOfferData(this.selectedBook);
        },
        fetchBooks() {
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
        fetchBookInfo(s) {
            console.log("Fetching book info for ", s);
            fetch('/api/info/?book=' + s.bookId)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.info = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        post(evt) {
            console.log ("Test:", this.selectedOffer);
          if (this.selectedOffer) {
              this.postEditOffer(evt);
          } else {
              this.postNewOffer(evt);
          }
        },
        postEditOffer(evt) {
          this.offerForm.id = this.selectedOffer.id;
          this.offerForm.studentId = this.selectedStudent.id;        
          
          console.log("Editing!", this.offerForm);
  
          fetch('api/offer/update.php', {
              method:'POST',
              body: JSON.stringify(this.offerForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        postNewOffer(evt) {
          this.offerForm.studentId = this.selectedStudent.id;        
          
          console.log("Creating!", this.offerForm);
  
          fetch('api/offer/create.php', {
              method:'POST',
              body: JSON.stringify(this.offerForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        handleEditOffer(offer) {
            this.selectedOffer = offer;
            this.offerForm = Object.assign({}, this.selectedOffer);
        },
        handleResetEdit() {
            this.selectedOffer = null;
            this.offerForm = {};
        }
    },
    created() {
        this.fetchStudentData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');