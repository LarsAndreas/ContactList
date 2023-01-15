<template>
  <Heading> Kontakt detaljer </Heading>
  <PageWrapper>
    <FormRow>
      <FormElement>
        <FormLabel for-id="name">Navn</FormLabel>
        <FormText
          id="name"
          v-model="contact.Info.Name"
          required="true"
        ></FormText>
      </FormElement>
    </FormRow>
    <FormRow>
      <FormElement>
        <FormLabel for-id="address-line-1">Addresse 1</FormLabel>
        <FormText
          id="address-line-1"
          v-model="contact.Info.InvoiceAddress.AddressLine1"
          required="true"
        ></FormText>
      </FormElement>
      <FormElement>
        <FormLabel for-id="address-line-2">Addresse 2</FormLabel>
        <FormText
          id="address-line-2"
          v-model="contact.Info.InvoiceAddress.AddressLine2"
          required="true"
        ></FormText>
      </FormElement>
      <FormElement>
        <FormLabel for-id="address-line-3">Addresse 3</FormLabel>
        <FormText
          id="address-line-3"
          v-model="contact.Info.InvoiceAddress.AddressLine3"
          required="true"
        ></FormText>
      </FormElement>
    </FormRow>
    <FormRow>
      <FormElement>
        <FormLabel for-id="city">By</FormLabel>
        <FormText
          id="city"
          v-model="contact.Info.InvoiceAddress.City"
          required="true"
        ></FormText>
      </FormElement>
      <FormElement>
        <FormLabel for-id="country">Land</FormLabel>
        <FormText
          id="country"
          v-model="contact.Info.InvoiceAddress.Country"
          required="true"
        ></FormText>
      </FormElement>
      <FormElement>
        <FormLabel for-id="country-code">Landskode</FormLabel>
        <FormText
          id="country-code"
          v-model="contact.Info.InvoiceAddress.CountryCode"
          required="true"
        ></FormText>
      </FormElement>
      <FormElement>
        <FormLabel for-id="postal-code">PostKode</FormLabel>
        <FormText
          id="postal-code"
          v-model="contact.Info.InvoiceAddress.PostalCode"
          required="true"
        ></FormText>
      </FormElement>
      <FormElement>
        <FormLabel for-id="comment">Comment</FormLabel>
        <FormText
          id="comment"
          v-model="contact.Comment"
          required="true"
        ></FormText>
      </FormElement>
    </FormRow>
    <button @click="save">Save</button>
  </PageWrapper>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { ContactListDto } from "~~/services/interfaces";

const route = useRoute();

const id = route.params.id;

const config = useRuntimeConfig();
const baseUrl = config.public.base_url;

const cookie = useCookie("accessToken");

const response = await fetch(
  `${baseUrl}/biz/contacts/${id}?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress`,
  {
    headers: {
      Authorization: `Bearer ${cookie.value}`,
      "Content-Type": "application/json",
    },
  }
);

let contact: ContactListDto = await response.json();

console.log(contact);

/*
const dto = computed(() => {
  return {
    Info: {
      Name: contact.Info.Name,
      InvoiceAddress: {
        AddressLine1: contact.Info.InvoiceAddress.AddressLine1,
        AddressLine2: contact.Info.InvoiceAddress.AddressLine2,
        AddressLine3: contact.Info.InvoiceAddress.AddressLine3,
        City: contact.Info.InvoiceAddress.City,
        Country: contact.Info.InvoiceAddress.Country,
        CountryCode: contact.Info.InvoiceAddress.CountryCode,
        PostalCode: contact.Info.InvoiceAddress.PostalCode,
      },
      DefaultPhone: {
        CountryCode: contact.Info.DefaultPhone.CountryCode,
        Description: contact.Info.DefaultPhone.Description,
        Number: contact.Info.DefaultPhone.Number,
      },
      DefaultEmail: {
        EmailAddress: contact.Info.DefaultEmail.EmailAddress,
      },
    },
    Comment: contact.Comment,
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
*/
</script>
