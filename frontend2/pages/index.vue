<template>
  <div>
    <Heading> Kontakter </Heading>
    <PageWrapper>
      <div class="sm:flex items-center justify-between">
        <div class="w-1/2">
          <input
            type="text"
            id="first_name"
            class="hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Søk etter kontakter"
            :value="search"
          />
        </div>
        <NuxtLink to="/contacts/create">
          <button
            onclick="popuphandler(true)"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p class="text-sm font-medium leading-none text-white">
              Opprett ny kontakt
            </p>
          </button>
        </NuxtLink>
      </div>

      <div class="mt-7 overflow-x-auto">
        <table class="border-separate border-spacing-y-2 w-full">
          <tbody>
            <tr
              v-for="contact in contacts"
              class="h-16 border border-gray-300 rounded hover:bg-slate-50"
            >
              <td class="ml-4">
                <NuxtLink :to="'/contacts/' + contact.ID">
                  <div class="flex">
                    <SvgUserOutline />
                    <span class="ml-2">{{ contact?.Info?.Name ?? "???" }}</span>
                  </div>
                </NuxtLink>
              </td>
              <td class="ml-4">
                <NuxtLink :to="'/contacts/' + contact.ID">
                  <div class="flex">
                    <SvgEnvelopeOutline />
                    <a
                      class="ml-2 text-blue-600 hover:underline"
                      :href="
                        'mailto:' + contact?.Info?.DefaultEmail?.EmailAddress
                      "
                      >{{
                        contact?.Info?.DefaultEmail?.EmailAddress ?? "???"
                      }}</a
                    >
                  </div>
                </NuxtLink>
              </td>
              <td class="ml-4">
                <NuxtLink :to="'/contacts/' + contact.ID">
                  <div class="flex">
                    <SvgPhoneOutline />
                    <a
                      class="ml-2 text-blue-600 hover:underline"
                      :href="'tel:' + contact?.Info?.DefaultPhone?.Number"
                    >
                      {{ contact?.Info?.DefaultPhone?.Number ?? "???" }}
                    </a>
                  </div>
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageWrapper>
  </div>
</template>

<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import { ComputedRef, Ref } from "vue";
import { ContactListDto } from "../services/interfaces";

const search = ref("");

const config = useRuntimeConfig();
const baseUrl = config.public.base_url;

const cookie = useCookie("accessToken");

let contacts: Ref<ContactListDto[]> = ref([]);

const readContacts = () => {
  const response = fetch(
    `${baseUrl}/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10&filter=contains(Info.Name, '')
    `,
    {
      headers: {
        Authorization: `Bearer ${cookie.value}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((json) => (contacts.value = json));
};

readContacts();

const debounced = useDebounce(search, 300);
watch(
  () => debounced.value,
  (newValue, oldValue) => {
    readContacts();
  }
);
</script>
