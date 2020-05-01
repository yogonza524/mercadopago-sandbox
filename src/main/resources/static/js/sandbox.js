var vm = new Vue({
  el: '#app',
  data: {
    accessToken: null,
    preference: {
        creationFlag: false,
        sandboxLink: null,
        responses: [],
        creationResponse: null,
        newItem: {
            id: null,
            name: null,
            quantity: null,
            price: null
        },
        items: []
    },
    messages: {
        preference: {
            error: null
        }
    }
  },
  methods: {
    addItem() {
        var item = this.preference.newItem;
        item.id = Math.random().toString(36).substring(2) + Date.now().toString(36);

        if (!item.name || !item.quantity || !item.price) {
            return;
        }
        this.preference.items.push(item);
        this.preference.newItem = {
            id: null,
            name: null,
            quantity: null,
            price: null
        };
    },
    removeItem(item) {
        for (var i=0; i < this.preference.items.length; i++) {
            if (this.preference.items[i].id === item.id) {
                this.preference.items.splice(i, 1);
                break;
            }
        }
    },
    createPreference() {
        if (!this.accessToken) {
            alert("Access Token missing. Please configure");
            return;
        }
        if (this.preference.items.length === 0) {
            alert("Items are mandatory");
            return;
        }
        this.preference.responses = [];
        axios({
          method: 'post',
          url: '/create',
          responseType: 'application/json',
          data: {
            accessToken: this.accessToken,
            items: this.preference.items
          }
        })
          .then((response) => {
            console.log("OK");
            console.log(response.status);
            console.log(response.data);
            this.preference.creationResponse = JSON.stringify(response.data,null,'\t');

            this.preference.responses.push(this.preference.creationResponse);
            this.preference.sandboxLink = response.data.sandboxInitPoint;
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
            this.$forceUpdate();
            //console.log(this.preference.creationResponse)
          })
          .catch((error) => {
              if (error.response) {
                console.log(error.response.data);
                this.messages.preference.error = JSON.stringify(error.response.data,null,'\t');

                this.preference.responses.push(this.messages.preference.error);
                hljs.initHighlighting.called = false;
                hljs.initHighlighting();

                this.preference.creationFlag = !this.preference.creationFlag;
                //this.messages.preference.error = JSON.stringify(JSON.parse(error.response.data),null,2);
              }
            })
          ;
          this.$forceUpdate();
          this.$nextTick(null);
    }
  }
});