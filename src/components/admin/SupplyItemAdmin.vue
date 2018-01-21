<template>
    <div class="col-sm-6 col-md-6">
        <div class="panel  panel-info">
            <div class="flex panel-heading"
                 @click="supply.have = !supply.have">
                <h2>{{supply.item}}</h2>

                <label for="confirm">
                    allow deletion
                    <input type="checkbox"
                           name="confirm"
                           v-model="allowDelete">
                </label>


                <button @click="deleteItem(index)"
                        :disabled="!allowDelete"
                        class="btn btn-danger">Delete This Item
                </button>

            </div>

        </div>
    </div>
</template>

<script>

    /***
     *  a supply item looks like:
     *  {item: 'Paper Towels', have: true, inCart: false}
     * ***/
    import * as types from '../../store/types';
    import {mapActions} from 'vuex';

    export default {
        props: [
            'supply',
            'index'],
        data() {
            return {
                allowDelete: false
            }
        },
        methods: {
            ...mapActions({
                deleteItem: types.SUPPLY_DELETE_ITEM
            })
        }

    }
</script>

<style scoped>

    .flex {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
    }

    #confirmBox {

    }

</style>