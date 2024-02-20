import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("main").getByRole("img")).toBeVisible();
  await page
    .getByRole("heading", { name: "Suggestions and Complaints" })
    .click();
  await page.getByText("Go here to submit a").click();
});
