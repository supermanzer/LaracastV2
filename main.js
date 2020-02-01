/**
 * Separation of concerns for our Vue tutorial
 */

 Vue.component('task', {
     template: '<li><slot></slot></li>',
 })

 new Vue({
     el: '#app3'
 })