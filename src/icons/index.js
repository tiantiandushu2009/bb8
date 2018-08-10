import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

// 自动导入 放置图标 icon 的文件夹下的所有图标 如：@/src/icons
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
