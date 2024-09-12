<template>
    <v-sheet>
        <v-form>
            <v-text-field
                v-model="email"
            >

            </v-text-field>
        </v-form>
    </v-sheet>
    
</template>


<script>
    export default {
        data:()=>({
            email:"",
            password:"",
            rules:[
                value => {
                    if (value) return true
                    return "must"
                }
            ]
        })
    }
</script>