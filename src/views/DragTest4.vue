<template>
  <CatelogFilter>Markets</CatelogFilter>
  <div class="container my-5 py-3">
    <h5 v-if="userLocation">
        User Coordinate: {{ userLocation.latitude }}, {{ userLocation.longitude }}
      </h5>
  </div>
  <div class="container my-5 py-3">
    <GeoPrompt v-if="!locationPermissionGranted" @geolocationAllowed="handleGeolocationAllowed" @closeGeoPrompt="closeCustomGeoPrompt" />
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
                    <i class="bi bi-x fs-3 position-absolute top-0 end-0" @click="removeFromBox(item)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-evenly p-2 position-fixed bottom-0 w-100 bg-light" style="z-index: 1;">
    <button class="btn btn-warning rounded-2 m-0">Selected {{ selectedItems.length }}</button>
    <button class="btn btn-danger rounded-2 m-0" @click="moveSelectedToBox" :disabled="selectedItems.length === 0">
      Add To My Shop
    </button>
    <button class="btn btn-primary m-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#addToShop"
      aria-controls="addToShop"> In Shop ({{ droppedItems.length }})</button>
  </div>
</template>

<script>
import CatelogFilter from '@/components/CatelogFilter.vue';
import GeoPrompt from '@/components/GeoPrompt.vue';

export default {
  data() {
    return {
      droppedItems: [],
      firstList: [
        { sid: 1, text: 'Item 1', img: '/img/collection/five.webp', draggable: true },
        { sid: 2, text: 'Item 2', img: '/img/collection/six.webp', draggable: true },
        { sid: 3, text: 'Item 3', img: '/img/collection/one.webp', draggable: true },
        { sid: 4, text: 'Item 4', img: '/img/collection/two.webp', draggable: true },
        { sid: 5, text: 'Item 5', img: '/img/collection/three.webp' },
        { sid: 6, text: 'Item 6', img: '/img/collection/four.webp' },
        { sid: 7, text: 'Item 7', img: '/img/collection/five.webp' },
        { sid: 8, text: 'Item 8', img: '/img/collection/six.webp' },
      ],
      selectedItems: [],
      userLocation: null,
      customPromptClosed: false,

    };
  },
  methods: {
    toggleSelection(item) {
      const index = this.selectedItems.findIndex((selectedItem) => selectedItem.sid === item.sid);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item);
      }
    },
    moveSelectedToBox() {
      this.selectedItems.forEach((item) => {
        if (!this.isItemInBox(item)) {
          const itemCopy = { ...item };
          this.droppedItems.push(itemCopy);
        } else {
          this.toggleSelection(item);
        }
      });
      this.selectedItems = [];
    },
    isSelected(item) {
      return this.selectedItems.some((selectedItem) => selectedItem.sid === item.sid);
    },
    removeFromBox(item) {
      const index = this.droppedItems.findIndex((droppedItem) => droppedItem.sid === item.sid);
      if (index !== -1) {
        this.droppedItems.splice(index, 1);
      }
    },
    isItemInBox(item) {
      return this.droppedItems.some((droppedItem) => droppedItem.sid === item.sid);
    },
    getUserLocation() {
      if (navigator.permissions) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                this.userLocation = { latitude, longitude };
                console.log("User Location:", this.userLocation); // Add this line for debugging
                this.showLocationPopup = false;
                this.$emit("geolocationAllowed", this.userLocation);
              },
              (error) => {
                console.error(`Error getting location: ${error.message}`);
                this.showLocationPopup = false;
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
            );
          } else {
            console.error("Geolocation permission not granted.");
            this.showLocationPopup = false;
            this.$emit("geolocationDenied");
          }
        });
      } else {
        console.error("Geolocation is not supported by your browser");
        this.showLocationPopup = false;
      }
    },
  },

  mounted() {
    const geoPrompt = this.$refs.geoPrompt;
    if (geoPrompt && !geoPrompt.isLocationPermissionGranted) {
      geoPrompt.openLocationPopup();
    }
    this.getUserLocation();

  },
  components: { CatelogFilter, GeoPrompt }
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

.dragged-item button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
