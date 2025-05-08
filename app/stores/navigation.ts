import { defineStore } from "pinia";

export type NavItem = {
  name: string;
  path?: string;
  external?: boolean;
  children?: NavItem[];
};

export const useNavigationStore = defineStore(
  "navigation",
  {
    state: () => ({
      navItems: [
        {
          name: "前端基础",
          children: [
            { name: "Javascript", path: "/category/javascript" },
            { name: "Typescript", path: "/category/typescript" },
            { name: "HTML", path: "/category/html" },
            { name: "CSS", path: "/category/css" },
            { name: "ES6", path: "/category/es6" },
            { name: "浏览器与网络", path: "/category/browser-network" },
            { name: "计算机", path: "/category/computer" },
            { name: "Node", path: "/category/node" },
          ],
        },
        {
          name: "技术框架",
          children: [
            { name: "Vue", path: "/category/vue" },
            { name: "React", path: "/category/react" },
            { name: "Uniapp", path: "/category/uniapp" },
            { name: "Nuxt", path: "/category/nuxt" },
            { name: "Nest", path: "/category/nest" },
            { name: "Spring boot", path: "/category/spring-boot" },
            { name: "Git", path: "/category/git" },
          ],
        },
        {
          name: "后端基础",
          children: [
            { name: "Java", path: "/category/java" },
            { name: "Linux", path: "/category/linux" },
            { name: "Dokcer", path: "/category/docker" },
            { name: "Nginx", path: "/category/nginx" },
          ],
        },
        {
          name: "工程化",
          children: [
            {
              name: "常用工具",
              children: [
                { name: "Js工具", path: "/category/js-tools" },
                { name: "node工具", path: "/category/node-tools" },
                { name: "Java工具", path: "/category/java-tools" },
                { name: "鸿蒙工具", path: "/category/harmony-tools" },
              ],
            },
            {
              name: "打包构建",
              children: [
                { name: "Uniapp", path: "/category/uniapp-build" },
                { name: "Expo", path: "/category/expo-build" },
                { name: "Jenkins", path: "/category/jenkins" },
                { name: "打包脚本", path: "/category/build-scripts" },
              ],
            },
            { name: "经典代码", path: "/category/classic-code" },
            { name: "难点突破", path: "/category/challenges" },
          ],
        },
        { name: "网页导航", path: "/web-navigation" },
        {
          name: "社区",
          children: [
            { name: "Github", path: "https://github.com", external: true },
            { name: "掘金", path: "https://juejin.cn", external: true },
            { name: "CSDN", path: "https://csdn.net", external: true },
          ],
        },
      ] as NavItem[],
    }),
    getters: {
      getNavItems: (state) => state.navItems,
    },
  },
  {
    persist: true,
  },
);
