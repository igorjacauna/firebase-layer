<script setup lang="ts">
import { getAuth, signOut, signInWithCustomToken } from 'firebase/auth';

const otp = ref('');
const email = ref('');
const api = getApi();
const user = useCurrentUser();
function sendOTP() {
  api('/api/auth/otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
    }),
  });
}

function checkOTP() {
  api('/api/auth/otp/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      otp: otp.value,
      email: email.value,
    }),
  })
    .then(({ token }) => {
      signInWithCustomToken(getAuth(), token)
        .then((userCredential) => {
          console.log(userCredential);
        });
    });
}

function logout() {
  signOut(getAuth());
}
</script>
<template>
  <div>
    <template v-if="user">
      <h1>Welcome, {{ user.email }}</h1>
      <button @click="logout()">
        Logout
      </button>
    </template>
    <template v-else>
      <form @submit.prevent="sendOTP">
        <input
          v-model="email"
          type="text"
          placeholder="email"
        >
        <button type="submit">
          Send OTP
        </button>
      </form>
      <form @submit.prevent="checkOTP">
        <input
          v-model="otp"
          type="text"
          placeholder="OTP"
        >
        <button>Check OTP</button>
      </form>
    </template>
  </div>
</template>