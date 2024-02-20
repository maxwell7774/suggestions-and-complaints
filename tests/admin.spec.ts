import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Admin" }).click();
  await expect(
    page.getByRole("heading", { name: "User Permissions" })
  ).toBeVisible();
  await page
    .getByRole("row", { name: "Adam Maxwell Suggestions" })
    .getByRole("checkbox")
    .first()
    .click();
  await page
    .getByRole("row", { name: "Adam Maxwell Suggestions" })
    .getByRole("checkbox")
    .nth(1)
    .click();

  await page
    .getByRole("row", { name: "Adam Maxwell Suggestions" })
    .getByRole("radio")
    .nth(2)
    .click();

  await page
    .getByRole("row", { name: "Adam Maxwell Suggestions" })
    .getByRole("radio")
    .first()
    .click();

  await page
    .getByRole("row", { name: "Adam Maxwell Suggestions" })
    .getByRole("radio")
    .nth(1)
    .click();

  await page
    .getByRole("row", { name: "Adam Maxwell Suggestions" })
    .getByRole("checkbox")
    .first()
    .click();
  await page
    .getByRole("row", { name: "Adam Maxwell Suggestions" })
    .getByRole("checkbox")
    .nth(1)
    .click();
});
