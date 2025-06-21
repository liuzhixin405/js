<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">Admin System</div>
      <nav class="menu">
        <ul>
          <li v-for="menu in menuTree" :key="menu.id">
            <template v-if="menu.children && menu.children.length > 0">
              <div @click="toggleMenu(menu.id)" class="menu-item has-children">
                <span>{{ menu.menu_name }}</span>
                <span class="arrow" :class="{ 'is-open': openMenus.includes(menu.id) }">></span>
              </div>
              <ul v-show="openMenus.includes(menu.id)" class="submenu">
                <li v-for="child in menu.children" :key="child.id">
                  <router-link :to="`/${menu.path}/${child.path}`" class="menu-item">{{ child.menu_name }}</router-link>
                </li>
              </ul>
            </template>
            <template v-else>
               <router-link :to="`/${menu.path}`" class="menu-item">{{ menu.menu_name }}</router-link>
            </template>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main-content">
      <header class="header">
        <span>Welcome, Admin!</span>
        <button @click="handleLogout">Logout</button>
      </header>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMenuTree } from '../api/menu';

const router = useRouter();
const menuTree = ref([]);
const openMenus = ref([]);

onMounted(async () => {
  try {
    const res = await getMenuTree();
    menuTree.value = res.data.data;
    // 默认展开第一个父菜单
    if(menuTree.value.length > 0 && menuTree.value[0].children) {
        openMenus.value.push(menuTree.value[0].id);
    }
  } catch (error) {
    console.error('Failed to fetch menu tree:', error);
  }
});

const toggleMenu = (id) => {
  if (openMenus.value.includes(id)) {
    openMenus.value = openMenus.value.filter(menuId => menuId !== id);
  } else {
    openMenus.value.push(id);
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
}

.sidebar {
  width: 240px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 20px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  background-color: #34495e;
}

.menu {
  flex-grow: 1;
  overflow-y: auto;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: block;
  padding: 15px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;
  border-bottom: 1px solid #34495e;
}

.menu-item:hover, .router-link-active {
  background-color: #3498db;
}

.menu-item.has-children {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.arrow {
    transition: transform 0.3s;
}

.arrow.is-open {
    transform: rotate(90deg);
}

.submenu {
    background-color: #223344;
}

.submenu .menu-item {
    padding-left: 40px;
    border-bottom: none;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #ecf0f1;
}

.header {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-wrapper {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style> 
 