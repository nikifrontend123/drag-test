<template>
  <CatelogFilter>Market</CatelogFilter>
  <div class="container my-5 py-3">
    <!-- ... your existing content ... -->
    <h5 v-if="userLocation">User Coordinates: {{ userLocation.latitude }}, {{ userLocation.longitude }}</h5>
  </div>
  <div class="container my-5 py-3">

    <div class="row g-1">
      <div class="col-4" v-for="item in firstList" :key="item.sid">
        <div class="card mb-3" @click="toggleSelection(item)"
          :class="{ 'selected': isSelected(item) || isItemInBox(item) }">
          <img :src="item.img">
          <div class="card-body pb-0 d-flex flex-column align-items-center">
            <h5 class="card-title">{{ item.text }}</h5>
            <button class="btn btn-secondary"> Detail</button>
          </div>
        </div>
      </div>
    </div>
    <!-- -------------------OFFCANVAS------------------------------ -->
    <div style="height: 600px;" class="offcanvas offcanvas-bottom" tabindex="-1" id="addToShop"
      aria-labelledby="offcanvasBottomLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">My Shop</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="drag-drop-box" @dragover.prevent="handleDragOver" @drop.prevent="handleDropToBox">
          <div v-if="droppedItems.length === 0" class="text-center py-3">Shop Is Empty</div>
          <div v-else>
            <div class="row">
              <div v-for="item in droppedItems" :key="item.sid" class="col-4">
                <div class="card my-2 position-relative">
                  <img :src="item.img">
                  <div class="card-body">
                    <span class="card-title">{{ item.text }}</span>
                    <i class="bi bi-x fs-3 position-absolute top-0 end-0  " @click="removeFromBox(item)"></i>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- -------------------OFFCANVAS------------------------------ -->

  </div>
  <!-- --------------Bottom Nav----------------------------- -->
  <div class="d-flex justify-content-evenly p-2 position-fixed bottom-0 w-100 bg-light" style="z-index: 1;">
    <button class="btn btn-warning rounded-2 m-0">Selected {{ selectedItems.length }}</button>
    <button class=" btn btn-danger rounded-2 m-0" @click="moveSelectedToBox" :disabled="selectedItems.length === 0">
      Add To My Shop
    </button>
    <button class="btn btn-primary m-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#addToShop"
      aria-controls="addToShop"> In Shop ({{ droppedItems.length }})</button>
  </div>
</template>
  
<script>
import CatelogFilter from '@/components/CatelogFilter.vue';

export default {
  data() {
    return {
      droppedItems: [],
      firstList: [
        {
          sid: 1,
          text: 'Item 1',
          img: '/img/collection/five.webp',
          draggable: true,
        },
        {
          sid: 2,
          text: 'Item 2',
          img: '/img/collection/six.webp',
          draggable: true,
        },
        {
          sid: 3,
          text: 'Item 3',
          img: '/img/collection/one.webp',
          draggable: true,
        },
        {
          sid: 4,
          text: 'Item 4',
          img: '/img/collection/two.webp',
          draggable: true,
        },
        {
          sid: 5,
          text: 'Item 5',
          img: '/img/collection/three.webp'
        },
        {
          sid: 6,
          text: 'Item 6',
          img: '/img/collection/four.webp'
        },
        {
          sid: 7,
          text: 'Item 7',
          img: '/img/collection/five.webp'
        },
        {
          sid: 8,
          text: 'Item 8',
          img: '/img/collection/six.webp'
        },
      ],
      selectedItems: [],
      userLocation: null,
    };
  },
  methods: {
    toggleSelection(item) {
      // Toggle the selection of an item
      const index = this.selectedItems.findIndex((selectedItem) => selectedItem.sid === item.sid);
      if (index !== -1) {
        // Item is already selected, deselect it
        this.selectedItems.splice(index, 1);
      }
      else {
        // Item is not selected, select it
        this.selectedItems.push(item);
      }
    },
    moveSelectedToBox() {
      // Move selected items to the drop box
      this.selectedItems.forEach((item) => {
        if (!this.isItemInBox(item)) {
          // If the item is not in the drag-drop-box, add it
          console.log(`Adding selected item to the drop box:`, item);
          // Create a copy of the selected item
          const itemCopy = { ...item };
          // Track dropped items
          this.droppedItems.push(itemCopy);
        }
        else {
          // If the item is already in the drag-drop-box, select it in the selected-items section
          this.toggleSelection(item);
        }
      });
      // Clear the selection after moving to the drop box
      this.selectedItems = [];
    },
    isSelected(item) {
      // Check if an item is selected
      return this.selectedItems.some((selectedItem) => selectedItem.sid === item.sid);
    },
    removeFromBox(item) {
      // Remove the item from the drag-drop-box
      const index = this.droppedItems.findIndex((droppedItem) => droppedItem.sid === item.sid);
      if (index !== -1) {
        this.droppedItems.splice(index, 1);
      }
    },
    isItemInBox(item) {
      return this.droppedItems.some((droppedItem) => droppedItem.sid === item.sid);
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.userLocation = { latitude, longitude };
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
  },
  mounted() {
    this.getUserLocation();
  },
  components: { CatelogFilter }
};
</script>
  
<style>
.selected {
  position: relative;
}

.selected::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}

.selected-items {
  margin-bottom: 20px;
}

button {
  margin-bottom: 20px;
}



/* .dragged-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

.dragged-item button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
  