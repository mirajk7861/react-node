const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { TodoPage } = require('./pages/TodoPage');

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('admin', 'admin123');
});

test('create and delete todo', async ({ page }) => {
  const todo = new TodoPage(page);
  const uniqueText = `Task ${Date.now()}`;
  // Get initial count
  const initialCount = await todo.getTodoCount();
  await todo.addTodo(uniqueText);
  // Wait for the new todo to appear
  expect(await todo.isTodoPresent(uniqueText)).toBeTruthy();
  // Verify that the task is added by checking count increased by 1
  const newCount = await todo.getTodoCount();
  expect(newCount).toBe(initialCount + 1);
  await todo.deleteTodo(uniqueText);
  expect(await todo.isTodoPresent(uniqueText)).toBeFalsy();
});


test('should not add empty todo', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addTodo('');
  expect(await todo.isTodoPresent('')).toBeFalsy();
});


test('should edit todo', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addTodo('Edit me');
  await todo.editTodo('Edit me', 'Edited todo');
  await page.waitForTimeout(1000);
  expect(await todo.isTodoPresent('Edited todo')).toBeTruthy();
  expect(await todo.isTodoPresent('Edit me')).toBeFalsy();
  await todo.deleteTodo('Edited todo');
});


// Login with valid/invalid credentials.
test('login with valid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('admin', 'admin123');
  // Assert that login was successful, by checking that the user is redirected to the todo page
  await expect(page.locator('text=Todo List')).toBeVisible();
});

test('login with invalid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('invalidUser', 'wrongPassword');
  // Assert that an error message is shown
  await expect(page.locator('text=Invalid username or password')).toBeVisible();
});

test.afterEach(async ({ page }) => {
  const todo = new TodoPage(page);
  const todosCount = await todo.todoList.count();
  // Collect all todo texts first to avoid DOM detachment issues
  const todoTexts = [];
  for (let i = 0; i < todosCount; i++) {
    const text = await todo.todoList.nth(i).textContent();
    if (text) {
      todoTexts.push(text.trim());
    }
  }
  for (const text of todoTexts) {
    console.log(`Deleting todo: ${text}`);
    await todo.deleteTodo(text);
  }
});