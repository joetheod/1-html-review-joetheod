const SomeApp = {
    data() {
      return {
        result: {},
        message: "Waiting ..."
      }
    },
        computed: {
          prettyBirthday(){
              return dayjs('2019-01-25').format('D MM YYYY') // '25/01/2019'
          }
      

    },
    created() {
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then((json) => {
            console.log("Got json back:", json);
            this.result = json.results[0];
            console.log("C");
        })
        .catch( (error) => {
            console.error(error);
        });

        console.log("B");

        
    }

}

  
  Vue.createApp(SomeApp).mount('#someApp');