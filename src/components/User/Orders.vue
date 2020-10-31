<template>
    <v-container>
        <h1 class="text--secondary mb-10">Orders</h1>
        <v-layout row v-if="!loading && orders.length !== 0">
            <v-flex xs12 sm6 offest-sm6>
                <v-list
                >
                    <v-list-item v-for="order in orders" :key="order.id">
                        <v-list-item-action>
                            <v-checkbox
                                :input-value="order.done"
                                @mousedown="markDone(order)"
                                color="success"
                            ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{ order.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-btn dark color="blue" :to="'/ad/' + order.adId">Open</v-btn>
                    </v-list-item>
                </v-list>
            </v-flex>
        </v-layout>
        <v-layout v-else-if="orders.length === 0">
            <h1>You don't have orders</h1>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    methods: {
        markDone(order) {
            this.$store.dispatch('markOrder', order.id)
                .then(() => {
                    order.done = true
                })
            .catch(() => {})
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
        orders() {
            return this.$store.getters.orders
        }
    },
    created() {
        this.$store.dispatch('fetchOrders')
    }
}
</script>

<style scoped>

</style>
