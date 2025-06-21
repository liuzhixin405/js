<template>
  <div class="page-container">
    <h2>菜单管理</h2>
    <div class="actions">
      <button @click="openAddModal()">新增菜单</button>
    </div>

    <div class="menu-tree">
      <div v-for="menu in menuTree" :key="menu.id" class="menu-node">
        <div class="menu-item">
          <span>{{ menu.menu_name }} ({{ menu.menu_type }})</span>
          <div class="item-actions">
            <button class="add-child" @click="openAddModal(menu.id)">添加子菜单</button>
            <button class="edit" @click="openEditModal(menu)">编辑</button>
            <button class="delete" @click="confirmDeleteMenu(menu.id)">删除</button>
          </div>
        </div>
        <!-- children -->
        <div v-if="menu.children && menu.children.length > 0" class="menu-children">
            <div v-for="child in menu.children" :key="child.id" class="menu-node">
                 <div class="menu-item">
                    <span>{{ child.menu_name }} ({{ child.menu_type }})</span>
                     <div class="item-actions">
                        <button class="edit" @click="openEditModal(child)">编辑</button>
                        <button class="delete" @click="confirmDeleteMenu(child.id)">删除</button>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Modal for Add/Edit -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditMode ? '编辑菜单' : '新增菜单' }}</h3>
        <form @submit.prevent="saveMenu">
          <div class="form-group">
            <label>菜单名称</label>
            <input v-model="currentMenu.menu_name" required />
          </div>
          <div class="form-group">
            <label>父菜单ID</label>
            <input type="number" v-model="currentMenu.parent_id" disabled />
          </div>
          <div class="form-group">
            <label>路由地址</label>
            <input v-model="currentMenu.path" />
          </div>
          <div class="form-group">
            <label>组件路径</label>
            <input v-model="currentMenu.component" />
          </div>
          <div class="form-group">
            <label>菜单类型</label>
            <select v-model="currentMenu.menu_type" required>
              <option value="M">目录</option>
              <option value="C">菜单</option>
              <option value="F">按钮</option>
            </select>
          </div>
          <div class="form-group">
            <label>显示顺序</label>
            <input type="number" v-model="currentMenu.order_num" />
          </div>
          <div class="form-group">
            <label>状态</label>
            <select v-model="currentMenu.status">
              <option value="0">正常</option>
              <option value="1">停用</option>
            </select>
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
      message="您确定要删除这个菜单及其所有子菜单吗？"
      @confirm="handleDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMenuTree, addMenu, updateMenu, deleteMenu } from '../../api/menu';
import ConfirmModal from '../../components/ConfirmModal.vue';

const menuTree = ref([]);
const showModal = ref(false);
const isEditMode = ref(false);
const currentMenu = ref({});

// State for custom confirm modal
const showConfirm = ref(false);
const menuIdToDelete = ref(null);

const fetchMenuTree = async () => {
  try {
    const response = await getMenuTree();
    menuTree.value = response.data.data;
  } catch (error) {
    console.error('获取菜单树失败:', error);
    alert('获取菜单树失败');
  }
};

onMounted(fetchMenuTree);

const openAddModal = (parentId = 0) => {
  isEditMode.value = false;
  currentMenu.value = { parent_id: parentId, status: '0', menu_type: 'C', order_num: 0 };
  showModal.value = true;
};

const openEditModal = (menu) => {
  isEditMode.value = true;
  currentMenu.value = { ...menu };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveMenu = async () => {
  try {
    if (isEditMode.value) {
      const { id, ...menuData } = currentMenu.value;
      await updateMenu(id, menuData);
    } else {
      await addMenu(currentMenu.value);
    }
    closeModal();
    fetchMenuTree();
  } catch (error) {
    console.error('保存菜单失败:', error);
    alert('保存菜单失败');
  }
};

const confirmDeleteMenu = (id) => {
  menuIdToDelete.value = id;
  showConfirm.value = true;
};

const handleDelete = async () => {
  try {
    await deleteMenu(menuIdToDelete.value);
    fetchMenuTree();
  } catch (error) {
    console.error('删除菜单失败:', error);
    alert('删除菜单失败');
  } finally {
    cancelDelete();
  }
};

const cancelDelete = () => {
  showConfirm.value = false;
  menuIdToDelete.value = null;
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
.menu-tree {
  font-family: sans-serif;
}
.menu-node {
  margin-left: 20px;
  border-left: 1px solid #ddd;
  padding-left: 15px;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  margin-top: 5px;
  border-radius: 4px;
}
.menu-children {
  margin-left: 30px;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-child {
  background-color: #2ecc71;
  color: white;
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
.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.modal-actions {
  text-align: right;
}
</style> 