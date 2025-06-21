<template>
  <div class="page-container">
    <h2>用户管理</h2>
    
    <div class="actions">
      <button @click="openAddModal">新增用户</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>用户名</th>
          <th>昵称</th>
          <th>邮箱</th>
          <th>手机号</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.user_name }}</td>
          <td>{{ user.nick_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.status === '0' ? '正常' : '停用' }}</td>
          <td>
            <button class="edit" @click="openEditModal(user)">编辑</button>
            <button class="delete" @click="confirmDeleteUser(user.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 新增/编辑用户的弹窗 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditMode ? '编辑用户' : '新增用户' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label>用户名</label>
            <input v-model="currentUser.user_name" required :disabled="isEditMode" />
          </div>
          <div class="form-group">
            <label>昵称</label>
            <input v-model="currentUser.nick_name" required />
          </div>
           <div class="form-group" v-if="!isEditMode">
            <label>密码</label>
            <input type="password" v-model="currentUser.password" required />
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input type="email" v-model="currentUser.email" />
          </div>
          <div class="form-group">
            <label>手机号</label>
            <input v-model="currentUser.phone" />
          </div>
          <div class="form-group">
            <label>状态</label>
            <select v-model="currentUser.status">
              <option value="0">正常</option>
              <option value="1">停用</option>
            </select>
          </div>
           <div class="form-group">
            <label>备注</label>
            <textarea v-model="currentUser.remark"></textarea>
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
      message="您确定要删除这个用户吗？"
      @confirm="handleDelete"
      @cancel="cancelDelete"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUsers, addUser, updateUser, deleteUser } from '../../api/user';
import ConfirmModal from '../../components/ConfirmModal.vue';

const users = ref([]);
const showModal = ref(false);
const isEditMode = ref(false);
const currentUser = ref({});

// State for custom confirm modal
const showConfirm = ref(false);
const userIdToDelete = ref(null);

// 获取用户列表
const fetchUsers = async () => {
  try {
    const response = await getUsers();
    users.value = response.data.data;
  } catch (error) {
    console.error('获取用户列表失败:', error);
    alert('获取用户列表失败');
  }
};

onMounted(fetchUsers);

// 打开新增弹窗
const openAddModal = () => {
  isEditMode.value = false;
  currentUser.value = { status: '0' }; // 默认值
  showModal.value = true;
};

// 打开编辑弹窗
const openEditModal = (user) => {
  isEditMode.value = true;
  currentUser.value = { ...user };
  showModal.value = true;
};

// 关闭弹窗
const closeModal = () => {
  showModal.value = false;
};

// 保存用户 (新增或更新)
const saveUser = async () => {
  try {
    if (isEditMode.value) {
      // 更新用户
      const { id, ...userData } = currentUser.value;
      await updateUser(id, userData);
    } else {
      // 新增用户
      await addUser(currentUser.value);
    }
    closeModal();
    fetchUsers(); // 刷新列表
  } catch (error) {
    console.error('保存用户失败:', error);
    alert('保存用户失败');
  }
};

const confirmDeleteUser = (id) => {
  userIdToDelete.value = id;
  showConfirm.value = true;
};

const handleDelete = async () => {
  try {
    await deleteUser(userIdToDelete.value);
    fetchUsers();
  } catch (error) {
    console.error('删除用户失败:', error);
    alert('删除用户失败');
  } finally {
    cancelDelete();
  }
};

const cancelDelete = () => {
  showConfirm.value = false;
  userIdToDelete.value = null;
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
.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.modal-actions {
  text-align: right;
}
</style> 