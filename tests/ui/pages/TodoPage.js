const { expect } = require('@playwright/test');

class TodoPage {
  constructor(page) {
    this.page = page;
    this.todoInput = page.locator('input[placeholder="Enter todo"]');
    this.addButton = page.locator('button:has-text("Add")');
    this.todoList = page.locator('ul > li');
  }

  async addTodo(text) {
    await this.todoInput.fill(text);
    await this.addButton.click();
  }

  async isTodoPresent(text) {
    await this.page.waitForTimeout(1000);
    return await this.page.locator(`li:has-text("${text}")`).first().isVisible();
  }

  async getTodoCount() {
    await this.page.waitForTimeout(1000);
    const items = this.page.locator('li');
    const count = await items.count();
    return count;
  }

 async deleteTodo(text) {
  const item = this.page.locator(`li:has-text("${text}")`);
  const deleteButton = item.locator('button:has-text("Delete")');
  // Ensure the item and button are visible and stable before clicking
  await expect(item).toBeVisible({ timeout: 2000 });
  await expect(deleteButton).toBeVisible({ timeout: 2000 });
  await deleteButton.click();
  // Wait for the item to be removed from the DOM after deletion
  await expect(item).toBeHidden({ timeout: 2000 });
}


  async editTodo(oldText, newText) {
    const item = this.page.locator(`li:has-text("${oldText}")`);
    await item.locator('button:has-text("Edit")').click();
    await this.todoInput.fill(newText);
    await this.page.locator('button:has-text("Update")').click();
  }
};
module.exports = { TodoPage };
