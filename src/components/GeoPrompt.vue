<template>
    <div class="modal" id="geolocationPromptModal" tabindex="-1" aria-labelledby="geolocationPromptModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="geolocationPromptModalLabel">Geolocation Permission</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>We need your permission to access your location. Please allow geolocation access to use this feature.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="allowGeolocation">Allow</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Deny</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    methods: {
        allowGeolocation() {
            this.$emit('geolocationAllowed');
        }
    }
};
</script>
  