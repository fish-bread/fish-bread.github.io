import {computed, ref} from "vue";
export const isBack = ref(false);
export const newTitle = ref(false)
export const BodyLeft = ref()
export const BodyBack = ref()
export const homeAll = ref()
export const body_home = ref()
export const body_title= ref()
export const collapse = () => {
  if (isBack.value === false) {
    console.log("collapse")
    isBack.value = true
    BodyLeft.value.style.transform = "translateX(-210px)"
    BodyBack.value.style.transform = "rotate(180deg)"
    if (body_home.value) {
      body_home.value.style.paddingLeft = "40px"
    }  else {
      body_title.value.style.paddingLeft = "40px"
    }
  } else {
    isBack.value = false
    console.log("!collapse")
    BodyLeft.value.style.transform = ""
    BodyBack.value.style.transform = ""
    if (body_home.value) {
      body_home.value.style.paddingLeft = ""
    } else {
      body_title.value.style.paddingLeft = ""
    }
  }
}
//用户设置
export const userToken = ref('')
export const is_user_setting = ref(false)
export const userSet = () => {
  is_user_setting.value = !is_user_setting.value 
}
