<template>
  <Heading> Kontakt detaljer </Heading>
  <PageWrapper>
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <FormLabel for-id="name">Navn</FormLabel>
        <FormText id="name" v-model="dto.Info.Name" required="true"></FormText>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="address-line-1">Addresse 1</FormLabel>
        <FormText
          id="address-line-1"
          v-model="dto.Info.InvoiceAddress.AddressLine1"
          required="true"
        ></FormText>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="address-line-2">Addresse 2</FormLabel>
        <FormText
          id="address-line-2"
          v-model="dto.Info.InvoiceAddress.AddressLine2"
          required="true"
        ></FormText>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="address-line-3">Addresse 3</FormLabel>
        <FormText
          id="address-line-3"
          v-model="dto.Info.InvoiceAddress.AddressLine3"
          required="true"
        ></FormText>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="city">By</FormLabel>
        <FormText
          id="city"
          v-model="dto.Info.InvoiceAddress.City"
          required="true"
        ></FormText>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="country">Land</FormLabel>
        <FormText
          id="country"
          v-model="dto.Info.InvoiceAddress.Country"
          required="true"
        ></FormText>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="country-code">Landskode</FormLabel>
        <FormText
          id="country-code"
          v-model="dto.Info.InvoiceAddress.CountryCode"
          required="true"
        ></FormText>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="postal-code">PostKode</FormLabel>
        <FormText
          id="postal-code"
          v-model="dto.Info.InvoiceAddress.PostalCode"
          required="true"
        ></FormText>
      </div>
      <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
        <FormLabel for-id="comment">Comment</FormLabel>
        <FormText id="comment" v-model="dto.Comment" required="true"></FormText>
      </div>
    </div>
    <button @click="save">Save</button>
  </PageWrapper>
</template>

<script setup lang="ts">
const route = useRoute();

const id = route.params.id;

const dto = computed(() => {
  return {
    Info: {
      Name: "Mikke Mus Kontaktperson",
      InvoiceAddress: {
        AddressLine1: "Andebygaten 33b",
        AddressLine2: "2 etg.",
        AddressLine3: "",
        City: "Andeby",
        Country: "DisneyWorld",
        CountryCode: "DW",
        PostalCode: "341234-A",
      },
      DefaultPhone: {
        CountryCode: "+999",
        Description: "Mobile",
        Number: "999-999-999",
      },
      DefaultEmail: {
        EmailAddress: "mikke@mus.com",
      },
    },
    Comment: "Her har vi en splitter ny kontaktperson",
  };
});

const save = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.base_url;

  const cookie = useCookie("accessToken");

  var response = await fetch(`${baseUrl}/biz/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto.value),
  });

  console.log(response);
};
</script>
