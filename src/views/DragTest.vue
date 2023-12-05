<template>
    <div class="container">
        <h2>Drag and Drop Box</h2>
        <div class="inner-box row">
            <div class="col-4 border p-2" v-for="item in firstList" :key="item.id" :draggable="item.draggable"
                @dragstart="handleDragStart($event, item)" @click="toggleSelection(item)"
                :class="{ 'selected': isSelected(item) }">
                <img :src="item.img" width="40" alt="">
                {{ item.text }}
            </div>
        </div>

        <div class="drag-drop-box" @dragover.prevent="handleDragOver" @drop.prevent="handleDropToBox">
    <!-- Display dropped items -->
    <div v-if="droppedItems.length === 0">
        Drop your item here
    </div>
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
        handleDragStart(event, item) {
            console.log("Drag started in parent:", item);

            // Set the dragged item's data using the native drag-and-drop API
            event.dataTransfer.setData("text/plain", JSON.stringify(this.selectedItems));
        },
        handleDropToBox(event) {
            // Retrieve the dragged items' data
            const itemsData = event.dataTransfer.getData("text/plain");
            const items = JSON.parse(itemsData);

            // Handle dropping items from the first list directly to the box
            items.forEach((item) => {
                if (item && "id" in item) {
                    console.log(`Dropped item from the list to the box:`, item);

                    // Track dropped items
                    this.droppedItems.push(item);

                    // If you want to remove the dropped item from the source list, you can do that here
                    this.firstList = this.firstList.filter((i) => i.id !== item.id);
                }
            });

            // Clear the selection after dropping
            this.selectedItems = [];
        },
        handleDragOver(event) {
            event.preventDefault();
            // Handle drag over logic if needed
        },
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
        isSelected(item) {
            // Check if an item is selected
            return this.selectedItems.some((selectedItem) => selectedItem.id === item.id);
        },
    },
};
</script>
  
<style>
.drag-drop-box {
    border: 2px dashed #ccc;
    padding: 20px;
    margin: 20px;
}

.inner-box {
    display: flex;
}

.inner-box div {
    cursor: move;
}

.selected {
    border: 2px solid rgb(255, 0, 0) !important;
    /* Add a border to indicate selected items */
}
</style>
  