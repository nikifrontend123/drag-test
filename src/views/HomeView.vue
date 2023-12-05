<template>
 <div>
    <h2>Vue Drag-and-Drop Demo</h2>
    <ul class="list-group list-group-flushed">
      <li v-for="(item, index) in items" :key="item.id" class="list-group-item" :draggable="true"
        @dragstart="handleDragStart('items', index, item)" @dragover="handleDragOver" @drop="handleDrop('items', index)"
        @click="handleItemClick(index)" @mousedown="handleItemMouseDown(index)">
        <img :src="item.img" width="40" alt="">
        {{ item.text }}
        <div v-if="item.selected" class="selection-indicator"></div>
      </li>
      <li class="mt-5"></li>
      <li v-for="(item, index) in datas" :key="item.id" class="list-group-item" :draggable="true"
        @dragstart="handleDragStart('datas', index, item)" @dragover="handleDragOver" @drop="handleDrop('datas', index)"
        @click="handleItemClick(index)" @mousedown="handleItemMouseDown(index)">
        <img :src="item.img" width="40" alt="">
        {{ item.text }}
        <div v-if="item.selected" class="selection-indicator"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMoving: false,
      movingIndex: null,
      movingData: null,
      clickTimer: null,
      selectedItems: [],
      items: [
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
      datas: [
        {
          id: 5,
          text: 'Item 5',
          img:'/img/users/5.png'
        },
        {
          id: 6,
          text: 'Item 6',
          img:'/img/users/6.png'
        },
        {
          id: 7,
          text: 'Item 7',
          img:'/img/users/7.png'
        },
        {
          id: 8,
          text: 'Item 8',
          img:'/img/users/8.png'
        },
      ],
    };
  },
  methods: {
    handleItemMouseDown(index) {
      // Start the timer on mouse down
      this.clickTimer = setTimeout(() => {
        this.toggleItemSelection(index);
      }, 3000);
    },

    handleItemClick(index) {
      // Clear the timer on click
      clearTimeout(this.clickTimer);

      // Toggle selection immediately
      this.toggleItemSelection(index);
    },
     
    toggleItemSelection(index) {
      this.items[index].selected = !this.items[index].selected;
      this.datas[index].selected = !this.datas[index].selected;

      this.updateSelectedItems();
    },

    updateSelectedItems() {
      this.selectedItems = [];

      this.items.forEach((item, index) => {
        if (item.selected) {
          this.selectedItems.push({ arrayName: 'items', index, item });
        }
      });

      this.datas.forEach((item, index) => {
        if (item.selected) {
          this.selectedItems.push({ arrayName: 'datas', index, item });
        }
      });
    },

    handleDragStart(arrayName, index, item) {
      event.dataTransfer.setData('text/plain', JSON.stringify({ arrayName, index }));
      this.isMoving = true;
      this.movingData = item;
      this.movingIndex = index;
    },

    handleDrop(targetArray, targetIndex) {
      this.isMoving = false;

      this.selectedItems.forEach((selectedItem) => {
        const sourceArray = selectedItem.arrayName;
        const dragIndex = selectedItem.index;

        const draggedItem = this[sourceArray][dragIndex];

        // Remove the item from the source array
        this[sourceArray].splice(dragIndex, 1);

        // Add the item to the target array at the target index
        this[targetArray].splice(targetIndex, 0, draggedItem);
      });

      this.selectedItems = [];
    },
  },
};
</script>

<style>
.selection-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 123, 255, 0.3); /* Adjust the color as needed */
  z-index: 2;
}
</style>
