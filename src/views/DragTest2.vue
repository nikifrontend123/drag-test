<template>
    <div class="container">
      <h2>Selected Items</h2>
      <div class="selected-items row">
        <div class="col-4 border p-2" v-for="item in firstList" :key="item.id">
          <div @click="toggleSelection(item)" :class="{ 'selected': isSelected(item) }">
            <img :src="item.img" width="40" alt="">
            {{ item.text }}
          </div>
        </div>
      </div>
  
      <button @click="moveSelectedToBox" :disabled="selectedItems.length === 0">
        Add Selected Items to Drop Box
      </button>
  
      <div class="drag-drop-box" @dragover.prevent="handleDragOver" @drop.prevent="handleDropToBox">
        <!-- Display dropped items -->
        <div v-if="droppedItems.length === 0">Drop your item here</div>
        <div v-else>
          <!-- Display dropped items -->
          <div v-for="item in droppedItems" :key="item.id">
            <img :src="item.img" width="40" alt="">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
    data() {
        return {
            droppedItems: [],
            firstList: [
                {
                    id: 1,
                    text: 'Item 1',
                    img: '/img/users/1.png',
                    draggable: true,
                },
                {
                    id: 2,
                    text: 'Item 2',
                    img: '/img/users/2.png',
                    draggable: true,
                },
                {
                    id: 3,
                    text: 'Item 3',
                    img: '/img/users/3.png',
                    draggable: true,
                },
                {
                    id: 4,
                    text: 'Item 4',
                    img: '/img/users/4.png',
                    draggable: true,
                },
                {
                    id: 5,
                    text: 'Item 5',
                    img: '/img/users/5.png'
                },
                {
                    id: 6,
                    text: 'Item 6',
                    img: '/img/users/6.png'
                },
                {
                    id: 7,
                    text: 'Item 7',
                    img: '/img/users/7.png'
                },
                {
                    id: 8,
                    text: 'Item 8',
                    img: '/img/users/8.png'
                },
            ],
            selectedItems: [], // Array to store selected items
        };
    },
    methods: {
        toggleSelection(item) {
            // Toggle the selection of an item
            const index = this.selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
            if (index !== -1) {
                // Item is already selected, deselect it
                this.selectedItems.splice(index, 1);
            } else {
                // Item is not selected, select it
                this.selectedItems.push(item);
            }
        },
        moveSelectedToBox() {
            // Move selected items to the drop box
            this.selectedItems.forEach((item) => {
                console.log(`Adding selected item to the drop box:`, item);

                // Track dropped items
                this.droppedItems.push(item);

                // If you want to remove the dropped item from the source list, you can do that here
                this.firstList = this.firstList.filter((i) => i.id !== item.id);
            });

            // Clear the selection after moving to the drop box
            this.selectedItems = [];
        },
        isSelected(item) {
            // Check if an item is selected
            return this.selectedItems.some((selectedItem) => selectedItem.id === item.id);
        },
    },

};
</script>
  
<style>
/* ... (rest of your styles remain unchanged) */
.selected {
  border: 2px solid rgb(255, 0, 0) !important;
  /* Add a red border to indicate selected items */
}
.selected-items {
    margin-bottom: 20px;
}

button {
    margin-bottom: 20px;
}
.drag-drop-box {
  border: 2px dashed #ccc; /* Set the dashed border style */
  padding: 20px;
  margin: 20px;
}
</style>
  