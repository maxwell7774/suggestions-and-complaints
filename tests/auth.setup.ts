import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("button", { name: "Login With GitHub" }).click();
  await page
    .getByLabel("Username or email address")
    .fill("bobiojones45@gmail.com");
  await page.getByLabel("Password").fill("!%hkODBh$]3PA7hbVyLF");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.waitForURL("http://localhost:3000");

  await page.context().storageState({ path: authFile });
});
