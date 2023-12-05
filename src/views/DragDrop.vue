<template>
    <div class="container">
        <h2>Drag and Drop Box</h2>
        <div class="inner-box">
            <CompTwo :listName="'First'" :items="firstList" @drag-start="handleDragStart" @drop="handleDrop"></CompTwo>
            <CompTwo :listName="'Second'" :items="secondList" @drag-start="handleDragStart" @drop="handleDrop"></CompTwo>
        </div>
        <div class="drag-drop-box" @dragover.prevent="handleDragOver" @drop.prevent="handleDropToBox">
            <!-- Display dropped items -->
            <div v-for="item in droppedItems" :key="item.id">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>
  
<script>
import CompTwo from '@/components/CompTwo.vue';

export default {
    components: {
        CompTwo
    },
    data() {
        return {
            droppedItems: [],
            firstList: [
                {
                    id: 1,
                    text: 'Item 1',
                    img: '/img/users/1.png'
                },
                {
                    id: 2,
                    text: 'Item 2',
                    img: '/img/users/2.png'
                },
                {
                    id: 3,
                    text: 'Item 3',
                    img: '/img/users/3.png'
                },
                {
                    id: 4,
                    text: 'Item 4',
                    img: '/img/users/4.png'
                },
            ],
            secondList: [
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
        };
    },
    methods: {
        handleDragStart(data) {
            console.log("Drag started in parent:", data);
            // Handle drag start logic if needed
        },
        handleDrop(data) {
            console.log("Dropped in parent:", data);

            // Implement logic to handle dropping items into the box
            if (data && data.item && "id" in data.item) {
                console.log(`Dropped item from ${data.listName} list:`, data.item);

                // Track dropped items
                this.droppedItems.push(data.item);

                // If you want to remove the dropped item from the source list, you can do that here
                if (data.listName === "First") {
                    this.firstList = this.firstList.filter((i) => i.id !== data.item.id);
                } else if (data.listName === "Second") {
                    this.secondList = this.secondList.filter((i) => i.id !== data.item.id);
                }
            } else {
                console.error("Invalid item structure: Missing 'id' property", data.item);
            }
        },
        handleDropToBox(data) {
            // Handle dropping items from the first list directly to the box
            if (data && data.item && "id" in data.item && data.listName === "First") {
                console.log(`Dropped item from ${data.listName} list to box:`, data.item);

                // Track dropped items
                this.droppedItems.push(data.item);

                // If you want to remove the dropped item from the source list, you can do that here
                this.firstList = this.firstList.filter((i) => i.id !== data.item.id);
            }
        },
        handleDragOver(event) {
            event.preventDefault();
            // Handle drag over logic if needed
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
    justify-content: space-between;
}
</style>
  