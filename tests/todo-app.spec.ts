import { test, expect } from '@playwright/test';

test.describe('Playwright TodoList demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays an empty todo list initially', async ({ page }) => {
    const newTodo = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');
    await expect(newTodo).toBeVisible();
    await expect(addButton).toBeDisabled();
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
  });

  test('adds todo items using the add button', async ({ page }) => {
    const newTodo = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');

    await newTodo.fill('Order pizza');
    await expect(addButton).toBeEnabled();

    await addButton.click();

    await expect(newTodo).toHaveValue('');
    await expect(addButton).toBeDisabled();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toHaveText('Order pizza');
  });

  test('adds and completes todos', async ({ page }) => {
    const newTodo = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');

    await newTodo.fill('Buy groceries');
    await addButton.click();
    await newTodo.fill('Call mom');
    await addButton.click();

    const items = page.getByTestId('todo-item');
    await expect(items).toHaveCount(2);

    await items
      .filter({ hasText: 'Buy groceries' })
      .getByTestId('todo-toggle')
      .check();
    await expect(page.locator('[data-testid="todo-item"].completed')).toHaveCount(1);
  });

  test('filters active todos only', async ({ page }) => {
    const newTodo = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');

    await newTodo.fill('Finish report');
    await addButton.click();
    await newTodo.fill('Wash car');
    await addButton.click();

    const items = page.getByTestId('todo-item');
    await items.first().getByTestId('todo-toggle').check();

    await page.getByTestId('filter-active').click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toHaveText('Wash car');
  });

  test('filters todos by text input', async ({ page }) => {
    const newTodo = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');

    await newTodo.fill('Plan vacation');
    await addButton.click();
    await newTodo.fill('Prepare presentation');
    await addButton.click();
    await newTodo.fill('Practice piano');
    await addButton.click();

    const filterInput = page.getByTestId('todo-filter-input');
    await filterInput.fill('pr');

    const visibleItems = page.getByTestId('todo-item');
    await expect(visibleItems).toHaveCount(2);
    await expect(visibleItems.first()).toContainText('Prepare presentation');
    await expect(visibleItems.nth(1)).toContainText('Practice piano');

    await filterInput.fill('');
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });

  test('combines status filter with text filter', async ({ page }) => {
    const newTodo = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');

    await newTodo.fill('Read book');
    await addButton.click();
    await newTodo.fill('Read documentation');
    await addButton.click();
    await newTodo.fill('Write report');
    await addButton.click();

    const todos = page.getByTestId('todo-item');
    await todos.nth(1).getByTestId('todo-toggle').check();

    await page.getByTestId('filter-completed').click();
    await page.getByTestId('todo-filter-input').fill('read');

    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toHaveText('Read documentation');
  });
});


