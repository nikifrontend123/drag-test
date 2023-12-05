<template>
  <div>
    <h2>Vue Drag-and-Drop Demo</h2>
    <ul class="list-group list-group-flushed">
      <li v-for="(item, index) in items" :key="item.id" class="list-group-item" :draggable="true"
        @dragstart="handleDragStart('items', index, item)" @dragover="handleDragOver" @drop="handleDrop('items', index)">
        <img :src="item.img" width="40" alt="">
        {{ item.text }}
      </li>
      <li class="mt-5"></li>
      <!-- <li>
        <div v-if="isMoving" class="bg-danger py-5">
          MOVING
          {{ movingData ? movingData.text : 'Loading...' }}
          <img :src="movingData ? movingData.img : 'Loading...'" width="40" alt="">
        </div>
      </li> -->
      <li v-for="(item, index) in datas" :key="item.id" class="list-group-item" :draggable="true"
        @dragstart="handleDragStart('datas', index, item)" @dragover="handleDragOver" @drop="handleDrop('datas', index)">
        <img :src="item.img" width="40" alt="">
        {{ item.text }}
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
      // publicPath: process.env.BASE_URL,
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
    handleDragStart(arrayName, index, item) {
      event.dataTransfer.setData('text/plain', JSON.stringify({ arrayName, index }));
      this.isMoving = true;
      this.movingData = item;
      this.movingIndex = index;
    },
    handleDragOver(event) {
      // Allow the drop
      event.preventDefault();
    },
    handleDrop(targetArray, targetIndex) {
      this.isMoving = false;
      const draggedItemDetails = JSON.parse(event.dataTransfer.getData('text/plain'));
      const sourceArray = draggedItemDetails.arrayName;
      const dragIndex = draggedItemDetails.index;

      const draggedItem = this[sourceArray][dragIndex];

      // Remove the item from the source array
      this[sourceArray].splice(dragIndex, 1);

      // Add the item to the target array at the target index
      this[targetArray].splice(targetIndex, 0, draggedItem);
      
    },
    
  },
};
</script>

<style>/* Your styling here */</style>
