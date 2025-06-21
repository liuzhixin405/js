<template>
  <div class="page-container">
    <h2>商品管理</h2>
    
    <div class="actions">
      <button @click="openAddModal">新增商品</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>商品名称</th>
          <th>描述</th>
          <th>价格</th>
          <th>图片</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td><img :src="product.imageUrl" alt="product image" class="product-image"/></td>
          <td>
            <button class="edit" @click="openEditModal(product)">编辑</button>
            <button class="delete" @click="confirmDeleteProduct(product.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 新增/编辑商品弹窗 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditMode ? '编辑商品' : '新增商品' }}</h3>
        <form @submit.prevent="saveProduct">
          <div class="form-group">
            <label>商品名称</label>
            <input v-model="currentProduct.name" required />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="currentProduct.description"></textarea>
          </div>
           <div class="form-group">
            <label>价格</label>
            <input type="number" step="0.01" v-model="currentProduct.price" required />
          </div>
          <div class="form-group">
            <label>图片URL</label>
            <input v-model="currentProduct.imageUrl" />
          </div>
          <div class="modal-actions">
            <button type="submit">保存</button>
            <button type="button" @click="closeModal">取消</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Custom Confirm Modal -->
    <ConfirmModal
      :visible="showConfirm"
      title="删除确认"
      message="您确定要删除这个商品吗？"
      @confirm="handleDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/product.js';
import ConfirmModal from '../../components/ConfirmModal.vue';

const products = ref([]);
const showModal = ref(false);
const isEditMode = ref(false);
const currentProduct = ref({});

// State for custom confirm modal
const showConfirm = ref(false);
const productIdToDelete = ref(null);

const fetchProducts = async () => {
  try {
    const response = await getProducts();
    products.value = response.data;
  } catch (error) {
    console.error('获取商品列表失败:', error);
    alert('获取商品列表失败');
  }
};

onMounted(fetchProducts);

const openAddModal = () => {
  isEditMode.value = false;
  currentProduct.value = {};
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditMode.value = true;
  currentProduct.value = { ...product };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveProduct = async () => {
  try {
    if (isEditMode.value) {
      await updateProduct(currentProduct.value.id, currentProduct.value);
    } else {
      await addProduct(currentProduct.value);
    }
    closeModal();
    fetchProducts();
  } catch (error) {
    console.error('保存商品失败:', error);
    alert('保存商品失败');
  }
};

const confirmDeleteProduct = (id) => {
  productIdToDelete.value = id;
  showConfirm.value = true;
};

const handleDelete = async () => {
  try {
    await deleteProduct(productIdToDelete.value);
    fetchProducts();
  } catch (error) {
    console.error('删除商品失败:', error);
    alert('删除商品失败');
  } finally {
    cancelDelete();
  }
};

const cancelDelete = () => {
  showConfirm.value = false;
  productIdToDelete.value = null;
};
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.actions {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.product-image {
    max-width: 100px;
    max-height: 100px;
}
button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit {
  background-color: #3498db;
  color: white;
}
.delete {
  background-color: #e74c3c;
  color: white;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.modal-actions {
  text-align: right;
}
</style>
