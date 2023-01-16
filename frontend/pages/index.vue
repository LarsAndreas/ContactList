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
            v-model="search"
          />
        </div>
        <NuxtLink to="/contacts/create">
          <Button> Opprett ny kontakt </Button>
        </NuxtLink>
      </div>

      <div class="mt-7 overflow-x-auto">
        <table class="border-separate border-spacing-y-2 w-full">
          <tbody>
            <tr
              v-if="contacts.length > 0"
              v-for="contact in contacts"
              class="h-16 border border-gray-300 rounded hover:bg-slate-50"
            >
              <td class="ml-4">
                <NuxtLink :to="'/contacts/' + contact.ID">
                  <div class="flex">
                    <SvgUserOutline />
                    <span v-if="contact?.Info?.Name" class="ml-2">{{
                      contact?.Info?.Name
                    }}</span>
                    <span class="ml-2" v-else>UKJENT</span>
                  </div>
                </NuxtLink>
              </td>
              <td class="ml-4">
                <NuxtLink :to="'/contacts/' + contact.ID" custom>
                  <div class="flex">
                    <SvgEnvelopeOutline />
                    <a
                      class="ml-2 text-blue-600 hover:underline"
                      v-if="contact?.Info?.DefaultEmail?.EmailAddress"
                      :href="`mailto:${contact?.Info?.DefaultEmail?.EmailAddress}`"
                      >{{ contact?.Info?.DefaultEmail?.EmailAddress }}</a
                    >
                    <span class="ml-2" v-else>UKJENT</span>
                  </div>
                </NuxtLink>
              </td>
              <td class="ml-4">
                <NuxtLink :to="'/contacts/' + contact.ID" custom>
                  <div class="flex">
                    <SvgPhoneOutline />
                    <a
                      class="ml-2 text-blue-600 hover:underline"
                      v-if="
                        contact?.Info?.DefaultPhone?.CountryCode &&
                        contact?.Info?.DefaultPhone?.Number
                      "
                      :href="`tel:${contact?.Info?.DefaultPhone?.CountryCode} ${contact?.Info?.DefaultPhone?.Number}`"
                    >
                      {{
                        `${contact?.Info?.DefaultPhone?.CountryCode} ${contact?.Info?.DefaultPhone?.Number}`
                      }}
                    </a>
                    <span class="ml-2" v-else>UKJENT</span>
                  </div>
                </NuxtLink>
              </td>
              <td>
                <SvgXMarkOutline
                  class="hover:scale-125"
                  @click="deleteContact(contact.ID)"
                />
              </td>
            </tr>
            <tr v-else>
              <span> Ingen kontakter... </span>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          class="mt-4"
          @update="
            (pageCount: number) => {
              page = pageCount;
              readContacts();
            }
          "
        />
      </div>
    </PageWrapper>
  </div>
</template>

<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import { ComputedRef, Ref } from "vue";
import { ContactListDto } from "../services/interfaces";

definePageMeta({
  middleware: ["auth"],
});

let page = ref(0);
const search = ref("");

const config = useRuntimeConfig();
const baseUrl = config.public.base_url;

const cookie = useCookie("accessToken");

let contacts: Ref<ContactListDto[]> = ref([]);

const readContacts = () => {
  const response = fetch(
    `${baseUrl}/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&skip=${
      7 * page.value
    }&top=7&filter=contains(Info.Name, '${search.value}')
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

const deleteContact = (contactId: number) => {
  const response = fetch(`${baseUrl}/biz/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookie.value}`,
      "Content-Type": "application/json",
    },
  }).then(() => {
    readContacts();
  });
};

readContacts();

const debounced = useDebounce(search, 200);
watch(
  () => debounced.value,
  (newValue, oldValue) => {
    page.value = 0;
    readContacts();
  }
);
</script>
