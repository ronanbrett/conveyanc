<template>
  <section class="page">
    <h1 class="page__title">Property Details</h1>
    <Form @submit="onSubmit">
      <div class="field__container">
        <Field v-slot="{ field }" name="propertyType">
          <label class="field__title">Type</label>
          <PropertyCreateTypeInput
            :options="data.propertyType"
            v-bind="field"
            v-model="propertyType"
          />
        </Field>
      </div>

      <div class="field__container">
        <Field v-slot="{ field }" name="test">
          <label class="field__title">Test</label>
          <Radio v-bind="field" v-model="test" label="testA">Test A</Radio>
          <Radio v-bind="field" v-model="test" label="testB">Test B</Radio>
        </Field>
      </div>
      <button>Sign up</button>
    </Form>
  </section>
</template>

<script src="./PropertyCreatePage.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';
</style>
