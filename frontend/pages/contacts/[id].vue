<template>
  <Heading> Kontakt detaljer </Heading>
  <PageWrapper>
    <form @submit.prevent="save">
      <FormRow>
        <FormElement>
          <FormLabel for-id="name">Navn</FormLabel>
          <FormText
            id="name"
            v-model="dto.Info.Name"
            placeholder="Ola Nordmann"
            required="true"
          ></FormText>
        </FormElement>
      </FormRow>
      <FormRow>
        <FormElement>
          <FormLabel for-id="name">Landskode</FormLabel>
          <FormText
            id="name"
            v-model="dto.Info.DefaultPhone.CountryCode"
            placeholder="+47"
            required="true"
          ></FormText>
        </FormElement>
        <FormElement>
          <FormLabel for-id="name">Telefonnummer</FormLabel>
          <FormText
            id="name"
            v-model="dto.Info.DefaultPhone.Number"
            placeholder="920 23 062"
            required="true"
          ></FormText>
        </FormElement>
        <FormElement>
          <FormLabel for-id="name">Detaljer</FormLabel>
          <FormText
            id="name"
            v-model="dto.Info.DefaultPhone.Description"
            placeholder="Detaljer..."
          ></FormText>
        </FormElement>
      </FormRow>
      <FormRow>
        <FormElement>
          <FormLabel for-id="name">Epost</FormLabel>
          <FormEmail
            id="name"
            v-model="dto.Info.DefaultEmail.EmailAddress"
            placeholder="info@contactlist.com"
            required="true"
          ></FormEmail>
        </FormElement>
      </FormRow>
      <FormRow>
        <FormElement>
          <FormLabel for-id="address-line-1">Addresse 1</FormLabel>
          <FormText
            id="address-line-1"
            v-model="dto.Info.InvoiceAddress.AddressLine1"
            placeholder="Karl Johans gt. 22"
            required="true"
          ></FormText>
        </FormElement>
        <FormElement>
          <FormLabel for-id="address-line-2">Addresse 2</FormLabel>
          <FormText
            id="address-line-2"
            v-model="dto.Info.InvoiceAddress.AddressLine2"
          ></FormText>
        </FormElement>
        <FormElement>
          <FormLabel for-id="address-line-3">Addresse 3</FormLabel>
          <FormText
            id="address-line-3"
            v-model="dto.Info.InvoiceAddress.AddressLine3"
          ></FormText>
        </FormElement>
      </FormRow>
      <FormRow>
        <FormElement>
          <FormLabel for-id="country">Land</FormLabel>
          <FormText
            id="country"
            v-model="dto.Info.InvoiceAddress.Country"
            placeholder="Norge"
            required="true"
          ></FormText>
        </FormElement>
        <FormElement>
          <FormLabel for-id="country-code">Landskode</FormLabel>
          <FormText
            id="country-code"
            v-model="dto.Info.InvoiceAddress.CountryCode"
            placeholder="NO"
            required="true"
          ></FormText>
        </FormElement>
      </FormRow>
      <FormRow>
        <FormElement>
          <FormLabel for-id="city">By</FormLabel>
          <FormText
            id="city"
            v-model="dto.Info.InvoiceAddress.City"
            placeholder="Oslo"
            required="true"
          ></FormText>
        </FormElement>
        <FormElement>
          <FormLabel for-id="postal-code">Postkode</FormLabel>
          <FormText
            id="postal-code"
            v-model="dto.Info.InvoiceAddress.PostalCode"
            placeholder="0026"
            required="true"
          ></FormText>
        </FormElement>
      </FormRow>
      <FormRow>
        <FormElement>
          <FormLabel for-id="comment">Kommentar</FormLabel>
          <FormText
            id="comment"
            v-model="dto.Comment"
            placeholder="Skriv noen detaljer om kontakten..."
          ></FormText>
        </FormElement>
      </FormRow>
      <FormSubmitButton v-model="Lagre" class="m-4" />
    </form>
  </PageWrapper>
</template>

<style>
@import url(toastr);
</style>

<script setup lang="ts">
import { Ref } from "vue";
import { ContactListDto } from "~~/services/interfaces";
import toastr from "toastr";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const router = useRouter();

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

let dto = ref({
  ID: id,
  Info: {
    ID: contact?.Info?.ID,
    Name: contact?.Info?.Name ?? "",
    InvoiceAddress: {
      ID: contact?.Info?.InvoiceAddressID,
      AddressLine1: contact?.Info?.InvoiceAddress?.AddressLine1 ?? "",
      AddressLine2: contact?.Info?.InvoiceAddress?.AddressLine2 ?? "",
      AddressLine3: contact?.Info?.InvoiceAddress?.AddressLine3 ?? "",
      City: contact?.Info?.InvoiceAddress?.City ?? "",
      Country: contact?.Info?.InvoiceAddress?.Country ?? "",
      CountryCode: contact?.Info?.InvoiceAddress?.CountryCode ?? "",
      PostalCode: contact?.Info?.InvoiceAddress?.PostalCode ?? "",
    },
    DefaultPhone: {
      ID: contact?.Info?.DefaultPhoneID,
      CountryCode: contact?.Info?.DefaultPhone?.CountryCode ?? "",
      Description: contact?.Info?.DefaultPhone?.Description ?? "",
      Number: contact?.Info?.DefaultPhone?.Number ?? "",
    },
    DefaultEmail: {
      ID: contact?.Info?.DefaultEmailID,
      EmailAddress: contact?.Info?.DefaultEmail?.EmailAddress ?? "",
    },
  },
  Comment: contact?.Comment ?? "",
});

const save = async (event: any) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.base_url;
  const cookie = useCookie("accessToken");

  await fetch(`${baseUrl}/biz/contacts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cookie.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto.value),
  })
    .then((response) => {
      if (response.ok) {
        toastr.success(
          `Kontakten heter ${dto.value.Info.Name}`,
          "Vellykket oppdatering av kontakt"
        );
        router.push("/");
      } else {
        toastr.error("Kontakt administrator av systemet", "Oppdateringsfeil");
      }
    })
    .catch((error) => {
      toastr.error("Kontakt administrator av systemet", "Oppdateringsfeil");
    });
};
</script>
