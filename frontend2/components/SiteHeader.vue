<template>
  <div class="p-4 bg-white flex flex-row justify-between items-center">
    <NuxtLink class="flex flex-row items-center text-gray-800" to="/">
      <SvgPhoneOutline />
      <span class="font-bold align-middle text-xl pl-2"> ContactList </span>
    </NuxtLink>
    <div class="flex flex-row items-center gap-4">
      <div>
        <img
          class="w-8 h-8 rounded-full"
          src="https://randomuser.me/api/portraits/men/79.jpg"
          alt=""
        />
      </div>
      <div>
        <NuxtLink class="flex flex-row text-gray-800" to="/login">
          <span
            class="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded"
          >
            Login
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
