<template>
  <div class="flex-grid justify-center">
    <div class="col-2">

      <form @submit.prevent="register" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            v-model="form.name"
            @blur="$v.form.name.$touch()"
            id="name" type="text" class="form-input">
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
          </template>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model.lazy="form.username"
            @blur="$v.form.username.$touch()"
            id="username" type="text" class="form-input">
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.username.unique" class="form-error">Sorry! This username is taken</span>
          </template>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model.lazy="form.email"
            @blur="$v.form.email.$touch()"
            id="email" type="email" class="form-input">
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span v-else-if="!$v.form.email.email" class="form-error">This is not a valid email address</span>
            <span v-else-if="!$v.form.email.unique" class="form-error">Sorry! This email is taken</span>
          </template>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            id="password" type="password" class="form-input">
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.password.password" class="form-error">The password must be at least 6 characters long</span>
          </template>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            v-model="form.avatar"
            @blur="$v.form.avatar.$touch()"
            id="avatar" type="text" class="form-input">
          <template v-if="$v.form.avatar.$error">

          </template>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>

      </form>
      <div class="text-center push-top">
        <button @click="registerWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign up with Google</button>
      </div>
    </div>
  </div>
</template>

<script>
import {required, email, minLength, helpers as vuelidateHelpers} from 'vuelidate/lib/validators'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
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
  methods: {
    register () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
        .then(() => {
          this.$router.push('/')
        })
    },
    registerWithGoogle () {
      this.$store.dispatch('auth/signInWithGoogle')
        .then(() => {
          this.$router.push('/')
        })
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      username: {
        required,
        unique (value) {
          if (!vuelidateHelpers.req(value)) {
            return true
          }
          return new Promise((resolve, reject) => {
            firebase.database().ref('users').orderByChild('usernameLower').equalTo(value.toLowerCase())
              .once('value', snapshot => resolve(!snapshot.exists()))
          })
        }
      },
      email: {
        required,
        email,
        unique (value) {
          if (!vuelidateHelpers.req(value)) {
            return true
          }
          return new Promise((resolve, reject) => {
            firebase.database().ref('users').orderByChild('email').equalTo(value.toLowerCase())
              .once('value', snapshot => resolve(!snapshot.exists()))
          })
        }
      },
      password: {
        required,
        minLength: minLength(6)
      },
      avatar: {

      }
    }
  },

  created () {
    this.$emit('ready')
  }
}
</script>

<style scoped>

</style>
