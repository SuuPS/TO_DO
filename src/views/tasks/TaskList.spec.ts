import { render, screen, fireEvent } from '@testing-library/vue';
import TaskList from '@/views/tasks/TaskList.vue'; // Замени на путь к твоему компоненту
import { vi } from 'vitest';

// Заглушки для хранилищ Pinia
vi.mock('@/store/task/taskStore.ts', () => ({
    useTaskStore: () => ({
        fetchTasks: vi.fn(),
        deleteTask: vi.fn(),
        editTask: vi.fn(),
        tasksList: [{ id: '1', name: 'Test Task', text: 'Description', employee: 'User 1', status: 'In Progress', edit: false }],
        statusList: ['In Progress', 'Completed'],
    }),
}));

vi.mock('@/store/users/usersStore.ts', () => ({
    useUsersStore: () => ({
        userList: [{ id: '1', name: 'User 1' }],
    }),
}));

vi.mock('@/store/auth/authStore.ts', () => ({
    useAuthStore: () => ({
        currentUser: { value: { id: '1', role: 'admin' } },
    }),
}));

describe('TaskList.vue', () => {
    it('Отображает список задач', async () => {
        render(TaskList);

        // Проверяем, что отображается строка задачи
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('User 1')).toBeInTheDocument();
        expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    it('Удаляет задачу при клике на кнопку', async () => {
        const { deleteTask } = require('@/store/task/taskStore.ts').useTaskStore();

        render(TaskList);

        const deleteButton = screen.getByText('🗑️ Удалить');
        await fireEvent.click(deleteButton);

        expect(deleteTask).toHaveBeenCalledWith('1'); // Проверяем, что функция вызвана с нужным ID
    });

    it('Редактирует задачу при сохранении', async () => {
        const { editTask } = require('@/store/task/taskStore.ts').useTaskStore();

        render(TaskList);

        // Находим кнопку редактирования
        const editButton = screen.getByText('✏️ Редактировать');
        await fireEvent.click(editButton);

        // Находим поле ввода и изменяем текст
        const nameInput = screen.getByDisplayValue('Test Task');
        await fireEvent.update(nameInput, 'Updated Task');

        // Находим кнопку сохранения
        const saveButton = screen.getByText('Сохранить');
        await fireEvent.click(saveButton);

        expect(editTask).toHaveBeenCalledWith(
            { id: '1', name: 'Updated Task', text: 'Description', employee: 'User 1', status: 'In Progress', edit: true },
            expect.anything()
        );
    });
});
