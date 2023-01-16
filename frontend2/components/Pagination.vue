<template>
  <ul class="inline-flex -space-x-px">
    <li>
      <span
        @click="previousPage()"
        class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
        >Previous
      </span>
    </li>
    <li>
      <span
        class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >{{ page + 1 }}
      </span>
    </li>
    <li>
      <span
        @click="nextPage()"
        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
        >Next
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { emit } from "process";

let page = ref(0);
const emit = defineEmits(["update"]);

const nextPage = () => {
  page.value += 1;
  emit("update", page);
};

const previousPage = () => {
  page.value = Math.max(page.value - 1, 0);
  emit("update", page);
};
</script>
