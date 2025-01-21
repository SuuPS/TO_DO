import { mount } from '@vue/test-utils'
import SignIn from '@/components/SignIn.vue' // Убедитесь, что путь к компоненту правильный
import { useAuthStore } from '@/store/auth/authStore.ts'
import { toast } from 'vue3-toastify'
import { RouterLink } from 'vue-router'

// Мокаем необходимые зависимости
jest.mock('@/store/auth/authStore.ts')
jest.mock('vue3-toastify')

describe('SignIn.vue', () => {
    let wrapper: any

    beforeEach(() => {
        // Мокаем store и методы
        useAuthStore.mockReturnValue({
            signIn: jest.fn().mockResolvedValue(true),
        })

        // Мокаем toast
        toast.mockClear()

        // Монтируем компонент
        wrapper = mount(SignIn, {
            global: {
                stubs: {
                    RouterLink,
                },
            },
        })
    })

    it('отображает форму авторизации', () => {
        expect(wrapper.find('h2').text()).toBe('Авторизация')
        expect(wrapper.find('input[placeholder="Логин"]').exists()).toBe(true)
        expect(wrapper.find('input[placeholder="Пароль"]').exists()).toBe(true)
    })

    it('отключает кнопку, если поля не заполнены', () => {
        const button = wrapper.find('button')
        expect(button.element.disabled).toBe(true)
    })

    it('активирует кнопку, если поля заполнены', async () => {
        await wrapper.setData({
            params: {
                login: 'testLogin',
                password: 'testPassword',
            },
        })
        const button = wrapper.find('button')
        expect(button.element.disabled).toBe(false)
    })

    it('успешно отправляет форму при корректных данных', async () => {
        // Мокаем успешный ответ от signIn
        useAuthStore().signIn.mockResolvedValueOnce(true)

        await wrapper.setData({
            params: {
                login: 'testLogin',
                password: 'testPassword',
            },
        })

        // Клик по кнопке
        await wrapper.find('button').trigger('click')

        // Проверяем, что toast был вызван
        expect(toast).toHaveBeenCalledWith('Авторизация прошла успешно!', expect.objectContaining({
            type: 'success',
            autoClose: 1000,
        }))

        // Проверяем, что после тоста был переход
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'TaskList' })
    })

    it('показывает ошибку при неправильных данных', async () => {
        const errorMessage = 'Ошибка авторизации'
        useAuthStore().signIn.mockRejectedValueOnce(errorMessage)

        await wrapper.setData({
            params: {
                login: 'testLogin',
                password: 'wrongPassword',
            },
        })

        await wrapper.find('button').trigger('click')

        // Проверяем, что toast был вызван с ошибкой
        expect(toast).toHaveBeenCalledWith(errorMessage, expect.objectContaining({
            type: 'danger',
            autoClose: 1000,
        }))
    })

    it('переходит на страницу регистрации по ссылке', async () => {
        const link = wrapper.findComponent(RouterLink)
        await link.trigger('click')

        // Проверяем, что произошел переход на страницу регистрации
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'SignUp' })
    })
})
