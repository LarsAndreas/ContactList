<template>
  <div class="w-screen h-screen bg-gray-50">
    <div class="container w-full md:w-4/5 xl:w-3/5 mx-auto px-2">
      <div class="px-4 md:px-10 py-4 md:py-7">
        <div class="flex items-center justify-between">
          <p
            tabindex="0"
            class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
          >
            Kontakter
          </p>
        </div>
      </div>
      <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div class="sm:flex items-center justify-between">
          <div class="w-1/2">
            <input
              type="text"
              id="first_name"
              class="hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Søk etter kontakter"
              required
            />
          </div>
          <button
            onclick="popuphandler(true)"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
          >
            <p class="text-sm font-medium leading-none text-white">
              Opprett ny kontakt
            </p>
          </button>
        </div>

        <div class="mt-7 overflow-x-auto">
          <table class="border-separate border-spacing-y-2 w-full">
            <tbody>
              <tr
                v-for="contact in contacts"
                class="h-16 border-4 border-gray-300 rounded hover:bg-slate-50"
              >
                <td class="pl-4">
                  {{ contact?.Info?.Name ?? "???" }}
                </td>
                <td class="pl-4">
                  <a
                    :href="
                      'mailto:' + contact?.Info?.DefaultEmail?.EmailAddress
                    "
                    >{{ contact?.Info?.DefaultEmail?.EmailAddress ?? "???" }}</a
                  >
                </td>
                <td class="pl-4">
                  <a :href="'tel:' + contact?.Info?.DefaultPhone?.Number">
                    {{ contact?.Info?.DefaultPhone?.Number ?? "???" }}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContactListDto } from "../services/interfaces";

const config = useRuntimeConfig();
const baseUrl = config.public.base_url;

const cookie = useCookie("accessToken");

var response = await fetch(
  `${baseUrl}/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10`,
  {
    headers: {
      Authorization: `Bearer ${cookie.value}`,
      "Content-Type": "application/json",
    },
  }
);

const contacts: ContactListDto[] = await response.json();

console.log(contacts);

const contact = contacts[0];

const name = contact.Info.Name;
</script>
