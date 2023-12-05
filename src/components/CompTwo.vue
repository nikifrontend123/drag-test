<template>
    <div>
        <h2>{{ listName }} List</h2>
        <ul class="list-group list-group-flushed">
            <li :draggable="true" @dragstart="handleDragStart(item)" @dragover="handleDragOver" @drop="handleDrop(item)"
                v-for="item in items" :key="item.id">
                <img :src="item.img" width="40" alt="">
                {{ item.text }}
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    props: {
        listName: String,
        items: Array,
    },
    methods: {
        handleDragOver(event) {
            event.preventDefault();
        },
        handleDragStart(item) {
            console.log('Drag started in CompTwo:', item);
            this.$emit('drag-start', { listName: this.listName, item });
        },
        handleDrop(item) {
            console.log('Dropped in CompTwo:', item);

            // Ensure 'id' property is present
            if ('id' in item) {
                this.$emit('drop', { listName: this.listName, item });
            } else {
                console.error('Invalid item structure: Missing "id" property', item);
            }
        },

    },
};
</script>
  
<style>
/* Your styling here */
</style>
  