<template>
  <div class="products-container">
    <h1>Products</h1>
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <span class="product-name">{{ product.name }}</span> -
        <span class="product-price">{{ product.price }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    return {};
  }
};
</script>

<style scoped>
.products-container {
  padding: 20px;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-item {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.product-name {
  font-weight: bold;
}

.product-price {
  color: green;
}
</style>
