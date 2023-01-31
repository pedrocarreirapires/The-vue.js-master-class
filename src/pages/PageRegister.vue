<template>
  <div class="flex-grid justify-center">
    <div class="col-2">

      <form class="card card-form" @submit.prevent="register">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            class="form-input" type="text" @blur="$v.form.name.$touch()">
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
          </template>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model.lazy="form.username"
            class="form-input" type="text" @blur="$v.form.username.$touch()">
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.username.unique" class="form-error">Sorry! This username is taken</span>
          </template>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model.lazy="form.email"
            class="form-input" @blur="$v.form.email.$touch()">
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span v-else-if="!$v.form.email.email" class="form-error">This in not a valid email address</span>
            <span v-else-if="!$v.form.email.unique" class="form-error">Sorry! This email is taken</span>

          </template>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            class="form-input" type="password" @blur="$v.form.password.$touch()">
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.password.minLength"
                  class="form-error">The password must be at least 6 characters long</span>
          </template>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            id="avatar"
            v-model.lazy="form.avatar"
            class="form-input" type="text" @blur="$v.form.avatar.$touch()">
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error">The supplied URL is invalid</span>
            <span v-if="!$v.form.avatar.supportedImageFile" class="form-error">This file type is not supported by our system</span>
            <span v-else-if="!$v.form.avatar.responseOk" class="form-error">The supplied image cannot be found</span>
          </template>
        </div>

        <div class="form-actions">
          <button class="btn-blue btn-block" type="submit">Register</button>
        </div>

      </form>
      <div class="text-center push-top">
        <button class="btn-red btn-xsmall" @click="registerWithGoogle"><i class="fa fa-google fa-btn"></i>Sign up with
          Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import {email, minLength, required, url} from 'vuelidate/lib/validators'
import {uniqueEmail, uniqueUsername, responseOk, supportedImageFile} from '@/utils/validators'

export default {
  data () {
    return {
      form: {
        name: null,
        username: null,
        email: null,
        password: null,
        avatar: null
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      username: {
        required,
        unique: uniqueUsername
      },
      email: {
        required,
        email,
        unique: uniqueEmail
      },
      password: {
        required,
        minLength: minLength(6)
      },
      avatar: {
        url,
        supportedImageFile,
        responseOk
      }
    }
  },
  methods: {
    register () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
        .then(() => this.successRedirect())
    },
    registerWithGoogle () {
      this.$store.dispatch('auth/signInWithGoogle')
        .then(() => this.successRedirect())
    },
    successRedirect () {
      const redirectTo = this.$route.query.redirectTo || {name: 'Home'}
      this.$router.push(redirectTo)
    }
  },
  created () {
    this.$emit('ready')
  }
}
</script>

<style scoped>
</style>
