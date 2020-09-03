<template>
  <section class="page">
    <h1 class="page__title">Property Details</h1>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="field__container">
        <Field v-slot="{ field }" name="propertyType">
          <label class="field__title">Type</label>
          <PropertyCreateTypeInput
            :options="data.propertyType"
            v-bind="field"
            v-model="form.propertyType"
          />
        </Field>
        <ErrorMessage name="propertyType" />
      </div>

      <div class="field__container">
        <Field v-slot="{ field }" name="test">
          <label class="field__title">Test</label>
          <Radio v-bind="field" v-model="form.test" name="test" value="testA">Test A</Radio>
          <Radio v-bind="field" v-model="form.test" name="test" value="testB">Test B</Radio>
        </Field>
        <ErrorMessage name="test" />
      </div>

      <!-- <div class="field__container">
        <Field name="name" v-slot="{ field }">
          <input v-bind="field" type="password" rules="required" />
          <p>Hint: Enter a secure password you can remember</p>
        </Field>
        <ErrorMessage name="name" />
      </div> -->

      <div class="field__container">
        <Field v-slot="{ field }" name="name">
          <label class="field__title">Name</label>
          <Input v-bind="field" v-model="form.name" />
        </Field>
        <ErrorMessage name="name" />
      </div>

      <button type="reset">Reset</button>
      <button type="submit">Sign up</button>
    </Form>
  </section>
</template>

<script src="./PropertyCreatePage.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';
</style>
