/**
 * Separation of concerns for our Vue tutorial
 */

// MaterializeCSS Init Function
const MatInit = () => {
    document.addEventListener('DOMContentLoaded', (e) => {
        let elems = document.querySelectorAll('.collapsible');
        let insts = M.Collapsible.init(elems, {});
        elems = document.querySelectorAll('.modal');
        insts = M.Modal.init(elems, {});
        elems = document.querySelectorAll('.tabs');
        insts = M.Tabs.init(elems,{})
    });
}


 // Using components in App3

 Vue.component('task', {
     template: '<li><slot></slot></li>',
 })

  // Lesson 08: Components within components

 // When using bindings like the v-for, you need as single parent element (div in this case) to wrap things in
 Vue.component('task-list', {
    template: `<ul>
                    <task v-for="task in tasks"> {{task.description}}</task>
               </ul>`,

     data() {
        return {
            tasks: [
                { description: 'Buy eggs', completed: false },
                { description: 'Ride bike', completed: false },
                { description: 'Do yoga', completed: true },
                { description: 'Read book', completed: true },
                { description: 'Make dinner', completed: false },
            ]
        }
     }
 })

 

// Practical exercise:  Make a reusable message component where we can pass in a title and body text

Vue.component('message', {
    props: ['title', 'body'],
    data() {
        return {
            isVisible: true
        }
    },
    // Here we are defining a function inline in the template.  ONLY DO THIS FOR VERY SIMPLE CASES LIKE THIS!
    template: `
        <div class="message" v-show="isVisible">
            <h5 class="indigo darken-2 white-text">{{title}} <i class="right hide-btn material-icons" @click="isVisible = false">cancel</i></h5>
            <p class="indigo lighten-3">{{body}}</p>
        </div>
    `
})


// Practical example of modal component (kind of)
Vue.component('mat-modal', {
    props: ['title', 'body', 'id'],
    template: `
        <div :id="id" class="modal" >
            <div class="modal-content">
                <h4>{{title}}</h4>
                <p>{{body}}</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="waves-effect waves-green btn-flat modal-close" @click="$emit('close')">Agree</a>
            </div>
        </div>
    `,
    mounted() {
        console.log(this.children)
    },


});


// Custom tab componets
Vue.component('v-tabs', {
    template: `
        <div class="tabs-div">
        <ul class="tabs">
            <li v-for="tab in tabs" class="tab col s3"><a @click="selectTab(tab)" v-bind:href="tab.id">{{tab.name }}</a></li>
        </ul>
        <div class="tab-details">
            <slot></slot>
        </div>
    </div>
    `,
    data() {
        return {tabs: []}
    },
    created() {
        this.tabs =this.$children;
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.id == selectedTab.id);
            })
        }
    }
});

Vue.component('v-tab', {
    props: {
        id: {required: true},
        name: {required: true},
        active: {default: false},
    },
    template: `
        <div v-show="isActive"><slot></slot></div>
    `,
    data() {
        return {
            isActive: false
        }
    },
    mounted() {
        this.isActive = this.active;
    },
})

new Vue({
    el: '#app3',
    data: {
        showModal: false
    }
   
})

/*
-------------------- APP 4 --------------------------------------
*/

// This shared event instance allows any component to listen for and respond to 
// emitted events
window.Event = new Vue();

Vue.component('v-coupon', {
    template: `
    <div class="row">
      <div class="col s8 offset-s2 input-field">
        <input placeholder="Enter coupon code" @blur="onCouponApplied" v-model="couponCode"></input>
      </div>
    </div>
        `,
    methods: {
        onCouponApplied() {
            if (this.couponCode) {
                Event.$emit('applied', this.couponCode);    
            }
        }
    },
    data() {
        return {
            couponCode: ''
        }
    }, 
})

new Vue({
    el: '#app4',
    data: {
        couponApplied: false,
        couponCode: '',
    },
    methods: {
        onCouponApplied() {
            this.couponApplied = true;
        }
    },
    created() {
       Event.$on('applied', (e) => {
            this.couponCode = e;
            this.onCouponApplied();
        }) 
    },
});


Vue.component('v-card', {
    template: `
     <div class="row">
        <div class="col s12 m6">
        <div class="card light-blue lighten-4">
            <div class="card-content light-blue-text text-darken-2">
            <span class="card-title">
                <slot name="title"></slot>
            </span>
            <p>
                <slot>
                    Default content goes here
                </slot>
            </p>
            </div>
            <div class="card-action light-blue lighten-3">
                <slot name="footer">
                    MaterializeCSS uses this for actions but it could really contain any useful footer content.
                </slot>
            </div>
        </div>
        </div>
    </div>
    `
})
new Vue({
    el: '#app5',

});


Vue.component('progress-view', {
    data() {
        return {
            completionRate: 50
        }
    },
});

new Vue({
    el: '#app6'
})