import { test, expect } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: './frontend/.env' })
dotenv.config({ path: './backend/.env' })

const VITE_PORT = process.env.VITE_PORT || 5173
const PORT = process.env.PORT || 8000

test('1.1 HomePage Test: Title & Guard Button', async ({ page }) => {
  await fetch(`http://localhost:${PORT}/api/users`, { method: 'POST' })
  await page.goto(`http://localhost:${VITE_PORT}/`)
  const logo = page.getByTestId('guard-logo')

  await expect(page.title()).resolves.toMatch(/^Quick Parking$/)
  await expect(logo).toHaveAttribute('src', './home_guard.png')
  await expect(logo).toHaveAttribute('alt', 'guard')

  // 模擬按鈕點擊以打開dialog
  await page.click('[data-testid="guard-logo"]');
  // 等待對話框可見
  await page.waitForSelector('[data-testid="dialog-title"]');
  // 填寫帳號和密碼欄位
  await page.fill('[placeholder="請輸入帳號"]', 'test1');
  await page.fill('[placeholder="請輸入密碼"]', '12345678');  
  // 提交表單完成頁面跳轉
  await page.click('[data-testid="submit-button"]');
  await page.waitForNavigation({ waitUntil: 'load' }); // 等待頁面跳轉完成
  expect(page.url()).toBe(`http://localhost:${VITE_PORT}/guardpage`);
})

test('1.1 HomePage Test: Guard Button', async ({ page }) => {
  await page.goto(`http://localhost:${VITE_PORT}/`)
  // 模擬按鈕點擊以打開dialog
  await page.click('[data-testid="guard-logo"]');
  // 等待對話框可見
  await page.waitForSelector('[data-testid="dialog-title"]');
  // 填寫帳號和密碼欄位
  await page.fill('[placeholder="請輸入帳號"]', 'error');
  await page.fill('[placeholder="請輸入密碼"]', 'error');  
  await page.click('[data-testid="submit-button"]');
  await page.waitForNavigation({ waitUntil: 'load' });
  expect(page.url()).toBe(`http://localhost:${VITE_PORT}/`);
})

test('1.2 HomePage Test: Client Button', async ({ page }) => {
  await page.goto(`http://localhost:${VITE_PORT}/`)
  // 先觸發點擊事件
  await page.click('[data-testid="click-start"]');
  // 驗證是否跳轉到了預期的頁面
  expect(page.url()).toBe(`http://localhost:${VITE_PORT}/clientpage`);
});