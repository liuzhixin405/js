<template>
  <div class="products-container">
    <h1>Products</h1>
    <ul v-if="isLoggedIn.value" class="product-list">
      <li v-for="product in products" :key="product._id" class="product-item">
        <span class="product-name">{{ product.name }}</span> -
        <span class="product-price">{{ product.price }}</span>
      </li>
    </ul>
    <p v-else>请登录后查看产品列表</p>
  </div>
</template>

<script>
import { ref, onMounted, inject, watch } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const products = ref([]);
    const isLoggedIn = inject('isLoggedIn', () => false);

    const fetchProducts = async () => {
      if (isLoggedIn.value) {
        try {
          const response = await axios.get('http://localhost:3000/products');
          products.value = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        products.value = [];
      }
    };

    onMounted(fetchProducts);

    watch(() => isLoggedIn.value, fetchProducts);

    return {
      products,
      isLoggedIn
    };
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
