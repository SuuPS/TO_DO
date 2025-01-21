import {useAuthStore} from "../store/auth/authStore.ts";
import {storeToRefs} from "pinia";

const { currentUser } = storeToRefs(useAuthStore())

const hasRoles = (roles: string[]) => {
    console.log(234)
    let isAccess = false
    roles.forEach(item => {
        if (item === currentUser.value.role){
            isAccess = true
        }
    })

    return isAccess
}

export {
    hasRoles
}
