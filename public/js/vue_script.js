
var socket = io();

new Vue({
el:"#myID",
data:{
  menuItems:food,
  paymentselected: "credit card",
  gender: "other",
  flnmessage: "",
  mailmessage: "",
  snmessage: "",
  hnmessage: "",
  orders: {},
  checkedBurgers: [],
  details: {},
  orderList:"",
  costumerinfo:"",
  showmenue: false,

},
    methods: {
        getNext: function () {
          var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
            return Math.max(last, next);
          }, 0);
          return lastOrder + 1;
        },
        addOrder: function (event) {
          this.showmenue = true;

          this.costumerinfo=
          this.flnmessage+" (" +
          this.mailmessage + ", " +
          this.paymentselected+ ", " +
          this.gender + ")" ;

          socket.emit("addOrder", { orderId: this.getNext(),
                                    details: this.details,
                                    orderItems: [this.checkedBurgers, this.costumerinfo]
                                  })
        },
        displayOrder: function (event){
          var offset = {x: event.currentTarget.getBoundingClientRect().left,
                        y: event.currentTarget.getBoundingClientRect().top};
                                   this.details= { x: event.clientX - 10 - offset.x,
                                                   y: event.clientY - 10 - offset.y };
        },
    }
});
