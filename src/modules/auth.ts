import type { UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (token && to.meta.public)
      next()
    else if (!token && !to.meta.public)
      next('/auth/login')
    else next()
  })
}
